import clsx from 'clsx';
import { useId, useState, type ReactNode } from 'react';

export function Tooltip({ trigger, content, className }: { trigger: ReactNode; content: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <div className="relative inline-flex">
      <span
        tabIndex={0}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
          }
        }}
        className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {trigger}
      </span>
      {open ? (
        <div id={tooltipId} role="tooltip" className={clsx('absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 rounded-full border border-border bg-surface-card px-2.5 py-1 text-xs text-text-primary shadow-soft', className)}>
          {content}
        </div>
      ) : null}
    </div>
  );
}
