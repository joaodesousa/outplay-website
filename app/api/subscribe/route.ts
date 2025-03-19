import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Ensure these environment variables are set
    const adminApiUrl = process.env.GHOST_ADMIN_API_URL;
    const adminApiKey = process.env.GHOST_ADMIN_API_KEY;

    if (!adminApiUrl || !adminApiKey) {
      console.error('Ghost API credentials are missing');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Split the admin API key into its components
    const [id, secret] = adminApiKey.split(':');

    const response = await fetch(`${adminApiUrl}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Ghost ${id}:${secret}`
      },
      body: JSON.stringify({
        email: email
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Ghost API error response:', errorBody);
      
      return NextResponse.json(
        { message: 'Failed to subscribe. Please try again.' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Something went wrong';
    
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}