'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { SectionHeader } from '@/components/design-system/layout/section-header';
import { ProfileActivityTimeline } from './ProfileActivityTimeline';
import { ProfileContributionSection } from './ProfileContributionSection';
import { ProfileContentCollection } from './ProfileContentCollection';
import { ProfileHero } from './ProfileHero';
import { ProfileKnowledgeSection } from './ProfileKnowledgeSection';
import { ProfileSocialIdentity } from './ProfileSocialIdentity';
import { ProfileStats } from './ProfileStats';
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

          <SectionHeader
            eyebrow="پروفایل"
            title="هویت شخصی، دانش و مشارکت"
            description="از لحظه‌های پخش، مسیرهای بازگشتی و تعاملات برای ساختن تصویری انسانی از خودت استفاده کن؛ هویت شما در اینجا دیده می‌شود و هر مشارکت، نشانه‌ی رشد و ادامه‌ی سفر است."
          />

          <ProfileStats stats={mockProfileExperience.stats} />

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <ProfileKnowledgeSection memories={mockProfileExperience.memories} collections={mockProfileExperience.collections} />
              <ProfileActivityTimeline activities={mockProfileExperience.activities} />
            </div>
            <div className="space-y-4">
              <ProfileContributionSection contributions={mockProfileExperience.contributions} />
              <ProfileSocialIdentity groups={mockProfileExperience.socialGroups} />
              <ProfileContentCollection items={mockProfileExperience.content} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-caption">کنترل‌های حساب</p>
                <h2 className="text-heading text-lg">موجودی برای ورود و مدیریت</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary" onClick={() => router.push('/settings')}>
                  تنظیمات
                </Button>
                <Button type="button" variant="ghost" onClick={() => router.push('/library')}>
                  کتابخانه
                </Button>
                <Button type="button" variant="secondary" onClick={handleLogout} disabled={!isAuthenticated}>
                  خروج
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}

export default ProfilePage;
