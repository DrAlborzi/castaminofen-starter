'use client';

import { LoaderCircle } from 'lucide-react';
import { ContentArtwork } from '@/components/design-system/media/content-artwork';
import { Tag } from '@/components/design-system/common/tag';
import { usePlayerState } from '../hooks/usePlayerState';
import { getArtworkFallback, getPlaybackErrorMessage, getPlaybackStateLabel, getQueueSummary } from '../utils/playerPresentation';

export function PlayerInfo() {
  const { currentItem, playbackStatus, error, queue, currentIndex, repeatMode, shuffleEnabled } = usePlayerState();

  const title = currentItem?.title ?? 'No active playback';
  const fallbackSubtitle = playbackStatus === 'loading'
    ? 'در حال آماده‌سازی فایل صوتی…'
    : playbackStatus === 'idle'
      ? 'برای شروع، اپیزودی را انتخاب کنید.'
      : 'پخش در دسترس است';
  const subtitle = currentItem?.subtitle ?? fallbackSubtitle;
  const isBusy = playbackStatus === 'loading';
  const statusLabel = getPlaybackStateLabel(playbackStatus);
  const queueHint = queue.length > 0 ? getQueueSummary({ queueLength: queue.length, currentIndex, repeatMode, shuffleEnabled }) : null;
  const resolvedErrorMessage = getPlaybackErrorMessage(error, currentItem);

  return (
    <div className="flex min-w-0 items-start gap-3 rounded-[1.25rem] border border-border/70 bg-surface-card/70 p-3 shadow-sm">
      <div className="relative h-14 w-14 shrink-0">
        <ContentArtwork src={currentItem?.artworkUrl} alt={title} fallback={getArtworkFallback(currentItem)} className="h-14 w-14 rounded-[1rem]" />
        {isBusy ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-[1rem] bg-surface-card/70">
            <LoaderCircle className="h-5 w-5 animate-spin text-accent" aria-hidden="true" />
          </div>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-text-primary">{title}</p>
          <Tag className="border-accent/20 bg-accent/10 text-accent">{statusLabel}</Tag>
        </div>
        <p className="mt-1 truncate text-xs text-text-secondary" aria-live="polite">{subtitle}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
          {queueHint ? <Tag className="bg-surface-secondary text-text-secondary">{queueHint}</Tag> : null}
          {currentItem?.podcastId ? <Tag className="bg-surface-secondary text-text-secondary">پادکست</Tag> : null}
        </div>
        {resolvedErrorMessage ? <p className="mt-2 truncate text-xs text-accent" role="alert">{resolvedErrorMessage}</p> : null}
      </div>
    </div>
  );
}
