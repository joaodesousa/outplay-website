import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Get audience ID from environment variables
const audienceId = process.env.RESEND_AUDIENCE_ID;

// Rate limiting storage (in memory - will reset on server restart)
// For production, consider using Redis or another persistent store
const ipSubmissions = new Map<string, number[]>();

interface SubscriptionData {
  email: string;
  source?: string;
}

// Types for error handling
interface ResendError {
  statusCode?: number;
  message?: string;
  name?: string;
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

    try {
      if (!audienceId) {
        throw new Error('RESEND_AUDIENCE_ID environment variable is not set');
      }
      
      // Instead of checking if the contact exists first (which would consume an API call),
      // we'll try to create the contact directly. If it already exists, Resend will handle
      // that gracefully without throwing an error.
      try {
        // Add the contact to Resend audience
        await resend.contacts.create({
          audienceId,
          email,
          firstName: '',
          lastName: '',
          unsubscribed: false,
        });
      } catch (error: unknown) {
        // Cast the error to our ResendError type
        const contactError = error as ResendError;
        
        // If it's not a "contact already exists" error, log it but continue
        // We still want to send the welcome email even if contact creation fails
        if (contactError.statusCode !== 409) {
          console.warn('Error creating contact:', contactError);
        }
      }
      
      // Wait a small amount of time to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Send a welcome/confirmation email to the subscriber
      try {
        const emailResponse = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'newsletter@outplay.pt',
          to: email,
          subject: 'Welcome to Our Newsletter',
          html: `
            <div>
              <h1>Thanks for subscribing!</h1>
              <p>You've been added to our newsletter. We'll send you updates about our latest content.</p>
            </div>
          `,
          tags: [
            {
              name: 'source',
              value: source,
            },
          ],
        });

        if (emailResponse.error) {
          console.error('Error sending welcome email:', emailResponse.error);
          
          // Check if it's a rate limit error
          if ((emailResponse.error as ResendError).statusCode === 429) {
            return NextResponse.json({ 
              success: true, 
              message: "Subscribed successfully, but confirmation email couldn't be sent due to rate limiting. Please check your inbox later."
            }, { status: 200 });
          }
          
          return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
        }

        // Track this submission for rate limiting
        const currentSubmissions = ipSubmissions.get(ip) || [];
        currentSubmissions.push(now);
        ipSubmissions.set(ip, currentSubmissions);

        return NextResponse.json({ 
          success: true,
          id: emailResponse.data?.id
        }, { status: 200 });
      } catch (error: unknown) {
        // Cast the error to our ResendError type
        const emailError = error as ResendError;
        
        // Handle specific rate limit error
        if (emailError.statusCode === 429) {
          return NextResponse.json({ 
            success: true,
            message: "Subscribed successfully, but confirmation email couldn't be sent due to rate limiting. Please check your inbox later."
          }, { status: 200 });
        }
        
        throw error;
      }
    } catch (error) {
      console.error('Error with Resend:', error);
      return NextResponse.json({ 
        error: 'Failed to save subscription', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('General error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to process subscription', 
      details: errorMessage 
    }, { status: 500 });
  }
} 