import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileFavoriteCollection, ProfileFavoriteItem } from '../types/profile.types';

type ProfileFavoriteUniverseProps = {
  favorites: ProfileFavoriteCollection[];
};

export function ProfileFavoriteUniverse({ favorites }: ProfileFavoriteUniverseProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Favorite Universe</p>
          <h2 className="text-lg font-semibold text-text-primary">سلیقه‌ی شخصی شما</h2>
          <p className="max-w-2xl text-sm text-text-secondary">پادکست‌ها، سازندگان، کتاب‌ها و ویدیوهایی که بیشترین حس تعلق و بازگشت را در شما ساخته‌اند.</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {favorites.map((section) => (
          <MediaCard key={section.id} title={section.title} subtitle={section.description} meta={section.meta} className="space-y-3">
            <div className="grid gap-2">
              {section.items.map((item: ProfileFavoriteItem) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                    <p className="text-sm text-text-secondary">{item.detail}</p>
                  </div>
                  <span className="rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-xs text-text-secondary">{item.meta}</span>
                </div>
              ))}
            </div>
          </MediaCard>
        ))}
      </div>
    </section>
  );
}
