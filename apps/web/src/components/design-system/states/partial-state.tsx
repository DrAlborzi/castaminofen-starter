import clsx from 'clsx';
import { AlertTriangle, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export function PartialState({
  title = 'بخشی از این محتوا در دسترس نیست',
  description,
  action,
  className,
  icon: Icon = AlertTriangle,
  children,
}: {
  title?: string;
  description: string;
  action?: ReactNode;
  className?: string;
  icon?: LucideIcon;
  children?: ReactNode;
}) {
  return (
    <section className={clsx('flex flex-col gap-4 rounded-radius-20 border border-warning/30 bg-warning/5 p-5 sm:p-6', className)} aria-label={title}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-radius-12 bg-warning/10 text-warning">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-2">
          <h3 className="m-0 text-subheading">{title}</h3>
          <p className="m-0 text-sm text-text-secondary">{description}</p>
          {children}
        </div>
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </section>
  );
}