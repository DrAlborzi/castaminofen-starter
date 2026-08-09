import { ArrowDown, ArrowUp, Play, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/design-system';
import { Tag } from '@/components/design-system/common/tag';
import { getQueueDisplayItems } from '../utils/playerPresentation';
import type { PlayableItem } from '../types';

type QueuePanelProps = {
  queue: PlayableItem[];
  currentItem: PlayableItem | null;
  currentIndex: number;
  onPlay: (item: PlayableItem) => void;
  onRemove: (itemId: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onClear: () => void;
};

export function QueuePanel({ queue, currentItem, currentIndex, onPlay, onRemove, onMove, onClear }: QueuePanelProps) {
  const queueDisplay = getQueueDisplayItems(queue, currentIndex);
  const upcoming = queueDisplay.upNext;

  return (
    <div className="rounded-[1.4rem] border border-border/70 bg-surface-secondary/70 p-4" aria-label="پنل صف پخش">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-text-primary">صف بعدی</p>
          <p className="text-xs text-text-secondary">وضعیت فعلی صف و موارد بعدی را در یک نگاه ببینید</p>
        </div>
        <Tag className="bg-surface-card text-text-secondary">{queue.length} مورد</Tag>
      </div>
      <div className="mt-3 space-y-2">
        {currentItem ? (
          <div className="rounded-[0.95rem] border border-accent/20 bg-accent/10 p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-text-primary">در حال پخش</p>
                <p className="mt-1 text-sm text-text-secondary">{currentItem.title}</p>
              </div>
              <Tag className="border-accent/20 bg-accent/10 text-accent">اکنون</Tag>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => onRemove(currentItem.id)} aria-label={`حذف ${currentItem.title}`} title={`حذف ${currentItem.title}`}>
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ) : null}
        <div className="rounded-[0.95rem] border border-border/70 bg-surface-card/70 p-3 text-sm text-text-secondary">
          <div className="flex items-center gap-2 font-semibold text-text-primary">
            <Sparkles size={14} className="text-accent" />
            <span>پخش بعدی</span>
          </div>
          <p className="mt-1">برای حفظ جریان، موارد بعدی را می‌توان به‌صورت مستقیم پخش، حذف، یا مرتب کرد.</p>
        </div>
        {upcoming.length > 0 ? upcoming.map((item) => {
          const queueIndex = (item.position ?? 1) - 1;
          const canMoveUp = queueIndex > 0;
          const canMoveDown = queueIndex < queue.length - 1;

          return (
            <div key={item.id} className="flex items-center gap-3 rounded-[0.95rem] border border-border/70 bg-surface-card/80 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-[11px] font-semibold text-text-secondary">
                {item.position}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">{item.title}</p>
                <p className="truncate text-xs text-text-secondary">{item.subtitle ?? 'اپیزود'}</p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-1">
                <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => onMove(queueIndex, queueIndex - 1)} disabled={!canMoveUp} aria-label={`انتقال ${item.title} به بالا`} title={`انتقال ${item.title} به بالا`}>
                  <ArrowUp size={14} />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => onMove(queueIndex, queueIndex + 1)} disabled={!canMoveDown} aria-label={`انتقال ${item.title} به پایین`} title={`انتقال ${item.title} به پایین`}>
                  <ArrowDown size={14} />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => onPlay(item)} aria-label={`پخش ${item.title}`} title={`پخش ${item.title}`}>
                  <Play size={14} />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="rounded-full p-2" onClick={() => onRemove(item.id)} aria-label={`حذف ${item.title}`} title={`حذف ${item.title}`}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          );
        }) : <p className="rounded-[0.95rem] border border-dashed border-border/70 bg-surface-card/60 p-3 text-sm text-text-secondary">هیچ موردی در صف بعدی وجود ندارد.</p>}
        <div className="flex items-center justify-between gap-2 rounded-[0.95rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
          <div>
            <p className="font-semibold text-text-primary">بعداً</p>
            <p className="text-xs text-text-secondary">در صورت نیاز، این صف را پاک کنید و دوباره از ابتدا شروع کنید.</p>
          </div>
          <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={onClear} disabled={queue.length === 0} aria-label="پاک کردن صف پخش">
            پاک کردن صف
          </Button>
        </div>
      </div>
    </div>
  );
}
