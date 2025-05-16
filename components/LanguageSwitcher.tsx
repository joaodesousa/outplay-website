import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';
import { Locale, locales, useLocale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      
      setLocale(newLocale);
      
      // Get the current path
      const currentPath = window.location.pathname;
      
      // Remove the current locale from the path if it exists
      let pathWithoutLocale = currentPath;
      const pathSegments = currentPath.split('/').filter(Boolean);

      if (pathSegments.length > 0 && locales.includes(pathSegments[0] as Locale)) {
        pathSegments.shift();
        pathWithoutLocale = '/' + pathSegments.join('/');
      }
      
      // if pathWithoutLocale became '//' (e.g. from /en/ or /pt/), make it '/'
      if (pathWithoutLocale === '//') {
        pathWithoutLocale = '/';
      }
      
      // Navigate to the same page with the new locale
      // Ensure leading slash for the base path if it's not just the root
      const basePath = (pathWithoutLocale === '/' || pathWithoutLocale === '') ? '' : pathWithoutLocale;
      const newPath = `/${newLocale}${basePath}`;
        
      router.push(newPath);
    },
    [locale, setLocale, router]
  );

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLocale('en')}
        className="w-12"
      >
        EN
      </Button>
      <Button
        variant={locale === 'pt' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLocale('pt')}
        className="w-12"
      >
        PT
      </Button>
    </div>
  );
} 