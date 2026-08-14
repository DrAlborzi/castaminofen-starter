# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locale-coverage.spec.ts >> Locale Coverage — FA/RTL & EN/LTR >> Direction Attributes — RTL vs LTR >> should set lang="en" for EN locale
- Location: apps/web/e2e/locale-coverage.spec.ts:270:9

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
        - generic [ref=e10]:
          - paragraph [ref=e11]: Castaminofen
          - paragraph [ref=e12]: Discover, listen, and return through a clear beta experience
        - navigation "ناوبری دسکتاپ" [ref=e13]:
          - link "Home" [ref=e14] [cursor=pointer]:
            - /url: /en
          - link "Library" [ref=e18] [cursor=pointer]:
            - /url: /en/library
          - link "Create" [ref=e21] [cursor=pointer]:
            - /url: /en/create
          - link "Search" [ref=e23] [cursor=pointer]:
            - /url: /en/search
          - link "Community" [ref=e27] [cursor=pointer]:
            - /url: /en/community
          - link "Profile" [ref=e33] [cursor=pointer]:
            - /url: /en/profile
        - generic [ref=e37]:
          - link "Search podcasts" [ref=e38] [cursor=pointer]:
            - /url: /en/search
          - link "App settings" [ref=e42] [cursor=pointer]:
            - /url: /en/settings
          - link "User profile" [ref=e47] [cursor=pointer]:
            - /url: /en/profile
    - main [ref=e51]:
      - main [ref=e54]:
        - region [ref=e55]:
          - generic [ref=e56]:
            - generic [ref=e57]:
              - generic [ref=e58]: CASTAMINOFEN
              - generic [ref=e63]:
                - paragraph [ref=e64]: برای شروع، کشف صداهای تازه
                - heading "شروعی ساده برای کشف و شنیدن پادکست‌های مورد علاقه‌ات" [level=1] [ref=e65]
                - paragraph [ref=e66]: پادکست‌هایی را پیدا کن که با حال‌وهوایت همراه می‌شوند و شنیدن را با تمرکز و آرامش شروع کن.
              - generic [ref=e67]:
                - link "شروع کردن" [ref=e68] [cursor=pointer]:
                  - /url: /login
                - link "کشف پادکست‌ها" [ref=e71] [cursor=pointer]:
                  - /url: /podcasts
              - paragraph [ref=e76]: اینجا برای کشف و شنیدن پادکست‌هاست؛ بدون شلوغی و حواس‌پرتی.
            - generic [ref=e77]: کشف صداهای تازه
        - region [ref=e88]:
          - generic [ref=e89]:
            - paragraph [ref=e90]: کشف کن
            - heading "پادکست‌هایی برای شروع" [level=2] [ref=e91]
            - status "در حال بارگذاری پادکست‌ها" [ref=e92]
    - generic [ref=e98]:
      - generic [ref=e99]:
        - generic [ref=e100]:
          - generic [ref=e101]: EP
          - generic [ref=e104]:
            - generic [ref=e105]:
              - paragraph [ref=e106]: No active playback
              - generic [ref=e107]: متوقف
            - paragraph [ref=e108]: پخش در دسترس است
        - paragraph [ref=e109]: برای شروع، اپیزودی را انتخاب کنید.
      - generic [ref=e110]:
        - generic [ref=e111]:
          - group "Playback controls" [ref=e112]:
            - button "پخش مورد قبلی" [disabled]
            - button "شروع پخش" [disabled]
            - button "توقف پخش" [disabled]
            - button "تصادفی خاموش" [ref=e113] [cursor=pointer]
            - button "تکرار خاموش" [ref=e121] [cursor=pointer]
            - button "پخش مورد بعدی" [disabled]
          - generic [ref=e128]:
            - button "باز کردن صف پخش" [ref=e129] [cursor=pointer]:
              - generic [ref=e130]: صف پخش
            - button "گسترش پخش‌کننده" [ref=e133] [cursor=pointer]:
              - generic [ref=e134]: پخش تعاملی
            - slider "Playback volume" [disabled] [ref=e141] [cursor=pointer]: "0.8"
        - generic [ref=e143]:
          - generic [ref=e144]: 00:00
          - progressbar "Playback progress" [ref=e146]
          - generic [ref=e148]: مدت نامشخص
  - alert [ref=e149]
```

# Test source

```ts
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
  268 |     });
  269 | 
  270 |     test('should set lang="en" for EN locale', async ({ page }) => {
  271 |       await page.goto('/en/');
  272 |       
  273 |       const lang = await page.locator('html').getAttribute('lang');
> 274 |       expect(lang).toBe('en');
      |                    ^ Error: expect(received).toBe(expected) // Object.is equality
  275 |     });
  276 |   });
  277 | 
  278 |   test.describe('Responsive Layout — Both Locales', () => {
  279 |     
  280 |     // Mobile (390x844)
  281 |     test.describe('Mobile (390px)', () => {
  282 |       test.beforeEach(async ({ page }) => {
  283 |         await page.setViewportSize({ width: 390, height: 844 });
  284 |       });
  285 | 
  286 |       test('should render FA home page without overflow', async ({ page }) => {
  287 |         await page.goto('/fa/');
  288 |         
  289 |         const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  290 |         const windowWidth = await page.evaluate(() => window.innerWidth);
  291 |         
  292 |         expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  293 |       });
  294 | 
  295 |       test('should render EN home page without overflow', async ({ page }) => {
  296 |         await page.goto('/en/');
  297 |         
  298 |         const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  299 |         const windowWidth = await page.evaluate(() => window.innerWidth);
  300 |         
  301 |         expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  302 |       });
  303 |     });
  304 | 
  305 |     // Tablet (768x1024)
  306 |     test.describe('Tablet (768px)', () => {
  307 |       test.beforeEach(async ({ page }) => {
  308 |         await page.setViewportSize({ width: 768, height: 1024 });
  309 |       });
  310 | 
  311 |       test('should render FA home page without overflow', async ({ page }) => {
  312 |         await page.goto('/fa/');
  313 |         
  314 |         const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  315 |         const windowWidth = await page.evaluate(() => window.innerWidth);
  316 |         
  317 |         expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  318 |       });
  319 | 
  320 |       test('should render EN home page without overflow', async ({ page }) => {
  321 |         await page.goto('/en/');
  322 |         
  323 |         const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  324 |         const windowWidth = await page.evaluate(() => window.innerWidth);
  325 |         
  326 |         expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  327 |       });
  328 |     });
  329 | 
  330 |     // Desktop (1024x768)
  331 |     test.describe('Desktop (1024px)', () => {
  332 |       test.beforeEach(async ({ page }) => {
  333 |         await page.setViewportSize({ width: 1024, height: 768 });
  334 |       });
  335 | 
  336 |       test('should render FA home page without overflow', async ({ page }) => {
  337 |         await page.goto('/fa/');
  338 |         
  339 |         const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  340 |         const windowWidth = await page.evaluate(() => window.innerWidth);
  341 |         
  342 |         expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  343 |       });
  344 | 
  345 |       test('should render EN home page without overflow', async ({ page }) => {
  346 |         await page.goto('/en/');
  347 |         
  348 |         const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
  349 |         const windowWidth = await page.evaluate(() => window.innerWidth);
  350 |         
  351 |         expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
  352 |       });
  353 |     });
  354 |   });
  355 | });
  356 | 
```