import { NextRequest, NextResponse } from 'next/server';

// Define constants directly in middleware instead of importing from client components
const locales = ['en', 'pt'];
const defaultLocale = 'pt';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname already has a locale prefix.
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If the pathname has a locale, or is an API route, or a static file, do nothing.
  if (!pathnameIsMissingLocale) {
    return NextResponse.next();
  }

  // Redirect to the same path with the default locale prefix.
  // For example, if the request is for /about, redirect to /pt/about.
  // If the request is for /, redirect to /pt.
  const newUrl = new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Skip all paths that should not be internationalized.
  // This includes API routes, static files, images, fonts, etc.
  matcher: [
    '/((?!api|_next/static|_next/image|fonts|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|workbox-.*\\.js).*)'
  ],
}; 