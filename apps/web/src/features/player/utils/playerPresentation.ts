import type { PlayableItem, PlayerPlaybackStatus, PlayerRepeatMode } from '../types';

export interface QueueDisplayItem extends PlayableItem {
  position: number;
}

export interface QueueDisplayState {
  currentItem: QueueDisplayItem | null;
  upNext: QueueDisplayItem[];
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '00:00';
  }

  const safeSeconds = Math.floor(seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function getPlaybackStateLabel(status: PlayerPlaybackStatus) {
  switch (status) {
    case 'loading':
      return 'در حال آماده‌سازی پخش';
    case 'playing':
      return 'در حال پخش';
    case 'paused':
      return 'متوقف';
    case 'idle':
    default:
      return 'آماده';
  }
}

export function getQueueSummary(options: {
  queueLength: number;
  currentIndex: number;
  repeatMode: PlayerRepeatMode;
  shuffleEnabled: boolean;
}) {
  const { queueLength, currentIndex, repeatMode, shuffleEnabled } = options;

  if (queueLength <= 1) {
    if (repeatMode === 'one') {
      return 'تکرار یک مورد فعال است';
    }
    if (repeatMode === 'queue') {
      return 'تکرار صف فعال است';
    }
    if (shuffleEnabled) {
      return 'تصادفی فعال است';
    }
    return 'فقط یک مورد در صف';
  }

  const remainingItems = Math.max(0, queueLength - currentIndex - 1);
  const parts: string[] = [];

  if (remainingItems > 0) {
    parts.push(`${remainingItems} مورد دیگر در صف`);
  } else {
    parts.push('آخرین مورد در صف');
  }

  if (repeatMode === 'one') {
    parts.push('تکرار یک مورد');
  } else if (repeatMode === 'queue') {
    parts.push('تکرار صف');
  }

  if (shuffleEnabled) {
    parts.push('تصادفی');
  }

  return parts.join(' و ');
}

export function getArtworkFallback(item: Pick<PlayableItem, 'title' | 'podcastId' | 'subtitle'> | null) {
  if (!item) {
    return 'EP';
  }

  const initials = [item.title, item.subtitle]
    .filter(Boolean)
    .map((value) => value?.trim().charAt(0)?.toUpperCase())
    .filter(Boolean);

  if (initials.length >= 2) {
    return `${initials[0]}${initials[1]}`;
  }

  return initials[0] ?? 'EP';
}

export function getPlaybackErrorMessage(error: string | null | undefined, item?: Pick<PlayableItem, 'audioUrl'> | null) {
  if (!error) {
    return null;
  }

  const normalizedError = error.trim().toLowerCase();

  if (normalizedError.includes('audio source is unavailable') || normalizedError.includes('unavailable')) {
    return 'در این لحظه فایل صوتی در دسترس نیست. برای ادامه، یک اپیزود دیگر را انتخاب کنید.';
  }

  if (normalizedError.includes('unable to play') || normalizedError.includes('play failed')) {
    return 'پخش در این لحظه انجام نشد. دوباره تلاش کنید یا اپیزود دیگری را انتخاب کنید.';
  }

  if (item?.audioUrl && normalizedError.includes('no playable item')) {
    return 'پخش در دسترس نیست. دوباره تلاش کنید.';
  }

  return error;
}

export function getQueueDisplayItems(queue: PlayableItem[], currentIndex: number): QueueDisplayState {
  if (!queue.length) {
    return { currentItem: null, upNext: [] };
  }

  const safeIndex = Math.max(0, Math.min(currentIndex, queue.length - 1));
  const currentItem = queue[safeIndex] ? { ...queue[safeIndex], position: safeIndex + 1 } : null;
  const upNext = queue
    .slice(safeIndex + 1)
    .map((item, index) => ({ ...item, position: safeIndex + index + 2 }));

  return { currentItem, upNext };
}
