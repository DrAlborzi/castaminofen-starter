'use client';

import { useMemo, useState } from 'react';
import { useLibraryOverview } from '../hooks/useLibraryOverview';
import { buildLibraryCollectionsSummary } from '../utils/library-collections';
import { ContinueListeningSection } from './ContinueListeningSection';
import { LibraryEmptyState } from './LibraryEmptyState';
import { LibraryErrorState } from './LibraryErrorState';
import { LibraryHistorySection } from './LibraryHistorySection';
import { LibraryLoadingState } from './LibraryLoadingState';
import { SubscriptionsSection } from './SubscriptionsSection';
import { LibraryCollectionsSection } from './LibraryCollectionsSection';
import { LibraryFavoritesSection } from './LibraryFavoritesSection';
import { getLastActivityLabel, getLibraryGreeting, getListeningStreakFromHistory } from '../utils/library-personalization';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { LibraryHeader } from './LibraryHeader';
import { LibraryCategoryTabs, type LibraryCategory } from './LibraryCategoryTabs';
import { ContinueMediaSection } from './ContinueMediaSection';
import { SavedContentCarousel } from './SavedContentCarousel';
import { LibrarySkeleton } from './LibrarySkeleton';

export function LibraryPage() {
  const overviewQuery = useLibraryOverview();
  const [activeCategory, setActiveCategory] = useState<LibraryCategory>('all');

  const isLoading = overviewQuery.isLoading;
  const isError = overviewQuery.isError;

  const subscriptions = useMemo(() => overviewQuery.data?.subscriptions ?? [], [overviewQuery.data?.subscriptions]);
  const continueListening = useMemo(() => overviewQuery.data?.continueListening ?? [], [overviewQuery.data?.continueListening]);
  const history = useMemo(() => overviewQuery.data?.history ?? [], [overviewQuery.data?.history]);
  const continueListeningIds = useMemo(() => new Set(continueListening.map((item) => item.episodeId)), [continueListening]);
  const historyItems = useMemo(() => history.filter((item) => !continueListeningIds.has(item.episodeId)), [continueListeningIds, history]);
  const collectionSummary = useMemo(() => buildLibraryCollectionsSummary({ subscriptions, continueListening, history }), [continueListening, history, subscriptions]);
  const hasAnyContent = subscriptions.length > 0 || continueListening.length > 0 || history.length > 0;
  const now = new Date();
  const greeting = getLibraryGreeting(now);
  const latestActivityItem = useMemo(() => [...history, ...continueListening]
    .slice()
    .sort((left, right) => new Date(right.lastPlayedAt).getTime() - new Date(left.lastPlayedAt).getTime())[0], [continueListening, history]);
  const lastActivityLabel = getLastActivityLabel(latestActivityItem?.lastPlayedAt, now);
  const listeningStreak = getListeningStreakFromHistory(history);
  const headerSummary = [
    `${collectionSummary.continueListeningCount} in progress`,
    `${collectionSummary.subscriptionsCount} followed`,
    lastActivityLabel ? `last seen ${lastActivityLabel}` : null,
    listeningStreak ? `streak ${listeningStreak} days` : null,
  ].filter(Boolean).join(' · ');

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <LibrarySkeleton />
          <LibraryLoadingState />
        </div>
      </PageContainer>
    );
  }

  if (isError && !hasAnyContent) {
    return <div className="space-y-4"><LibraryErrorState onRetry={() => { void overviewQuery.refetch(); }} /></div>;
  }

  if (!hasAnyContent) {
    return (
      <PageContainer>
        <div className="space-y-4 sm:space-y-6">
          <LibraryHeader
            eyebrow="Premium personal space"
            title="Your Library"
            summary="Ready for your first save"
            description="Build a calm, personal collection of podcasts, videos, audiobooks, and favorites that feel like your own home base."
          />
          <LibraryCategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
          <LibraryEmptyState
            title="کتابخانه شما هنوز خالی است"
            description="همین امروز چند پادکست را پیدا کنید و این فضا به‌تدریج به یک خانه‌ی شخصی برای گوش دادن تبدیل شود."
            supportingText="هر لحظه‌ی شروع، یک مسیر برای بازگشت و ساختن هویت شنیداری شماست."
            eyebrow="از اینجا به مسیر پادکست‌ها بروید"
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-4 sm:space-y-6">
        <LibraryHeader
          eyebrow="Premium personal space"
          title={greeting}
          summary={headerSummary}
          description="Your library is now a curated space for unfinished stories, saved favorites, and the voices you keep returning to."
        />

        <LibraryCategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />

        {activeCategory === 'all' || activeCategory === 'podcasts' ? (
          <ContinueMediaSection />
        ) : null}

        {activeCategory === 'all' ? (
          <>
            <SavedContentCarousel />
            <LibraryCollectionsSection summary={collectionSummary} />
            <LibraryFavoritesSection />
            <ContinueListeningSection items={continueListening} />
            <LibraryHistorySection items={historyItems} />
            <SubscriptionsSection items={subscriptions} />
          </>
        ) : null}

        {activeCategory === 'podcasts' ? (
          <>
            <LibraryCollectionsSection summary={collectionSummary} />
            <ContinueListeningSection items={continueListening} />
            <SubscriptionsSection items={subscriptions} />
          </>
        ) : null}

        {activeCategory === 'videos' ? (
          <div className="rounded-[1.75rem] border border-border/70 bg-surface-secondary/70 p-5 shadow-soft">
            <p className="text-sm font-medium text-accent">My Videos</p>
            <h2 className="mt-2 text-subheading">Saved films, clips, and creator moments</h2>
            <p className="mt-2 text-sm text-text-secondary">A dedicated home for video content you want to revisit without losing context.</p>
          </div>
        ) : null}

        {activeCategory === 'audiobooks' ? (
          <div className="rounded-[1.75rem] border border-border/70 bg-surface-secondary/70 p-5 shadow-soft">
            <p className="text-sm font-medium text-accent">My Audiobooks</p>
            <h2 className="mt-2 text-subheading">Immersive listening with chapter-aware progress</h2>
            <p className="mt-2 text-sm text-text-secondary">A premium reading space for books you want to keep close and continue later.</p>
          </div>
        ) : null}

        {activeCategory === 'shorts' ? (
          <div className="rounded-[1.75rem] border border-border/70 bg-surface-secondary/70 p-5 shadow-soft">
            <p className="text-sm font-medium text-accent">Shorts</p>
            <h2 className="mt-2 text-subheading">Quick, delightful moments you saved for later</h2>
            <p className="mt-2 text-sm text-text-secondary">Packed with the pace of modern short-form content and the calm of a curated collection.</p>
          </div>
        ) : null}

        {activeCategory === 'favorites' ? (
          <LibraryFavoritesSection />
        ) : null}

        {activeCategory === 'playlists' ? (
          <SavedContentCarousel />
        ) : null}

        {isError ? (
          <div className="rounded-2xl border border-warning/40 bg-surface-secondary/70 p-3 sm:p-4">
            <LibraryErrorState onRetry={() => { void overviewQuery.refetch(); }} />
          </div>
        ) : null}
      </div>
    </PageContainer>
  );
}
