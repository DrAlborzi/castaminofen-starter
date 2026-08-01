'use client';

export function LibrarySkeleton() {
  return (
    <div className="space-y-4" role="status" aria-live="polite">
      <div className="h-32 animate-pulse rounded-[2rem] border border-border/70 bg-surface-secondary/80" />
      <div className="grid gap-3 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-36 animate-pulse rounded-[1.5rem] border border-border/70 bg-surface-primary/90" />
        ))}
      </div>
      <div className="h-32 animate-pulse rounded-[1.5rem] border border-border/70 bg-surface-secondary/80" />
    </div>
  );
}
