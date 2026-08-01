"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInput from './components/SearchInput';
import { SearchResultsPanel } from './components/SearchResultsPanel';
import SearchLandingExperience from './components/SearchLandingExperience';
import SearchFilterDrawer from './components/SearchFilterDrawer';
import SearchResultsExperience from './components/SearchResultsExperience';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { SectionHeader } from '@/components/design-system/layout/section-header';

const DEFAULT_PAGE = 1;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawQuery = searchParams.get('q') ?? '';
  const rawPage = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : DEFAULT_PAGE;

  const [query, setQuery] = useState(rawQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(rawQuery);

  useEffect(() => {
    setQuery(rawQuery);
    setDebouncedQuery(rawQuery.trim());
  }, [rawQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [query]);

  const searchSummary = useMemo(() => {
    const value = debouncedQuery.trim();
    return value ? `نتایج برای «${value}»` : 'جستجو در پادکست‌ها، ویدیو، کتاب صوتی و جامعه';
  }, [debouncedQuery]);

  const handleNavigate = (value: string) => {
    const nextValue = value.trim();
    setQuery(nextValue);

    const nextSearchParams = new URLSearchParams();
    if (nextValue) {
      nextSearchParams.set('q', nextValue);
    }
    nextSearchParams.set('page', String(DEFAULT_PAGE));

    const nextUrl = `/search${nextSearchParams.toString() ? `?${nextSearchParams.toString()}` : ''}`;
    const currentQuery = searchParams.get('q') ?? '';
    const currentPage = searchParams.get('page') ?? String(DEFAULT_PAGE);

    if (currentQuery !== nextValue || currentPage !== String(DEFAULT_PAGE)) {
      router.replace(nextUrl, { scroll: false });
    }
  };

  return (
    <main className="page-container">
      <PageContainer>
        <section className="space-y-6 rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6 lg:p-8">
          <SectionHeader
            eyebrow="جستجو"
            title="دروازه‌ی هوشمند به دنیای Castaminofen"
            description="از پیدا کردن یک نتیجه‌ی دقیق تا کشف چیزی جدید، این تجربه برای ورود آرام و منظم به پادکست، ویدیو، کتاب صوتی، سازنده و جامعه طراحی شده است."
          />

          <SearchInput
            defaultQuery={query}
            onNavigate={handleNavigate}
          />

          <div className="rounded-[1.5rem] border border-border/80 bg-surface-card/80 px-4 py-3 text-sm text-text-secondary shadow-sm">
            {searchSummary}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {debouncedQuery ? (
                <>
                  <SearchFilterDrawer isOpen />
                  <SearchResultsExperience query={debouncedQuery} />
                </>
              ) : (
                <SearchLandingExperience onSelectSearch={handleNavigate} />
              )}
              <SearchResultsPanel query={debouncedQuery} page={page} />
            </div>
            <div className="space-y-4">
              <SearchFilterDrawer isOpen />
              <div className="rounded-[1.5rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-5">
                <p className="text-sm font-medium text-accent">پیشنهادهای آینده</p>
                <h3 className="mt-2 text-base font-semibold text-text-primary">جست‌وجوی معنایی، mood discovery و کشف شخصی‌سازی‌شده</h3>
                <p className="mt-2 text-sm leading-7 text-text-secondary">این لایه‌ی UI برای زمانی آماده شده که تجربه‌ی جستجو از یک فرم ساده به یک مسیر کشفِ همه‌جانبه تبدیل شود.</p>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
