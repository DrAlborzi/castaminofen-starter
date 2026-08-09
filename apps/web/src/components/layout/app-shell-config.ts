import { Bookmark, Home, Plus, Search, UserRound, Users } from 'lucide-react';
import type { ComponentType } from 'react';

export type AppShellNavigationItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  isActive: boolean;
  isPrimary?: boolean;
};

export type AppShellHeaderConfig = {
  title: string;
  tagline: string;
  showSearchAction?: boolean;
  showProfileAction?: boolean;
  showNotificationAction?: boolean;
  showCreateAction?: boolean;
  titleTone?: 'default' | 'feature';
};

const navigationDefinitions = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'library', label: 'Library', href: '/library', icon: Bookmark },
  { id: 'create', label: 'Create', href: '/create', icon: Plus, isPrimary: true },
  { id: 'search', label: 'Search', href: '/search', icon: Search },
  { id: 'community', label: 'Community', href: '/community', icon: Users },
  { id: 'profile', label: 'Profile', href: '/profile', icon: UserRound },
] as const;

function matchesRoute(pathname: string, href: string) {
  const normalizedPathname = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return href === '/' ? normalizedPathname === '/' : normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
}

export function getAppShellNavigationItems(pathname: string): AppShellNavigationItem[] {
  return navigationDefinitions.map((item) => ({
    ...item,
    isActive: matchesRoute(pathname, item.href),
  }));
}

export const getBottomNavigationItems = getAppShellNavigationItems;

export function getMobileHeaderConfig(pathname: string): AppShellHeaderConfig {
  if (pathname.startsWith('/library')) {
    return {
      title: 'کتابخانه',
      tagline: 'از اینجا به بازگشت، ادامه‌ی مسیر و لحظه‌های ارزشمند برگرد',
      showSearchAction: true,
      showProfileAction: true,
      showCreateAction: true,
      titleTone: 'feature',
    };
  }

  if (pathname.startsWith('/search')) {
    return {
      title: 'جستجو',
      tagline: 'پیدا کردن مسیر بعدیِ شنیداری با یک عبارت ساده',
      showSearchAction: true,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (pathname.startsWith('/creator')) {
    return {
      title: 'سازنده',
      tagline: 'از اولین انتشار تا هویت روشن در جامعه',
      showSearchAction: true,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (pathname.startsWith('/profile')) {
    return {
      title: 'پروفایل',
      tagline: 'تنظیمات و حساب کاربری',
      showSearchAction: false,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (pathname.startsWith('/community')) {
    return {
      title: 'اجتماع',
      tagline: 'از گوش دادن تا گفت‌وگو و بازگشت به مسیر',
      showSearchAction: true,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (pathname.startsWith('/create') || pathname.startsWith('/podcasts/new') || pathname.startsWith('/episodes/new')) {
    return {
      title: 'ایجاد',
      tagline: 'از ایده تا انتشار با مسیر روشن و قابل فهم',
      showSearchAction: false,
      showProfileAction: true,
      showCreateAction: false,
      titleTone: 'feature',
    };
  }

  return {
    title: 'کستامینوفن',
    tagline: 'کشف، گوش دادن و بازگشت در یک تجربه‌ی روشن و بتا',
    showSearchAction: true,
    showNotificationAction: true,
    showProfileAction: true,
    titleTone: 'default',
  };
}
