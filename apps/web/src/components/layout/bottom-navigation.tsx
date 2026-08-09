'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { getBottomNavigationItems } from '@/components/layout/app-shell-config';

export function BottomNavigation({ pathname }: { pathname: string }) {
  const items = getBottomNavigationItems(pathname);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden" aria-label="ناوبری اصلی">
      <div className="mx-auto flex max-w-app px-2 pb-2 sm:px-4">
        <div className="relative mx-auto flex w-full max-w-[32rem] items-end justify-between rounded-[1.75rem] border border-white/10 bg-surface-secondary/95 px-2 py-3 shadow-[0_20px_55px_rgba(6,10,24,0.28)] backdrop-blur-2xl">
          {items.map((item) => {
            const Icon = item.icon;

            if (item.isPrimary) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.isActive ? 'page' : undefined}
                  className="group absolute left-1/2 top-0 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-accent via-violet-500 to-fuchsia-500 text-white shadow-[0_16px_36px_rgba(119,108,254,0.35)] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(119,108,254,0.42)] group-active:scale-[0.96]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="sr-only">{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.isActive ? 'page' : undefined}
                className={clsx(
                  'group flex min-h-[3.45rem] flex-1 flex-col items-center justify-center gap-1 rounded-[1rem] px-2 py-2 text-center text-[10px] font-semibold tracking-[0.02em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary active:scale-[0.98]',
                  item.isActive
                    ? 'bg-accent/12 text-accent shadow-[0_8px_20px_rgba(119,108,254,0.16)]'
                    : 'text-text-secondary hover:bg-surface-primary/80 hover:text-text-primary',
                )}
              >
                <span
                  className={clsx(
                    'flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-200',
                    item.isActive ? 'bg-accent/15 text-accent' : 'text-current group-hover:bg-white/10',
                  )}
                >
                  <Icon className={clsx('h-5 w-5 transition-transform duration-200', item.isActive && 'scale-110')} aria-hidden="true" />
                </span>
                <span className="truncate leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
