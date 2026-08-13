import clsx from 'clsx';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export const Switch = forwardRef<HTMLButtonElement, DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void }>(
  ({ className, checked, defaultChecked, onCheckedChange, disabled, onClick, ...props }, ref) => {
    const isControlled = checked !== undefined;
    const resolvedChecked = isControlled ? checked : defaultChecked ?? false;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={resolvedChecked}
        aria-disabled={disabled || undefined}
        data-state={resolvedChecked ? 'checked' : 'unchecked'}
        disabled={disabled}
        className={clsx(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary',
          resolvedChecked ? 'border-accent bg-accent/20' : 'border-border bg-surface-secondary',
          disabled && 'pointer-events-none opacity-60',
          className,
        )}
        onClick={(event) => {
          if (disabled) return;
          if (!isControlled) {
            onCheckedChange?.(!resolvedChecked);
          } else {
            onCheckedChange?.(!resolvedChecked);
          }
          onClick?.(event);
        }}
        {...props}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
            resolvedChecked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    );
  },
);

Switch.displayName = 'Switch';
