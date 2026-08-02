import { useId, type ReactNode } from 'react';

type ProfileSectionProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function ProfileSection({ eyebrow, title, description, actions, children, className }: ProfileSectionProps) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
          <h2 id={titleId} className="text-lg font-semibold text-text-primary">{title}</h2>
          {description ? <p className="max-w-2xl text-sm text-text-secondary">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
