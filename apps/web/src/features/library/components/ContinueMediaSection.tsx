'use client';

import { Play, Sparkles } from 'lucide-react';

type ContinueMediaItem = {
  title: string;
  creator: string;
  type: string;
  progress: number;
  remaining: string;
  accent: string;
};

type ContinueMediaSectionProps = {
  items?: ContinueMediaItem[];
};

const defaultItems: ContinueMediaItem[] = [
  {
    title: 'The Ritual of Deep Work',
    creator: 'Mina Shah',
    type: 'Podcast',
    progress: 62,
    remaining: '18 min left',
    accent: 'from-accent/30 to-accent/10',
  },
  {
    title: 'Night Film Notes',
    creator: 'Aria Lane',
    type: 'Audiobook',
    progress: 41,
    remaining: '7 chapters left',
    accent: 'from-success/30 to-success/10',
  },
  {
    title: 'Studio Sessions',
    creator: 'Castaminofen',
    type: 'Video',
    progress: 75,
    remaining: '4 min left',
    accent: 'from-[#8b5cf6]/30 to-[#8b5cf6]/10',
  },
];

export function ContinueMediaSection({ items = defaultItems }: ContinueMediaSectionProps) {
  return (
    <section className="space-y-3" aria-labelledby="continue-media-heading">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Continue your journey</p>
          <h2 id="continue-media-heading" className="text-subheading">Resume the moments that matter</h2>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-surface-primary/80 px-3 py-1.5 text-sm text-text-secondary sm:inline-flex">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Personalized for you
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface-primary/90 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-soft">
            <div className={`h-28 bg-gradient-to-br ${item.accent}`} />
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{item.type}</p>
                  <h3 className="mt-1 text-base font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{item.creator}</p>
                </div>
                <button type="button" className="rounded-full border border-border/70 bg-surface-secondary p-2 text-accent transition-colors hover:bg-accent/10" aria-label={`Play ${item.title}`}>
                  <Play className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="h-2 rounded-full bg-surface-secondary">
                  <div className="h-2 rounded-full bg-gradient-to-r from-accent to-success" style={{ width: `${item.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{item.progress}% complete</span>
                  <span>{item.remaining}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
