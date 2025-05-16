import { Locale } from './i18n';

export function generateOrganizationSchema(locale: Locale = 'pt') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OUTPLAY',
    url: `https://outplay.pt/${locale}`,
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
    inLanguage: locale === 'pt' ? 'pt-PT' : 'en',
  };
}

export function generateWebsiteSchema(locale: Locale = 'pt') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OUTPLAY',
    url: `https://outplay.pt/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://outplay.pt/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: locale === 'pt' ? 'pt-PT' : 'en',
  };
}

export function generateBlogPostSchema(post: any, locale: Locale = 'pt') {
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
      '@id': `https://outplay.pt/${locale}/blog/${post.slug}`,
    },
    inLanguage: locale === 'pt' ? 'pt-PT' : 'en',
  };
}

export function generateLocalBusinessSchema(locale: Locale = 'pt') {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'OUTPLAY',
    url: `https://outplay.pt/${locale}`,
    logo: 'https://outplay.pt/logo_squared.png',
    image: 'https://outplay.pt/logo_squared.png',
    telephone: '', // Add your contact number if available
    email: 'hello@outplay.pt',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '', // Add your street address if available
      addressLocality: 'Porto', // Update with your city
      addressRegion: 'Porto', // Update with your region/state
      postalCode: '', // Add your postal code if available
      addressCountry: 'PT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '', // Add your latitude if available
      longitude: '', // Add your longitude if available
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
    inLanguage: locale === 'pt' ? 'pt-PT' : 'en',
  };
}
