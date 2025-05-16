'use client';

import { generateOrganizationSchema, generateWebsiteSchema, generateBlogPostSchema, generateLocalBusinessSchema } from '@/lib/structured-data';
import Script from 'next/script';
import { useLocale } from '@/lib/i18n';

type SEOProps = {
  type?: 'website' | 'blog' | 'business' | 'organization';
  post?: any; // For blog posts
  jsonLd?: Record<string, any>; // Custom JSON-LD
};

export function SEO({ type = 'website', post, jsonLd }: SEOProps) {
  // Get current locale from context
  const { locale } = useLocale();

  // Generate appropriate schema based on the type
  let schemaData: Record<string, any> | null = null;

  switch (type) {
    case 'blog':
      schemaData = generateBlogPostSchema(post, locale);
      break;
    case 'business':
      schemaData = generateLocalBusinessSchema(locale);
      break;
    case 'organization':
      schemaData = generateOrganizationSchema(locale);
      break;
    case 'website':
    default:
      schemaData = generateWebsiteSchema(locale);
      break;
  }

  // Allow for custom JSON-LD to override the generated schema
  const finalSchema = jsonLd || schemaData;

  if (!finalSchema) return null;

  return (
    <Script 
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
    />
  );
} 