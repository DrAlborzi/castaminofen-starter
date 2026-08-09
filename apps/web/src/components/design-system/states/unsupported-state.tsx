import clsx from 'clsx';
import { CircleSlash, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export function UnsupportedState({
  title = 'این قابلیت هنوز پشتیبانی نمی‌شود',
  description,
  action,
  className,
  icon: Icon = CircleSlash,
}: {
  title?: string;
  description: string;
  action?: ReactNode;
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <section className={clsx('flex flex-col gap-4 rounded-radius-20 border border-border bg-surface-card p-5 sm:p-6', className)} aria-label={title}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-radius-12 bg-surface-hover text-text-secondary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-2">
          <h3 className="m-0 text-subheading">{title}</h3>
          <p className="m-0 text-sm text-text-secondary">{description}</p>
        </div>
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </section>
  );
}