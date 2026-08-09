import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

export function LoadingState({
  message = 'در حال بارگذاری…',
  className,
  title,
  variant = 'page',
  announce = true,
  skeleton = false,
}: {
  message?: string;
  className?: string;
  title?: string;
  variant?: 'page' | 'section' | 'inline' | 'action' | 'media';
  announce?: boolean;
  skeleton?: boolean;
}) {
  return (
    <div
      className={clsx(
        'loading-state rounded-[1.25rem] border border-border/70 bg-surface-secondary/70 px-4 py-3 shadow-soft',
        `loading-state--${variant}`,
        skeleton && 'animate-pulse',
        className,
      )}
      role={announce ? 'status' : undefined}
      aria-live={announce ? 'polite' : undefined}
      aria-busy="true"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-[0_8px_20px_rgba(119,108,254,0.16)]">
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          {title ? <p className="m-0 text-sm font-semibold text-text-primary">{title}</p> : null}
          <p className="m-0 text-sm text-text-secondary">{message}</p>
        </div>
      </div>
    </div>
  );
}
