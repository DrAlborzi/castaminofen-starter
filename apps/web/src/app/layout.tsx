import type { Metadata, Viewport } from 'next';
import { cookies, headers } from 'next/headers';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/app-providers';
import { AppShell } from '@/components/layout/app-shell';
import { defaultLocale, getDirection, normalizeLocale, isSupportedLocale } from '@/i18n/config';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://castaminofen.local'),
  title: 'Castaminofen',
  description: 'Castaminofen frontend foundation',
  applicationName: 'Castaminofen',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/branding/favicon.ico',
    shortcut: '/branding/favicon.ico',
    apple: '/branding/icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Castaminofen',
  },
};

export const viewport: Viewport = {
  themeColor: '#111827',
  colorScheme: 'dark light',
};

const themeBootstrapScript = `
  (() => {
    try {
      const stored = window.localStorage.getItem('castaminofen-settings-preferences');
      const preference = stored ? JSON.parse(stored).theme : 'System';
      const resolved = preference === 'Light' || (preference === 'System' && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
      const root = document.documentElement;
      root.style.colorScheme = resolved;
      if (resolved === 'light') root.dataset.theme = 'light';
    } catch {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let locale = defaultLocale;
  
  // Priority 1: Get locale from middleware header (most reliable)
  try {
    const headersList = headers();
    const headerLocale = headersList.get('x-locale');
    if (headerLocale && isSupportedLocale(headerLocale)) {
      locale = normalizeLocale(headerLocale);
    }
  } catch (e) {
    // headers() might fail in some contexts
  }
  
  // Priority 2: Fallback to cookie if header not available
  if (locale === defaultLocale) {
    const cookieValue = cookies().get('castaminofen-locale')?.value;
    if (cookieValue && isSupportedLocale(cookieValue)) {
      locale = normalizeLocale(cookieValue);
    }
  }

  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction} className={vazirmatn.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
