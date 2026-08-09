import clsx from 'clsx';

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function Duration({ value, className }: { value?: number | string | null; className?: string }) {
  const displayValue = typeof value === 'number' && Number.isFinite(value) ? formatDuration(value) : typeof value === 'string' && value.trim() ? value.trim() : 'مدت نامشخص';

  return (
    <span className={clsx('whitespace-nowrap text-text-secondary', className)} dir="ltr" aria-label={`مدت ${displayValue}`}>
      {displayValue}
    </span>
  );
}