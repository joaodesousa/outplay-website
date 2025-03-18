// app/api/submit-email/route.js
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

export async function POST(request) {
  try {
    // Parse the request body to get the email
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Add the email to the Notion database as a title (simplest way)
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
        // Optionally add creation date (works with a date property)
        "Created at": {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

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