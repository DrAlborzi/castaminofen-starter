"use client";

import { ArrowLeft, Mic, Sparkles, Clock3, Compass, PlayCircle, Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/design-system';

type SearchLandingExperienceProps = {
  onSelectSearch: (value: string) => void;
};

const recentSearches = [
  'تاریخ فضا',
  'پادکست فناوری',
  'سازندگان یادگیری',
  'بحث هوش مصنوعی',
];

const categoryCards = [
  {
    title: 'پادکست',
    description: 'مجموعه‌های عمیق، اپیزودهای تازه و موضوعات پرطرفدار',
    accent: 'from-amber-400/20 via-orange-400/10 to-transparent',
  },
  {
    title: 'ویدیو',
    description: 'کانال‌ها، ویدیوهای آموزشی و لحظه‌های جذاب',
    accent: 'from-cyan-400/20 via-sky-400/10 to-transparent',
  },
  {
    title: 'کتاب صوتی',
    description: 'داستان، تجربه و روایت‌های آرام برای سفر‌های شنیداری',
    accent: 'from-violet-400/20 via-fuchsia-400/10 to-transparent',
  },
  {
    title: 'سازنده',
    description: 'پروفایل سازنده، سبک روایت و محتوای مرتبط',
    accent: 'from-emerald-400/20 via-lime-400/10 to-transparent',
  },
];

const suggestions = [
  'تاریخ فضا',
  'بازی ذهنی و روایت',
  'مکالمه‌های عمیق درباره فناوری',
  'صداهای آرام برای مطالعه',
];

export default function SearchLandingExperience({ onSelectSearch }: SearchLandingExperienceProps) {
  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2rem] border border-border/80 bg-gradient-to-br from-surface-card via-surface-secondary to-surface-card p-4 shadow-soft sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              کشف سریع
            </div>
            <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">بهترین مسیر برای ورود به دنیای Castaminofen</h2>
            <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              از جست‌وجوی دقیق گرفته تا کشف موضوعات تازه، این تجربه برای آن طراحی شده که هر لحظه از سفر شنیداری‌ات را آرام، واضح و پر از امکان کند.
            </p>
          </div>
          <div className="hidden rounded-2xl border border-border/70 bg-surface-card/80 p-3 sm:block">
            <Compass className="h-5 w-5 text-accent" />
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-border/70 bg-surface-card/80 p-3 shadow-sm sm:p-4">
          <div className="flex items-center gap-2 rounded-[1rem] border border-border/70 bg-surface-secondary/80 px-3 py-3">
            <Search className="h-4 w-4 text-text-muted" />
            <div className="flex-1 text-sm text-text-secondary">جستجو برای پادکست، ویدیو، کتاب صوتی، سازنده یا بحث</div>
            <button type="button" className="rounded-full border border-border/70 bg-surface-card p-2 text-text-secondary">
              <Mic className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button key={item} type="button" onClick={() => onSelectSearch(item)} className="rounded-full border border-border/70 bg-surface-card px-3 py-2 text-sm text-text-secondary transition hover:border-accent/30 hover:text-text-primary">
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-accent">جستجوهای اخیر</p>
              <h3 className="text-base font-semibold text-text-primary">بازگشت سریع به مسیرهای قبلی</h3>
            </div>
            <button type="button" className="text-sm text-text-secondary">پاک کردن</button>
          </div>
          <div className="mt-4 space-y-2">
            {recentSearches.map((item) => (
              <button key={item} type="button" onClick={() => onSelectSearch(item)} className="flex w-full items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 px-3 py-3 text-right transition hover:border-accent/30">
                <span className="flex items-center gap-2 text-sm text-text-primary">
                  <Clock3 className="h-4 w-4 text-text-muted" />
                  {item}
                </span>
                <ArrowLeft className="h-4 w-4 text-text-muted" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-accent">ترندها</p>
              <h3 className="text-base font-semibold text-text-primary">موضوعاتی که امروز بیشتر دیده می‌شوند</h3>
            </div>
            <div className="rounded-full border border-accent/20 bg-accent/10 p-2 text-accent">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: 'پادکست‌های روایت‌محور', tag: 'در حال رشد' },
              { label: 'سازندگان یادگیری', tag: 'پر بحث' },
              { label: 'بحث‌های عمیق درباره آینده', tag: 'داغ' },
            ].map((item) => (
              <button key={item.label} type="button" onClick={() => onSelectSearch(item.label)} className="flex w-full items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 px-3 py-3 text-right">
                <span className="text-sm text-text-primary">{item.label}</span>
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">{item.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-accent">کالکشن‌های کشف</p>
            <h3 className="text-base font-semibold text-text-primary">از پادکست تا جامعه، همه در یک صفحه‌ی منظم</h3>
          </div>
          <Button type="button" variant="ghost" size="sm">
            مشاهده همه
          </Button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((card) => (
            <button key={card.title} type="button" onClick={() => onSelectSearch(card.title)} className={`rounded-[1.25rem] border border-border/70 bg-gradient-to-br ${card.accent} p-4 text-right transition hover:-translate-y-0.5`}>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-text-primary">{card.title}</h4>
                <PlayCircle className="h-4 w-4 text-text-muted" />
              </div>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{card.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
