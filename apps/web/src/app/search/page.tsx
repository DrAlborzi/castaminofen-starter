"use client";

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import SearchPage from '@/features/search';

function SearchPageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="h-32 animate-pulse rounded-[1.5rem] border border-border/70 bg-surface-secondary/70" />
      <div className="h-24 animate-pulse rounded-[1.25rem] border border-border/70 bg-surface-secondary/70" />
      <div className="h-24 animate-pulse rounded-[1.25rem] border border-border/70 bg-surface-secondary/70" />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPage />
    </Suspense>
  );
}
