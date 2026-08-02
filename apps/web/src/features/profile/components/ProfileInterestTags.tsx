import { Chip } from '@/components/design-system/common/chip';

type ProfileInterestTagsProps = {
  interests: string[];
};

export function ProfileInterestTags({ interests }: ProfileInterestTagsProps) {
  return (
    <section className="rounded-[2rem] border border-border/80 bg-surface-card/85 p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Your Interests</p>
          <h2 className="text-lg font-semibold text-text-primary">علاقه‌مندی‌های شما</h2>
        </div>
        <span className="rounded-full border border-border/70 bg-surface-secondary/70 px-3 py-1 text-xs font-semibold text-text-secondary">
          حس شخصی‌شده
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Chip key={interest} active>
            {interest}
          </Chip>
        ))}
      </div>
    </section>
  );
}
