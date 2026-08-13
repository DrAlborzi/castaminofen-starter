'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Camera, CheckCircle2, ChevronLeft, ChevronRight, Mic, MessageCircleMore, Sparkles, Wand2 } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/design-system';
import { Tag } from '@/components/design-system/common/tag';
import type { ContentTypeId } from '../types/creator.types';

const wizardSteps = [
  { title: 'انتخاب نوع محتوا', subtitle: 'الگوی مناسب برای روایت، صدا یا تجربه‌ی تعاملی را انتخاب کن.' },
  { title: 'تعریف ایده', subtitle: 'عنوان، توضیح و هویت اثر را برای شروع روشن کن.' },
  { title: 'افزودن رسانه', subtitle: 'ضبط، بارگذاری یا ساخت کاور برای شروع تجربه‌ی آماده‌سازی.' },
  { title: 'تقویت محتوا', subtitle: 'فصل‌ها، متن و نکات برجسته را برای عمق بیشتر اضافه کن.' },
  { title: 'پیش‌نمایش', subtitle: 'نحوه‌ی دیده‌شدن در صفحه‌ی مخاطب و Player را ببین.' },
  { title: 'انتشار', subtitle: 'مخاطب، دسترسی و وضعیت انتشار را نهایی کن.' },
];

const contentTypeOptions: Array<{ id: ContentTypeId; title: string; description: string; icon: typeof Sparkles }> = [
  { id: 'podcast', title: 'پادکست', description: 'گفت‌وگو، روایت و دانش در یک مسیر شنیداری', icon: Mic },
  { id: 'video', title: 'ویدیو', description: 'داستان تصویری با لحن حرفه‌ای و جذاب', icon: Camera },
  { id: 'short', title: 'کوتاه', description: 'تجربه‌ی سریع، پویا و اشتراک‌پذیر', icon: Sparkles },
  { id: 'audiobook', title: 'کتاب صوتی', description: 'روایت طولانی و عمیق برای شنونده', icon: BookOpen },
  { id: 'discussion', title: 'بحث جامعه', description: 'پرسش، بازخورد و گفتگو در کنار محتوا', icon: MessageCircleMore },
];

const enhancementOptions = [
  { title: 'فصل‌ها', body: 'سازمان‌دهی بخش‌های داستان و روایت' },
  { title: 'تایم‌استمپ‌های برجسته', body: 'نشانه‌گذاری لحظه‌های مهم برای Player' },
  { title: 'ترنسکریپت', body: 'متن هم‌زمان و قابل‌جست‌وجو' },
  { title: 'سوال‌های جامعه', body: 'دعوت به گفتگو و بازخورد' },
];

const visibilityOptions = [
  { value: 'public', label: 'عمومی' },
  { value: 'private', label: 'خصوصی' },
  { value: 'community', label: 'برای جامعه' },
] as const;

function formatPersianNumber(value: number) {
  return value
    .toString()
    .replace(/0/g, '۰')
    .replace(/1/g, '۱')
    .replace(/2/g, '۲')
    .replace(/3/g, '۳')
    .replace(/4/g, '۴')
    .replace(/5/g, '۵')
    .replace(/6/g, '۶')
    .replace(/7/g, '۷')
    .replace(/8/g, '۸')
    .replace(/9/g, '۹');
}

export function CreationWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState<ContentTypeId>('podcast');
  const [title, setTitle] = useState('فصل جدید از یک ایده روشن');
  const [description, setDescription] = useState('روایتی برای شنونده‌هایی که به تجربه‌ی عمیق و انسانی علاقه دارند.');
  const [category, setCategory] = useState('توسعه‌ی فردی');
  const [tags, setTags] = useState('پادکست، داستان، جامعه');
  const [mediaState, setMediaState] = useState('ضبط نمونه یا بارگذاری فایل');
  const [visibility, setVisibility] = useState<(typeof visibilityOptions)[number]['value']>('public');

  const activeType = useMemo(
    () => contentTypeOptions.find((type) => type.id === selectedType) ?? contentTypeOptions[0],
    [selectedType],
  );

  const progressPercent = Math.round(((activeStep + 1) / wizardSteps.length) * 100);

  const goNext = () => setActiveStep((prev) => Math.min(prev + 1, wizardSteps.length - 1));
  const goPrev = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  return (
    <section className="space-y-4 rounded-[1.75rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-caption">مسیر ساخت مرحله‌ای</p>
          <h3 className="text-heading text-lg">از ایده تا انتشار در یک تجربه‌ی مدرن و الهام‌بخش</h3>
        </div>
        <Tag className="border-accent/20 bg-accent/10 text-accent">مرحله {formatPersianNumber(activeStep + 1)} از {formatPersianNumber(wizardSteps.length)}</Tag>
      </div>

      <div className="rounded-[1.25rem] border border-border/70 bg-surface-secondary/70 p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-text-primary">پیشرفت مسیر</p>
            <p className="text-sm text-text-secondary">{wizardSteps[activeStep].subtitle}</p>
          </div>
          <div className="text-sm font-semibold text-accent">{progressPercent}%</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-surface-primary">
          <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {wizardSteps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`rounded-full border px-3 py-2 text-sm transition-all ${isActive ? 'border-accent/30 bg-accent/10 text-accent' : isCompleted ? 'border-border/70 bg-surface-secondary/80 text-text-primary' : 'border-border/70 bg-surface-card/80 text-text-secondary'}`}
            >
              <span className="ml-1">مرحله {formatPersianNumber(index + 1)}</span>
              {step.title}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[1.4rem] border border-border/70 bg-surface-secondary/70 p-4">
          {activeStep === 0 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <Sparkles className="h-4 w-4" />
                تجربه‌ی انتخاب محتوا
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {contentTypeOptions.map((type) => {
                  const Icon = type.icon;
                  const isActive = type.id === selectedType;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`rounded-[1rem] border p-3 text-right transition-all ${isActive ? 'border-accent/30 bg-accent/10' : 'border-border/70 bg-surface-card/70'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-text-primary">{type.title}</span>
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {activeStep === 1 ? (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-text-primary">عنوان</span>
                  <Input value={title} onChange={(event) => setTitle(event.target.value)} />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-text-primary">دسته‌بندی</span>
                  <Input value={category} onChange={(event) => setCategory(event.target.value)} />
                </label>
              </div>
              <label className="space-y-2 block text-sm">
                <span className="font-semibold text-text-primary">توضیحات</span>
                <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
              </label>
              <label className="space-y-2 block text-sm">
                <span className="font-semibold text-text-primary">برچسب‌ها</span>
                <Input value={tags} onChange={(event) => setTags(event.target.value)} />
              </label>
            </div>
          ) : null}

          {activeStep === 2 ? (
            <div className="space-y-3">
              <div className="rounded-[1.2rem] border border-dashed border-accent/30 bg-gradient-to-br from-accent/10 via-surface-card to-surface-secondary p-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Camera className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-text-primary">{mediaState}</p>
                <p className="mt-1 text-sm text-text-secondary">ضبط نمونه، بارگذاری فایل یا ساخت کاور برای ورود به مرحله‌ی بعد</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <button type="button" onClick={() => setMediaState('ضبط صدا با کیفیت بالا')} className="rounded-[1rem] border border-border/70 bg-surface-card/70 p-3 text-right text-sm text-text-primary">🎙️ ضبط صدا</button>
                <button type="button" onClick={() => setMediaState('بارگذاری فایل آماده')} className="rounded-[1rem] border border-border/70 bg-surface-card/70 p-3 text-right text-sm text-text-primary">📦 بارگذاری فایل</button>
              </div>
            </div>
          ) : null}

          {activeStep === 3 ? (
            <div className="space-y-3">
              {enhancementOptions.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-card/70 p-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                    <p className="mt-1 text-sm text-text-secondary">{item.body}</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
              ))}
            </div>
          ) : null}

          {activeStep === 4 ? (
            <div className="space-y-3">
              <div className="rounded-[1.2rem] border border-border/70 bg-surface-card/70 p-4">
                <p className="text-sm font-semibold text-text-primary">پیش‌نمایش تجربه‌ی دیده‌شدن</p>
                <p className="mt-2 text-sm text-text-secondary">این بخش در آینده با Player و صفحه‌ی مخاطب ادغام می‌شود.</p>
              </div>
              <div className="rounded-[1.2rem] border border-border/70 bg-surface-secondary/70 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Wand2 className="h-4 w-4" />
                  ابزارهای آینده‌ی هوش مصنوعی
                </div>
                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  <li>• پیشنهاد عنوان و خلاصه</li>
                  <li>• فصل‌بندی هوشمند بر اساس روایت</li>
                  <li>• تمیزسازی متن و نسخه‌ی آماده‌ی انتشار</li>
                </ul>
              </div>
            </div>
          ) : null}

          {activeStep === 5 ? (
            <div className="space-y-3">
              <div className="rounded-[1.2rem] border border-border/70 bg-surface-card/70 p-4">
                <p className="text-sm font-semibold text-text-primary">انتشار و دسترسی</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {visibilityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setVisibility(option.value)}
                      className={`rounded-full border px-3 py-2 text-sm ${visibility === option.value ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border/70 bg-surface-secondary/80 text-text-secondary'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.2rem] border border-border/70 bg-surface-secondary/70 p-4 text-sm text-text-secondary">
                <p className="font-semibold text-text-primary">خلاصه‌ی آماده‌سازی</p>
                <p className="mt-2">{title}</p>
                <p className="mt-1">{description}</p>
                <p className="mt-1">دسته‌بندی: {category}</p>
                <p className="mt-1">برچسب‌ها: {tags}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-[1.4rem] border border-border/70 bg-gradient-to-br from-accent/10 via-surface-card to-surface-secondary p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Sparkles className="h-4 w-4" />
            پیش‌نمایش سازنده
          </div>
          <div className="mt-4 rounded-[1.2rem] border border-border/70 bg-surface-card/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-primary">{title}</p>
                <p className="mt-1 text-sm text-text-secondary">{activeType.title}</p>
              </div>
              <Tag className="border-accent/20 bg-accent/10 text-accent">{activeType.title}</Tag>
            </div>
            <p className="mt-3 text-sm text-text-secondary">{description}</p>
            <div className="mt-4 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
              <div className="flex items-center justify-between text-sm text-text-primary">
                <span>آوانگاری</span>
                <span className="font-semibold">{mediaState}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-text-primary">
                <span>دسترسی</span>
                <span className="font-semibold">{visibilityOptions.find((option) => option.value === visibility)?.label}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <Button variant="secondary" onClick={goPrev} disabled={activeStep === 0}>
              <ChevronRight className="me-1 h-4 w-4" />
              قبلی
            </Button>
            <Button variant="primary" onClick={goNext}>
              <ChevronLeft className="me-1 h-4 w-4" />
              {activeStep === wizardSteps.length - 1 ? 'انتشار' : 'مرحله بعد'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
