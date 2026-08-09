import { Button } from '@/components/design-system';
import { MediaCard } from '@/components/design-system/media/media-card';

export type ProfileCreatorDraft = {
  id: string;
  title: string;
  status: string;
};

export type ProfileCreatorContent = {
  id: string;
  title: string;
  detail: string;
};

type ProfileCreatorEntryProps = {
  overview: {
    draftCount: number;
    publishedCount: number;
    status: string;
    invitation: string;
  };
  drafts: ProfileCreatorDraft[];
  published: ProfileCreatorContent[];
};

export function ProfileCreatorEntry({ overview, drafts, published }: ProfileCreatorEntryProps) {
  return (
    <section className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-card to-surface-secondary p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Creator Identity</p>
          <h2 className="text-lg font-semibold text-text-primary">از شنونده به سازنده</h2>
          <p className="max-w-2xl text-sm leading-7 text-text-secondary">{overview.invitation}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border/70 bg-surface-card/80 p-4">
              <p className="text-sm font-semibold text-text-primary">پیش‌نویس‌ها</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">{overview.draftCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-surface-card/80 p-4">
              <p className="text-sm font-semibold text-text-primary">آثار منتشرشده</p>
              <p className="mt-2 text-2xl font-semibold text-text-primary">{overview.publishedCount}</p>
            </div>
          </div>
          <Button type="button" variant="primary">شروع به‌اشتراک‌گذاری</Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <MediaCard title="پیش‌نویس‌های نزدیک" subtitle="آماده‌ی بازبینی و انتشار" meta="Drafts" className="space-y-3">
            {drafts.map((draft) => (
              <div key={draft.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-sm font-semibold text-text-primary">{draft.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{draft.status}</p>
              </div>
            ))}
          </MediaCard>
          <MediaCard title="آخرین آثار" subtitle="نمایی از هویت تولیدی شما" meta="Published" className="space-y-3">
            {published.map((item) => (
              <div key={item.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
              </div>
            ))}
          </MediaCard>
        </div>
      </div>
    </section>
  );
}
