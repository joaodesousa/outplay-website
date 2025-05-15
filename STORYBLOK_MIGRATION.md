# Migrating to Storyblok CMS

This document outlines the steps to migrate our content from Ghost CMS and Notion to Storyblok.

## 1. Setup Storyblok Account

1. Sign up for a Storyblok account at [https://www.storyblok.com/](https://www.storyblok.com/)
2. Create a new space for our project
3. Note your API keys (public and preview) from Settings > API Keys

## 2. Install Dependencies

```bash
pnpm add @storyblok/react storyblok-js-client
```

## 3. Configure Next.js with Storyblok

Create a configuration file at `lib/storyblok.ts`:

```typescript
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { ISbStoryParams } from "storyblok-js-client";

// Import your components
// We'll register these later with Storyblok

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "us", // or 'eu' depending on your space region
  },
  components: {
    // Register your components here
  },
});

// Helper function to get a story by slug
export async function getStoryblokContent(slug: string, options: ISbStoryParams = {}) {
  try {
    const storyblokApi = require("@storyblok/react").getStoryblokApi();
    
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: process.env.NODE_ENV === "production" ? "published" : "draft",
      ...options
    });
    
    return data?.story;
  } catch (error) {
    console.error("Error fetching Storyblok content:", error);
    return null;
  }
}

// Helper function to get multiple stories
export async function getStoryblokStories(options: ISbStoryParams = {}) {
  try {
    const storyblokApi = require("@storyblok/react").getStoryblokApi();
    
    const { data } = await storyblokApi.get("cdn/stories", {
      version: process.env.NODE_ENV === "production" ? "published" : "draft",
      ...options
    });
    
    return data?.stories || [];
  } catch (error) {
    console.error("Error fetching Storyblok stories:", error);
    return [];
  }
}
```

## 4. Update Environment Variables

Add to your `.env.local` file:

```
STORYBLOK_API_TOKEN=your_preview_token
```

For production, add to your deployment environment:

```
STORYBLOK_API_TOKEN=your_public_token
```

## 5. Content Modeling in Storyblok

### 5.1 Create Content Types

In Storyblok admin, create the following content types:

#### Blog Post
- Title (text)
- Slug (text)
- Author (reference to Author content type)
- Publication Date (date)
- Featured Image (asset)
- Excerpt (textarea)
- Content (richtext)
- Tags (multiselect)

#### Author
- Name (text)
- Bio (textarea)
- Avatar (asset)
- Social Links (blocks)

#### Newsletter Subscriber (replacing Notion database)
- Email (text)
- Source (select)
- Subscription Date (date)
- Status (select)

#### Contact Submission (replacing Notion database)
- Name (text)
- Email (text)
- Message (textarea)
- Date Submitted (date)
- Status (select)

## 6. Create React Components

Create component files for each Storyblok component in `components/storyblok/`:

```tsx
// components/storyblok/BlogPost.tsx
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const BlogPost = ({ blok }) => {
  return (
    <article {...storyblokEditable(blok)}>
      <h1>{blok.title}</h1>
      {/* Render the rest of your blog post */}
    </article>
  );
};

export default BlogPost;
```

Register components in `lib/storyblok.ts`:

```typescript
import BlogPost from "../components/storyblok/BlogPost";
// Import other components

// In storyblokInit:
components: {
  blogPost: BlogPost,
  // Register other components
}
```

## 7. Migrate Data from Ghost to Storyblok

### 7.1 Export Ghost Data

Use Ghost Admin API to export posts and authors:

```typescript
// scripts/export-ghost-data.ts
import fs from "fs";
import { getAllPosts, getAllAuthors } from "../lib/ghost";

async function exportGhostData() {
  const posts = await getAllPosts();
  const authors = await getAllAuthors();
  
  fs.writeFileSync("./ghost-posts.json", JSON.stringify(posts, null, 2));
  fs.writeFileSync("./ghost-authors.json", JSON.stringify(authors, null, 2));
  
  console.log(`Exported ${posts.length} posts and ${authors.length} authors`);
}

exportGhostData();
```

### 7.2 Import to Storyblok

Use Storyblok Management API to import data:

```typescript
// scripts/import-to-storyblok.ts
import StoryblokClient from "storyblok-js-client";
import fs from "fs";

const Storyblok = new StoryblokClient({
  oauthToken: "YOUR_OAUTH_TOKEN", // Generate from Storyblok
});

async function importToStoryblok() {
  const posts = JSON.parse(fs.readFileSync("./ghost-posts.json", "utf8"));
  const authors = JSON.parse(fs.readFileSync("./ghost-authors.json", "utf8"));
  
  // First import authors
  for (const author of authors) {
    // Convert to Storyblok format and create
  }
  
  // Then import posts
  for (const post of posts) {
    // Convert to Storyblok format and create
  }
}

importToStoryblok();
```

## 8. Migrate from Notion to Storyblok

### 8.1 Newsletter Subscribers

Create a script to export Notion data and import to Storyblok:

```typescript
// scripts/migrate-newsletter-subscribers.ts
import { Client } from "@notionhq/client";
import StoryblokClient from "storyblok-js-client";

// Initialize clients
const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });
const Storyblok = new StoryblokClient({
  oauthToken: "YOUR_OAUTH_TOKEN",
});

async function migrateSubscribers() {
  // Fetch subscribers from Notion
  const subscribers = await notion.databases.query({
    database_id: process.env.NOTION_NEWSLETTER_DATABASE_ID,
  });
  
  // Import to Storyblok
  for (const subscriber of subscribers.results) {
    // Convert and import
  }
}

migrateSubscribers();
```

## 9. Update API Routes

### 9.1 Newsletter Subscription

Update the newsletter subscription endpoint:

```typescript
// app/api/newsletter-subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import StoryblokClient from "storyblok-js-client";

// Initialize Storyblok Management API client
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_MANAGEMENT_TOKEN,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    
    // Rate limiting logic (retain from existing code)
    
    // Parse the request body
    const data = await request.json();
    const { email, source = "website_footer" } = data;
    
    // Validation (retain from existing code)
    
    // Create subscriber in Storyblok
    const response = await Storyblok.post("stories", {
      story: {
        name: email,
        slug: email.replace(/[@.]/g, "-"),
        content: {
          component: "newsletterSubscriber",
          email: email,
          source: source,
          subscribed_at: new Date().toISOString(),
          status: "Active"
        },
        parent_id: YOUR_FOLDER_ID, // Replace with actual folder ID
      },
      publish: 1
    });
    
    return NextResponse.json({ 
      success: true, 
      id: response.data.story.id 
    }, { status: 200 });
  } catch (error) {
    // Error handling (retain from existing code)
  }
}
```

## 10. Update Page Components

### 10.1 Blog Page

```tsx
// app/blog/page.tsx
import { getStoryblokStories } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";

export default async function BlogPage() {
  const posts = await getStoryblokStories({
    starts_with: "blog/",
    sort_by: "content.published_date:desc",
  });
  
  return (
    <div>
      <h1>Blog</h1>
      <div className="grid gap-8">
        {posts.map(post => (
          <StoryblokComponent blok={post.content} key={post.uuid} />
        ))}
      </div>
    </div>
  );
}
```

### 10.2 Blog Post Page

```tsx
// app/blog/[slug]/page.tsx
import { getStoryblokContent, getStoryblokStories } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";

export async function generateStaticParams() {
  const posts = await getStoryblokStories({ starts_with: "blog/" });
  
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getStoryblokContent(`blog/${slug}`);
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return <StoryblokComponent blok={post.content} />;
}
```

## 11. Visual Editor Integration

To enable the Storyblok Visual Editor, update `app/layout.tsx`:

```tsx
import { storyblokInit, apiPlugin } from "@storyblok/react";
import StoryblokProvider from "@/components/StoryblokProvider";

// Import and register components

export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
```

Create `components/StoryblokProvider.tsx`:

```tsx
"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import BlogPost from "./storyblok/BlogPost";
// Import other components

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    blogPost: BlogPost,
    // Register other components
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
```

## 12. Testing & Verification

1. Test each migrated content type in Storyblok
2. Verify API routes work correctly
3. Check visual editor functionality
4. Test content delivery in production and preview modes

## 13. Cleanup

Once the migration is complete and verified:

1. Update or remove Ghost API integration code
2. Update or remove Notion integration code
3. Update environment variables
4. Update README.md with new CMS information

## Next Steps

1. Leverage Storyblok features like scheduling, workflows, and translations
2. Implement preview mode in Next.js for Storyblok's visual editor
3. Set up webhooks for cache invalidation on content changes 