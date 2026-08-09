'use client';

import { useEffect, type ReactNode } from 'react';
import { readSettingsPreferences, SETTINGS_THEME_CHANGE_EVENT } from '@/features/settings/services/preferencesPersistence';

const SETTINGS_PREFERENCES_STORAGE_KEY = 'castaminofen-settings-preferences';

function getResolvedTheme(theme: 'System' | 'Light' | 'Dark'): 'light' | 'dark' {
  if (theme === 'Light') {
    return 'light';
  }

  if (theme === 'Dark') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme() {
  const resolvedTheme = getResolvedTheme(readSettingsPreferences().theme);
  const root = document.documentElement;

  if (resolvedTheme === 'light') {
    root.dataset.theme = 'light';
  } else {
    delete root.dataset.theme;
  }

  root.style.colorScheme = resolvedTheme;
}

export function ThemeBoundary({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyTheme();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === SETTINGS_PREFERENCES_STORAGE_KEY) {
        applyTheme();
      }
    };
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = () => {
      if (readSettingsPreferences().theme === 'System') {
        applyTheme();
      }
    };

    window.addEventListener(SETTINGS_THEME_CHANGE_EVENT, applyTheme);
    window.addEventListener('storage', handleStorage);
    mediaQuery.addEventListener?.('change', handleSystemThemeChange);

    return () => {
      window.removeEventListener(SETTINGS_THEME_CHANGE_EVENT, applyTheme);
      window.removeEventListener('storage', handleStorage);
      mediaQuery.removeEventListener?.('change', handleSystemThemeChange);
    };
  }, []);

  return children;
}