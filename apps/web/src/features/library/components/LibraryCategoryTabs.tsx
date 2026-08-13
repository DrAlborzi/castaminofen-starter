'use client';

import { Tabs } from '@/components/design-system';

export type LibraryCategory = 'all' | 'podcasts' | 'videos' | 'audiobooks' | 'shorts' | 'favorites' | 'playlists';

type LibraryCategoryTabsProps = {
  activeCategory: LibraryCategory;
  onSelect: (category: LibraryCategory) => void;
};

const categories: Array<{ id: LibraryCategory; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'podcasts', label: 'پادکست‌ها' },
  { id: 'videos', label: 'ویدیوها' },
  { id: 'audiobooks', label: 'کتاب‌های صوتی' },
  { id: 'shorts', label: 'کوتاه‌ها' },
  { id: 'favorites', label: 'علاقه‌مندی‌ها' },
  { id: 'playlists', label: 'پلی‌لیست‌ها' },
];

export function LibraryCategoryTabs({ activeCategory, onSelect }: LibraryCategoryTabsProps) {
  return <Tabs items={categories.map((category) => ({ value: category.id, label: category.label }))} value={activeCategory} onValueChange={(value) => onSelect(value as LibraryCategory)} ariaLabel="فیلتر کتابخانه" />;
}
