import clsx from 'clsx';
import { useEffect, useId, useRef, type ReactNode } from 'react';

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = 'right',
  className,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange?.(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-surface-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange?.(false);
        }
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={clsx(
          'absolute h-full w-full max-w-md border border-border bg-surface-primary p-4 shadow-soft sm:p-5 focus:outline-none',
          side === 'left' && 'left-0 top-0',
          side === 'right' && 'right-0 top-0',
          side === 'top' && 'left-0 top-0 w-full max-w-none h-auto max-h-[80vh]',
          side === 'bottom' && 'bottom-0 left-0 w-full max-w-none h-auto max-h-[80vh]',
          side === 'left' || side === 'right' ? 'translate-x-0' : '',
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            {title ? <h2 id={titleId} className="text-subheading">{title}</h2> : null}
            {description ? <p id={descriptionId} className="mt-1 text-caption">{description}</p> : null}
          </div>
          <button
            type="button"
            aria-label="Close sheet"
            onClick={() => onOpenChange?.(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-surface-secondary text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ×
          </button>
        </div>
        <div className="mt-4 space-y-4">{children}</div>
        {footer ? <div className="mt-5 flex justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}
