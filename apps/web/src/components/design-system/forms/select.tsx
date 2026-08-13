import clsx from 'clsx';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export const Select = forwardRef<HTMLSelectElement, DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={clsx('select shadow-sm', className)} {...props}>
      {children}
    </select>
  ),
);

Select.displayName = 'Select';
