import clsx from 'clsx';

export function ProgressIndicator({ progress, className, label = 'پیشرفت' }: { progress?: number; className?: string; label?: string }) {
  const hasProgress = typeof progress === 'number' && Number.isFinite(progress);
  const safeProgress = hasProgress ? Math.min(Math.max(progress, 0), 100) : undefined;

  return (
    <div
      className={clsx('h-2 w-full overflow-hidden rounded-full bg-surface-secondary/80', className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeProgress}
      aria-valuetext={hasProgress ? `${safeProgress}%` : 'پیشرفت نامشخص'}
    >
      {hasProgress ? <div className="h-full rounded-full bg-accent transition-all duration-200 motion-reduce:transition-none" style={{ width: `${safeProgress}%` }} /> : null}
      {!hasProgress ? <div className="h-full w-1/3 rounded-full bg-accent/70 motion-safe:animate-pulse" aria-hidden="true" /> : null}
    </div>
  );
}
