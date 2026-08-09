import clsx from 'clsx';
import { CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';

export function SuccessState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('flex items-start gap-3 rounded-radius-12 border border-success/30 bg-success/5 p-4', className)} role="status">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
      <div className="min-w-0 space-y-1">
        <p className="m-0 text-sm font-semibold text-text-primary">{title}</p>
        {description ? <p className="m-0 text-sm text-text-secondary">{description}</p> : null}
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
    </div>
  );
}