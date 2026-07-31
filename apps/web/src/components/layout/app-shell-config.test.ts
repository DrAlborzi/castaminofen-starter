import { describe, expect, it } from 'vitest';
import { getBottomNavigationItems, getMobileHeaderConfig } from './app-shell-config';

describe('app shell config', () => {
  it('marks the active tab for the current pathname', () => {
    const items = getBottomNavigationItems('/library');

    expect(items.find((item) => item.href === '/library')?.isActive).toBe(true);
    expect(items.find((item) => item.href === '/')?.isActive).toBe(false);
  });

  it('maps route-specific header metadata for the library view', () => {
    const config = getMobileHeaderConfig('/library');

    expect(config.title).toBe('کتابخانه');
    expect(config.tagline).toBe('مرکز گوش دادن و ادامه‌ی سفر');
  });

  it('maps the shared header metadata for the community experience', () => {
    const config = getMobileHeaderConfig('/community');

    expect(config.title).toBe('اجتماع');
    expect(config.tagline).toBe('پیشنهادها و بحث‌های زنده در مسیر شنیداری');
  });

  it('maps the create experience to the shared premium header pattern', () => {
    const config = getMobileHeaderConfig('/podcasts/new');

    expect(config.title).toBe('ایجاد');
    expect(config.tagline).toBe('محتوا را از ایده تا انتشار با وضوح بیشتری پیش ببر');
  });
});
