# PHASE 8 I18N ARCHITECTURE

## Repository evidence
The repo was still hardcoded to Persian/RTL at the root layout level.

Observed before implementation:
- `apps/web/src/app/layout.tsx` rendered `<html lang="fa" dir="rtl">` directly.
- The app used Persian strings and `fa-IR` formatting in multiple components and layout helpers.
- No locale-aware routing or translation package existed.
- Next.js is 14.2.15 using the App Router.

## Chosen strategy
Minimal, evidence-based locale architecture:
- `fa` and `en` are supported locales
- default locale is `fa`
- route prefixing is `/fa/...` and `/en/...`
- direction is derived from locale rather than being globally hardcoded
- locale metadata and dictionary config live in `apps/web/src/i18n/config.ts`
- middleware is used to normalize locale handling without redirecting API routes

## Why this is the smallest valid solution
This repo already had a strong Persian-first design and functional RTL layout. Adding a full `next-intl` dependency would have been broader than necessary before validating the first required architecture. The minimal helper-based solution keeps the app stable while establishing the locale source of truth.

## Files added
- `apps/web/src/i18n/config.ts`
- `apps/web/src/i18n/config.test.ts`
- `apps/web/middleware.ts`

## Files adjusted
- `apps/web/src/app/layout.tsx`
- `apps/web/src/components/layout/app-shell.tsx`
- `apps/web/src/components/layout/app-shell-config.ts`
- `apps/web/src/components/layout/mobile-header.tsx`

## Result
The app can now derive:
- `lang`
- `dir`
- locale-aware navigation
- locale-aware route matching

while preserving the Persian default and existing RTL design system behavior.
