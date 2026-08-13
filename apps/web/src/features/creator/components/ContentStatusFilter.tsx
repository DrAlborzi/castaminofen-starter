'use client';

import { useState } from 'react';
import { Tabs } from '@/components/design-system';
import type { CreatorContentTab } from '../types/publishing.types';

const tabs: Array<{ id: CreatorContentTab; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'published', label: 'منتشرشده' },
  { id: 'drafts', label: 'پیش‌نویس' },
  { id: 'scheduled', label: 'زمان‌بندی‌شده' },
  { id: 'processing', label: 'در حال پردازش' },
  { id: 'archived', label: 'بایگانی' },
];

export function ContentStatusFilter({ initialTab = 'all' }: { initialTab?: CreatorContentTab }) {
  const [activeTab, setActiveTab] = useState<CreatorContentTab>(initialTab);

  return (
    <div className="space-y-3">
      <Tabs
        items={tabs.map((tab) => ({
          value: tab.id,
          label: tab.label,
        }))}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as CreatorContentTab)}
        ariaLabel="فیلتر وضعیت محتوا"
        className="flex flex-wrap items-center gap-2 pb-1"
      />
      <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
        <p className="font-semibold text-text-primary">{activeTab === 'drafts' ? 'پیش‌نویس' : 'فیلتر فعال'}</p>
        <p className="mt-1">{activeTab === 'drafts' ? 'در حال آماده‌سازی' : 'به‌روزرسانی و دسترسی سریع برای مدیریت حرفه‌ای.'}</p>
      </div>
    </div>
  );
}
