import clsx from 'clsx';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export const Checkbox = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} type="checkbox" className={clsx('h-4 w-4 rounded border-border bg-surface-card text-accent shadow-sm', className)} {...props} />,
);

Checkbox.displayName = 'Checkbox';
