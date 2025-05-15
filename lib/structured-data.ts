export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OUTPLAY',
    url: 'https://outplay.pt',
    logo: 'https://outplay.pt/logo_squared.png', // Updated to use the square logo
    sameAs: [
      'https://twitter.com/outplaypt', // Update with your social profiles
      'https://www.instagram.com/outplaypt',
      'https://www.linkedin.com/company/outplaypt',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '', // Add your contact number if available
      contactType: 'customer service',
      email: 'hello@outplay.pt', // Update with your contact email
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Portuguese'],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OUTPLAY',
    url: 'https://outplay.pt',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://outplay.pt/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBlogPostSchema(post: any) {
  if (!post) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.content.title,
    description: post.content.excerpt,
    image: post.content.featured_image?.filename || '',
    datePublished: post.content.publication_date || post.published_at,
    dateModified: post.published_at,
    author: {
      '@type': 'Person',
      name: post.content.author?.name || 'OUTPLAY',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OUTPLAY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://outplay.pt/logo_squared.png', // Updated to use the square logo
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://outplay.pt/blog/${post.slug}`,
    },
  };
}
