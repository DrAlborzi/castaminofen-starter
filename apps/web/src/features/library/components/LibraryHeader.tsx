'use client';

import { Sparkles } from 'lucide-react';

type LibraryHeaderProps = {
  eyebrow?: string;
  title?: string;
  summary?: string;
  description?: string;
};

export function LibraryHeader({
  eyebrow = 'Premium personal space',
  title = 'Your Library',
  summary = '24 saved episodes',
  description = 'Continue your journey with a calm, curated view of everything you love.',
}: LibraryHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-surface-secondary via-surface-card to-surface-primary p-4 shadow-soft sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {eyebrow}
          </div>
          <div>
            <h1 className="text-heading">{title}</h1>
            <p className="mt-2 text-sm font-medium text-text-secondary">{summary}</p>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-surface-primary/80 px-4 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent/10 text-sm font-semibold text-accent">
            C
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Castaminofen</p>
            <p className="text-sm text-text-secondary">Your personal media home</p>
          </div>
        </div>
      </div>
    </section>
  );
}
