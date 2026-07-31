import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

function normalizeImageSrc(value?: string) {
  return typeof value === 'string' ? value.trim() : '';
}

function resolveAvatarFallback(fallback: ReactNode | undefined, alt: string) {
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

  return 'U';
}

export function Avatar({
  className,
  alt,
  fallback,
  size = 'md',
  src,
}: {
  alt: string;
  className?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  src?: string;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const sizeClassName = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-14 w-14 text-base',
  }[size];
  const normalizedSrc = normalizeImageSrc(src);

  useEffect(() => {
    setHasImageError(false);
  }, [normalizedSrc]);

  if (!normalizedSrc || hasImageError) {
    return (
      <div className={clsx('inline-flex items-center justify-center rounded-full border border-border bg-surface-secondary font-semibold text-text-primary shadow-sm', sizeClassName, className)}>
        {resolveAvatarFallback(fallback, alt)}
      </div>
    );
  }

  return (
    <div className={clsx('relative inline-flex overflow-hidden rounded-full border border-border bg-surface-secondary shadow-sm', sizeClassName, className)}>
      <Image src={normalizedSrc} alt={alt} fill sizes="96px" className="object-cover" unoptimized onError={() => setHasImageError(true)} />
    </div>
  );
}
