import clsx from 'clsx';
import type { ReactNode } from 'react';
import { MediaMetadata } from './media-metadata';

export function MediaRow({ title, subtitle, artwork, playback, actions, className }: { title: ReactNode; subtitle?: ReactNode; artwork?: ReactNode; playback?: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex min-w-0 items-center gap-3 rounded-[1.1rem] border border-border/70 bg-surface-secondary/70 px-3 py-3', className)}>
      {artwork ? <div className="w-12 shrink-0">{artwork}</div> : null}
      <MediaMetadata title={title} subtitle={subtitle} className="flex-1" />
      {playback ? <div className="shrink-0">{playback}</div> : null}
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
