'use client';

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
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="فیلتر کتابخانه">
      {categories.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(category.id)}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'border-accent/30 bg-accent/15 text-accent shadow-sm'
                : 'border-border/70 bg-surface-primary/70 text-text-secondary hover:border-accent/20 hover:text-text-primary'
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
