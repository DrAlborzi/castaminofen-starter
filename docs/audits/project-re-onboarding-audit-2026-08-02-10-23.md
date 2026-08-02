# گزارش Re-Onboarding و Architecture Audit پروژه Castaminofen

## 1. تاریخ و مشخصات بررسی

- تاریخ بررسی: 2026-08-02 10:23
- Repository root: /workspaces/castaminofen-starter
- Branch فعلی: main
- وضعیت Git: شاخه main در وضعیت upstream main قرار دارد و یک تغییر محلی در [pnpm-lock.yaml](pnpm-lock.yaml) ثبت شده است.
- Package manager: pnpm 10.32.1
- Workspaceها: [apps/web](apps/web) و [apps/api](apps/api) به‌عنوان اپ‌های اصلی، همراه با [packages/config](packages/config) و [packages/shared-types](packages/shared-types)

## 2. وضعیت فعلی Repository

- پروژه در وضعیت یک مونو-ریپو با دو اپ اصلی و یک لایه‌ی shared/package فعال است.
- فرانت‌اند بر پایه‌ی Next.js و App Router در [apps/web/src](apps/web/src) پیاده‌سازی شده است.
- بک‌اند بر پایه‌ی NestJS و Prisma در [apps/api/src](apps/api/src) پیاده‌سازی شده است.
- مستندات و گزارش‌های فازها در [docs](docs) قرار دارند و نقش مهمی در فهم معماری فعلی دارند.
- در این بازبینی، هیچ تغییر کد یا ساختاری انجام نشد و خروجی فقط این گزارش است.

## 3. خلاصه اجرایی

- Castaminofen در این ریپو یک محصول MVP با تجربه‌ی کامل‌تر و چند لایه‌ی feature-oriented است؛ نه یک پروژه خالی یا اولیه.
- معماری فعلی عمدتاً با مستندات هم‌راستا است، اما در چند حوزه مرز مالکیت هنوز به‌صورت کامل تثبیت نشده است.
- بیشترین نقاط باقی‌مانده‌ی غیرشفاف، مربوط به Episode ownership، Player boundary و بخشی از Auth transport در لایه‌ی shared است.
- این بازبینی بر اساس کد جاری، ساختار پوشه‌ها، مستندات فعلی و گزارش‌های قبلی انجام شده است.

## 4. قوانین پروژه و Instructionها

### MUST

- رعایت Feature-Based Architecture و حفظ مرزهای feature در فرانت‌اند و بک‌اند.
- حفظ اصل ساده‌سازی، عدم اضافه‌کردن abstraction بی‌دلیل، و پیروی از TypeScript Strict.
- نگه‌داشتن مرزهای shared UI و shared infrastructure در حد لازم.
- رعایت مستندات پروژه در [docs/architecture.md](docs/architecture.md)، [docs/folder-structure.md](docs/folder-structure.md) و [docs/tech-stack.md](docs/tech-stack.md) به‌عنوان منبع اصلی.
- انجام validation قبل از تکمیل هر فاز و ثبت مستندات مرتبط.

### SHOULD

- استفاده از feature folders برای منطق و UI مرتبط با feature.
- نگه‌داشتن routeها به‌عنوان entry point سبک و اجتناب از orchestration بیش از حد در سطح route.
- استفاده از shared primitives برای UI و shared infra برای plumbing مشترک.

### MAY

- استفاده از مهاجرت تدریجی برای تثبیت مرزها در صورت نیاز.
- نگه‌داشتن لایه‌ی shared برای ابزارهای عمومی و transport مشترک.

### FORBIDDEN

- انتقال بی‌دلیل منطق feature به shared layer.
- ایجاد abstractionهای جدید بدون نیاز واقعی و بدون مستندات.
- حذف یا بازنویسی مرزهای تثبیت‌شده بدون شواهد و برنامه‌ی روشن.
- نادیده‌گرفتن قراردادهای موجود در API و ownershipهای تثبیت‌شده.

## 5. درک محصول

Castaminofen یک پلتفرم موبایل‌فرست برای پادکست است که تجربه‌ی اصلی کاربر را در چند حوزه پوشش می‌دهد:

- احراز هویت و مدیریت حساب کاربری
- کشف و مرور پادکست و اپیزود
- جستجو و discovery
- Library و Continue Listening
- Playlist و Player
- تجربه‌ی Creator و Community در سطح UI و feature-oriented

از دید محصول، این پروژه در حال حاضر بیشتر روی تجربه‌ی مصرف‌کننده‌ی پادکست و تجربه‌ی کاربری Premium برای موبایل تمرکز دارد، نه فقط روی یک player ساده.

## 6. درک معماری فعلی

معماری فعلی یک مدل ترکیبی است:

- Frontend: Next.js App Router با ساختار feature-based و لایه‌ی shared برای زیرساخت مشترک.
- Backend: NestJS با feature-based folders و service/controller/domain separation در سطح ماژول‌های فعلی.
- State: Zustand برای stateهای سراسری مثل auth و player؛ React Query برای server state.
- Data access: در فرانت‌اند، لایه‌ی shared/lib و feature hooks به‌صورت هم‌پوشان در حال کار هستند.

الگوی کلی قابل‌تشخیص در کد فعلی این است:

- [apps/web/src/app](apps/web/src/app): entry pointهای route و page composition
- [apps/web/src/features](apps/web/src/features): مالکیت UI و منطق featureها
- [apps/web/src/components](apps/web/src/components): shared UI primitives و layout
- [apps/web/src/shared](apps/web/src/shared): shared infrastructure و transport
- [apps/web/src/stores](apps/web/src/stores): stateهای سراسری
- [apps/api/src](apps/api/src): controller/service/DTO در پوشه‌های feature-based فعلی

## 7. ساختار Repository

### Frontend

- [apps/web/src/app](apps/web/src/app): مسیرهای اصلی مثل login، register، podcasts، episodes، library، search، profile و settings
- [apps/web/src/features](apps/web/src/features): featureهای auth، podcasts، episodes، player، library، playlist، search، creator، community، profile، settings و admin
- [apps/web/src/components](apps/web/src/components): UI primitives، layout و shared components
- [apps/web/src/shared](apps/web/src/shared): shared infra مثل api client و error handling
- [apps/web/src/stores](apps/web/src/stores): Zustand stores برای auth و player

### Backend

- [apps/api/src/auth](apps/api/src/auth): احراز هویت
- [apps/api/src/podcasts](apps/api/src/podcasts): podcast domain
- [apps/api/src/episodes](apps/api/src/episodes): episode domain
- [apps/api/src/library](apps/api/src/library): library domain
- [apps/api/src/playlists](apps/api/src/playlists): playlist domain
- [apps/api/src/rss](apps/api/src/rss): ingestion و sync
- [apps/api/src/storage](apps/api/src/storage): storage abstraction

## 8. Technology Stack

| Area | Documented | Actual | Status |
| ---- | ---------- | ------ | ------ |
| Frontend | Next.js, React, TypeScript, Tailwind, Zustand, TanStack Query, React Hook Form, Zod | در [apps/web/package.json](apps/web/package.json) مشاهده می‌شود | MATCH |
| Backend | NestJS, Prisma, PostgreSQL, Redis, MinIO | در [apps/api/package.json](apps/api/package.json) و [apps/api/src](apps/api/src) مشاهده می‌شود | PARTIAL |
| Package Manager | pnpm | در [package.json](package.json) و [pnpm-workspace.yaml](pnpm-workspace.yaml) مشاهده می‌شود | MATCH |
| State Management | Zustand + React Query | در [apps/web/src/stores](apps/web/src/stores) و [apps/web/src/features](apps/web/src/features) مشاهده می‌شود | MATCH |
| Forms & Validation | React Hook Form + Zod | در featureهای auth و podcast/episode دیده می‌شود | MATCH |
| Infrastructure | Docker Compose, Prisma, storage services | در [docker-compose.yml](docker-compose.yml) و [apps/api/prisma](apps/api/prisma) مشاهده می‌شود | PARTIAL |

## 9. Feature Ownership

| Feature | Route Owner | Feature Owner | State Owner | Data Owner | Status |
| ------- | ----------- | ------------- | ----------- | ---------- | ------ |
| Auth | [apps/web/src/app/login](apps/web/src/app/login) و [apps/web/src/app/register](apps/web/src/app/register) | [apps/web/src/features/auth](apps/web/src/features/auth) | [apps/web/src/stores/authStore.ts](apps/web/src/stores/authStore.ts) | [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts) و [apps/api/src/auth](apps/api/src/auth) | PARTIAL |
| Podcast | [apps/web/src/app/podcasts](apps/web/src/app/podcasts) | [apps/web/src/features/podcasts](apps/web/src/features/podcasts) | feature hooks و component state | [apps/web/src/lib/podcasts.ts](apps/web/src/lib/podcasts.ts) و [apps/api/src/podcasts](apps/api/src/podcasts) | GOOD |
| Episode | [apps/web/src/app/episodes](apps/web/src/app/episodes) | [apps/web/src/features/episodes](apps/web/src/features/episodes) | feature hooks و upload hooks | [apps/web/src/lib/episodes.ts](apps/web/src/lib/episodes.ts) و [apps/api/src/episodes](apps/api/src/episodes) | PARTIAL |
| Player | [apps/web/src/app](apps/web/src/app) به‌صورت غیرمستقیم | [apps/web/src/features/player](apps/web/src/features/player) | [apps/web/src/features/player/store](apps/web/src/features/player/store) | [apps/web/src/features/player](apps/web/src/features/player) | PARTIAL |
| Library | [apps/web/src/app/library](apps/web/src/app/library) | [apps/web/src/features/library](apps/web/src/features/library) | feature hooks | [apps/api/src/library](apps/api/src/library) و shared data hooks | GOOD |
| Search | [apps/web/src/app/search](apps/web/src/app/search) | [apps/web/src/features/search](apps/web/src/features/search) | feature hookها | [apps/web/src/lib](apps/web/src/lib) و [apps/api/src](apps/api/src) | GOOD |
| Playlist | [apps/web/src/app/playlists](apps/web/src/app/playlists) | [apps/web/src/features/playlists](apps/web/src/features/playlists) | feature hooks | [apps/api/src/playlists](apps/api/src/playlists) | GOOD |
| Creator/Community/Admin | [apps/web/src/app/creator](apps/web/src/app/creator) و [apps/web/src/app/community](apps/web/src/app/community) | [apps/web/src/features/creator](apps/web/src/features/creator)، [apps/web/src/features/community](apps/web/src/features/community)، [apps/web/src/features/admin](apps/web/src/features/admin) | feature-local state | mock-backed UI و shared feature data | GOOD |

## 10. وضعیت Featureهای اصلی

| Feature | وضعیت | Ownership | Migration State | Risks |
| ------- | ----- | --------- | --------------- | ----- |
| Auth | در سطح MVP فعال و قابل استفاده | feature-owned UI + shared transport | PARTIAL | لایه‌ی auth transport هنوز در shared/lib باقی مانده است |
| Podcast | فعال و با ownership نسبتا واضح | feature-owned | GOOD | چند route هنوز مسئولیت‌های orchestration دارند |
| Episode | فعال اما هنوز در حال تثبیت ownership | feature-owned UI، route-level orchestration در بعضی صفحات | PARTIAL | بیشترین نقطه‌ی drift در این audit |
| Player | در حال تبدیل به feature بالغ | feature-owned runtime و UI | PARTIAL | مرز ownership و runtime integration هنوز کامل نیست |
| Library | فعال و نسبتا پایدار | feature-owned | GOOD | کمترین ریسک در این مجموعه |
| Search | فعال و از نظر UI/feature خوب | feature-owned | GOOD | وابستگی به shared data layer در حد قابل قبول |
| Playlist | فعال و از نظر ownership خوب | feature-owned | GOOD | نیاز به نگهداری مرزها در آینده |
| Creator/Community/Admin | UI-rich و feature-owned | feature-owned | GOOD | بیشتر mock-backed است و به‌صورت کامل به backend متصل نشده‌اند |

## 11. Migrationهای انجام‌شده

- مهاجرت auth boundary در فرانت‌اند تا حدی انجام شده است، اما هنوز بعضی transportها در لایه‌ی shared باقی مانده‌اند.
- Feature boundary در فرانت‌اند در بیشتر بخش‌ها تثبیت شده است؛ با این حال، Episode و Player هنوز در مسیر تکمیل مرزهای خود هستند.
- مهاجرت RSS ownership و playback integration در مستندات پروژه به‌عنوان تکمیل‌شده ثبت شده است و در کدهای جاری با بخش‌های RSS و Player هم‌پوشانی دارد.
- ساختار UI premium و design-system migration در مستندات پروژه به‌عنوان پیشرفت‌های قبلی ثبت شده است و در [apps/web/src/components/design-system](apps/web/src/components/design-system) و [apps/web/src/features](apps/web/src/features) مشاهده می‌شود.

## 12. Runtime و Validation

- در این بازبینی، اجرای runtime برنامه و تست‌های end-to-end انجام نشد.
- بنابراین، وضعیت runtime بر اساس استاتیک کد و مستندات قبلی ارزیابی شده است.
- مستندات پروژه در [docs/project-status.md](docs/project-status.md) گزارش می‌دهند که در فازهای قبلی build، lint و test وب با موفقیت انجام شده‌اند؛ اما این بازبینی، آن ادعاها را به‌عنوان نتیجه‌ی زنده‌ی فعلی تأیید نکرد.
- نتیجه‌ی این بخش: Runtime validation not available در این audit، و ارزیابی بر پایه‌ی inspection مستقیم کد و مستندات است.

## 13. UI / Design System

- لایه‌ی UI در [apps/web/src/components](apps/web/src/components) و [apps/web/src/components/design-system](apps/web/src/components/design-system) به‌صورت shared و reusable در حال کار است.
- featureهای مختلف مانند home، library، search و player از این لایه‌ی shared برای تجربه‌ی یکپارچه استفاده می‌کنند.
- با این حال، وضعیت UI به‌صورت Truly Shared نیست؛ بلکه Mixed است، چون بعضی componentهای feature-specific هنوز در خود featureها باقی مانده‌اند و بعضی shared primitives در سطح عام استفاده می‌شوند.
- جمع‌بندی: shared UI در این repo وجود دارد، اما مرزهای آن هنوز در همه‌ی حوزه‌ها کاملاً شفاف نیست.

## 14. Engineering Quality

- ساختار فعلی از نظر naming و folder organization نسبتاً منظم است.
- TypeScript و feature-based structure در اکثریت موارد رعایت شده‌اند.
- با این حال، چند نقطه‌ی قابل‌توجه در کیفیت معماری وجود دارد:
  - route-level orchestration در برخی صفحه‌های podcast و episode
  - mixed ownership در auth transport
  - player boundary هنوز به‌صورت formal و fully stabilized در نیامده است
- این نقاط مانع از ایجاد یک architecture crisis نیستند، اما برای نگهداری بلندمدت باید با رویکرد تدریجی اصلاح شوند.

## 15. Context Drift

| Source | Conflict | Actual State | Interpretation |
| ------ | -------- | ------------ | -------------- |
| Documentation vs Code | در مستندات، backend معماری به‌صورت modules/ مطرح شده است | کد فعلی در [apps/api/src](apps/api/src) هنوز با پوشه‌های feature-based مستقیم کار می‌کند | معماری بک‌اند در حال گذار یا در حالت hybrid است؛ مستندات باید به‌صورت incremental خوانده شود |
| Previous reports vs Current implementation | برخی گزارش‌ها اشاره به مرز auth به‌صورت کامل تثبیت‌شده دارند | [apps/web/src/features/auth](apps/web/src/features/auth) در حال کار است، اما [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts) هنوز نقش مهمی در transport دارد | مرز auth partial و قابل قبول برای MVP است، نه fully migrated |
| Product docs vs UI implementation | مستندات محصول تجربه‌ی Premium و creator/community را مطرح می‌کنند | این تجربه‌ها در featureها دیده می‌شوند، اما بخش زیادی هنوز mock-backed یا UI-first است | محصول از نظر UX پیشرفته است، اما بعضی حوزه‌ها هنوز به‌صورت کامل به backend متصل نشده‌اند |

## 16. ریسک‌های فعلی

| Risk | Severity | Evidence | Impact | Status |
| ---- | -------- | -------- | ------ | ------ |
| Ownership Episode هنوز کامل تثبیت نشده است | HIGH | [apps/web/src/app/episodes/[id]/page.tsx](apps/web/src/app/episodes/[id]/page.tsx) و [apps/web/src/features/episodes](apps/web/src/features/episodes) | افزایش drift در آینده و سخت‌تر شدن نگهداری | OPEN |
| مرز Player هنوز formal نیست | HIGH | [apps/web/src/features/player](apps/web/src/features/player) در کنار [apps/web/src/components/AudioPlayer.tsx](apps/web/src/components/AudioPlayer.tsx) و [apps/web/src/stores/playerStore.ts](apps/web/src/stores/playerStore.ts) | احتمال تداخل ownership و پیچیدگی runtime | OPEN |
| Auth transport در shared layer باقی مانده است | MEDIUM | [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts) و [apps/web/src/features/auth/components/LoginForm.tsx](apps/web/src/features/auth/components/LoginForm.tsx) | کاهش شفافیت در مرز feature/shared | MONITORED |
| بعضی routeها هنوز orchestration feature-level انجام می‌دهند | MEDIUM | [apps/web/src/app/podcasts/page.tsx](apps/web/src/app/podcasts/page.tsx) و [apps/web/src/app/podcasts/[id]/page.tsx](apps/web/src/app/podcasts/[id]/page.tsx) | افزایش coupling بین route و feature | MONITORED |
| Runtime validation در این بازبینی انجام نشد | MEDIUM | این گزارش فقط بر پایه‌ی inspection است | کاهش اعتماد به runtime behavior | KNOWN LIMITATION |

## 17. Stable Architectural Boundaries

مرزهای زیر در این ریپو به‌نظر تثبیت‌شده و محافظت‌شده‌اند:

- مسیرهای [apps/web/src/app](apps/web/src/app) در نقش route entry point باقی می‌مانند.
- UI و منطق featureها در [apps/web/src/features](apps/web/src/features) نگهداری می‌شوند.
- stateهای سراسری در [apps/web/src/stores](apps/web/src/stores) و stateهای feature-local در خود featureها قرار می‌گیرند.
- shared UI primitives در [apps/web/src/components](apps/web/src/components) باقی می‌مانند.
- لایه‌ی API و business logic در [apps/api/src](apps/api/src) و به‌صورت feature-based در خود featureها قرار دارد.
- Player runtime و state در [apps/web/src/features/player](apps/web/src/features/player) باید به‌عنوان مرز اصلی پخش در نظر گرفته شود.

## 18. مواردی که نباید تغییر کنند

- مرزهای route در [apps/web/src/app](apps/web/src/app) به‌عنوان entry pointها
- مالکیت feature در [apps/web/src/features](apps/web/src/features)
- قراردادهای اصلی API در [apps/api/src](apps/api/src)
- state سراسری auth و player در [apps/web/src/stores](apps/web/src/stores) و [apps/web/src/features/player/store](apps/web/src/features/player/store)
- shared UI primitives در [apps/web/src/components/ui](apps/web/src/components/ui) و [apps/web/src/components/design-system](apps/web/src/components/design-system)
- مدل‌های domain Podcast و Episode به‌عنوان هسته‌ی محصول

## 19. وضعیت فعلی پروژه

- پروژه در وضعیت MVP پیشرفته و با تجربه‌ی UI premium قرار دارد.
- هسته‌ی محصول، از جمله auth، podcast، episode، library، playlist و player، در کد فعلی حضور دارد.
- با این حال، پروژه هنوز در یک مرحله‌ی «تثبیت مرزها» است، نه در مرحله‌ی «بازآرایی کامل».
- بنابراین، بهترین رویکرد برای ادامه، تثبیت ownership و کاهش drift است، نه ساختن یک معماری جدید از صفر.

## 20. پیشنهاد Next Logical Phase

پیشنهاد مرحله‌ی بعدی: تثبیت مالکیت feature در Episode و Player.

دلیل این انتخاب بر اساس شواهد فعلی است:

- Episode pages و hooks هنوز در چند نقطه با route-level orchestration و shared data layer در هم آمیخته‌اند.
- Player به‌عنوان یک feature اصلی، هنوز با componentهای shared و stateهای سراسری هم‌پوشانی دارد.
- این دو حوزه بیشترین تأثیر را بر کیفیت نگهداری و رشد معماری در آینده خواهند داشت.

## 21. Confidence Assessment

- Architecture Confidence: MEDIUM
- Feature Ownership Confidence: MEDIUM
- Runtime Confidence: LOW
- Product Understanding: HIGH
- Current Phase Confidence: HIGH

## 22. نتیجه نهایی

PROJECT UNDERSTOOD: YES

ARCHITECTURE UNDERSTOOD: YES

FEATURE OWNERSHIP UNDERSTOOD: YES

CURRENT PHASE UNDERSTOOD: YES

READY TO CONTINUE: YES

NEXT LOGICAL PHASE:
تثبیت مالکیت feature در Episode و Player

WHY:
در کد جاری، Episode و Player بیشترین نقاط باقی‌مانده‌ی mixed ownership و route-level orchestration را دارند و این دو حوزه، برای حفظ معماری پایدار در فازهای بعدی، نیازمند تثبیت بیشتری هستند.
