import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export function IconButton({
  children,
  className,
  label,
  loading = false,
  disabled,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children?: ReactNode;
  label: string;
  loading?: boolean;
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      type="button"
      aria-label={label}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={clsx('icon-button', className)}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : children}
    </button>
  );
}
