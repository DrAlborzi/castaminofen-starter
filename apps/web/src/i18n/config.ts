export const supportedLocales = ['fa', 'en'] as const;
export type LocaleCode = (typeof supportedLocales)[number];

export const defaultLocale: LocaleCode = 'fa';
export const localeCookieName = 'castaminofen-locale';

export const localeMetadata: Record<LocaleCode, { code: LocaleCode; dir: 'rtl' | 'ltr'; name: string; nativeName: string; locale: string }> = {
  fa: { code: 'fa', dir: 'rtl', name: 'فارسی', nativeName: 'فارسی', locale: 'fa-IR' },
  en: { code: 'en', dir: 'ltr', name: 'English', nativeName: 'English', locale: 'en-US' },
};

export function normalizeLocale(value?: string | null): LocaleCode {
  if (!value) return defaultLocale;

  const normalized = value.toLowerCase();

  if (normalized === 'fa' || normalized.startsWith('fa-')) return 'fa';
  if (normalized === 'en' || normalized.startsWith('en-')) return 'en';

  return defaultLocale;
}

export function isSupportedLocale(value?: string | null): value is LocaleCode {
  return supportedLocales.includes(normalizeLocale(value) as LocaleCode);
}

export function getDirection(locale: string | undefined): 'rtl' | 'ltr' {
  return localeMetadata[normalizeLocale(locale)].dir;
}

export function getLocaleMetadata(locale: string | undefined) {
  return localeMetadata[normalizeLocale(locale)];
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname || '/';
  const match = normalized.match(/^\/((fa|en))(?:\/|$)/);

  if (!match) return normalized;

  const remainder = normalized.slice(match[0].length - 1) || '/';
  return remainder.startsWith('/') ? remainder : `/${remainder}`;
}

export function resolveLocale(input?: string | null): LocaleCode {
  if (!input) return defaultLocale;

  const value = input.trim();
  if (!value) return defaultLocale;

  if (value.startsWith('/')) {
    const firstSegment = value.split('/').filter(Boolean)[0];
    if (firstSegment) return normalizeLocale(firstSegment);
    return defaultLocale;
  }

  const segments = value.split('/').filter(Boolean);
  if (segments.length > 0) {
    return normalizeLocale(segments[0]);
  }

  return normalizeLocale(value);
}

export function buildLocalePath(pathname: string, locale: string = defaultLocale): string {
  const cleaned = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const stripped = stripLocalePrefix(cleaned);
  const targetLocale = normalizeLocale(locale);

  if (stripped === '/') {
    return `/${targetLocale}`;
  }

  return `/${targetLocale}${stripped}`;
}

export const dictionaries = {
  fa: {
    home: 'خانه',
    library: 'کتابخانه',
    create: 'ایجاد',
    search: 'جستجو',
    community: 'اجتماع',
    profile: 'پروفایل',
    appName: 'کستامینوفن',
    defaultTagline: 'کشف، گوش دادن و بازگشت در یک تجربه‌ی روشن و بتا',
    libraryTagline: 'از اینجا به بازگشت، ادامه‌ی مسیر و لحظه‌های ارزشمند برگرد',
    searchTagline: 'پیدا کردن مسیر بعدیِ شنیداری با یک عبارت ساده',
    creatorTagline: 'از اولین انتشار تا هویت روشن در جامعه',
    profileTagline: 'تنظیمات و حساب کاربری',
    communityTagline: 'از گوش دادن تا گفت‌وگو و بازگشت به مسیر',
    createTagline: 'از ایده تا انتشار با مسیر روشن و قابل فهم',
    settingsLabel: 'تنظیمات برنامه',
    profileActionLabel: 'پروفایل کاربری',
    searchActionLabel: 'جستجو در پادکست‌ها',
    createActionLabel: 'ایجاد پادکست جدید',
  },
  en: {
    home: 'Home',
    library: 'Library',
    create: 'Create',
    search: 'Search',
    community: 'Community',
    profile: 'Profile',
    appName: 'Castaminofen',
    defaultTagline: 'Discover, listen, and return through a clear beta experience',
    libraryTagline: 'Return here to continue your path and meaningful moments',
    searchTagline: 'Find your next listening path with a simple phrase',
    creatorTagline: 'From first release to a clear identity in the community',
    profileTagline: 'Account settings and profile',
    communityTagline: 'From listening to discussion and returning to the path',
    createTagline: 'From idea to release with a clear path',
    settingsLabel: 'App settings',
    profileActionLabel: 'User profile',
    searchActionLabel: 'Search podcasts',
    createActionLabel: 'Create a new podcast',
  },
} as const;

export function getDictionary(locale: string | undefined) {
  return dictionaries[normalizeLocale(locale)];
}
