import clsx from 'clsx';
import type { ReactNode } from 'react';
import { MediaMetadata } from './media-metadata';

function resolveTextContent(value: ReactNode | undefined, fallback: string) {
  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized || fallback;
  }

  return value ?? fallback;
}

export function MediaCard({
  title,
  subtitle,
  meta,
  artwork,
  actions,
  playback,
  children,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  artwork?: ReactNode;
  actions?: ReactNode;
  playback?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const resolvedTitle = resolveTextContent(title, 'بدون عنوان');
  const resolvedSubtitle = resolveTextContent(subtitle, 'توضیحی در دسترس نیست');

  return (
    <article
      className={clsx(
        'rounded-[1.35rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_14px_40px_rgba(11,14,28,0.16)]',
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          {artwork ? <div className="w-20 shrink-0">{artwork}</div> : null}
          <MediaMetadata title={resolvedTitle} subtitle={subtitle !== undefined ? resolvedSubtitle : undefined} className="flex-1">
            {meta}
          </MediaMetadata>
          {playback ? <div className="shrink-0">{playback}</div> : null}
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
        {children ? <div className="space-y-2">{children}</div> : null}
      </div>
    </article>
  );
}
