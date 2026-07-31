import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';

export function ContentArtwork({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('relative overflow-hidden rounded-[1.35rem] border border-border/80 bg-surface-secondary shadow-sm', className)}>
      {src ? <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized /> : <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-accent">{fallback ?? alt.charAt(0).toUpperCase()}</div>}
    </div>
  );
}
