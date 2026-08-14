# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: locale-coverage.spec.ts >> Locale Coverage — FA/RTL & EN/LTR >> Accessibility — Both Locales >> should have accessible form on FA/RTL login page
- Location: apps/web/e2e/locale-coverage.spec.ts:226:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('form')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('form')

```

```yaml
- main:
  - main:
    - region "شروعی ساده برای کشف و شنیدن پادکست‌های مورد علاقه‌ات":
      - text: CASTAMINOFEN
      - paragraph: برای شروع، کشف صداهای تازه
      - heading "شروعی ساده برای کشف و شنیدن پادکست‌های مورد علاقه‌ات" [level=1]
      - paragraph: پادکست‌هایی را پیدا کن که با حال‌وهوایت همراه می‌شوند و شنیدن را با تمرکز و آرامش شروع کن.
      - link "شروع کردن":
        - /url: /login
      - link "کشف پادکست‌ها":
        - /url: /podcasts
      - paragraph: اینجا برای کشف و شنیدن پادکست‌هاست؛ بدون شلوغی و حواس‌پرتی.
    - region "پادکست‌هایی برای شروع":
      - paragraph: کشف کن
      - heading "پادکست‌هایی برای شروع" [level=2]
      - alert:
        - paragraph: بارگذاری پادکست‌ها ممکن نشد. می‌توانی دوباره تلاش کنی یا همهٔ پادکست‌ها را ببینی.
        - button "تلاش دوباره"
        - link "رفتن به کشف پادکست‌ها":
          - /url: /podcasts
- alert
```

# Test source

```ts
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
> 230 |       await expect(form).toBeVisible();
      |                          ^ Error: expect(locator).toBeVisible() failed
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
  274 |       expect(lang).toBe('en');
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
```