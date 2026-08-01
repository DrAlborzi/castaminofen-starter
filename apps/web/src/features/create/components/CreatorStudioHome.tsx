'use client';

import { useMemo, useState } from 'react';
import { BarChart3, BookOpen, Camera, Compass, Layers3, MessageSquareText, Mic, Sparkles, Stars, Users, Wand2 } from 'lucide-react';
import { CreationWizard } from './CreationWizard';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Tag } from '@/components/design-system/common/tag';
import { Button } from '@/components/ui/button';
import { ContentMetadataEditor } from './ContentMetadataEditor';
import { ContentTypeSelector } from './ContentTypeSelector';
import { DraftManager } from './DraftManager';
import { PublishingPanel } from './PublishingPanel';
import { mockAnalytics, mockDrafts, mockPreviews } from '../data/mockCreatorStudioData';
import type { ContentTypeId } from '../types/creator.types';

const workflowSteps = [
  { title: 'انتخاب نوع محتوا', body: 'از میان الگوهای پادکست، ویدیو، کتاب صوتی و تجربه‌های جامعه، مسیر مناسب را انتخاب کن.' },
  { title: 'تعریف ایده', body: 'عنوان، توضیح، دسته‌بندی و برچسب‌ها را به شکلی روشن و الهام‌بخش بنویس.' },
  { title: 'افزودن رسانه', body: 'ثبت فایل، ضبط نمونه، یا ساخت کاور برای شروع تجربه‌ی آماده‌سازی.' },
  { title: 'تقویت محتوا', body: 'فصل‌ها، تایم‌استمپ‌ها، متن و نکات برجسته را برای تجربه‌ی عمیق‌تر اضافه کن.' },
  { title: 'پیش‌نمایش', body: 'نحوه‌ی دیده‌شدن اثر در صفحه‌ی مخاطب و Player را در یک نگاه ببین.' },
  { title: 'انتشار', body: 'مخاطب، دسترسی و تنظیمات نهایی را برای ورود به Castaminofen آماده کن.' },
];

const aiTools = [
  { title: 'AI Content Assistant', body: 'پیشنهاد عنوان، خلاصه و لحن مناسب برای شروع.' },
  { title: 'AI Chapter Suggestions', body: 'بخش‌بندی هوشمند برای پادکست، ویدیو یا کتاب صوتی.' },
  { title: 'AI Transcript Cleanup', body: 'تمیزتر کردن متن و آماده‌سازی برای جست‌وجو.' },
];

export function CreatorStudioHome() {
  const [selectedType, setSelectedType] = useState<ContentTypeId>('podcast');

  const subtitle = useMemo(() => {
    switch (selectedType) {
      case 'video':
        return 'روایت تصویری، تجربه‌ی دیداری و جریان داستانی را در یک مسیر حرفه‌ای بساز.';
      case 'audiobook':
        return 'داستان، آموزش و روایت را در قالبی آرام و عمیق برای شنونده آماده کن.';
      case 'short':
        return 'انرژی، سرعت و اشتراک‌پذیری را در یک تجربه‌ی کوتاه و پویا به‌کار ببر.';
      case 'discussion':
        return 'تجربه‌ی جامعه، پرسش و گفت‌وگو را به‌عنوان هسته‌ی اثر خود طراحی کن.';
      default:
        return 'از ایده تا انتشار، مسیر خلق را در یک تجربه‌ی روشن و قابل فهم ببین.';
    }
  }, [selectedType]);

  return (
    <main className="page-container" aria-labelledby="creator-studio-heading">
      <PageContainer>
        <section className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <Tag className="w-fit border-accent/20 bg-accent/10 text-accent">
                <Sparkles className="ml-1 h-4 w-4" aria-hidden="true" />
                استودیو سازنده · نسخه‌ی بتا
              </Tag>
              <h1 id="creator-studio-heading" className="text-heading">
                از ایده تا انتشار، مسیر خلق را در یک تجربه‌ی روشن و قابل فهم ببین
              </h1>
              <p className="m-0 text-body">{subtitle}</p>
            </div>
            <Button variant="secondary">ایجاد محتوا</Button>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <ContentTypeSelector selectedType={selectedType} onSelectType={setSelectedType} />
              <CreationWizard />
              <ContentMetadataEditor />
              <PublishingPanel />
              <DraftManager drafts={mockDrafts} />
            </div>

            <div className="space-y-4">
              <section className="rounded-[1.75rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-caption">نمای کلی سازنده</p>
                    <h3 className="text-heading text-lg">پیش‌نمایش تجربه‌ی خلاقانه</h3>
                  </div>
                  <Tag className="border-accent/20 bg-accent/10 text-accent">Creator Home</Tag>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Stars className="h-4 w-4 text-accent" />
                      روایت‌های منتشرشده
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">۱۲</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Users className="h-4 w-4 text-accent" />
                      جامعه فعال
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">۲٬۴۸۰</p>
                  </div>
                </div>

                <div className="mt-4 rounded-[1.25rem] border border-border/70 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card p-4">
                  <p className="text-sm font-semibold text-text-primary">Creator Journey</p>
                  <div className="mt-3 flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-card/80 p-3">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">۵ روایت ساخته‌شده</p>
                      <p className="mt-1 text-sm text-text-secondary">از اولین ایده تا اولین تعامل جامعه</p>
                    </div>
                    <div className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Milestone</div>
                  </div>
                </div>
              </section>

              <MediaCard title="مسیر ساخت مرحله‌ای" subtitle="هر لحظه‌ی خلق، از انتخاب تا انتشار، در یک مسیر روشن پیش می‌رود" meta="Workflow · Premium">
                <div className="space-y-3">
                  {workflowSteps.map((step, index) => (
                    <div key={step.title} className="rounded-[1.1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">مرحله {index + 1}</p>
                          <p className="mt-1 text-sm text-text-secondary">{step.title}</p>
                        </div>
                        <div className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">{index + 1}/6</div>
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">{step.body}</p>
                    </div>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="ابزارهای آینده‌ی هوش مصنوعی" subtitle="برای کمک به ایده‌پردازی، ساخت فصل و آماده‌سازی متن" meta="AI Future UI">
                <div className="space-y-2">
                  {aiTools.map((tool) => (
                    <div key={tool.title} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                        <Wand2 className="h-4 w-4 text-accent" />
                        {tool.title}
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">{tool.body}</p>
                    </div>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="هویت سازنده" subtitle="آواتار، بیو، موضوعات و حضور جامعه برای اعتماد و شناخت بهتر مخاطب" meta="Creator Identity">
                <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">ک</div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">کیمیاگر محتوا</p>
                      <p className="text-sm text-text-secondary">پادکست، آموزش و تجربه‌ی جامعه</p>
                    </div>
                  </div>
                </div>
              </MediaCard>

              <MediaCard title="بازخورد مخاطب" subtitle="دیدگاه‌ها، واکنش‌ها و مسیر رشد در یک نگاه" meta="Audience Feedback · Beta">
                <div className="space-y-2">
                  {mockPreviews.map((preview) => (
                    <div key={preview.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{preview.label}</p>
                          <p className="mt-1 text-sm text-text-secondary">{preview.description}</p>
                        </div>
                        <Compass className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="مسیر رشد سازنده" subtitle="از اولین ایده تا تاثیر بر جامعه و بازگشت مخاطب" meta="Creator Growth · Preview">
                <div className="space-y-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-sm font-semibold text-text-primary">هر انتشار، یک نقطه‌ی بازگشت برای جامعه و یک نشانه‌ی رشد برای شما ایجاد می‌کند.</p>
                  <p className="text-sm text-text-secondary">پیش‌نمایش مخاطب، بازخورد و حضور در Profile به شما کمک می‌کنند بفهمید کار شما در Castaminofen چه جایگاهی دارد و چرا دوباره بازگشت، ارزش پیدا می‌کند.</p>
                </div>
              </MediaCard>

              <MediaCard title="درآمد و رشد" subtitle="دیدگاه‌های کلیدی برای آینده" meta="Analytics Preview · Beta">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <BarChart3 className="h-4 w-4 text-accent" />
                      بازدیدها
                    </div>
                    <p className="mt-2 text-lg font-semibold text-text-primary">{mockAnalytics.views.toLocaleString('fa-IR')}</p>
                  </div>
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Users className="h-4 w-4 text-accent" />
                      مخاطب
                    </div>
                    <p className="mt-2 text-lg font-semibold text-text-primary">{mockAnalytics.listeners.toLocaleString('fa-IR')}</p>
                  </div>
                </div>
              </MediaCard>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { icon: Wand2, title: 'خلاقانه', body: 'از انتخاب الگو تا انتشار، مسیر ساختن روان و حرفه‌ای است.' },
              { icon: Layers3, title: 'سازمان‌یافته', body: 'مجموعه‌ها، سری‌ها و مسیرهای آموزش در کنار محتوا قرار می‌گیرند.' },
              { icon: MessageSquareText, title: 'تعامل‌محور', body: 'بحث، بازخورد و جامعه در کنار اثر قرار می‌گیرند.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.25rem] border border-border/70 bg-surface-card/80 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Icon className="h-4 w-4 text-accent" />
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { icon: Mic, title: 'ضبط و بارگذاری', body: 'ثبت صدا و ویدیو با تجربه‌ای آرام و واضح.' },
              { icon: BookOpen, title: 'کتاب صوتی', body: 'سازمان‌دهی فصل‌ها و روایت‌های طولانی.' },
              { icon: Camera, title: 'محیط خلاق', body: 'پیش‌نمایش، کاور و تجربه‌ی دیده‌شدن.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.25rem] border border-border/70 bg-surface-secondary/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Icon className="h-4 w-4 text-accent" />
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{item.body}</p>
                </div>
              );
            })}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
