import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentType, ReactNode } from 'react';

export interface DesktopNavigationItem {
  id: string;
  label: ReactNode;
  href: string;
  active?: boolean;
  icon?: ComponentType<{ className?: string }>;
}

export function DesktopNavigation({ items, className }: { items: DesktopNavigationItem[]; className?: string }) {
  return (
    <nav className={clsx('flex items-center gap-2', className)} aria-label="ناوبری دسکتاپ">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          aria-current={item.active ? 'page' : undefined}
          className={clsx(
            'inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-12)] px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary',
            item.active ? 'bg-accent/12 font-semibold text-accent' : 'text-text-secondary hover:bg-surface-card hover:text-text-primary',
          )}
        >
          {item.icon ? <item.icon className="h-4 w-4" aria-hidden="true" /> : null}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
