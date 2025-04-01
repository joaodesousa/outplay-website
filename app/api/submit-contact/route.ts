// app/api/submit-contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { APIErrorCode, ClientErrorCode, isNotionClientError } from '@notionhq/client';

import type { 
  ConversationItem, 
  ContactFormData, 
  ExtractedInfo,
  NotionHeading2Block,
  NotionParagraphBlock,
  SuccessResponse,
  ErrorResponse
} from '@/types/notion';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

// Use a separate database for contacts
const contactDatabaseId = process.env.NOTION_CONTACT_DATABASE_ID;

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

    // Define conversation blocks for Notion page
    const conversationBlocks: (NotionHeading2Block | NotionParagraphBlock)[] = [
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{
            text: {
              content: 'Conversation',
            },
          }],
        },
      },
      ...conversation.map(item => ({
        object: 'block' as const,
        type: 'paragraph' as const,
        paragraph: {
          rich_text: [{
            text: {
              content: `${item.type}: ${item.text}`,
            },
            annotations: {
              bold: item.type === 'question',
            },
          }],
        },
      })),
    ];

    if (!contactDatabaseId) {
      throw new Error('NOTION_CONTACT_DATABASE_ID environment variable is not set');
    }

    // Create a page in the Notion contacts database with flexible structure
    const response = await notion.pages.create({
      parent: {
        database_id: contactDatabaseId,
      },
      properties: {
        // Name property (usually the title column in Notion)
        // Using extracted name if available, otherwise using email as the identifier
        Name: {
          title: [
            {
              text: {
                content: extractedInfo.name || email,
              },
            },
          ],
        },
        // Email property
        Email: {
          email: email,
        },
        // Source property (homepage contact form or contact page)
        Source: {
          select: {
            name: source || 'website',
          },
        },
        // Created at property
        "Created at": {
          date: {
            start: new Date().toISOString(),
          },
        },
        // Status property (you can use this to track follow-ups)
        Status: {
          status: {
            name: "New",
          },
        },
        // If you want to make specific answers searchable/filterable
        // Only add these if your database has these properties
        ...(extractedInfo.topic && {
          Topic: {
            rich_text: [
              {
                text: {
                  content: extractedInfo.topic.substring(0, 2000), // Notion limit
                }
              }
            ]
          }
        }),
        ...(extractedInfo.challenge && {
          Challenge: {
            rich_text: [
              {
                text: {
                  content: extractedInfo.challenge.substring(0, 2000), // Notion limit
                }
              }
            ]
          }
        }),
        ...(extractedInfo.obstacle && {
          Obstacle: {
            rich_text: [
              {
                text: {
                  content: extractedInfo.obstacle.substring(0, 2000), // Notion limit
                }
              }
            ]
          }
        }),
      },
      // Store the conversation in the page content
      children: conversationBlocks,
    });

    // Track this submission for rate limiting
    const currentSubmissions = ipSubmissions.get(ip) || [];
    currentSubmissions.push(now);
    ipSubmissions.set(ip, currentSubmissions);

    return NextResponse.json<SuccessResponse>({ 
      success: true, 
      id: response.id 
    }, { status: 200 });
  } catch (error) {
    console.error('Error saving to Notion:', error);
    
    // Handle specific Notion API errors
    if (isNotionClientError(error)) {
      // This is a Notion-specific error
      if (error.code === APIErrorCode.ObjectNotFound) {
        return NextResponse.json<ErrorResponse>({ 
          error: 'Database not found. Please check your configuration.' 
        }, { status: 404 });
      } else if (error.code === APIErrorCode.Unauthorized) {
        return NextResponse.json<ErrorResponse>({ 
          error: 'API key is invalid or expired.' 
        }, { status: 401 });
      } else if (error.code === ClientErrorCode.RequestTimeout) {
        return NextResponse.json<ErrorResponse>({ 
          error: 'Request timed out. Please try again.' 
        }, { status: 408 });
      }
    }
    
    // Generic error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json<ErrorResponse>({ 
      error: 'Failed to save contact information', 
      details: errorMessage 
    }, { status: 500 });
  }
}