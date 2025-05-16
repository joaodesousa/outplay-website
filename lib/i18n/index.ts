"use client";

import { createContext, useContext } from 'react';
import enTranslations from './translations/en.json';
import ptTranslations from './translations/pt.json';

export const defaultLocale = 'pt';
export const locales = ['en', 'pt'];
export type Locale = typeof locales[number];

export interface Translations {
  [key: string]: string | Translations;
}

export const translations: Record<Locale, Translations> = {
  en: enTranslations,
  pt: ptTranslations,
};

// Define the context type including the t function
interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

// Create the context with a default value
export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale as Locale,
  setLocale: () => console.warn('setLocale called outside of LocaleProvider'),
  t: (key: string) => {
    console.warn('t function called outside of LocaleProvider');
    return key; // Return key as fallback
  },
});

// useLocale now returns the full context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    // This should technically not happen if the provider is correctly set up at the root
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// getTranslation remains a utility function, not directly a hook
export const getTranslation = (
  locale: Locale,
  key: string,
  params?: Record<string, string>
): string => {
  const keys = key.split('.');
  let currentTranslation: any = translations[locale];

  for (const k of keys) {
    if (currentTranslation === undefined || currentTranslation[k] === undefined) {
      console.warn(`Translation key "${key}" not found for locale "${locale}" at "${k}"`);
      return key; // Return the key itself if not found
    }
    currentTranslation = currentTranslation[k];
  }

  if (typeof currentTranslation !== 'string') {
    console.warn(`Translation for key "${key}" in locale "${locale}" is not a string.`);
    return key; // Return key if the resolved value is not a string
  }

  let result = currentTranslation;
  if (params) {
    result = Object.entries(params).reduce(
      (acc, [paramKey, paramValue]) => acc.replace(`{{${paramKey}}}`, String(paramValue)),
      result
    );
  }

  return result;
};

// Remove the old standalone t function that caused the hook order issue
// export const t = (...); 