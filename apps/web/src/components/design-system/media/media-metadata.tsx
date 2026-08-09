import clsx from 'clsx';
import type { ReactNode } from 'react';

export function MediaMetadata({
  title,
  subtitle,
  children,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('min-w-0 space-y-1', className)}>
      <h3 className="min-w-0 truncate text-sm font-semibold text-text-primary">{title}</h3>
      {subtitle ? <p className="min-w-0 truncate text-sm text-text-secondary">{subtitle}</p> : null}
      {children ? <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs">{children}</div> : null}
    </div>
  );
}