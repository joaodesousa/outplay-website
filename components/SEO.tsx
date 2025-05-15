'use client';

import { generateOrganizationSchema, generateWebsiteSchema, generateBlogPostSchema, generateLocalBusinessSchema } from '@/lib/structured-data';
import Script from 'next/script';

type SEOProps = {
  type?: 'website' | 'blog' | 'business' | 'organization';
  post?: any; // For blog posts
  jsonLd?: Record<string, any>; // Custom JSON-LD
};

export function SEO({ type = 'website', post, jsonLd }: SEOProps) {
  // Generate appropriate schema based on the type
  let schemaData: Record<string, any> | null = null;

  switch (type) {
    case 'blog':
      schemaData = generateBlogPostSchema(post);
      break;
    case 'business':
      schemaData = generateLocalBusinessSchema();
      break;
    case 'organization':
      schemaData = generateOrganizationSchema();
      break;
    case 'website':
    default:
      schemaData = generateWebsiteSchema();
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