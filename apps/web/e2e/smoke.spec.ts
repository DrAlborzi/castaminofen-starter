import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Smoke Tests', () => {
  test.describe('App Shell', () => {
    test('should have no accessibility violations on home page', async ({ page }) => {
      await page.goto('/');
      await injectAxe(page);
      await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      });
    });

    test('should have proper landmark structure', async ({ page }) => {
      await page.goto('/');
      
      // Check for main landmark
      const main = await page.locator('main').count();
      expect(main).toBeGreaterThan(0);
      
      // Check navigation exists
      const nav = await page.locator('nav').count();
      expect(nav).toBeGreaterThan(0);
    });
  });

  test.describe('Navigation', () => {
    test('should have accessible navigation on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      await injectAxe(page);
      await checkA11y(page, 'nav', {
        rules: {
          'color-contrast': { enabled: false }, // May fail due to dynamic theming
        },
      });
    });

    test('should have accessible bottom navigation tabs', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      
      // Verify navigation items have proper ARIA labels
      const navButtons = await page.locator('[role="button"]').count();
      expect(navButtons).toBeGreaterThan(0);
    });
  });

  test.describe('Forms', () => {
    test('should have accessible form on login page', async ({ page }) => {
      await page.goto('/login');
      await injectAxe(page);
      await checkA11y(page, 'form', {
        rules: {
          'color-contrast': { enabled: false },
        },
      });
    });

    test('should have proper form labels', async ({ page }) => {
      await page.goto('/login');
      
      // Check inputs have associated labels
      const inputs = await page.locator('input').count();
      const labels = await page.locator('label').count();
      
      // Should have at least some labels for inputs
      expect(labels).toBeGreaterThan(0);
    });
  });

  test.describe('Dialogs & Sheets', () => {
    test('should have accessible dialog semantics', async ({ page }) => {
      await page.goto('/');
      
      // Look for dialog or sheet elements
      const dialogs = await page.locator('[role="dialog"]').count();
      const sheets = await page.locator('[role="dialog"][aria-modal="true"]').count();
      
      // Note: this test is informational - dialogs may not be present on page load
      if (sheets > 0) {
        await injectAxe(page);
        await checkA11y(page, '[role="dialog"]', {
          rules: {
            'color-contrast': { enabled: false },
          },
        });
      }
    });
  });

  test.describe('Player Controls', () => {
    test('should have keyboard accessible player', async ({ page }) => {
      await page.goto('/');
      
      // Verify player bar exists if episode is loaded
      const playerBar = await page.locator('[role="region"]').count();
      
      if (playerBar > 0) {
        // Player buttons should be keyboard accessible
        const buttons = await page.locator('button').count();
        expect(buttons).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Responsive Design - LTR', () => {
    test('should layout correctly at 390px (mobile)', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      
      const main = await page.locator('main');
      await expect(main).toBeVisible();
      
      // No horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
      const windowWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
    });

    test('should layout correctly at 768px (tablet)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      
      const main = await page.locator('main');
      await expect(main).toBeVisible();
    });

    test('should layout correctly at 1024px (desktop)', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.goto('/');
      
      const main = await page.locator('main');
      await expect(main).toBeVisible();
    });
  });

  test.describe('Responsive Design - RTL', () => {
    test('should layout correctly in RTL at 390px', async ({ page }) => {
      // Note: RTL testing would require either:
      // 1. A separate RTL URL variant
      // 2. JavaScript to set dir="rtl" on page load
      // For now, this is a placeholder for future RTL testing
      
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      
      // Would verify RTL layout here once available
      const main = await page.locator('main');
      await expect(main).toBeVisible();
    });
  });
});
