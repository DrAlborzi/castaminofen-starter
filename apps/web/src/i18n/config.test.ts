import { describe, expect, it } from 'vitest';
import { defaultLocale, getDirection, getLocaleMetadata, normalizeLocale, resolveLocale } from './config';

describe('i18n config', () => {
  it('keeps Persian as the default locale', () => {
    expect(defaultLocale).toBe('fa');
  });

  it('normalizes known locale aliases to supported locales', () => {
    expect(normalizeLocale('fa-IR')).toBe('fa');
    expect(normalizeLocale('en-US')).toBe('en');
    expect(normalizeLocale('fr')).toBe('fa');
  });

  it('derives direction from locale', () => {
    expect(getDirection('fa')).toBe('rtl');
    expect(getDirection('en')).toBe('ltr');
  });

  it('returns locale metadata for supported locales', () => {
    expect(getLocaleMetadata('fa')).toMatchObject({ code: 'fa', dir: 'rtl', name: 'فارسی' });
    expect(getLocaleMetadata('en')).toMatchObject({ code: 'en', dir: 'ltr', name: 'English' });
  });

  it('resolves locale from a request or path when available', () => {
    expect(resolveLocale('fa/library')).toBe('fa');
    expect(resolveLocale('en/login')).toBe('en');
    expect(resolveLocale('library')).toBe('fa');
  });
});
