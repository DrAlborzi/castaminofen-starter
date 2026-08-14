import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, localeCookieName, normalizeLocale, isSupportedLocale } from '@/i18n/config';

const LOCALE_PATTERN = /^\/(fa|en)(?=\/|$)/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static/api routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Extract locale from URL if present
  const localeMatch = pathname.match(LOCALE_PATTERN);
  let locale = defaultLocale;
  
  if (localeMatch && isSupportedLocale(localeMatch[1])) {
    locale = normalizeLocale(localeMatch[1]);
  } else {
    // Try to get from existing cookie
    const existingLocale = request.cookies.get(localeCookieName)?.value;
    if (existingLocale && isSupportedLocale(existingLocale)) {
      locale = normalizeLocale(existingLocale);
    }
  }

  // Create a response to set the cookie for future requests
  const response = NextResponse.next();
  
  // Set cookie with the determined locale
  response.cookies.set(localeCookieName, locale, { path: '/', sameSite: 'lax' });
  
  // Add custom header with locale AND pathname so root layout has all the info it needs
  response.headers.set('x-locale', locale);
  response.headers.set('x-pathname', pathname);
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)'],
};
