"use client";

import { SlidersHorizontal, Sparkles, Clock3 } from 'lucide-react';
import { Button } from '@/components/design-system';

type SearchFilterDrawerProps = {
  isOpen?: boolean;
};

const filters = [
  { label: 'همه', value: 'all' },
  { label: 'پادکست', value: 'podcast' },
  { label: 'ویدیو', value: 'video' },
  { label: 'کتاب صوتی', value: 'audiobook' },
  { label: 'کوتاه', value: 'short' },
];

export default function SearchFilterDrawer({ isOpen = true }: SearchFilterDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="rounded-[1.5rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
          <SlidersHorizontal className="h-4 w-4 text-accent" />
          فیلترهای هوشمند
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          UI آینده
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button key={filter.value} type="button" className="rounded-full border border-border/70 bg-surface-secondary/70 px-3 py-2 text-sm text-text-secondary">
            {filter.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-[1.2rem] border border-border/70 bg-surface-secondary/70 p-3">
        <div className="flex items-center gap-2 text-sm text-text-primary">
          <Clock3 className="h-4 w-4 text-text-muted" />
          مرتب‌سازی بر اساس جدیدترین یا محبوب‌ترین
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {['مرتبط‌ترین', 'جدیدترین', 'محبوب‌ترین', 'طول زمان'].map((item) => (
            <Button key={item} type="button" variant="ghost" size="sm">
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
