'use client';

import Link from 'next/link';
import { Bell, Plus, Search, Sparkles, UserRound } from 'lucide-react';
import { getAppShellNavigationItems, getMobileHeaderConfig } from '@/components/layout/app-shell-config';
import { DesktopNavigation } from '@/components/design-system';
import { buildLocalePath, getDictionary, resolveLocale } from '@/i18n/config';

export function MobileHeader({ pathname }: { pathname: string }) {
  const locale = resolveLocale(pathname);
  const config = getMobileHeaderConfig(pathname);
  const navigationItems = getAppShellNavigationItems(pathname);
  const dictionary = getDictionary(locale);

  return (
    <header className="app-header sticky top-0 z-30 border-b border-border/70 bg-surface-secondary/80 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-app items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${config.titleTone === 'feature' ? 'border-accent/20 bg-accent/12 text-accent' : 'border-border/80 bg-surface-card text-text-primary'}`}>
            {config.titleTone === 'feature' ? <Sparkles className="h-4 w-4" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{config.title}</p>
            <p className="truncate text-sm text-text-secondary">{config.tagline}</p>
          </div>
        </div>

        <DesktopNavigation
          className="hidden min-w-0 flex-1 justify-center md:flex"
          items={navigationItems.map((item) => ({
            id: item.id,
            label: item.label,
            href: item.href,
            active: item.isActive,
            icon: item.icon,
          }))}
        />

        <div className="flex shrink-0 items-center gap-1.5">
          {config.showCreateAction ? (
            <Link href={buildLocalePath('/podcasts/new', locale)} className="icon-button bg-accent text-accent-foreground hover:bg-accent/90" aria-label={dictionary.createActionLabel}>
              <Plus className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          {config.showSearchAction ? (
            <Link href={buildLocalePath('/search', locale)} className="icon-button" aria-label={dictionary.searchActionLabel}>
              <Search className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          {config.showNotificationAction ? (
            <Link href={buildLocalePath('/settings', locale)} className="icon-button relative" aria-label={dictionary.settingsLabel}>
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-accent" />
            </Link>
          ) : null}
          {config.showProfileAction ? (
            <Link href={buildLocalePath('/profile', locale)} className="icon-button" aria-label={dictionary.profileActionLabel}>
              <UserRound className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
