// app/api/newsletter-subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { APIErrorCode, ClientErrorCode, isNotionClientError } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

// Use a separate database for newsletter subscribers
const newsletterDatabaseId = process.env.NOTION_NEWSLETTER_DATABASE_ID;

// Rate limiting storage (in memory - will reset on server restart)
// For production, consider using Redis or another persistent store
const ipSubmissions = new Map<string, number[]>();

interface SubscriptionData {
  email: string;
  source?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit (max 3 submissions per hour per IP)
    const now = Date.now();
    const hourAgo = now - 3600000;
    
    // Clean up old entries
    if (ipSubmissions.has(ip)) {
      const submissions = ipSubmissions.get(ip);
      if (submissions) {
        ipSubmissions.set(
          ip, 
          submissions.filter(time => time > hourAgo)
        );
      }
    }
    
    // Get recent submissions from this IP
    const recentSubmissions = ipSubmissions.get(ip) || [];
    
    // Too many submissions
    if (recentSubmissions.length >= 3) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      }, { status: 429 });
    }
    
    // Parse the request body to get the email
    const data = await request.json() as SubscriptionData;
    const { email, source = 'website_footer' } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if the email already exists in the database to avoid duplicates
    if (newsletterDatabaseId) {
      try {
        const existingSubscribers = await notion.databases.query({
          database_id: newsletterDatabaseId,
          filter: {
            property: 'Email',
            email: {
              equals: email
            }
          }
        });

        if (existingSubscribers.results.length > 0) {
          return NextResponse.json({ 
            message: 'You are already subscribed to our newsletter!' 
          }, { status: 200 });
        }
      } catch (error) {
        console.error('Error checking existing email:', error);
        // Continue with submission anyway
      }
    }
    
    if (!newsletterDatabaseId) {
      throw new Error('NOTION_NEWSLETTER_DATABASE_ID environment variable is not set');
    }

    // Create a new record in the Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: newsletterDatabaseId,
      },
      properties: {
        // Email as the title property
        Name: {
          title: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        // Email property 
        Email: {
          email: email,
        },
        // Source property
        Source: {
          select: {
            name: source,
          },
        },
        // Subscription date
        "Subscribed at": {
          date: {
            start: new Date().toISOString(),
          },
        },
        // Status property
        Status: {
          status: {
            name: "Active",
          },
        },
      },
    });

    // Track this submission for rate limiting
    const currentSubmissions = ipSubmissions.get(ip) || [];
    currentSubmissions.push(now);
    ipSubmissions.set(ip, currentSubmissions);

    return NextResponse.json({ 
      success: true, 
      id: response.id 
    }, { status: 200 });
  } catch (error) {
    console.error('Error saving to Notion:', error);
    
    // Handle specific Notion API errors
    if (isNotionClientError(error)) {
      if (error.code === APIErrorCode.ObjectNotFound) {
        return NextResponse.json({ 
          error: 'Database not found. Please check your configuration.' 
        }, { status: 404 });
      } else if (error.code === APIErrorCode.Unauthorized) {
        return NextResponse.json({ 
          error: 'API key is invalid or expired.' 
        }, { status: 401 });
      }
    }
    
    // Generic error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to save subscription', 
      details: errorMessage 
    }, { status: 500 });
  }
}