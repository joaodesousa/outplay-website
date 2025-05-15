# Storyblok Integration Guide

This document provides instructions for working with Storyblok in this project.

## Getting Started

1. **Environment Variables**: Make sure your `.env.local` file contains the following:

```
# Storyblok API tokens
STORYBLOK_API_TOKEN=your_preview_token
NEXT_PUBLIC_STORYBLOK_API_TOKEN=your_preview_token
STORYBLOK_WEBHOOK_SECRET=your_webhook_secret_for_verification
```

2. **Development**: Run the development server with:

```bash
npm run dev
```

## Content Structure

The following content types are available in Storyblok:

- **Blog Post** (`blog_post`) - For creating blog articles
- **Author** (`author`) - For managing author profiles
- **Page** (`page`) - For creating general pages with flexible content

## Visual Editor

The Storyblok Visual Editor is integrated and works with our Next.js app. When you're editing content in Storyblok, your changes will appear in real-time in the Visual Editor.

## Cache Invalidation

We use Storyblok webhooks for cache invalidation. When content is published in Storyblok, our webhook endpoint automatically revalidates the affected pages.

### Setting up the Webhook in Storyblok

1. Go to your Storyblok space settings > Webhooks
2. Click "Create Webhook"
3. Enter your webhook URL: `https://yourdomain.com/api/storyblok-webhook`
4. Choose the events to trigger the webhook (e.g., Story published, unpublished)
5. Generate a webhook secret and add it to your environment variables

## Creating New Content

1. Login to your Storyblok space
2. Navigate to the Content section
3. Choose the appropriate folder (Blog, Authors)
4. Click the "+" button to create a new entry
5. Fill in the content and publish when ready

## Components

The following React components are available for use with Storyblok:

- `BlogPost` - Displays a blog article
- `Author` - Displays an author profile
- `Page` - A container for other components
- `RichText` - Helper component for rendering rich text content

## Adding New Components

To add a new component:

1. Create a new React component in `components/storyblok/`
2. Register it in `lib/storyblok-components.ts`
3. Create the corresponding content type in Storyblok

## Troubleshooting

- **Visual Editor not working**: Ensure your Storyblok preview token is correct in the environment variables
- **Content not updating**: Check that the webhook is properly configured
- **Component not rendering**: Verify the component is registered in `lib/storyblok-components.ts` 