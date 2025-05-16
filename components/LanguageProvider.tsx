'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { LocaleContext, Locale, defaultLocale, getTranslation } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale as Locale);
  const pathname = usePathname();

  // Detect locale from URL on initial load and when pathname changes
  useEffect(() => {
    if (!pathname) {
      setLocale(defaultLocale as Locale);
      return;
    }
    
    const pathParts = pathname.split('/').filter(Boolean);
    const firstPart = pathParts[0];
    
    if (firstPart && ['en', 'pt'].includes(firstPart)) {
      setLocale(firstPart as Locale);
    } else {
      // Default to Portuguese if no locale in URL
      setLocale('pt');
    }
  }, [pathname]);

  // Memoized t function that uses the current locale from state
  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      return getTranslation(locale, key, params);
    },
    [locale] // Re-create t function if locale changes
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
} 