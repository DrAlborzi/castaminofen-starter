import clsx from 'clsx';
import { cloneElement, type ReactElement, type ReactNode } from 'react';

export function Field({
  id,
  label,
  description,
  error,
  children,
  className,
}: {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={clsx('form-field', className)}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {cloneElement(children as ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }>, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })}
      {description ? <p id={descriptionId} className="form-message">{description}</p> : null}
      {error ? <p id={errorId} className="error-text" role="alert">{error}</p> : null}
    </div>
  );
}