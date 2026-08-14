import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, localeCookieName, normalizeLocale } from '@/i18n/config';

const LOCALE_PATTERN = /^\/(fa|en)(?=\/|$)/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const localeMatch = pathname.match(LOCALE_PATTERN);
  if (localeMatch) {
    const locale = normalizeLocale(localeMatch[1]);
    const strippedPath = pathname.replace(new RegExp(`^/${locale}`), '') || '/';

    const rewriteUrl = new URL(request.url);
    rewriteUrl.pathname = strippedPath;
    rewriteUrl.search = search;

    const response = NextResponse.rewrite(rewriteUrl);
    response.cookies.set(localeCookieName, locale, { path: '/', sameSite: 'lax' });
    return response;
  }

  const response = NextResponse.next();
  const currentLocale = request.cookies.get(localeCookieName)?.value ?? defaultLocale;
  response.cookies.set(localeCookieName, normalizeLocale(currentLocale), { path: '/', sameSite: 'lax' });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)'],
};
