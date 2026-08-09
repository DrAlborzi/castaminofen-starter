import clsx from 'clsx';
import { AlertCircle, CheckCircle2, Info, TriangleAlert, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const icons: Record<AlertVariant, LucideIcon> = { info: Info, success: CheckCircle2, warning: TriangleAlert, error: AlertCircle };

export function Alert({
  variant = 'info',
  title,
  children,
  className,
}: {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const Icon = icons[variant];
  const isError = variant === 'error';

  return (
    <div
      className={clsx(
        'flex items-start gap-3 rounded-radius-12 border p-4',
        variant === 'info' && 'border-info/30 bg-info/5',
        variant === 'success' && 'border-success/30 bg-success/5',
        variant === 'warning' && 'border-warning/30 bg-warning/5',
        isError && 'border-error/30 bg-error/5',
        className,
      )}
      role={isError ? 'alert' : 'status'}
    >
      <Icon className={clsx('mt-0.5 h-5 w-5 shrink-0', variant === 'info' && 'text-info', variant === 'success' && 'text-success', variant === 'warning' && 'text-warning', isError && 'text-error')} aria-hidden="true" />
      <div className="min-w-0 space-y-1 text-sm">
        {title ? <p className="m-0 font-semibold text-text-primary">{title}</p> : null}
        <div className="text-text-secondary">{children}</div>
      </div>
    </div>
  );
}