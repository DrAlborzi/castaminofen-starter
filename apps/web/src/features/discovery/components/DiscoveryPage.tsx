'use client';

import Link from 'next/link';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useSession } from '@/lib/auth';
import { useContinueListening } from '@/features/library/hooks/useContinueListening';
import { usePodcasts } from '@/features/podcasts/hooks/usePodcasts';
import { useQuery } from '@tanstack/react-query';
import { getEpisodes } from '@/lib/episodes';
import { useAuthStore } from '@/stores/authStore';
import { buildDiscoverySections } from '../utils/discovery-content';
import { DiscoverySection } from './DiscoverySection';
import { ContinueListeningSection } from '@/features/library/components/ContinueListeningSection';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { Button } from '@/components/design-system/common/button';

export function DiscoveryPage() {
  const { data: sessionData } = useSession();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const podcastsQuery = usePodcasts({ page: 1, limit: 6, sort: 'newest' });
  const episodesQuery = useQuery({
    queryKey: ['discovery', 'episodes'],
    queryFn: () => getEpisodes({ search: '' }),
    staleTime: 1000 * 30,
  });
  const continueListeningQuery = useContinueListening();

  const sections = useMemo(() => {
    return buildDiscoverySections({
      podcasts: podcastsQuery.data?.data ?? [],
      episodes: episodesQuery.data ?? [],
      continueListeningCount: continueListeningQuery.data?.length ?? 0,
      isAuthenticated: Boolean(sessionData || isAuthenticated),
    });
  }, [continueListeningQuery.data?.length, episodesQuery.data, isAuthenticated, podcastsQuery.data?.data, sessionData]);

  useEffect(() => {
    if (podcastsQuery.isError || episodesQuery.isError || continueListeningQuery.isError) {
      return;
    }
  }, [continueListeningQuery.isError, episodesQuery.isError, podcastsQuery.isError]);

  if (podcastsQuery.isLoading || episodesQuery.isLoading) {
    return (
      <main className="page-container" aria-busy="true">
        <section className="rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="m-0 text-sm font-medium text-accent">Discovery</p>
              <h1 className="text-heading">Discover your next favorite show</h1>
              <p className="m-0 text-sm text-text-secondary">Building a calm, editorial experience from the content already available.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-11 w-28 animate-pulse rounded-[1rem] bg-surface-primary" />
              <div className="h-11 w-24 animate-pulse rounded-[1rem] bg-surface-primary" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="h-64 animate-pulse rounded-[1.75rem] bg-surface-primary" />
            <div className="space-y-3">
              <div className="h-24 animate-pulse rounded-[1.5rem] bg-surface-primary" />
              <div className="h-24 animate-pulse rounded-[1.5rem] bg-surface-primary" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container" aria-labelledby="discovery-heading">
      <PageContainer>
        <section className="rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <Tag className="w-fit border-accent/20 bg-accent/10 text-accent">
                <Compass className="h-4 w-4" aria-hidden="true" />
                Discovery
              </Tag>
              <h1 id="discovery-heading" className="text-heading">از همینجا، مسیر بعدیِ شنیداری‌ات را انتخاب کن</h1>
              <p className="m-0 text-body">Castaminofen شما را از «جستجو» به «ادامه‌ی گوش دادن، حفظ لحظه و بازگشت با هدف» می‌برد؛ بدون شلوغی و با حس پیشرفت.</p>
              <p className="text-sm leading-7 text-text-secondary">اگر امروز تازه شروع کردی، این صفحه راه‌نمایی برای ادامه‌ی آرام و معنادار است. اگر بازگشته‌ای، از لحظه‌ای که قطع کردی دوباره ادامه بده و به مسیر خودت برگرد.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/podcasts" className="inline-flex">
                <Button variant="secondary" size="md" className="min-h-[2.75rem]">
                  Browse podcasts
                </Button>
              </Link>
              <Link href="/library" className="inline-flex">
                <Button variant="primary" size="md" className="min-h-[2.75rem] gap-2">
                  Open library
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/12 via-surface-secondary to-surface-card/90 p-5 shadow-soft sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-3">
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Continue Journey</p>
                  <h2 className="text-xl font-semibold text-text-primary">هر بازگشت، یک قدم روشن‌تر به سمت تجربه‌ای شخصی‌تر و ماندگارتر دارد.</h2>
                  <p className="m-0 max-w-xl text-sm text-text-secondary">از ادامه‌ی پخش و لحظه‌های نیمه‌کامل گرفته تا پیشنهادهای تازه، این صفحه به شما کمک می‌کند «جایی که متوقف شدی» را بدون سردرگمی از سر بگیری و به آن معنا ببخشی.</p>
                </div>
                <Tag className="w-fit border-border bg-surface-secondary/80 text-text-secondary">
                  <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
                  Guidance for returning
                </Tag>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <MediaCard title="مسیرهای پیشنهادی" subtitle="هر بلوک یک «ادامه‌ی قابل فهم» به شما می‌دهد؛ نه صرفاً یک لیست پراکنده." meta="Journey" />
              <MediaCard title="ادامه‌ی گوش دادن" subtitle="بازگشت به همان تجربه‌ای که در Library شروع شده، برای حفظ حس تداوم و هویت شخصی." meta="Resume" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {continueListeningQuery.data?.length ? (
              <ContinueListeningSection items={continueListeningQuery.data} />
            ) : null}
            {sections.map((section) => (
              <DiscoverySection key={section.id} section={section} />
            ))}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
