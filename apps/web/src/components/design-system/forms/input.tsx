import clsx from 'clsx';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={clsx('input shadow-sm', className)} {...props} />,
);

Input.displayName = 'Input';