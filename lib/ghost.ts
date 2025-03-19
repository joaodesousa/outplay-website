// lib/ghost.ts
import axios from 'axios';

const ghostApiUrl = process.env.GHOST_API_URL;
const ghostContentApiKey = process.env.GHOST_CONTENT_API_KEY;

// Build the base URL for API requests
const baseUrl = `${ghostApiUrl}/ghost/api/content`;

// Helper function to create the API URL with the key
const createUrl = (endpoint: string, params: Record<string, any> = {}) => {
  const url = new URL(`${baseUrl}/${endpoint}`);
  url.searchParams.append('key', ghostContentApiKey || '');
  
  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      url.searchParams.append(key, value.join(','));
    } else if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
};

// Function to fetch all posts
export async function getAllPosts() {
  try {
    const url = createUrl('posts', {
      limit: 'all',
      include: ['tags', 'authors'],
      fields: ['title', 'slug', 'excerpt', 'published_at', 'feature_image', 'custom_excerpt', 'reading_time']
    });
    
    const response = await axios.get(url);
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Function to fetch a single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const url = createUrl(`posts/slug/${slug}`, {
      include: ['tags', 'authors']
    });
    
    const response = await axios.get(url);
    return response.data.posts[0];
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Function to fetch posts by tag
export async function getPostsByTag(tag: string) {
  try {
    const url = createUrl('posts', {
      filter: `tag:${tag}`,
      include: ['tags', 'authors'],
      fields: ['title', 'slug', 'excerpt', 'published_at', 'feature_image', 'custom_excerpt', 'reading_time']
    });
    
    const response = await axios.get(url);
    return response.data.posts;
  } catch (error) {
    console.error(`Error fetching posts for tag ${tag}:`, error);
    return [];
  }
}