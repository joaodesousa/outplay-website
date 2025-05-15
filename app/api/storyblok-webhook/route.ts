import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import crypto from 'crypto';

// Verify Storyblok webhook signature
const verifyStoryblokWebhook = (
  request: NextRequest,
  rawBody: string,
  secret: string
) => {
  // Get the Storyblok webhook signature from the request headers
  const signature = request.headers.get('webhook-signature');
  
  if (!signature) {
    return false;
  }

  // Create a hash using the webhook secret
  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(rawBody);
  const calculatedSignature = hmac.digest('hex');

  // Compare the calculated signature with the one from the request
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  );
};

export async function POST(request: NextRequest) {
  try {
    // Get the raw body from the request
    const rawBody = await request.text();
    const payload = JSON.parse(rawBody);
    
    // Get the Storyblok webhook secret from environment variables
    const webhookSecret = process.env.STORYBLOK_WEBHOOK_SECRET;
    
    // Verify the webhook if a secret is configured
    if (webhookSecret && !verifyStoryblokWebhook(request, rawBody, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }
    
    // Handle different types of events
    const { action, story, stories } = payload;

    // Handle story publish, change, unpublish events
    if (story) {
      const { slug, full_slug } = story;
      
      console.log(`Revalidating: ${full_slug}`);
      
      // Revalidate the specific page
      revalidatePath(`/${full_slug}`);
      
      // If it's a blog post, also revalidate the blog index
      if (full_slug.startsWith('blog/')) {
        revalidatePath('/blog');
      }
      
      // Revalidate by tag to catch any other pages that might use this content
      revalidateTag(`story-${slug}`);
    }
    
    // Handle bulk operations
    if (stories && Array.isArray(stories)) {
      for (const story of stories) {
        const { slug, full_slug } = story;
        
        console.log(`Bulk revalidating: ${full_slug}`);
        
        revalidatePath(`/${full_slug}`);
        revalidateTag(`story-${slug}`);
      }
      
      // Also revalidate index pages
      revalidatePath('/blog');
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Error processing webhook', error: String(error) },
      { status: 500 }
    );
  }
} 