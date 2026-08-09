# DESIGN.2 — Canonical App Shell, Navigation & Theme Boundary Report

## Executive Summary

Established the canonical shell boundary around `AppShell` without changing product behavior or feature ownership. Desktop navigation is now mounted by the application header, mobile and desktop renderers consume one navigation model, route activity is semantic and exact for nested paths, theme application is centralized at the document boundary, and duplicate shell bottom spacing was removed.

## Shell Ownership

Before:

- `AppShell` owned `MobileHeader`, `BottomNavigation`, `PlayerBar`, and page composition.
- `DesktopNavigation` existed as an unused renderer.
- `AppShell` added a `main` landmark even though feature pages already rendered their own `main` landmarks.
- Theme tokens existed, but no runtime owner applied persisted preferences to the DOM.

After:

- `AppShell` remains the single global composition owner.
- The application header mounts `DesktopNavigation` at desktop breakpoints.
- Auth routes retain their simplified shell and are not given application navigation.
- The root route retains its public/welcome distinction and does not receive application navigation.
- Shell wrappers are non-landmark containers; page content owns the single page `main` landmark.
- `PlayerBar` remains mounted and owned by the Player feature.

## Navigation

- `navigationDefinitions` remains the single source of route, label, icon, and primary-item semantics.
- `getAppShellNavigationItems` is the canonical derived model; the old `getBottomNavigationItems` name remains as a compatibility alias.
- Desktop navigation is rendered through the canonical design-system `DesktopNavigation` primitive and uses `next/link`.
- Mobile navigation remains the existing bottom navigation renderer and is hidden at desktop breakpoints.
- Desktop navigation is hidden below the existing medium breakpoint.
- Active items expose `aria-current="page"`.
- Active state uses weight, icon, text, and surface changes rather than color alone.
- Matching supports exact routes, nested routes, and a trailing slash while avoiding false positives such as `/library-old`.
- Navigation labels and order were not changed.

## Theme Boundary

Previous behavior:

- Dark and light semantic token sets existed in `tokens.css`.
- Settings persistence stored `System`, `Light`, or `Dark` preferences.
- No centralized runtime code applied `data-theme` from the stored preference.
- The viewport declared only dark color scheme behavior.

Final behavior:

- `ThemeBoundary` reads the existing settings preference and applies the resolved theme to `document.documentElement`.
- Light mode sets `data-theme="light"`; dark mode removes the attribute and uses the existing dark baseline.
- The document `colorScheme` style is kept coherent with the resolved theme.
- A layout bootstrap script applies the stored/system preference before hydration to reduce theme flicker.
- Existing same-tab persistence dispatches a theme-change event; cross-tab storage changes and system preference changes are also handled.
- Existing token values were preserved.

## RTL

- The document remains `<html lang="fa" dir="rtl">`.
- Navigation order and semantic route ownership are unchanged.
- The shell uses flex flow and inline container spacing rather than adding new physical left/right layout assumptions.
- No directional playback, identity, or status icons were mirrored.
- The rendered smoke check confirmed the Persian document language and RTL direction.

## Responsive

Verified through the existing responsive composition and rendered shell smoke check:

- Mobile: bottom navigation is visible and desktop navigation is hidden.
- Tablet and desktop: desktop navigation is mounted in the header and bottom navigation is hidden from the medium breakpoint upward.
- Wide desktop: the desktop renderer remains within the existing max-width header container.
- Safe-area padding remains on the fixed mobile navigation.
- No new breakpoint or product navigation item was introduced.

A full browser screenshot matrix was not run in this environment; responsive behavior was validated from the rendered HTML and existing breakpoint classes, with production build coverage.

## Accessibility

- One shell-level header landmark and named navigation landmarks are exposed.
- Feature pages retain their existing single `main` landmark; AppShell no longer creates a competing `main`.
- Desktop navigation links are native `Link` elements with keyboard focus rings and minimum 44px height.
- Mobile navigation retains native links, accessible labels, active `aria-current`, and safe-area spacing.
- Icon-only header actions retain accessible names.
- Reduced-motion handling remains provided by the existing global stylesheet.
- No nested interactive elements or focus trap was introduced.

## Player Safe Area

- Player runtime, store, queue ownership, queue semantics, positioning, and playback behavior were untouched.
- The shell no longer adds a second generic bottom padding layer through `.app-shell__content`.
- Existing page-level `page-container` spacing and fixed mobile navigation safe-area padding remain responsible for content clearance.
- The Player is still rendered by `AppShell` as the persistent feature-owned surface.

## Files Changed

DESIGN.2 implementation files:

- `apps/web/src/app/globals.css`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/components/design-system/navigation/desktop-navigation.tsx`
- `apps/web/src/components/layout/app-shell-config.test.ts`
- `apps/web/src/components/layout/app-shell-config.ts`
- `apps/web/src/components/layout/app-shell.tsx`
- `apps/web/src/components/layout/bottom-navigation.tsx`
- `apps/web/src/components/layout/mobile-header.tsx`
- `apps/web/src/components/layout/theme-boundary.tsx`
- `apps/web/src/features/settings/services/preferencesPersistence.ts`

The worktree also contains pre-existing DESIGN.1 changes in design-system, token, Tailwind, and compatibility files. Those changes were not reverted or expanded by DESIGN.2.

## Files Intentionally Untouched

- API and backend implementation
- API request/response contracts
- authentication implementation and authorization rules
- route definitions and route semantics
- Player runtime and Player store
- queue ownership and queue semantics
- persistence model, except for the existing settings persistence event used to synchronize the shell theme boundary
- React Query ownership
- Zustand ownership
- feature data fetching and feature ownership
- public Welcome behavior
- auth page behavior

## Validation

- Focused shell navigation test: **6 passed**.
- Full web test suite: **52 files passed, 190 tests passed**.
- Web TypeScript check: **blocked by 2 pre-existing Player test errors** in `PlayerDataIntegration.test.tsx` and `persistence.test.ts`; no diagnostics were reported for DESIGN.2 files.
- `pnpm lint`: **passed**. One pre-existing warning remains for `<img>` in `WelcomeScreen.test.tsx`.
- `pnpm build`: **passed** for shared types, web, and API.
- `git diff --check`: **passed**.
- Runtime smoke check: `/library` returned HTTP 200 and rendered RTL document attributes plus both desktop and mobile navigation landmarks. The dev shell reported API proxy `ECONNREFUSED` on port 3001 because the API server was not running; this is outside DESIGN.2.
- Final worktree scope: includes the ten DESIGN.2 implementation files above plus pre-existing DESIGN.1 worktree changes; no backend, API, auth, Player, queue, or route files were changed.

## Existing Issues

- Two existing Player test type errors prevent a clean standalone web `tsc --noEmit` result. They are unrelated to shell, navigation, or theme changes.
- Existing lint warning for an `<img>` in `WelcomeScreen.test.tsx` remains unchanged.
- Local web development without the API server logs proxy connection failures to port 3001; no API behavior was modified.

## Deferred Design Debt

- A full automated browser viewport and keyboard matrix across 320px, 375px, 768px, 1024px, 1280px, and 1440px was not available in this validation pass.
- Existing feature pages use legacy `page-container` classes and some compatibility imports; broad migration is deferred to the existing design-system work and is outside DESIGN.2.

## Architecture Safety Confirmation

No API, auth, routing, persistence model, Player, queue, or feature ownership contracts changed.
