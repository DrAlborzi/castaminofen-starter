import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileJourneyCard } from '../types/profile.types';

type ProfileContinueJourneyProps = {
  journeys: ProfileJourneyCard[];
};

export function ProfileContinueJourney({ journeys }: ProfileContinueJourneyProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Continue Journey</p>
          <h2 className="text-lg font-semibold text-text-primary">لحظه‌های نیمه‌تمام شما</h2>
          <p className="max-w-2xl text-sm text-text-secondary">مسیرهای شخصی‌سازی‌شده شما از شنیدن، تماشا و کتاب‌های صوتی را با یک نگاه ببین.</p>
        </div>
        <Button type="button" variant="ghost" size="sm">
          مشاهده کامل
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {journeys.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            meta={`${item.progress}%`}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
              <span>{item.detail}</span>
              <span className="rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-xs font-semibold text-text-secondary">
                {item.type}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-border/70">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${item.progress}%` }} />
            </div>
            <Button type="button" variant="secondary" size="sm" className="w-full">
              ادامه
            </Button>
          </MediaCard>
        ))}
      </div>
    </section>
  );
}
