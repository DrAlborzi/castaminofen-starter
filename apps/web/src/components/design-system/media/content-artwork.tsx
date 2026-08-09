import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';

function normalizeArtworkSrc(value?: string) {
  return typeof value === 'string' ? value.trim() : '';
}

function resolveArtworkFallback(fallback: ReactNode | undefined, alt: string) {
  if (typeof fallback === 'string') {
    const normalized = fallback.trim();
    if (normalized) {
      return normalized;
    }
  }

  const normalizedAlt = alt.trim();
  if (normalizedAlt) {
    return normalizedAlt.charAt(0).toUpperCase();
  }

  return 'EP';
}

export function ContentArtwork({
  src,
  alt,
  fallback,
  ratio,
  className,
}: {
  src?: string;
  alt: string;
  fallback?: ReactNode;
  ratio?: 'square' | 'portrait' | 'landscape';
  className?: string;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const normalizedSrc = normalizeArtworkSrc(src);

  useEffect(() => {
    setHasImageError(false);
  }, [normalizedSrc]);

  const resolvedFallback = resolveArtworkFallback(fallback, alt);

  return (
    <div className={clsx('relative overflow-hidden rounded-[1.35rem] border border-border/80 bg-surface-secondary shadow-sm', {
      'aspect-square': ratio === 'square',
      'aspect-[3/4]': ratio === 'portrait',
      'aspect-[4/3]': ratio === 'landscape',
    }, className)}>
      {!normalizedSrc || hasImageError ? (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-accent">{resolvedFallback}</div>
      ) : (
        <Image src={normalizedSrc} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized onError={() => setHasImageError(true)} />
      )}
    </div>
  );
}
