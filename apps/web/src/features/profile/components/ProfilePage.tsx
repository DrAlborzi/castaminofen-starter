'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { ProfileActivityTimeline } from './ProfileActivityTimeline';
import { ProfileContributionSection } from './ProfileContributionSection';
import { ProfileCreatorEntry } from './ProfileCreatorEntry';
import { ProfileFavoriteUniverse } from './ProfileFavoriteUniverse';
import { ProfileHero } from './ProfileHero';
import { ProfileInterestTags } from './ProfileInterestTags';
import { ProfileJourneyStats } from './ProfileJourneyStats';
import { ProfileKnowledgeSection } from './ProfileKnowledgeSection';
import { ProfilePersonalCollections } from './ProfilePersonalCollections';
import { ProfileContinueJourney } from './ProfileContinueJourney';
import { ProfileAchievements } from './ProfileAchievements';
import { ProfileSocialIdentity } from './ProfileSocialIdentity';
import { mockProfileExperience } from '../data/mockProfileExperience';

export function formatAccountDate(value?: string) {
  if (!value) {
    return '—';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '—';
  }

  return parsedDate.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function normalizeProfileName(rawValue: string) {
  return rawValue.trim();
}

export function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const displayName = useMemo(
    () => user?.name?.trim() || user?.email?.split('@')[0] || 'کاربر',
    [user],
  );
  const isAuthenticated = Boolean(user);

  async function handleLogout() {
    await logoutUser();
    router.push('/login');
  }

  return (
    <main className="page-container">
      <PageContainer>
        <section className="space-y-6">
          <ProfileHero profile={{
            ...mockProfileExperience.profile,
            displayName,
            username: user?.email ? `@${user.email.split('@')[0]}` : mockProfileExperience.profile.username,
            bio: user?.name ? `این پروفایل برای ${user.name} در Castaminofen ساخته شده است.` : mockProfileExperience.profile.bio,
            followers: mockProfileExperience.profile.followers,
            following: mockProfileExperience.profile.following,
          }} mode={isAuthenticated ? 'owner' : 'viewer'} />

          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-caption uppercase tracking-[0.24em] text-accent">پروفایل</p>
                <h2 className="mt-1 text-2xl font-semibold text-text-primary">هویت، سفر و حضور تو در Castaminofen</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">هر بخش از این پروفایل نشانه‌ای از مسیر شنیداری، خلاقیت و جامعه‌ی توست. اینجا روایت می‌شود چه کسی هستی و به کجا می‌روی.</p>
              </div>
              <div className="grid gap-2 sm:auto-cols-min sm:grid-flow-col">
                <Button type="button" variant="secondary" size="sm">فالووهای جدید</Button>
                <Button type="button" variant="ghost" size="sm">نمایش هفتگی</Button>
              </div>
            </div>

            <ProfileJourneyStats stats={mockProfileExperience.stats} />
          </section>

          <ProfileContinueJourney journeys={mockProfileExperience.journeyCards} />

          <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4">
              <ProfileKnowledgeSection memories={mockProfileExperience.memories} collections={mockProfileExperience.collections} />
              <ProfileFavoriteUniverse favorites={mockProfileExperience.favorites} />
              <ProfileAchievements achievements={mockProfileExperience.achievements} />
            </div>
            <div className="space-y-4">
              <ProfileCreatorEntry
                overview={mockProfileExperience.creatorOverview}
                drafts={mockProfileExperience.creatorDrafts}
                published={mockProfileExperience.creatorPublished}
              />
              <ProfileInterestTags interests={mockProfileExperience.interests} />
              <ProfilePersonalCollections collections={mockProfileExperience.libraryLinks} />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <ProfileActivityTimeline activities={mockProfileExperience.activities} />
              <ProfileContributionSection contributions={mockProfileExperience.contributions} />
            </div>
            <ProfileSocialIdentity groups={mockProfileExperience.socialGroups} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-card to-surface-secondary p-5 shadow-soft sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-caption">هویت سازنده</p>
                  <h2 className="text-heading text-lg">به‌زودی، صدایت در Castaminofen شنیده می‌شود</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">از پیش‌نویس‌ها، آثار منتشرشده و مسیرهای رشد برای ساختن یک هویت خلاقانه استفاده کن.</p>
                </div>
                <Button type="button" variant="primary">
                  ساختن اولین محتوا
                </Button>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="rounded-[1.25rem] border border-border/70 bg-surface-card/80 p-4">
                  <p className="text-sm font-semibold text-text-primary">پیش‌نویس‌های آماده</p>
                  <p className="mt-2 text-sm text-text-secondary">۳ یادداشت و ۲ پیشنهاد برای شروع</p>
                </div>
                <div className="rounded-[1.25rem] border border-border/70 bg-surface-card/80 p-4">
                  <p className="text-sm font-semibold text-text-primary">آثار منتشرشده</p>
                  <p className="mt-2 text-sm text-text-secondary">۱ پادکست و ۴ ویدیو در مسیر رشد</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-5 shadow-soft sm:p-6">
              <p className="text-caption">عضویت ممتاز</p>
              <h2 className="text-heading text-lg">پلتفرمِ شخصی‌سازی‌شده برای مسیرهای بعدی</h2>
              <p className="mt-2 text-sm leading-7 text-text-secondary">نسخه‌ی آینده‌ی Castaminofen، دسترسی به تجربه‌های ویژه، دسترسی زودهنگام و ابزارهای رشد را برایت آماده می‌کند.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-border/70 bg-surface-card px-3 py-1 text-sm text-text-secondary">پلان فعلی: پرمیوم</span>
                <span className="rounded-full border border-border/70 bg-surface-card px-3 py-1 text-sm text-text-secondary">مزایا: دسترسی سریع و تجربه‌ی بدون وقفه</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button type="button" variant="secondary" onClick={() => router.push('/settings')}>
                  تنظیمات حساب
                </Button>
                <Button type="button" variant="ghost" onClick={() => router.push('/library')}>
                  کتابخانه
                </Button>
                <Button type="button" variant="secondary" onClick={handleLogout} disabled={!isAuthenticated}>
                  خروج
                </Button>
              </div>
            </section>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}

export default ProfilePage;
