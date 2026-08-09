import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export type CardVariant = 'default' | 'interactive' | 'selected' | 'playing' | 'queued' | 'disabled';

export function Card({ className, variant = 'default', ...props }: HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  return (
    <div
      className={clsx(
        'card',
        {
          'surface-interactive': variant === 'interactive',
          'surface-selected': variant === 'selected' || variant === 'playing',
          'border-accent/40': variant === 'queued',
          'pointer-events-none opacity-60': variant === 'disabled',
        },
        className,
      )}
      role={props.role ?? 'group'}
      {...props}
    />
  );
}