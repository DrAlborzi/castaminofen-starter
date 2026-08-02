import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileAchievement } from '../types/profile.types';

type ProfileAchievementsProps = {
  achievements: ProfileAchievement[];
};

export function ProfileAchievements({ achievements }: ProfileAchievementsProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Milestones</p>
          <h2 className="text-lg font-semibold text-text-primary">نشان‌های سفر شما</h2>
          <p className="max-w-2xl text-sm text-text-secondary">دستاوردهای شنیداری، مشارکت و حافظه‌ی شما را به شکلی ظریف و معنادار نمایش می‌دهد.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <MediaCard
            key={achievement.id}
            title={achievement.title}
            subtitle={achievement.subtitle}
            meta={achievement.tag}
            className="space-y-3"
          >
            <p className="text-sm text-text-secondary">{achievement.detail}</p>
          </MediaCard>
        ))}
      </div>
    </section>
  );
}
