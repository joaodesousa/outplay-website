// app/api/submit-contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Define types
export interface ConversationItem {
  type: 'question' | 'answer';
  text: string;
}

export interface ContactFormData {
  conversation: ConversationItem[];
  email?: string;
  source?: string;
}

export interface ExtractedInfo {
  topic?: string;
  challenge?: string;
  obstacle?: string;
  name?: string;
  extractedEmail?: string;
}

export interface SuccessResponse {
  success: boolean;
}

export interface ErrorResponse {
  error: string;
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting storage (in memory - will reset on server restart)
// For production, consider using Redis or another persistent store
const ipSubmissions = new Map<string, number[]>();

// Helper function to extract key information from the conversation
function extractKeyInformation(conversation: ConversationItem[]): ExtractedInfo {
  // Initialize empty result object
  const result: ExtractedInfo = {};
  
  // Look for specific questions and their answers
  for (let i = 0; i < conversation.length; i++) {
    const item = conversation[i];
    
    // Skip answers, we want to find questions first
    if (item.type !== 'question') continue;
    
    // Check for specific questions and get the answer that follows
    if (item.text.includes("WHAT BRINGS YOU HERE") && i + 1 < conversation.length && conversation[i+1].type === 'answer') {
      result.topic = conversation[i+1].text;
    }
    else if (item.text.includes("WHAT RULE DO YOU WANT TO BREAK") && i + 1 < conversation.length && conversation[i+1].type === 'answer') {
      result.challenge = conversation[i+1].text;
    }
    else if (item.text.includes("WHAT'S HOLDING YOU BACK") && i + 1 < conversation.length && conversation[i+1].type === 'answer') {
      result.obstacle = conversation[i+1].text;
    }
    else if (item.text.includes("WHAT SHOULD WE CALL YOU") && i + 1 < conversation.length && conversation[i+1].type === 'answer') {
      result.name = conversation[i+1].text;
    }
    else if ((item.text.includes("WHAT'S YOUR EMAIL") || item.text.includes("HOW SHOULD WE CONTACT YOU")) && 
             i + 1 < conversation.length && conversation[i+1].type === 'answer') {
      result.extractedEmail = conversation[i+1].text;
    }
  }
  
  return result;
}

export async function POST(request: NextRequest): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit (max 5 submissions per hour per IP)
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
    if (recentSubmissions.length >= 5) {
      return NextResponse.json<ErrorResponse>({ 
        error: 'Rate limit exceeded. Please try again later.' 
      }, { status: 429 });
    }
    
    // Parse the request body to get the form data
    const data = await request.json() as ContactFormData;
    const { conversation, email: providedEmail, source } = data;

    if (!conversation || !Array.isArray(conversation)) {
      return NextResponse.json<ErrorResponse>({ 
        error: 'Invalid conversation data'
      }, { status: 400 });
    }

    // Extract information from the conversation
    const extractedInfo = extractKeyInformation(conversation);
    
    // Use provided email or extracted email from conversation
    const email = providedEmail || extractedInfo.extractedEmail;

    if (!email) {
      return NextResponse.json<ErrorResponse>({ 
        error: 'Email is required' 
      }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ErrorResponse>({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // Format the conversation for the email
    const formattedConversation = conversation.map(item => {
      return `<p><strong>${item.type === 'question' ? 'Question' : 'Answer'}:</strong> ${item.text}</p>`;
    }).join('');

    // Send notification email to support@outplay.pt
    await resend.emails.send({
      from: `OUTPLAY <${process.env.RESEND_FROM_EMAIL}>`,
      to: 'support@outplay.pt',
      subject: 'New Contact Form Submission',
      html: `
        <div>
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${extractedInfo.name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Topic:</strong> ${extractedInfo.topic || 'Not provided'}</p>
          <p><strong>Challenge:</strong> ${extractedInfo.challenge || 'Not provided'}</p>
          <p><strong>Obstacle:</strong> ${extractedInfo.obstacle || 'Not provided'}</p>
          <p><strong>Source:</strong> ${source || 'website'}</p>
          <h2>Full Conversation:</h2>
          ${formattedConversation}
        </div>
      `,
    });

    // Track this submission for rate limiting
    const currentSubmissions = ipSubmissions.get(ip) || [];
    currentSubmissions.push(now);
    ipSubmissions.set(ip, currentSubmissions);

    return NextResponse.json<SuccessResponse>({ 
      success: true
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact submission:', error);
    
    // Generic error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json<ErrorResponse>({ 
      error: 'Failed to submit contact form: ' + errorMessage 
    }, { status: 500 });
  }
}