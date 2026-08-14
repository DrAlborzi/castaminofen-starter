import { Bookmark, Home, Plus, Search, UserRound, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import { buildLocalePath, getDictionary, resolveLocale, stripLocalePrefix } from '@/i18n/config';

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
  { id: 'home', labelKey: 'home', href: '/', icon: Home },
  { id: 'library', labelKey: 'library', href: '/library', icon: Bookmark },
  { id: 'create', labelKey: 'create', href: '/create', icon: Plus, isPrimary: true },
  { id: 'search', labelKey: 'search', href: '/search', icon: Search },
  { id: 'community', labelKey: 'community', href: '/community', icon: Users },
  { id: 'profile', labelKey: 'profile', href: '/profile', icon: UserRound },
] as const;

function normalizeRoute(value: string): string {
  const withoutLocale = stripLocalePrefix(value);
  const trimmed = withoutLocale === '/' ? '/' : withoutLocale.replace(/\/$/, '');
  return trimmed || '/';
}

function matchesRoute(pathname: string, href: string) {
  const plainPath = normalizeRoute(pathname);
  const plainHref = normalizeRoute(href);

  return plainHref === '/' ? plainPath === '/' : plainPath === plainHref || plainPath.startsWith(`${plainHref}/`);
}

export function getAppShellNavigationItems(pathname: string): AppShellNavigationItem[] {
  const locale = resolveLocale(pathname);
  const dictionary = getDictionary(locale);

  return navigationDefinitions.map((item) => ({
    ...item,
    label: dictionary[item.labelKey],
    href: buildLocalePath(item.href, locale),
    isActive: matchesRoute(pathname, item.href),
  }));
}

export const getBottomNavigationItems = getAppShellNavigationItems;

export function getMobileHeaderConfig(pathname: string): AppShellHeaderConfig {
  const normalizedPath = stripLocalePrefix(pathname);
  const locale = resolveLocale(pathname);
  const dictionary = getDictionary(locale);

  if (normalizedPath.startsWith('/library')) {
    return {
      title: dictionary.library,
      tagline: dictionary.libraryTagline,
      showSearchAction: true,
      showProfileAction: true,
      showCreateAction: true,
      titleTone: 'feature',
    };
  }

  if (normalizedPath.startsWith('/search')) {
    return {
      title: dictionary.search,
      tagline: dictionary.searchTagline,
      showSearchAction: true,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (normalizedPath.startsWith('/creator')) {
    return {
      title: dictionary.profile,
      tagline: dictionary.creatorTagline,
      showSearchAction: true,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (normalizedPath.startsWith('/profile')) {
    return {
      title: dictionary.profile,
      tagline: dictionary.profileTagline,
      showSearchAction: false,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (normalizedPath.startsWith('/community')) {
    return {
      title: dictionary.community,
      tagline: dictionary.communityTagline,
      showSearchAction: true,
      showProfileAction: true,
      titleTone: 'feature',
    };
  }

  if (normalizedPath.startsWith('/create') || normalizedPath.startsWith('/podcasts/new') || normalizedPath.startsWith('/episodes/new')) {
    return {
      title: dictionary.create,
      tagline: dictionary.createTagline,
      showSearchAction: false,
      showProfileAction: true,
      showCreateAction: false,
      titleTone: 'feature',
    };
  }

  return {
    title: dictionary.appName,
    tagline: dictionary.defaultTagline,
    showSearchAction: true,
    showNotificationAction: true,
    showProfileAction: true,
    titleTone: 'default',
  };
}
