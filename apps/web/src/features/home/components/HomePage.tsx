'use client';

import Link from 'next/link';
import { ArrowRight, Bell, BookmarkPlus, BookOpen, ChevronRight, Compass, Headphones, Heart, MessageCircle, Mic2, Play, Radio, Search, Sparkles, Video } from 'lucide-react';
import { Button } from '@/components/design-system/common/button';
import { ContentArtwork } from '@/components/design-system/media/content-artwork';
import { CreatorCard } from '@/components/design-system/media/creator-card';
import { MediaCard } from '@/components/design-system/media/media-card';
import { PageContainer } from '@/components/design-system/layout/page-container';

const categories = ['همه', 'پادکست', 'ویدیو', 'کتاب صوتی', 'کوتاه', 'زنده/جامعه'];

const continueItems = [
  {
    title: 'پادکست «نیمه شب با آذر»',
    creator: 'آذر شریفی',
    type: 'پادکست',
    progress: '۴۲٪',
    accent: 'from-violet-500/20 via-purple-500/10 to-transparent',
  },
  {
    title: 'ویدیوی «درک تجربه‌ی مدرن»',
    creator: 'سارا نوری',
    type: 'ویدیو',
    progress: '۱۸٪',
    accent: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    title: 'کتاب صوتی «شهر روشن»',
    creator: 'نیلوفر آذری',
    type: 'کتاب صوتی',
    progress: '۶۷٪',
    accent: 'from-cyan-500/20 via-sky-500/10 to-transparent',
  },
];

const shelves = [
  { title: 'در حال داغ شدن', items: [{ label: 'چالش‌های طراحی هوشمند', meta: '۸۵k بازدید' }, { label: 'خاطرات صوتی', meta: '۳۲k بازدید' }, { label: 'پادکست‌های تازه', meta: '۱۶k بازدید' }] },
  { title: 'برای تو', items: [{ label: 'سفر در صدای شب', meta: 'پیشنهاد شخصی' }, { label: 'نکات داستان‌نویسی', meta: 'نسبتاً محبوب' }, { label: 'تجربه‌های ویدیویی', meta: 'محبوب در جامعه' }] },
  { title: 'انتشارهای جدید', items: [{ label: 'کالبدشکافی تجربه', meta: 'انتشار امروز' }, { label: 'آلبوم صوتی', meta: 'منتشر شده' }, { label: 'پخش زنده', meta: 'در حال برگزاری' }] },
];

const podcastHighlights = [
  { title: 'شب‌های روشن', creator: 'آرمان و لادن', duration: '۴۵ دقیقه', badge: 'جدید' },
  { title: 'مکالمه‌ی عصر', creator: 'سارا پناهی', duration: '۳۲ دقیقه', badge: 'پربحث' },
  { title: 'کلاس‌های صوتی', creator: 'میثاق پویان', duration: '۲۱ دقیقه', badge: 'ترند' },
];

const videoHighlights = [
  { title: 'تجربه‌ی ساختن حس', creator: 'رها خانی', duration: '۱۲ دقیقه', views: '۱۲k بازدید' },
  { title: 'از ایده تا روایت', creator: 'مینا طاهری', duration: '۱۸ دقیقه', views: '۷.۸k بازدید' },
  { title: 'حس آرامش در تصویر', creator: 'نرگس احمدی', duration: '۱۰ دقیقه', views: '۴.۹k بازدید' },
];

const audiobookHighlights = [
  { title: 'شهرِ بی‌نیمه', author: 'آرزو قادری', narrator: 'نرگس یگانه', progress: '۳ فصل مانده' },
  { title: 'خطوط روشن', author: 'حامد ثابت', narrator: 'مانا افشار', progress: '۵ فصل مانده' },
  { title: 'خانه‌ی آرام', author: 'ساغر بانو', narrator: 'پوریا زارعی', progress: '۲ فصل مانده' },
];

const shorts = [
  { title: 'لحظه‌ی شفابخش', creator: 'آرین', duration: '۰۲:۱۴', likes: '۳.۱k' },
  { title: 'چرا این تجربه متفاوت است؟', creator: 'بهرام', duration: '۰۱:۵۳', likes: '۲.۳k' },
  { title: 'صدا در فضای خالی', creator: 'کیمیا', duration: '۰۳:۰۸', likes: '۱.۸k' },
];

const communityThreads = [
  { title: 'موضوعات پرطرفدار', description: 'چرا مردم امروز به صوت و تصویر اعتماد می‌کنند؟', members: '۲۴۸ نفر' },
  { title: 'بحث داغ', description: 'یک تجربه‌ی جدید برای شروعِ عصر', members: '۱۱۹ نفر' },
  { title: 'در حال رشد', description: 'ساعت‌های آرام به‌همراه روایت‌های کوتاه', members: '۸۳ نفر' },
];

const creators = [
  { name: 'آنا دُر', subtitle: '۳۳ اثر · ۱٫۲M دنبال‌کننده', accent: 'from-fuchsia-500/20 to-violet-500/10' },
  { name: 'سهراب مومنی', subtitle: '۲۱ اثر · ۸۹۰k دنبال‌کننده', accent: 'from-sky-500/20 to-cyan-500/10' },
  { name: 'لیلا راد', subtitle: '۱۴ اثر · ۵۶۰k دنبال‌کننده', accent: 'from-amber-500/20 to-orange-500/10' },
];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
}

export function HomePage() {
  return (
    <main className="page-container" aria-label="Home">
      <PageContainer>
        <section className="rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6 lg:p-8">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-accent/20 bg-accent/10 text-accent">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Castaminofen</p>
                <h1 className="text-lg font-semibold text-text-primary">خوش آمدی</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface-card/80 text-text-secondary">
                <Search className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface-card/80 text-text-secondary">
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="mt-5 rounded-[1.75rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-card/80 to-surface-secondary p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                  <Sparkles className="h-4 w-4" />
                  تجربه‌ی شخصیِ امروز
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">در این فضا، مسیر بعدی‌ات را با صدای درست پیدا کن.</h2>
                  <p className="text-sm leading-7 text-text-secondary sm:text-base">پادکست، ویدیو، کتاب صوتی و گفتگوهای جامعه در یک تجربه‌ی واحد و لوکس کنار هم آمده‌اند.</p>
                </div>
              </div>
              <Button variant="primary" className="w-fit gap-2">
                ادامه‌ی سفر
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <section className="mt-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium transition ${index === 0 ? 'border-accent/20 bg-accent/10 text-accent' : 'border-border/70 bg-surface-card/80 text-text-secondary'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="overflow-hidden rounded-[1.85rem] border border-border/80 bg-surface-card/90 shadow-soft">
              <div className="flex items-center justify-between border-b border-border/70 bg-surface-secondary/60 px-4 py-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">Featured</p>
                  <h3 className="text-base font-semibold text-text-primary">محور اصلیِ کشف</h3>
                </div>
                <div className="rounded-full border border-border/70 bg-surface-card/80 px-2.5 py-1 text-[11px] font-medium text-text-secondary">ترند</div>
              </div>
              <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[240px] overflow-hidden rounded-[1.45rem] border border-border/70">
                  <ContentArtwork src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80" alt="Featured premium media artwork" fallback="C" className="h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted">پادکست منتخب</p>
                      <h4 className="text-lg font-semibold text-accent-foreground">فصل جدیدِ روایت‌های عمیق</h4>
                    </div>
                    <button className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
                      <Play className="ml-0.5 h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface-secondary/80 px-3 py-1 text-sm text-text-secondary">
                      <Mic2 className="h-4 w-4 text-accent" />
                      روایت‌های شخصی و حرفه‌ای
                    </div>
                    <h4 className="text-xl font-semibold text-text-primary">در این بخش، محتوای پرارزش با لحن سینمایی و حس شخصی ارائه می‌شود.</h4>
                    <p className="text-sm leading-7 text-text-secondary">از گفتگوهای عمیق تا روایت‌های کوتاه، همه در بستری طراحی‌شده برای کشف آرام و هوشمند قرار گرفته‌اند.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" className="gap-2">
                      <BookmarkPlus className="h-4 w-4" />
                      ذخیره
                    </Button>
                    <Button variant="ghost" className="gap-2 text-accent">
                      <Compass className="h-4 w-4" />
                      کشف بیشتر
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            <div className="flex flex-col gap-3">
              {continueItems.map((item) => (
                <div key={item.title} className={`rounded-[1.45rem] border border-border/80 bg-gradient-to-r ${item.accent} p-4 shadow-soft`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface-card/70 px-2.5 py-1 text-[11px] font-medium text-text-secondary">
                        {item.type}
                      </div>
                      <h4 className="text-base font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.creator}</p>
                    </div>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface-card/80 text-accent">
                      <Play className="ml-0.5 h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
                    <span>پیشرفت: {item.progress}</span>
                    <span>ادامه دهید</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Continue" title="ادامه‌ی تجربه" description="از همان نقطه‌ای که متوقف شدی، دوباره وارد جریان شو." />
            <div className="grid gap-3 md:grid-cols-3">
              {continueItems.map((item) => (
                <MediaCard key={item.title} title={item.title} subtitle={item.creator} meta={item.type} className="h-full">
                  <div className="flex items-center justify-between gap-2 text-sm text-text-secondary">
                    <span>{item.progress} تکمیل</span>
                    <button className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface-secondary/80 px-2.5 py-1 text-xs font-medium text-accent">
                      <Play className="h-3 w-3" />
                      resume
                    </button>
                  </div>
                </MediaCard>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Discovery" title="فهرست‌های شخصی" description="برای هر نوع تجربه، یک مسیرِ جدا و منسجم طراحی شده است." />
            <div className="grid gap-4 lg:grid-cols-3">
              {shelves.map((shelf) => (
                <div key={shelf.title} className="rounded-[1.5rem] border border-border/80 bg-surface-card/80 p-4 shadow-soft">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-text-primary">{shelf.title}</h3>
                    <button className="text-sm text-accent">مشاهده</button>
                  </div>
                  <div className="space-y-2">
                    {shelf.items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-surface-secondary/70 px-3 py-3">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{item.label}</p>
                          <p className="text-xs text-text-secondary">{item.meta}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-text-secondary" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Podcast" title="پادکست" description="مکالمه‌های عمیق و روایت‌های تازه برای تجربه‌ی شنیداریِ لوکس." />
            <div className="grid gap-3 md:grid-cols-3">
              {podcastHighlights.map((item) => (
                <MediaCard key={item.title} title={item.title} subtitle={item.creator} meta={item.badge} className="h-full">
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-1"><Radio className="h-4 w-4" />{item.duration}</span>
                    <button className="text-accent">پخش</button>
                  </div>
                </MediaCard>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Video" title="ویدیو" description="تجربه‌های تصویری، آموزشی و خلاقانه برای کشف سریع." />
            <div className="grid gap-3 md:grid-cols-3">
              {videoHighlights.map((item) => (
                <MediaCard key={item.title} title={item.title} subtitle={item.creator} meta={item.views} className="h-full">
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-1"><Video className="h-4 w-4" />{item.duration}</span>
                    <button className="text-accent">مشاهده</button>
                  </div>
                </MediaCard>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Audiobook" title="کتاب صوتی" description="ارائه‌ی ادبی و مدرن برای لحظه‌های آرام و ماندگار." />
            <div className="grid gap-3 md:grid-cols-3">
              {audiobookHighlights.map((item) => (
                <MediaCard key={item.title} title={item.title} subtitle={`${item.author} · ${item.narrator}`} meta={item.progress} className="h-full">
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" />{item.progress}</span>
                    <button className="text-accent">شنیدن</button>
                  </div>
                </MediaCard>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Shorts" title="کوتاه" description="تجربه‌ی سریع برای کشف لحظه‌های جذاب و پرانرژی." />
            <div className="space-y-3">
              {shorts.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-[1.35rem] border border-border/80 bg-surface-card/80 px-4 py-3 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-accent/10 text-accent">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.creator} · {item.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Heart className="h-4 w-4" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Community" title="جامعه" description="پیش‌نمایش تجربه‌ی مشارکتی و هم‌خوانی با مخاطبان." />
            <div className="grid gap-3 lg:grid-cols-3">
              {communityThreads.map((thread) => (
                <MediaCard key={thread.title} title={thread.title} subtitle={thread.description} meta={thread.members} className="h-full">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MessageCircle className="h-4 w-4" />
                    <span>در حال رشد</span>
                  </div>
                </MediaCard>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <SectionTitle eyebrow="Creators" title="سازندگان" description="مخاطبان می‌توانند با صداهای تازه، آثار و هویت‌های خلاقانه آشنا شوند." />
            <div className="grid gap-3 md:grid-cols-3">
              {creators.map((creator) => (
                <CreatorCard key={creator.name} name={creator.name} subtitle={creator.subtitle} className={`bg-gradient-to-br ${creator.accent}`}>
                  <button className="rounded-full border border-border/70 bg-surface-card/80 px-3 py-2 text-sm font-medium text-accent">دنبال کردن</button>
                </CreatorCard>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[1.6rem] border border-border/80 bg-surface-card/80 p-4 shadow-soft sm:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Library</p>
                <h3 className="text-xl font-semibold text-text-primary">کتابخانه‌ی شخصی</h3>
                <p className="text-sm text-text-secondary">برچسب‌ها، موارد ذخیره‌شده و تاریخچه در یک پل ارتباطی ساده نزدیک‌تر می‌شوند.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/library" className="inline-flex">
                  <Button variant="secondary">علاقه‌مندی‌ها</Button>
                </Link>
                <Link href="/community" className="inline-flex">
                  <Button variant="ghost">جامعه</Button>
                </Link>
              </div>
            </div>
          </section>
        </section>
      </PageContainer>
    </main>
  );
}
