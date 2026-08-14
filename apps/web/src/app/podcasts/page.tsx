'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { usePodcasts } from '@/features/podcasts/hooks/usePodcasts';
import { Button, Card, EmptyState, ErrorState, Field, Input, LoadingState, PageContainer } from '@/components/design-system';
import { PodcastCard } from '@/features/podcasts/PodcastCard';
import type { Podcast } from '@/lib/types';

export default function PodcastsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const query = usePodcasts({ page, limit: 12, search: search || undefined, sort: 'newest' });

  const totalPages = query.data?.pagination.totalPages ?? 1;
  const searchText = useMemo(() => search.trim(), [search]);

  if (query.isLoading) {
    return <LoadingState message="Loading podcasts..." />;
  }

  if (query.isError) {
    return <ErrorState message={query.error?.message ?? 'Unable to load podcasts'} />;
  }

  return (
    <main>
      <PageContainer>
        <Card className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
              <h1 className="text-heading">Podcasts</h1>
              <p className="text-body m-0">Browse the latest podcasts from the backend library.</p>
          </div>
          <Link href="/podcasts/new" className="button button-primary min-h-[2.75rem] justify-center">
            New Podcast
          </Link>
          </div>

          <Field id="search" label="Search podcasts">
            <Input
              id="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by title or description"
            />
          </Field>

          {query.data?.data.length ? (
            <div className="field-row">
              {query.data.data.map((podcast: Podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          ) : (
            <EmptyState
              category="no-results"
              title="No podcasts found"
              description={`No podcasts found for "${searchText || 'your search'}".`}
            />
          )}

          {totalPages > 1 ? (
            <div className="toolbar mt-6 justify-center">
              <Button
                variant="secondary"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span aria-label={`Page ${page} of ${totalPages}`}>{page} / {totalPages}</span>
              <Button
                variant="secondary"
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          ) : null}
        </Card>
      </PageContainer>
    </main>
  );
}
