// app/api/newsletter-subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
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

    // Check if email already exists in Storyblok
    try {
      const subscriberSlug = email.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      
      const existingSubscriber = await Storyblok.get(`cdn/stories/subscribers/${subscriberSlug}`, {
        version: 'draft'
      }).catch(() => null);
      
      if (existingSubscriber && existingSubscriber.data && existingSubscriber.data.story) {
        return NextResponse.json({ 
          message: 'You are already subscribed to our newsletter!' 
        }, { status: 200 });
      }
    } catch (error) {
      console.error('Error checking existing email:', error);
      // Continue with submission anyway
    }

    if (!process.env.STORYBLOK_SPACE_ID || !process.env.STORYBLOK_SUBSCRIBERS_FOLDER_ID) {
      throw new Error('Storyblok configuration is missing');
    }

    // Create the subscriber in Storyblok
    try {
      const subscriberSlug = email.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      
      const response = await Storyblok.post(`spaces/${process.env.STORYBLOK_SPACE_ID}/stories`, {
        story: {
          name: email,
          slug: subscriberSlug,
          content: {
            component: 'newsletter_subscriber',
            email: email,
            source: source || 'website_footer',
            subscribed_at: new Date().toISOString(),
            status: 'Active'
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
        subject: 'Welcome to Our Newsletter',
        html: `
          <div>
            <h1>Thank you for subscribing!</h1>
            <p>You've been added to our newsletter list. We're excited to share updates with you!</p>
          </div>
        `,
      });

      // Track this submission for rate limiting
      const currentSubmissions = ipSubmissions.get(ip) || [];
      currentSubmissions.push(now);
      ipSubmissions.set(ip, currentSubmissions);

      return NextResponse.json({ 
        success: true,
        id: response.story?.id || 'created'
      }, { status: 200 });
    } catch (error) {
      console.error('Error creating subscriber:', error);
      
      // Handle specific errors
      if (error instanceof Error) {
        return NextResponse.json({ 
          error: 'Failed to save subscription', 
          details: error.message 
        }, { status: 500 });
      }
      
      return NextResponse.json({ 
        error: 'Failed to save subscription' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing subscription:', error);
    
    // Generic error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to process subscription', 
      details: errorMessage 
    }, { status: 500 });
  }
}