// app/api/submit-email/route.js
import { Resend } from 'resend';
import StoryblokClient from 'storyblok-js-client';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Storyblok Management API client
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

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

    // Check if email exists in Storyblok
    try {
      const subscriberSlug = email.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      
      const existingSubscriber = await Storyblok.get(`cdn/stories/subscribers/${subscriberSlug}`, {
        version: 'draft'
      }).catch(() => null);
      
      if (existingSubscriber && existingSubscriber.data && existingSubscriber.data.story) {
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

    // Add the email to Storyblok
    try {
      const subscriberSlug = email.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      
      await Storyblok.post(`spaces/${process.env.STORYBLOK_SPACE_ID}/stories`, {
        story: {
          name: email,
          slug: subscriberSlug,
          content: {
            component: 'subscriber',
            email: email,
            subscribed_at: new Date().toISOString(),
          },
          parent_id: process.env.STORYBLOK_SUBSCRIBERS_FOLDER_ID,
          is_startpage: false,
        },
        publish: 1
      });

      // Send welcome email
      await resend.emails.send({
        from: `OUTPLAY <${process.env.RESEND_FROM_EMAIL}>`,
        to: email,
        subject: 'Welcome to Outplay!',
        html: `
          <div>
            <h1>Thank you for subscribing!</h1>
            <p>We're excited to have you join our community.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error creating subscriber:', error);
      // Handle error but don't expose details to client
    }

    // Track this submission for rate limiting
    const currentSubmissions = ipSubmissions.get(ip) || [];
    currentSubmissions.push(now);
    ipSubmissions.set(ip, currentSubmissions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    return new Response(JSON.stringify({ 
      error: 'Server error', 
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}