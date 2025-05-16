import { Metadata } from 'next';
import { getStoryblokContent } from './storyblok';

export async function getStoryblokMetadata(slug: string): Promise<Metadata> {
  try {
    const story = await getStoryblokContent(slug);
    
    if (!story) {
      return {
        title: 'Not Found | OUTPLAY',
        description: 'The page you are looking for could not be found.',
      };
    }
    
    // Extract metadata from story
    const { content, name } = story;
    
    // Base URL - update this to your production domain
    const baseUrl = "https://outplay.pt";
    const pageUrl = `${baseUrl}/${slug}`;
    
    // Default metadata
    const metadata: Metadata = {
      title: `${name} | OUTPLAY`,
      description: content.excerpt || content.description || 'OUTPLAY - we write the rules you follow',
      keywords: content.tags?.join(', ') || 'OUTPLAY, branding, digital, experiences, creative',
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
    
    // Add OpenGraph metadata
    if (slug.startsWith('blog/')) {
      // Create article OpenGraph for blog posts
      metadata.openGraph = {
        type: 'article',
        url: pageUrl,
        title: `${name} | OUTPLAY`,
        description: content.excerpt || content.description || 'OUTPLAY - we write the rules you follow',
        siteName: 'OUTPLAY',
        locale: 'en_US',
        publishedTime: content.publication_date || story.published_at,
        modifiedTime: story.published_at,
        authors: [content.author?.name || 'OUTPLAY'],
        tags: content.tags || [],
      };
    } else {
      // Create website OpenGraph for other pages
      metadata.openGraph = {
        type: 'website',
        url: pageUrl,
        title: `${name} | OUTPLAY`,
        description: content.excerpt || content.description || 'OUTPLAY - we write the rules you follow',
        siteName: 'OUTPLAY',
        locale: 'en_US',
      };
    }
    
    // Add Twitter card metadata
    metadata.twitter = {
      card: 'summary_large_image',
      site: '@outplaypt', // Replace with your Twitter handle
      creator: '@outplaypt', // Replace with your Twitter handle
      title: `${name} | OUTPLAY`,
      description: content.excerpt || content.description || 'OUTPLAY - we write the rules you follow',
    };
    
    // Add OpenGraph image if available
    if (content.featured_image?.filename) {
      const image = {
        url: content.featured_image.filename,
        width: 1200,
        height: 630,
        alt: content.featured_image.alt || name,
      };
      
      if (metadata.openGraph) {
        metadata.openGraph.images = [image];
      }
      
      if (metadata.twitter) {
        metadata.twitter.images = [image.url];
      }
    }
    
    return metadata;
  } catch (error) {
    console.error('Error getting Storyblok metadata:', error);
    
    // Fallback metadata
    return {
      title: 'OUTPLAY',
      description: 'OUTPLAY - we write the rules you follow',
    };
  }
} 