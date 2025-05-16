"use client";

import { ReactNode } from 'react';
import { useLocale } from '@/lib/i18n';
import { t } from '@/lib/i18n';

type TranslatedContentProps = {
  translationKey?: string;
  params?: Record<string, string>;
  fallback?: ReactNode;
  className?: string;
  en: ReactNode;
  pt: ReactNode;
};

/**
 * A component that renders different content based on the current locale.
 * It can either use direct content for each language or a translation key.
 */
export default function TranslatedContent({
  translationKey,
  params,
  fallback,
  className,
  en,
  pt,
}: TranslatedContentProps) {
  const { locale } = useLocale();

  // If translation key is provided, use it
  if (translationKey) {
    return (
      <span className={className}>
        {t(translationKey, params)}
      </span>
    );
  }

  // Otherwise, use direct content
  if (locale === 'en') {
    return <span className={className}>{en}</span>;
  }

  if (locale === 'pt') {
    return <span className={className}>{pt}</span>;
  }

  // Fallback content
  return <span className={className}>{fallback || en}</span>;
} 