# معماری فعلی Castaminofen

این سند بر اساس واقعیت کد و ساختار فعلی مخزن نوشته شده است و جایگزین نسخه‌های قدیمی‌ترِ مبتنی بر برنامه‌ریزی خالص شده است.

## خلاصه اجرایی

ریپو در حال حاضر یک مونو ریپو موبایل‌فرست برای پلتفرم پادکست است که شامل یک اپ فرانت‌اند با Next.js، یک اپ بک‌اند با NestJS، Prisma و زیرساخت‌های محلی PostgreSQL/Redis/MinIO می‌شود. پیاده‌سازی فعلی از احراز هویت، مدیریت پادکست و اپیزود، RSS ingestion و sync، Library، Playlist، Player و چندین سطح UI feature-owned پشتیبانی می‌کند.

## نمای کلی معماری

```text
Next.js Web App -> NestJS API -> Prisma -> PostgreSQL
                     |                  |
                     +-> RSS services   +-> Redis / MinIO
```

## ساختار فعلی مخزن

- فرانت‌اند: [apps/web/src](../../apps/web/src)
- بک‌اند: [apps/api/src](../../apps/api/src)
- اسکیمای دیتابیس: [apps/api/prisma/schema.prisma](../../apps/api/prisma/schema.prisma)
- لایه‌ی shell برنامه: [apps/web/src/app/layout.tsx](../../apps/web/src/app/layout.tsx)
- ماژول auth: [apps/api/src/auth](../../apps/api/src/auth)
- ماژول RSS: [apps/api/src/rss](../../apps/api/src/rss)
- Player runtime: [apps/web/src/features/player](../../apps/web/src/features/player)

## حدود مالکیت فعلی

- ورود و مسیرهای صفحه در فرانت‌اند در [apps/web/src/app](../../apps/web/src/app) قرار دارند.
- منطق و UI featureها در [apps/web/src/features](../../apps/web/src/features) نگهداری می‌شوند.
- APIها در پوشه‌های domain-based زیر [apps/api/src](../../apps/api/src) پیاده‌سازی شده‌اند.
- Prisma در [apps/api/prisma/schema.prisma](../../apps/api/prisma/schema.prisma) هسته‌ی داده را تعریف می‌کند.

## دامنه‌های کسب‌وکار فعلی

- احراز هویت و مدیریت کاربر
- پادکست و اپیزود
- Library و Listening History
- Playlist
- Player با Queue/Repeat/Shuffle و persistence
- RSS sync و feed-source management
- تجربه‌های feature-owned UI برای Community/Creator/Admin

## نقاط پرریسک

- خط لوله‌ی آفلاین و دانلود رسانه هنوز کامل و production-ready نیست.
- بخش زیادی از تجربه‌های Community/Creator/Admin UI-only و mock-backed هستند.
- مستندات تاریخی زیاد هستند و باید به‌عنوان archive استفاده شوند نه به‌عنوان منبع اصلی.

## سطح اعتماد

- سطح اعتماد به معماری فعلی: بالاتر از متوسط
- دلیل: ساختار واقعی در کد، Prisma schema و تست‌های API/وب با موفقیت اجرا شده‌اند.
