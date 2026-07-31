import { MiniPlayer } from '@/components/design-system/player/mini-player';
import { Tag } from '@/components/design-system/common/tag';
import { MediaCard } from '@/components/design-system/media/media-card';
import { getPlayerExperienceViewModel } from '../data/mockPlayerExperience';

export function RelatedContentPanel() {
  const { relatedItems } = getPlayerExperienceViewModel();

  return (
    <MediaCard title="محتوای مرتبط" subtitle="پیشنهاد برای ادامه‌ی تجربه و بازگشت به مسیرهای مرتبط" className="h-full">
      <div className="space-y-2">
        <p className="text-xs leading-6 text-text-secondary">این مسیرها به شما کمک می‌کنند تجربه‌ی فعلی را به لحظه‌های بعدی، موضوعات مرتبط و یادآوری‌های شخصی وصل کنید.</p>
        {relatedItems.map((item) => (
          <MiniPlayer key={item.title} title={item.title} subtitle={item.subtitle} actions={<Tag className="bg-surface-secondary text-text-secondary">{item.badge}</Tag>} />
        ))}
      </div>
    </MediaCard>
  );
}
