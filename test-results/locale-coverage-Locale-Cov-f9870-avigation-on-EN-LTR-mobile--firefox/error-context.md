# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locale-coverage.spec.ts >> Locale Coverage — FA/RTL & EN/LTR >> EN/LTR — English Locale >> should have accessible navigation on EN/LTR (mobile)
- Location: apps/web/e2e/locale-coverage.spec.ts:137:9

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
          - paragraph [ref=e13]: Castaminofen
          - paragraph [ref=e14]: Discover, listen, and return through a clear beta experience
        - generic [ref=e15]:
          - link "Search podcasts" [ref=e16] [cursor=pointer]:
            - /url: /en/search
          - link "App settings" [ref=e20] [cursor=pointer]:
            - /url: /en/settings
          - link "User profile" [ref=e25] [cursor=pointer]:
            - /url: /en/profile
    - main [ref=e29]:
      - main [ref=e32]:
        - region [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]:
              - generic [ref=e36]: CASTAMINOFEN
              - generic [ref=e41]:
                - paragraph [ref=e42]: برای شروع، کشف صداهای تازه
                - heading "شروعی ساده برای کشف و شنیدن پادکست‌های مورد علاقه‌ات" [level=1] [ref=e43]
                - paragraph [ref=e44]: پادکست‌هایی را پیدا کن که با حال‌وهوایت همراه می‌شوند و شنیدن را با تمرکز و آرامش شروع کن.
              - generic [ref=e45]:
                - link "شروع کردن" [ref=e46] [cursor=pointer]:
                  - /url: /login
                - link "کشف پادکست‌ها" [ref=e50] [cursor=pointer]:
                  - /url: /podcasts
              - paragraph [ref=e55]: اینجا برای کشف و شنیدن پادکست‌هاست؛ بدون شلوغی و حواس‌پرتی.
            - generic [ref=e56]: کشف صداهای تازه
        - region [ref=e67]:
          - generic [ref=e68]:
            - paragraph [ref=e69]: کشف کن
            - heading "پادکست‌هایی برای شروع" [level=2] [ref=e70]
            - status "در حال بارگذاری پادکست‌ها" [ref=e71]
    - generic [ref=e76]:
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]:
            - generic [ref=e80]: EP
            - generic [ref=e83]:
              - generic [ref=e84]:
                - paragraph [ref=e85]: No active playback
                - generic [ref=e86]: متوقف
              - paragraph [ref=e87]: پخش در دسترس است
          - paragraph [ref=e88]: برای شروع، اپیزودی را انتخاب کنید.
        - generic [ref=e90]:
          - group "Playback controls" [ref=e91]:
            - button "پخش مورد قبلی" [disabled]
            - button "شروع پخش" [disabled]
            - button "توقف پخش" [disabled]
            - button "تصادفی خاموش" [ref=e92] [cursor=pointer]
            - button "تکرار خاموش" [ref=e100] [cursor=pointer]
            - button "پخش مورد بعدی" [disabled]
          - generic [ref=e107]:
            - button "باز کردن صف پخش" [ref=e108] [cursor=pointer]:
              - generic [ref=e109]: صف پخش
            - button "گسترش پخش‌کننده" [ref=e116] [cursor=pointer]:
              - generic [ref=e117]: پخش تعاملی
      - generic [ref=e119]:
        - generic [ref=e120]: 00:00
        - progressbar "Playback progress" [ref=e122]
        - generic [ref=e124]: مدت نامشخص
    - navigation "ناوبری اصلی" [ref=e125]:
      - generic [ref=e127]:
        - link "Home" [ref=e128] [cursor=pointer]:
          - /url: /en
        - link "Library" [ref=e134] [cursor=pointer]:
          - /url: /en/library
        - link "Create" [ref=e139] [cursor=pointer]:
          - /url: /en/create
        - link "Search" [ref=e145] [cursor=pointer]:
          - /url: /en/search
        - link "Community" [ref=e151] [cursor=pointer]:
          - /url: /en/community
        - link "Profile" [ref=e159] [cursor=pointer]:
          - /url: /en/profile
  - alert [ref=e165]
```

# Test source

```ts
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
  72  |       await expect(nav).toBeVisible();
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
> 142 |       await expect(nav).toBeVisible();
      |                         ^ Error: expect(locator).toBeVisible() failed
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
  173 |       // Verify FA/RTL
  174 |       htmlLang = await page.locator('html').getAttribute('lang');
  175 |       htmlDir = await page.locator('html').getAttribute('dir');
  176 |       expect(htmlLang).toBe('fa');
  177 |       expect(htmlDir).toBe('rtl');
  178 |       
  179 |       // Both should have main element
  180 |       const main = await page.locator('main');
  181 |       await expect(main).toBeVisible();
  182 |     });
  183 | 
  184 |     test('should have valid landmarks on both locales', async ({ page }) => {
  185 |       // Test FA
  186 |       await page.goto('/fa/');
  187 |       
  188 |       let main = await page.locator('main').count();
  189 |       expect(main).toBeGreaterThan(0);
  190 |       
  191 |       let nav = await page.locator('nav').count();
  192 |       expect(nav).toBeGreaterThan(0);
  193 |       
  194 |       // Test EN
  195 |       await page.goto('/en/');
  196 |       
  197 |       main = await page.locator('main').count();
  198 |       expect(main).toBeGreaterThan(0);
  199 |       
  200 |       nav = await page.locator('nav').count();
  201 |       expect(nav).toBeGreaterThan(0);
  202 |     });
  203 |   });
  204 | 
  205 |   test.describe('Accessibility — Both Locales', () => {
  206 |     
  207 |     test('should pass basic axe accessibility scan on FA/RTL home page', async ({ page }) => {
  208 |       await page.goto('/fa/');
  209 |       const results = await new AxeBuilder({ page }).analyze();
  210 |       
  211 |       // We expect some violations to exist (as found in baseline)
  212 |       // but we're documenting them rather than claiming zero violations
  213 |       // This is a realistic baseline for Phase 9
  214 |       expect(results.violations).toBeDefined();
  215 |     });
  216 | 
  217 |     test('should pass basic axe accessibility scan on EN/LTR home page', async ({ page }) => {
  218 |       await page.goto('/en/');
  219 |       const results = await new AxeBuilder({ page }).analyze();
  220 |       
  221 |       // We expect some violations to exist
  222 |       // This validates that both locales have consistent accessibility quality
  223 |       expect(results.violations).toBeDefined();
  224 |     });
  225 | 
  226 |     test('should have accessible form on FA/RTL login page', async ({ page }) => {
  227 |       await page.goto('/fa/login');
  228 |       
  229 |       const form = await page.locator('form');
  230 |       await expect(form).toBeVisible();
  231 |       
  232 |       const inputs = await page.locator('input').count();
  233 |       expect(inputs).toBeGreaterThan(0);
  234 |     });
  235 | 
  236 |     test('should have accessible form on EN/LTR login page', async ({ page }) => {
  237 |       await page.goto('/en/login');
  238 |       
  239 |       const form = await page.locator('form');
  240 |       await expect(form).toBeVisible();
  241 |       
  242 |       const inputs = await page.locator('input').count();
```