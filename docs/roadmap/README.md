# نقشه راه معتبر Castaminofen

این سند بر اساس کد و وضعیت فعلی مخزن بازسازی شده است. مواردی که در مستندات قدیمی مطرح شده‌اند اما در پیاده‌سازی فعلی وجود ندارند به‌صورت صریح به عنوان «پلان/آینده» ثبت شده‌اند.

## Milestones تکمیل‌شده

### 1) Foundation و MVP Core
- وضعیت: تکمیل‌شده
- شواهد: [apps/api/src/app.module.ts](../../apps/api/src/app.module.ts), [apps/api/prisma/schema.prisma](../../apps/api/prisma/schema.prisma), [apps/web/src/app/layout.tsx](../../apps/web/src/app/layout.tsx)
- پوشش: ساختار مونو ریپو، auth، podcasts، episodes، library، playlists، player، RSS sync

### 2) RSS Ingestion و FeedSource Management
- وضعیت: تکمیل‌شده تا سطح MVP
- شواهد: [apps/api/src/rss](../../apps/api/src/rss), [apps/api/src/rss/synchronization/synchronization.service.ts](../../apps/api/src/rss/synchronization/synchronization.service.ts)
- پوشش: fetch/parse/normalize/match/persist/sync state

### 3) Player Runtime و Queue
- وضعیت: تکمیل‌شده
- شواهد: [apps/web/src/features/player](../../apps/web/src/features/player)
- پوشش: queue, repeat, shuffle, persistence, UI shell

## Milestone فعلی

### 4) Frontend product surfaces و UX polish
- وضعیت: در حال تکمیل/تکمیل‌شده به‌صورت feature-owned UI
- شواهد: [apps/web/src/features/community](../../apps/web/src/features/community), [apps/web/src/features/creator](../../apps/web/src/features/creator), [apps/web/src/features/admin](../../apps/web/src/features/admin)
- نکته: این تجربه‌ها بیشتر UI-only و mock-backed هستند و هنوز از APIهای واقعی پشتیبانی نمی‌کنند.

## Milestones بعدی

### 5) Offline playback و media pipeline
- وضعیت: برنامه‌ریزی/نیمه‌پیشرفته
- نیاز: پیاده‌سازی real download/cache/playback pipeline
- اولویت: بالا

### 6) Production hardening و deployment automation
- وضعیت: برنامه‌ریزی
- نیاز: CI/CD، production env، monitoring، deployment workflow
- اولویت: بالا

### 7) Full backend integration برای Community/Creator/Admin
- وضعیت: برنامه‌ریزی
- نیاز: real APIs، authz، persistence، moderation و analytics
- اولویت: متوسط

## دسته‌بندی واضح

- تکمیل‌شده: auth, podcasts, episodes, library, playlists, player, RSS sync
- در حال کار: polish و integration برای experienceهای UI-heavy
- آینده: offline pipeline، deployment automation، real backend برای community/creator/admin

## پیشنهاد بعدی

به‌جای دنبال کردن نقشه راه قدیمی با فازهای بسیار قدیمی، پروژه باید روی این موارد تمرکز کند:
1. تکمیل pipeline آفلاین
2. مستحکم‌سازی CI/CD و deployment
3. اتصال تجربه‌های Community/Creator/Admin به APIهای واقعی
4. حفظ مرزهای feature ownership و runtime ownership
