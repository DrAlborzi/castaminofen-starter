"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Headphones, Search } from 'lucide-react';
import { usePodcasts } from '@/features/podcasts/hooks/usePodcasts';
import { ContentArtwork } from '@/components/design-system/media/content-artwork';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Button } from '@/components/design-system/common/button';

export function WelcomeScreen() {
  const podcastsQuery = usePodcasts({ page: 1, limit: 3, sort: 'newest' });
  const podcasts = (podcastsQuery.data?.data ?? []).filter((podcast) => podcast.id && podcast.title).slice(0, 3);

  return (
    <main className="w-full bg-surface-canvas">
      <section aria-labelledby="welcome-heading" className="relative flex min-h-[calc(100vh-2rem)] w-full items-center overflow-hidden px-4 py-8 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-accent/10 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-app items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="order-2 flex flex-col gap-6 text-start lg:order-1">
            <div className="flex items-center gap-3 text-accent">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-radius-12 border border-accent/20 bg-accent/10">
                <Headphones className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold tracking-wide">CASTAMINOFEN</span>
            </div>

            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-medium text-accent">برای شروع، کشف صداهای تازه</p>
              <h1 id="welcome-heading" className="text-display text-text-primary sm:text-4xl lg:text-5xl">
                شروعی ساده برای کشف و شنیدن پادکست‌های مورد علاقه‌ات
              </h1>
              <p className="max-w-xl text-body-lg text-text-secondary sm:text-lg">
                پادکست‌هایی را پیدا کن که با حال‌وهوایت همراه می‌شوند و شنیدن را با تمرکز و آرامش شروع کن.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
              <Link href="/login" className="button button-primary min-h-12 justify-center px-6 text-base motion-reduce:transition-none sm:w-auto">
                شروع کردن
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/podcasts" className="button button-secondary min-h-12 justify-center text-sm font-medium motion-reduce:transition-none sm:w-auto" aria-label="کشف پادکست‌ها">
                کشف پادکست‌ها
              </Link>
            </div>

            <div className="flex max-w-lg items-center gap-3 border-t border-border/70 pt-5 text-start">
              <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-body-sm text-text-secondary">اینجا برای کشف و شنیدن پادکست‌هاست؛ بدون شلوغی و حواس‌پرتی.</p>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative flex aspect-square w-full max-w-[18rem] items-center justify-center sm:max-w-[24rem] lg:max-w-[28rem]">
              <div className="absolute inset-0 rounded-radius-circle border border-accent/10 bg-surface-secondary/60 shadow-xl" aria-hidden="true" />
              <div className="absolute inset-[10%] rounded-radius-circle border border-accent/15 bg-surface-card/70" aria-hidden="true" />
              <div className="relative flex h-[58%] w-[58%] items-center justify-center rounded-radius-24 border border-border bg-surface-card shadow-lg">
                <Image src="/branding/mobile-logo.png" alt="" width={320} height={320} className="h-[76%] w-[76%] object-contain" priority aria-hidden="true" />
              </div>
              <div className="absolute bottom-[8%] start-[2%] flex items-center gap-2 rounded-radius-16 border border-border bg-surface-card px-3 py-2 shadow-sm" aria-hidden="true">
                <Search className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="text-caption font-medium text-text-secondary">کشف صداهای تازه</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="public-content-heading" className="mx-auto w-full max-w-app px-4 pb-12 sm:px-8 lg:px-12">
        <div className="border-t border-border/70 pt-8 sm:pt-10">
          <p className="text-sm font-medium text-accent">کشف کن</p>
          <h2 id="public-content-heading" className="mt-2 text-heading text-text-primary">پادکست‌هایی برای شروع</h2>

          {podcastsQuery.isLoading ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3" role="status" aria-live="polite" aria-label="در حال بارگذاری پادکست‌ها">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-56 animate-pulse rounded-radius-20 border border-border/70 bg-surface-secondary/70" />
              ))}
            </div>
          ) : podcastsQuery.isError ? (
            <div className="mt-5 rounded-radius-16 border border-border bg-surface-secondary/70 p-5" role="alert">
              <p className="m-0 text-sm text-text-secondary">بارگذاری پادکست‌ها ممکن نشد. می‌توانی دوباره تلاش کنی یا همهٔ پادکست‌ها را ببینی.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="secondary" size="md" className="min-h-11" onClick={() => podcastsQuery.refetch()}>تلاش دوباره</Button>
                <Link href="/podcasts" className="button button-ghost min-h-11 justify-center">رفتن به کشف پادکست‌ها</Link>
              </div>
            </div>
          ) : podcasts.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {podcasts.map((podcast) => (
                <MediaCard key={podcast.id} title={podcast.title} subtitle={podcast.description}>
                  <ContentArtwork src={podcast.artworkUrl} alt="" className="aspect-video w-full" />
                  <Link href={`/podcasts/${podcast.id}`} className="button button-secondary min-h-11 w-full justify-center text-sm" aria-label={`${podcast.title}، باز کردن پادکست`}>
                    باز کردن پادکست
                  </Link>
                </MediaCard>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-radius-16 border border-border bg-surface-secondary/70 p-5" role="status">
              <p className="m-0 text-sm text-text-secondary">در حال حاضر پادکست عمومی برای نمایش در دسترس نیست.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/login" className="button button-primary min-h-11 justify-center">شروع کردن</Link>
                <Link href="/podcasts" className="button button-secondary min-h-11 justify-center">کشف پادکست‌ها</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default WelcomeScreen;
