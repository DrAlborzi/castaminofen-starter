"use client";

import { Clock3, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Button, Sheet } from '@/components/design-system';

type SearchFilterDrawerProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const filters = [
  { label: 'همه', value: 'all' },
  { label: 'پادکست', value: 'podcast' },
  { label: 'ویدیو', value: 'video' },
  { label: 'کتاب صوتی', value: 'audiobook' },
  { label: 'کوتاه', value: 'short' },
];

export default function SearchFilterDrawer({ isOpen = true, onOpenChange }: SearchFilterDrawerProps) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onOpenChange}
      title="فیلترهای هوشمند"
      description="مرتب‌سازی بر اساس جدیدترین یا محبوب‌ترین"
      side="right"
      footer={
        <Button type="button" variant="primary" onClick={() => onOpenChange?.(false)}>
          اعمال فیلتر
        </Button>
      }
    >
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
    </Sheet>
  );
}
