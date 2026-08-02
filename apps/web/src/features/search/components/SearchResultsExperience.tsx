"use client";

import { ArrowLeft, PlayCircle, Sparkles, Users, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SearchResultsExperienceProps = {
  query: string;
};

const topResult = {
  title: 'تاریخ فضا در روایت‌های مدرن',
  subtitle: 'اپیزود ویژه · علی نمونه',
  description: 'یک مسیر پر از روایت، حقیقت و اکتشاف برای کسانی که به دنبال کشف عمیق‌اند.',
};

const sections = [
  { title: 'اپیزودهای مرتبط', items: ['تاریخ فضا و انسان', 'مکالمه‌ی فضا و آینده'] },
  { title: 'پادکست‌های پیشنهادی', items: ['فناوری و آینده', 'روایت‌های عمیق'] },
  { title: 'سازندگان مرتبط', items: ['Ali Example', 'Nina Voice'] },
];

export default function SearchResultsExperience({ query }: SearchResultsExperienceProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-[1.75rem] border border-border/80 bg-gradient-to-br from-surface-card via-surface-secondary to-surface-card p-4 shadow-soft sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-accent">نتیجه برتر</p>
            <h3 className="text-lg font-semibold text-text-primary">{topResult.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{topResult.subtitle}</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">{topResult.description}</p>
          </div>
          <div className="rounded-full border border-accent/20 bg-accent/10 p-2 text-accent">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="primary" size="sm">
            <span className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              پخش سریع
            </span>
          </Button>
          <Button type="button" variant="secondary" size="sm">
            مشاهده جزئیات
          </Button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[1.5rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-base font-semibold text-text-primary">{section.title}</h4>
                <button type="button" className="text-sm text-text-secondary">مشاهده همه</button>
              </div>
              <div className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <button key={item} type="button" className="flex w-full items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 px-3 py-3 text-right">
                    <span className="text-sm text-text-primary">{item}</span>
                    <ArrowLeft className="h-4 w-4 text-text-muted" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[1.5rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-medium text-accent">
            <MessageSquareText className="h-4 w-4" />
            جامعه و بحث
          </div>
          <h4 className="mt-3 text-base font-semibold text-text-primary">جست‌وجوی «{query}» در فضای گفتگوهای Castaminofen</h4>
          <div className="mt-4 space-y-3">
            {[
              { title: 'چرا این موضوع امروز پرطرفدار است؟', count: '24 نظر' },
              { title: 'نقاط عمیق این روایت چیست؟', count: '12 نظر' },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.2rem] border border-border/70 bg-surface-secondary/70 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-text-primary">{item.title}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">
                    <Users className="h-3.5 w-3.5" />
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
