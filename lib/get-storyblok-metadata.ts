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
    
    // Default metadata
    const metadata: Metadata = {
      title: `${name} | OUTPLAY`,
      description: content.excerpt || content.description || 'OUTPLAY - we write the rules you follow',
    };
    
    // Add OpenGraph image if available
    if (content.featured_image?.filename) {
      metadata.openGraph = {
        images: [
          {
            url: content.featured_image.filename,
            width: 1200,
            height: 630,
            alt: content.featured_image.alt || name,
          },
        ],
      };
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