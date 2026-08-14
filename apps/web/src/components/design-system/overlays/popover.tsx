import clsx from 'clsx';
import { useState, type ReactNode } from 'react';

export function Popover({
  trigger,
  content,
  open,
  onOpenChange,
  className,
}: {
  trigger: ReactNode;
  content: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => {
          const next = !isOpen;
          if (open === undefined) {
            setInternalOpen(next);
          }
          onOpenChange?.(next);
        }}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      {isOpen ? <div className={clsx('absolute start-0 top-full z-20 mt-2 rounded-[1rem] border border-border bg-surface-card p-3 shadow-soft', className)}>{content}</div> : null}
    </div>
  );
}
