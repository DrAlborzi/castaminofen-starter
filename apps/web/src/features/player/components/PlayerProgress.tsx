'use client';

import { useEffect, useState } from 'react';
import { ProgressIndicator } from '@/components/design-system';
import { usePlayerRuntime } from '../hooks/usePlayerRuntime';
import { usePlayerState } from '../hooks/usePlayerState';
import { formatTime } from '../utils/playerPresentation';

export function PlayerProgress() {
  const playerRuntime = usePlayerRuntime();
  const { currentPosition, duration, currentItem, playbackStatus } = usePlayerState();
  const [previewPosition, setPreviewPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const hasKnownDuration = Number.isFinite(duration) && duration > 0;
  const safeDuration = hasKnownDuration ? duration : 0;
  const safePosition = Number.isFinite(currentPosition) && currentPosition >= 0
    ? hasKnownDuration ? Math.min(currentPosition, safeDuration) : currentPosition
    : 0;
  const disabled = !currentItem?.audioUrl || playbackStatus === 'loading' || !hasKnownDuration;
  const displayedPosition = isSeeking ? previewPosition : safePosition;
  const progressRatio = safeDuration > 0 ? Math.min(1, Math.max(0, displayedPosition / safeDuration)) : 0;

  useEffect(() => {
    if (!isSeeking) {
      setPreviewPosition(safePosition);
    }
  }, [isSeeking, safePosition]);

  const commitPosition = (nextPosition: number) => {
    const clampedPosition = Math.min(safeDuration, Math.max(0, nextPosition));
    playerRuntime.setCurrentTime(clampedPosition);
    setPreviewPosition(clampedPosition);
  };

  const handleSeekKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    const step = event.shiftKey ? 15 : 5;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      commitPosition(displayedPosition + step);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      commitPosition(displayedPosition - step);
    }
  };

  return (
    <div className="flex flex-1 items-center gap-3 rounded-full bg-surface-secondary/70 px-3 py-2">
      <span className="min-w-[2.75rem] text-end text-[11px] font-medium text-text-secondary">{formatTime(displayedPosition)}</span>
      <div className="relative flex-1">
        <ProgressIndicator
          progress={hasKnownDuration ? progressRatio * 100 : undefined}
          label="Playback progress"
          className="bg-surface-primary/80"
        />
        {hasKnownDuration ? <input
            type="range"
            min={0}
            max={safeDuration}
            step={1}
            value={displayedPosition}
            onMouseDown={() => setIsSeeking(true)}
            onTouchStart={() => setIsSeeking(true)}
            onChange={(event) => {
              const nextPosition = Number(event.target.value);
              setPreviewPosition(nextPosition);
            }}
            onPointerUp={() => {
              setIsSeeking(false);
              commitPosition(displayedPosition);
            }}
            onBlur={() => {
              setIsSeeking(false);
              commitPosition(displayedPosition);
            }}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
            disabled={disabled}
            aria-label="Playback progress"
            aria-valuemin={0}
            aria-valuemax={safeDuration}
            aria-valuenow={Math.round(displayedPosition)}
            aria-valuetext={`${formatTime(displayedPosition)} of ${formatTime(safeDuration)}`}
            onKeyDown={handleSeekKeyDown}
          /> : null}
      </div>
      <span className="min-w-[2.75rem] text-start text-[11px] font-medium text-text-secondary">{hasKnownDuration ? formatTime(safeDuration) : 'مدت نامشخص'}</span>
    </div>
  );
}
