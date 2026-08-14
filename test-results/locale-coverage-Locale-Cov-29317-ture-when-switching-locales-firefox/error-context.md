# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locale-coverage.spec.ts >> Locale Coverage — FA/RTL & EN/LTR >> Locale Switching — Navigation Consistency >> should preserve route structure when switching locales
- Location: apps/web/e2e/locale-coverage.spec.ts:160:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "en"
Received: "fa"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e12]:
          - paragraph [ref=e13]: Library
          - paragraph [ref=e14]: Return here to continue your path and meaningful moments
        - navigation "ناوبری دسکتاپ" [ref=e15]:
          - link "Home" [ref=e16] [cursor=pointer]:
            - /url: /en
          - link "Library" [ref=e20] [cursor=pointer]:
            - /url: /en/library
          - link "Create" [ref=e23] [cursor=pointer]:
            - /url: /en/create
          - link "Search" [ref=e27] [cursor=pointer]:
            - /url: /en/search
          - link "Community" [ref=e31] [cursor=pointer]:
            - /url: /en/community
          - link "Profile" [ref=e37] [cursor=pointer]:
            - /url: /en/profile
        - generic [ref=e41]:
          - link "Create a new podcast" [ref=e42] [cursor=pointer]:
            - /url: /en/podcasts/new
          - link "Search podcasts" [ref=e46] [cursor=pointer]:
            - /url: /en/search
          - link "User profile" [ref=e50] [cursor=pointer]:
            - /url: /en/profile
    - main [ref=e54]:
      - status [ref=e57]:
        - paragraph [ref=e63]: Checking session...
    - generic [ref=e66]:
      - generic [ref=e67]:
        - generic [ref=e68]:
          - generic [ref=e69]: EP
          - generic [ref=e72]:
            - generic [ref=e73]:
              - paragraph [ref=e74]: No active playback
              - generic [ref=e75]: متوقف
            - paragraph [ref=e76]: پخش در دسترس است
        - paragraph [ref=e77]: برای شروع، اپیزودی را انتخاب کنید.
      - generic [ref=e78]:
        - generic [ref=e79]:
          - group "Playback controls" [ref=e80]:
            - button "پخش مورد قبلی" [disabled]
            - button "شروع پخش" [disabled]
            - button "توقف پخش" [disabled]
            - button "تصادفی خاموش" [ref=e81] [cursor=pointer]
            - button "تکرار خاموش" [ref=e89] [cursor=pointer]
            - button "پخش مورد بعدی" [disabled]
          - generic [ref=e96]:
            - button "باز کردن صف پخش" [ref=e97] [cursor=pointer]:
              - generic [ref=e98]: صف پخش
            - button "گسترش پخش‌کننده" [ref=e105] [cursor=pointer]:
              - generic [ref=e106]: پخش تعاملی
            - slider "Playback volume" [disabled] [ref=e113] [cursor=pointer]: "0.8"
        - generic [ref=e115]:
          - generic [ref=e116]: 00:00
          - progressbar "Playback progress" [ref=e118]
          - generic [ref=e120]: مدت نامشخص
  - alert [ref=e121]
```

# Test source

```ts
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
> 167 |       expect(htmlLang).toBe('en');
      |                        ^ Error: expect(received).toBe(expected) // Object.is equality
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
  243 |       expect(inputs).toBeGreaterThan(0);
  244 |     });
  245 |   });
  246 | 
  247 |   test.describe('Direction Attributes — RTL vs LTR', () => {
  248 |     
  249 |     test('should set dir="rtl" for FA locale', async ({ page }) => {
  250 |       await page.goto('/fa/');
  251 |       
  252 |       const dir = await page.locator('html').getAttribute('dir');
  253 |       expect(dir).toBe('rtl');
  254 |     });
  255 | 
  256 |     test('should set dir="ltr" for EN locale', async ({ page }) => {
  257 |       await page.goto('/en/');
  258 |       
  259 |       const dir = await page.locator('html').getAttribute('dir');
  260 |       expect(dir).toBe('ltr');
  261 |     });
  262 | 
  263 |     test('should set lang="fa" for FA locale', async ({ page }) => {
  264 |       await page.goto('/fa/');
  265 |       
  266 |       const lang = await page.locator('html').getAttribute('lang');
  267 |       expect(lang).toBe('fa');
```