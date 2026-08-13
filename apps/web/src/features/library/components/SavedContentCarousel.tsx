'use client';

type CarouselItem = {
  title: string;
  subtitle: string;
  tag: string;
  accent: string;
};

type SavedContentCarouselProps = {
  items?: CarouselItem[];
};

const defaultItems: CarouselItem[] = [
  { title: 'Recently Saved', subtitle: 'Fresh picks from your personal queue', tag: 'New', accent: 'from-accent/20 to-accent/10' },
  { title: 'Favorites', subtitle: 'The stories and voices you return to', tag: 'Loved', accent: 'from-success/20 to-success/10' },
  { title: 'Playlists', subtitle: 'Curated for calm, focus, and curiosity', tag: 'Curated', accent: 'from-accent-purple/20 to-accent-purple/10' },
  { title: 'Offline-ready', subtitle: 'Future-ready collection space', tag: 'Coming soon', accent: 'from-surface-tertiary to-surface-secondary' },
];

export function SavedContentCarousel({ items = defaultItems }: SavedContentCarouselProps) {
  return (
    <section className="space-y-3" aria-labelledby="saved-content-heading">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Personal collections</p>
          <h2 id="saved-content-heading" className="text-subheading">A softer way to revisit what matters</h2>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.map((item) => (
          <article key={item.title} className="min-w-[13rem] rounded-[1.5rem] border border-border/70 bg-surface-primary/90 p-4 shadow-sm">
            <div className={`h-20 rounded-[1.25rem] bg-gradient-to-br ${item.accent}`} />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{item.tag}</p>
            <h3 className="mt-2 text-base font-semibold text-text-primary">{item.title}</h3>
            <p className="mt-1 text-sm text-text-secondary">{item.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
