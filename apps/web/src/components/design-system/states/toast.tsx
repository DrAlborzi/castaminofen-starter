import clsx from 'clsx';
import { CheckCircle2, X } from 'lucide-react';
import type { ReactNode } from 'react';

export function Toast({
  children,
  onDismiss,
  className,
}: {
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <div className={clsx('flex max-w-sm items-start gap-3 rounded-radius-12 border border-border-strong bg-surface-elevated p-4 shadow-md', className)} role="status" aria-live="polite">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
      <p className="m-0 min-w-0 flex-1 text-sm text-text-primary">{children}</p>
      {onDismiss ? (
        <button type="button" onClick={onDismiss} className="icon-button h-8 w-8 shrink-0" aria-label="بستن پیام">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}