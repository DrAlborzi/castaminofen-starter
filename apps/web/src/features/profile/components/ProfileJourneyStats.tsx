import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileMetric } from '../types/profile.types';

type ProfileJourneyStatsProps = {
  stats: ProfileMetric[];
};

export function ProfileJourneyStats({ stats }: ProfileJourneyStatsProps) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <MediaCard key={stat.id} title={stat.label} subtitle={stat.detail} meta={stat.value} className="min-h-full">
          <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <p className="text-sm font-medium text-text-primary">{stat.detail}</p>
          </div>
        </MediaCard>
      ))}
    </section>
  );
}
