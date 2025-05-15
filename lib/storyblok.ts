import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";
import { ISbStoryParams } from "storyblok-js-client";
import components from './storyblok-components';

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu", // or 'eu' depending on your space region
  },
  components,
});

// Helper function to get a story by slug
export async function getStoryblokContent(slug: string, options: ISbStoryParams = {}) {
  try {
    // Create Storyblok client for server-side usage
    const storyblokApi = getStoryblokApi();
    
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: process.env.NODE_ENV === "production" ? "published" : "draft",
      resolve_relations: "blog_post.author",
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
    // Create Storyblok client for server-side usage
    const storyblokApi = getStoryblokApi();
    
    const { data } = await storyblokApi.get("cdn/stories", {
      version: process.env.NODE_ENV === "production" ? "published" : "draft",
      resolve_relations: "blog_post.author",
      ...options
    });
    
    return data?.stories || [];
  } catch (error) {
    console.error("Error fetching Storyblok stories:", error);
    return [];
  }
} 