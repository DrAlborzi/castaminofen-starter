import clsx from 'clsx';
import { forwardRef } from 'react';
import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export const Textarea = forwardRef<HTMLTextAreaElement, DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={clsx('textarea shadow-sm', className)} {...props} />,
);

Textarea.displayName = 'Textarea';
