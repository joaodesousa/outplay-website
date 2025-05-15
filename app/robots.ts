import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Update to your production domain
  const baseUrl = 'https://outplay.pt';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/coming-soon/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 