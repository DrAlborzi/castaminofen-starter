import { Home, Layers, Plus, Search, Sparkles, User, Users } from 'lucide-react';
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
  { id: 'home', label: 'خانه', href: '/', icon: Home },
  { id: 'library', label: 'کتابخانه', href: '/library', icon: Layers },
  { id: 'create', label: 'ایجاد', href: '/create', icon: Plus, isPrimary: true },
  { id: 'search', label: 'جستجو', href: '/search', icon: Search },
  { id: 'community', label: 'اجتماع', href: '/community', icon: Users },
  { id: 'creator', label: 'سازنده', href: '/creator', icon: Sparkles },
  { id: 'profile', label: 'پروفایل', href: '/profile', icon: User },
] as const;

export function getBottomNavigationItems(pathname: string): AppShellNavigationItem[] {
  return navigationDefinitions.map((item) => ({
    ...item,
    isActive: item.href === '/' ? pathname === '/' : pathname.startsWith(item.href),
  }));
}

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
      tagline: 'پیدا کردن مسیر بعدیِ شنیداری',
      showSearchAction: true,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (pathname.startsWith('/creator')) {
    return {
      title: 'سازنده',
      tagline: 'از اولین انتشار تا رشد و هویت در جامعه',
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
      tagline: 'از گوش دادن تا مشارکت و حس ادامه',
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
    tagline: 'فضای صوتی شخصی',
    showSearchAction: true,
    showNotificationAction: true,
    showProfileAction: true,
    titleTone: 'default',
  };
}
