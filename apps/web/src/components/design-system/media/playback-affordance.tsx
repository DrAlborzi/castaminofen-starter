import clsx from 'clsx';
import { Pause, Play } from 'lucide-react';

export function PlaybackAffordance({
  isPlaying = false,
  onClick,
  label,
  className,
}: {
  isPlaying?: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
}) {
  const accessibleLabel = label ?? (isPlaying ? 'توقف' : 'پخش');

  return (
    <button
      type="button"
      className={clsx('icon-button', className)}
      aria-label={accessibleLabel}
      aria-pressed={isPlaying}
      onClick={onClick}
    >
      {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}