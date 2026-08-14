# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locale-coverage.spec.ts >> Locale Coverage — FA/RTL & EN/LTR >> FA/RTL — Default Locale >> should have accessible navigation on FA/RTL (mobile)
- Location: apps/web/e2e/locale-coverage.spec.ts:67:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('nav')
Expected: visible
Error: strict mode violation: locator('nav') resolved to 2 elements:
    1) <nav aria-label="ناوبری دسکتاپ" class="flex items-center gap-2 hidden min-w-0 flex-1 justify-center md:flex">…</nav> aka getByLabel('ناوبری دسکتاپ')
    2) <nav aria-label="ناوبری اصلی" class="fixed inset-x-0 bottom-0 z-20 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden">…</nav> aka getByRole('navigation', { name: 'ناوبری اصلی' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('nav')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e12]:
          - paragraph [ref=e13]: کستامینوفن
          - paragraph [ref=e14]: کشف، گوش دادن و بازگشت در یک تجربه‌ی روشن و بتا
        - generic [ref=e15]:
          - link "جستجو در پادکست‌ها" [ref=e16] [cursor=pointer]:
            - /url: /fa/search
          - link "تنظیمات برنامه" [ref=e20] [cursor=pointer]:
            - /url: /fa/settings
          - link "پروفایل کاربری" [ref=e25] [cursor=pointer]:
            - /url: /fa/profile
    - main [ref=e29]:
      - status [ref=e32]:
        - paragraph [ref=e38]: Checking session...
    - generic [ref=e40]:
      - generic [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]: EP
            - generic [ref=e47]:
              - generic [ref=e48]:
                - paragraph [ref=e49]: No active playback
                - generic [ref=e50]: متوقف
              - paragraph [ref=e51]: پخش در دسترس است
          - paragraph [ref=e52]: برای شروع، اپیزودی را انتخاب کنید.
        - generic [ref=e54]:
          - group "Playback controls" [ref=e55]:
            - button "پخش مورد قبلی" [disabled]
            - button "شروع پخش" [disabled]
            - button "توقف پخش" [disabled]
            - button "تصادفی خاموش" [ref=e56] [cursor=pointer]
            - button "تکرار خاموش" [ref=e64] [cursor=pointer]
            - button "پخش مورد بعدی" [disabled]
          - generic [ref=e71]:
            - button "باز کردن صف پخش" [ref=e72] [cursor=pointer]:
              - generic [ref=e73]: صف پخش
            - button "گسترش پخش‌کننده" [ref=e80] [cursor=pointer]:
              - generic [ref=e81]: پخش تعاملی
      - generic [ref=e83]:
        - generic [ref=e84]: 00:00
        - progressbar "Playback progress" [ref=e86]
        - generic [ref=e88]: مدت نامشخص
    - navigation "ناوبری اصلی" [ref=e89]:
      - generic [ref=e91]:
        - link "خانه" [ref=e92] [cursor=pointer]:
          - /url: /fa
        - link "کتابخانه" [ref=e98] [cursor=pointer]:
          - /url: /fa/library
        - link "ایجاد" [ref=e103] [cursor=pointer]:
          - /url: /fa/create
        - link "جستجو" [ref=e109] [cursor=pointer]:
          - /url: /fa/search
        - link "اجتماع" [ref=e115] [cursor=pointer]:
          - /url: /fa/community
        - link "پروفایل" [ref=e123] [cursor=pointer]:
          - /url: /fa/profile
  - alert [ref=e129]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { AxeBuilder } from '@axe-core/playwright';
  3   | 
  4   | /**
  5   |  * PHASE 9 — LOCALE VALIDATION TESTS
  6   |  * 
  7   |  * Scope: EN/LTR and FA/RTL coverage
  8   |  * Coverage: Locale routing, direction attributes, language tags, and responsive layouts
  9   |  * 
  10  |  * Strategy:
  11  |  * - Test both locales on P0 routes
  12  |  * - Verify HTML lang and dir attributes
  13  |  * - Test responsive layouts for both locales
  14  |  * - Validate accessibility for both locales
  15  |  */
  16  | 
  17  | test.describe('Locale Coverage — FA/RTL & EN/LTR', () => {
  18  |   
  19  |   test.describe('FA/RTL — Default Locale', () => {
  20  |     
  21  |     test('should render home page with FA locale by default', async ({ page }) => {
  22  |       await page.goto('/');
  23  |       
  24  |       // Verify lang and dir attributes
  25  |       const htmlLang = await page.locator('html').getAttribute('lang');
  26  |       const htmlDir = await page.locator('html').getAttribute('dir');
  27  |       
  28  |       expect(htmlLang).toBe('fa');
  29  |       expect(htmlDir).toBe('rtl');
  30  |     });
  31  | 
  32  |     test('should render /fa/ prefixed routes correctly', async ({ page }) => {
  33  |       await page.goto('/fa/library');
  34  |       
  35  |       // Verify locale attributes
  36  |       const htmlLang = await page.locator('html').getAttribute('lang');
  37  |       const htmlDir = await page.locator('html').getAttribute('dir');
  38  |       
  39  |       expect(htmlLang).toBe('fa');
  40  |       expect(htmlDir).toBe('rtl');
  41  |       
  42  |       // Verify page loaded
  43  |       const main = await page.locator('main');
  44  |       await expect(main).toBeVisible();
  45  |     });
  46  | 
  47  |     test('should have no layout overflow on FA/RTL at 390px', async ({ page }) => {
  48  |       await page.setViewportSize({ width: 390, height: 844 });
  49  |       await page.goto('/fa/');
  50  |       
  51  |       const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  52  |       const windowWidth = await page.evaluate(() => window.innerWidth);
  53  |       
  54  |       expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  55  |     });
  56  | 
  57  |     test('should have no layout overflow on FA/RTL at 768px', async ({ page }) => {
  58  |       await page.setViewportSize({ width: 768, height: 1024 });
  59  |       await page.goto('/fa/library');
  60  |       
  61  |       const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  62  |       const windowWidth = await page.evaluate(() => window.innerWidth);
  63  |       
  64  |       expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  65  |     });
  66  | 
  67  |     test('should have accessible navigation on FA/RTL (mobile)', async ({ page }) => {
  68  |       await page.setViewportSize({ width: 390, height: 844 });
  69  |       await page.goto('/fa/');
  70  |       
  71  |       const nav = await page.locator('nav');
> 72  |       await expect(nav).toBeVisible();
      |                         ^ Error: expect(locator).toBeVisible() failed
  73  |       
  74  |       const navItems = await page.locator('nav a').count();
  75  |       expect(navItems).toBeGreaterThan(0);
  76  |     });
  77  |   });
  78  | 
  79  |   test.describe('EN/LTR — English Locale', () => {
  80  |     
  81  |     test('should render home page with EN locale when requested', async ({ page }) => {
  82  |       await page.goto('/en/');
  83  |       
  84  |       // Verify lang and dir attributes
  85  |       const htmlLang = await page.locator('html').getAttribute('lang');
  86  |       const htmlDir = await page.locator('html').getAttribute('dir');
  87  |       
  88  |       expect(htmlLang).toBe('en');
  89  |       expect(htmlDir).toBe('ltr');
  90  |     });
  91  | 
  92  |     test('should render /en/ prefixed routes correctly', async ({ page }) => {
  93  |       await page.goto('/en/library');
  94  |       
  95  |       // Verify locale attributes
  96  |       const htmlLang = await page.locator('html').getAttribute('lang');
  97  |       const htmlDir = await page.locator('html').getAttribute('dir');
  98  |       
  99  |       expect(htmlLang).toBe('en');
  100 |       expect(htmlDir).toBe('ltr');
  101 |       
  102 |       // Verify page loaded
  103 |       const main = await page.locator('main');
  104 |       await expect(main).toBeVisible();
  105 |     });
  106 | 
  107 |     test('should have no layout overflow on EN/LTR at 390px', async ({ page }) => {
  108 |       await page.setViewportSize({ width: 390, height: 844 });
  109 |       await page.goto('/en/');
  110 |       
  111 |       const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  112 |       const windowWidth = await page.evaluate(() => window.innerWidth);
  113 |       
  114 |       expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  115 |     });
  116 | 
  117 |     test('should have no layout overflow on EN/LTR at 768px', async ({ page }) => {
  118 |       await page.setViewportSize({ width: 768, height: 1024 });
  119 |       await page.goto('/en/library');
  120 |       
  121 |       const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  122 |       const windowWidth = await page.evaluate(() => window.innerWidth);
  123 |       
  124 |       expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  125 |     });
  126 | 
  127 |     test('should have no layout overflow on EN/LTR at 1024px', async ({ page }) => {
  128 |       await page.setViewportSize({ width: 1024, height: 768 });
  129 |       await page.goto('/en/library');
  130 |       
  131 |       const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  132 |       const windowWidth = await page.evaluate(() => window.innerWidth);
  133 |       
  134 |       expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  135 |     });
  136 | 
  137 |     test('should have accessible navigation on EN/LTR (mobile)', async ({ page }) => {
  138 |       await page.setViewportSize({ width: 390, height: 844 });
  139 |       await page.goto('/en/');
  140 |       
  141 |       const nav = await page.locator('nav');
  142 |       await expect(nav).toBeVisible();
  143 |       
  144 |       const navItems = await page.locator('nav a').count();
  145 |       expect(navItems).toBeGreaterThan(0);
  146 |     });
  147 | 
  148 |     test('should render English labels in navigation', async ({ page }) => {
  149 |       await page.goto('/en/');
  150 |       
  151 |       // Get the actual English labels from navigation
  152 |       // The exact labels depend on the dictionary, but we verify they exist
  153 |       const navButtons = await page.locator('nav [role="link"], nav a, nav button').count();
  154 |       expect(navButtons).toBeGreaterThan(0);
  155 |     });
  156 |   });
  157 | 
  158 |   test.describe('Locale Switching — Navigation Consistency', () => {
  159 |     
  160 |     test('should preserve route structure when switching locales', async ({ page }) => {
  161 |       // Navigate to /en/library
  162 |       await page.goto('/en/library');
  163 |       
  164 |       // Verify EN/LTR
  165 |       let htmlLang = await page.locator('html').getAttribute('lang');
  166 |       let htmlDir = await page.locator('html').getAttribute('dir');
  167 |       expect(htmlLang).toBe('en');
  168 |       expect(htmlDir).toBe('ltr');
  169 |       
  170 |       // Navigate to /fa/library (same route, different locale)
  171 |       await page.goto('/fa/library');
  172 |       
```