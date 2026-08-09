import { Button } from '@/components/design-system';
import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileCollectionLink } from '../types/profile.types';

type ProfilePersonalCollectionsProps = {
  collections: ProfileCollectionLink[];
};

export function ProfilePersonalCollections({ collections }: ProfilePersonalCollectionsProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Personal Collections</p>
          <h2 className="text-lg font-semibold text-text-primary">کتابخانه‌ی شخصی شما</h2>
          <p className="max-w-2xl text-sm text-text-secondary">دسترسی سریع به فهرست‌های مورد علاقه، تاریخچه و لحظه‌های ذخیره‌شده.</p>
        </div>
        <Button type="button" variant="ghost" size="sm">
          مدیریت کتابخانه
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {collections.map((collection) => (
          <MediaCard key={collection.id} title={collection.title} subtitle={collection.subtitle} meta={collection.count} className="space-y-3">
            <Button type="button" variant="secondary" size="sm" className="w-full">
              باز کردن
            </Button>
          </MediaCard>
        ))}
      </div>
    </section>
  );
}
