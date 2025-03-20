// app/api/submit-email/route.js
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// Rate limiting storage (in memory - will reset on server restart)
// For production, consider using Redis or another persistent store
const ipSubmissions = new Map();

// Suspicious email patterns
const suspiciousPatterns = [
  /^test(@|test)/, // test emails
  /^[a-z]{1,2}@/, // Very short local parts
  /\d{6,}@/, // Many sequential numbers
  /.*\.(xyz|top|work|guru|date|bid|loans|stream|racing)$/, // Suspicious TLDs
];

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    // In production with a proxy, you might need to use x-forwarded-for
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit (max 3 submissions per hour per IP)
    const now = Date.now();
    const hourAgo = now - 3600000;
    
    // Clean up old entries
    if (ipSubmissions.has(ip)) {
      ipSubmissions.set(
        ip, 
        ipSubmissions.get(ip).filter(time => time > hourAgo)
      );
    }
    
    // Get recent submissions from this IP
    const recentSubmissions = ipSubmissions.get(ip) || [];
    
    // Too many submissions
    if (recentSubmissions.length >= 3) {
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again later.' 
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Parse the request body to get the email
    const data = await request.json();
    const { email, honeypot } = data;

    // Check for honeypot field
    if (honeypot) {
      // Silently accept but don't store (fool the bots)
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Advanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Check for suspicious patterns
    if (suspiciousPatterns.some(pattern => pattern.test(email.toLowerCase()))) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if email exists in database already
    try {
      const existingResults = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'Name',
          title: {
            equals: email
          }
        }
      });
      
      if (existingResults.results.length > 0) {
        // Email already exists
        return new Response(JSON.stringify({ 
          message: 'You\'re already on our list. Thank you!' 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Error checking existing email:', error);
      // Continue with submission anyway
    }

    // Add the email to the Notion database
    // Only use the Name and Created at properties which should exist in your database
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        // Use the title property (assuming Name is the title property in your database)
        Name: {
          title: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        // Add submission date - this assumes you have a "Created at" property with a date type
        // If you don't have this property, you can remove this section
        "Created at": {
          date: {
            start: new Date().toISOString(),
          },
        }
      },
    });

    // Track this submission for rate limiting
    const currentSubmissions = ipSubmissions.get(ip) || [];
    currentSubmissions.push(now);
    ipSubmissions.set(ip, currentSubmissions);

    return new Response(JSON.stringify({ success: true, id: response.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving to Notion:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to save to Notion', 
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}