# FOUNDATION.AUTH.VALIDATION.1 — Auth Flow End-to-End Validation

## نتیجه کلی

- وضعیت احراز هویت در محیط اجرای محلی با موفقیت تأیید شد.
- هیچ خطای بلوکی در جریان ثبت‌نام، ورود، دسترسی به مسیر محافظت‌شده، خروج و refresh مشاهده نشد.
- بر اساس این اعتبارسنجی، تغییرات مربوط به FOUNDATION.AUTH.1 در سطح runtime برای سناریوهای مرورگر اصلی قابل قبول است و نیاز به اصلاح معماری/پیاده‌سازی در این مرحله وجود ندارد.

## Test Environment

- سیستم عامل: Ubuntu 24.04.4 LTS (dev container)
- مرورگر: Chromium headless از Playwright
- viewport آزمایشی: 390x844 (mobile-first)
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api/v1
- سرویس‌های محلی: PostgreSQL، Redis و MinIO از طریق Docker Compose
- تاریخ اجرا: 2026-07-31
- دستورهای اصلی اجرا شده:
  - `docker compose up -d`
  - `pnpm --filter @castaminofen/api build`
  - `pnpm --filter @castaminofen/web build`
  - `pnpm dev:api`
  - `pnpm dev:web`
  - اجرای اسکریپت Playwright برای سناریوهای ثبت‌نام، ورود، خروج و refresh

## Browser Scenarios

1. First Visit Experience
   - باز کردن صفحه اصلی در جلسه جدید بدون session/token
   - انتظار: مشاهده onboarding/welcome experience

2. Signup Flow
   - باز کردن صفحه ثبت‌نام
   - تکمیل فرم ثبت‌نام
   - تأیید انتقال به صفحه پروفایل و بارگذاری داده کاربر

3. Login Flow
   - ورود به حساب کاربری موجود
   - تأیید دسترسی به مسیر محافظت‌شده

4. Protected Route Behavior
   - دسترسی مستقیم به /profile بدون auth
   - دسترسی مستقیم به /profile با auth

5. Logout Flow
   - خروج از حساب کاربری
   - تأیید حذف دسترسی به مسیرهای محافظت‌شده

6. Refresh Persistence
   - refresh صفحه در حالت authenticated
   - تأیید ماندگاری session بدون خطای موقتی

## Passed Cases

- First visit: صفحه‌ی اصلی در حالت بدون auth، نمایش تجربه‌ی onboarding را نشان داد و بدون redirect loop، flash صفحه‌ی اشتباه، یا پیام unauthorized مواجه شد.
- Signup flow: ثبت‌نام با موفقیت انجام شد، کاربر به مسیر /profile هدایت شد، محتوای پروفایل نمایش داده شد و پس از refresh، کاربر همچنان authenticated باقی ماند.
- Login flow: ورود با موفقیت انجام شد، مسیر /profile به‌درستی در دسترس قرار گرفت و هیچ race condition یا redirect نامناسبی مشاهده نشد.
- Protected route behavior: در حالت بدون auth، دسترسی مستقیم به /profile منجر به ورود به تجربه‌ی login شد؛ در حالت authenticated، صفحه‌ی پروفایل به‌طور عادی render شد.
- Logout flow: خروج باعث انتقال به صفحه‌ی login شد و دسترسی به مسیر محافظت‌شده بعد از logout دیگر برقرار نشد.
- Refresh persistence: بعد از refresh روی /profile، کاربر دوباره به‌صورت authenticated در صفحه باقی ماند و هیچ flicker موقتی یا خطای ورود مشاهده نشد.

## Failed Cases

- در سطح رفتار برنامه‌ای، هیچ خطای احراز هویت در سناریوهای اصلی مشاهده نشد.
- در مرحله راه‌اندازی محیط مرورگر، ابتدا اجرای Playwright به دلیل نبود کتابخانه‌های سیستم برای Chromium با خطا مواجه شد؛ این مشکل با نصب وابستگی‌های لازم در container برطرف شد.

## Screenshots/Logs if needed

- اسکرین‌شات فایل جداگانه ایجاد نشد؛ اما خروجی‌های معتبر از اجرای Playwright شامل موارد زیر بود:
  - متن صفحه اول بازدید: «برای شروع، فقط یک گوش دادن ساده کافی است»
  - URL بعد از ثبت‌نام: http://localhost:3000/profile
  - URL بعد از خروج: http://localhost:3000/login
  - URL بعد از ورود و بازدید /profile: http://localhost:3000/profile
- این خروجی‌ها در Terminal و output اجرای Playwright ثبت شدند و به‌عنوان شواهد اعتبارسنجی استفاده شدند.

## Remaining Risks

- این اعتبارسنجی در محیط local و با Chromium headless انجام شد؛ بنابراین رفتار در Safari، Chrome mobile واقعی و دستگاه‌های فیزیکی هنوز تست نشده است.
- مدل auth فعلی هنوز مبتنی بر state client-side و route-based است؛ بنابراین رفتار refresh/session باید در آینده با دقت بیشتری پایش شود.
- هنوز یک تست خودکار end-to-end برای این مسیرها در مخزن وجود ندارد و افزودن آن می‌تواند پوشش رگرسیون را بهتر کند.

## Recommendation

- بر اساس این validation، هیچ تغییر پیاده‌سازی یا معماری برای رفع مشکل فعلی لازم نیست.
- ساختار فعلی auth می‌تواند بدون تغییر حفظ شود.
- برای افزایش اطمینان، توصیه می‌شود در فاز بعدی یک تست Playwright سبک برای سناریوهای ثبت‌نام، ورود، خروج و refresh اضافه شود تا این مسیرها به‌صورت خودکار پوشش داده شوند.
