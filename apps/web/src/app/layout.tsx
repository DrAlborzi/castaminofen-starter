import type { Metadata, Viewport } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/app-providers';
import { AppShell } from '@/components/layout/app-shell';

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
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
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
