# DESIGN.14 — Accessibility & Interaction Integrity Report

## 1. Executive Summary

**Observed:** The repository already had native button/link/form primitives, shared focus-visible styling, state semantics, RTL documentation, and reduced-motion CSS. No repository-level `AGENTS.md`, `CONTRIBUTING.md`, Copilot instruction, or package instruction file was found.

**Implemented:** Corrected the primary action in both bottom-navigation implementations. The action now exposes its existing label as visually-hidden link text, and the focus-visible ring is applied to the focusable link rather than to a non-focusable child span. Existing hover/active presentation remains intact.

**Validated:** The focused navigation test passes. The full web suite passes with 59 files and 214 tests; API tests pass with 13 tests; lint and production build pass. Web typecheck has only the two pre-existing player test errors documented below.

**Deferred:** Browser, axe, viewport, keyboard-runtime, and assistive-technology validation could not run because Chromium cannot load the missing `libatk-1.0.so.0` system library.

## 2. Audit Scope

**Observed:** Reviewed repository instructions, manifests, current git state, design-system README and accessibility contracts, DESIGN.13 RTL report, canonical common/form/state/media/navigation primitives, app-shell navigation, static interaction patterns, tests, Vitest configuration, and Playwright availability.

**Implemented:** Changes were limited to accessibility naming and focus presentation in bottom navigation plus one focused test.

**Untouched:** Backend, API contracts, authentication, authorization, routing semantics, React Query, Zustand, player runtime/store, queue semantics, playback engine, persistence, playlist logic, feature data fetching, and product permissions.

## 3. Baseline

**Validated before editing:** `git status --short`, `git diff --check`, and `git diff --stat` were clean. API tests passed (`13/13`), web tests passed (`58` files, `213` tests), lint passed with one existing Next image warning, build passed, and web typecheck reported two existing player-test errors.

## 4. Semantic HTML Audit

**Observed:** Canonical navigation and form primitives use native `<a>`, `<button>`, `<input>`, `<label>`, `<nav>`, and state containers. Static scanning found no confirmed clickable `div` requiring migration in the reviewed canonical surface.

**Implemented:** No broad semantic migration was warranted. The confirmed bottom-navigation defect was corrected at the link boundary.

**Deferred:** Full rendered landmark, heading, table, and route-level semantic inspection requires browser and screen-reader evidence.

## 5. Button / Link Contract

**Observed:** `Button`, `IconButton`, and `PlaybackAffordance` retain native button semantics, native disabled behavior, and accessible naming. Navigation uses native links.

**Implemented:** The primary bottom-navigation action remains a native link and now has an accessible text name without changing navigation behavior.

## 6. Icon-Only Controls

**Observed:** Reviewed icon-only primitives and player/navigation usages. Decorative icons generally use `aria-hidden`, while icon buttons provide labels. The primary bottom-navigation action was the confirmed exception because its visible icon was its only content.

**Implemented:** Added the existing item label as visually-hidden text to the primary action in both navigation implementations.

## 7. Focus Management

**Observed:** The primary navigation link was focusable, but its focus ring was placed on a child `span`, so keyboard focus was not visibly indicated on the focused element.

**Implemented:** Moved the focus-visible ring to the link itself. No focus order, route transition, drawer, dialog, or restoration behavior was changed.

**Deferred:** Browser validation of tab order and focus restoration for dialogs, drawers, menus, and route changes.

## 8. Focus-Visible Contract

**Observed:** `globals.css` provides a centralized focus ring for common controls, and feature navigation uses equivalent tokenized rings. Reduced-motion CSS is present.

**Implemented:** The primary navigation link now owns its focus-visible ring and offset classes; the non-focusable child no longer claims focus styling.

## 9. Form Accessibility

**Observed:** `Field` associates labels, descriptions, and errors with controls through `for`, `id`, `aria-describedby`, and `aria-invalid`; validation errors use `role="alert"`.

**Validated:** Existing focused primitive tests cover label association, descriptions, errors, and invalid state. No form code changed in this phase.

**Deferred:** Browser checks for focus order, mixed-direction values, and live validation behavior.

## 10. Loading / Error / Success Announcements

**Observed:** Loading uses `aria-busy` and opt-in live-region behavior; errors use `role="alert"`; success uses `role="status"`. Empty, partial, offline, and unsupported states remain distinct.

**Validated:** Existing state primitive tests pass. No live-region behavior was changed.

## 11. Alert / Toast

**Observed:** `Alert` distinguishes error alerts from non-error status messages. `Toast` uses a polite status and a native labeled dismiss button.

**Validated:** Existing state tests pass. Toast timing and focus behavior remain deferred to runtime validation.

## 12. Dialog / Modal / Popover

**Observed:** Player queue code contains a labeled dialog with `aria-modal`, and its controls are native buttons.

**Deferred:** Focus containment, Escape handling, outside-click behavior, scroll locking, and focus restoration were not claimed because browser execution was unavailable. No primitive was invented.

## 13. Navigation Accessibility

**Observed:** Desktop and bottom navigation expose named `nav` landmarks and `aria-current="page"` for active items. The primary bottom-navigation link had no accessible name and had its focus ring on a child span.

**Implemented:** Fixed both confirmed defects in the canonical navigation primitive and the mounted app-shell compatibility implementation. Existing `href`, active-state, visual, and responsive behavior remain unchanged.

**Validated:** Focused regression test passes (`1/1`); full web suite passes (`59/59` files).

## 14. Player / Queue Accessibility

**Observed:** Player controls and queue actions use native buttons, labels, pressed state, busy state, and progress semantics in existing code/tests.

**Untouched:** Player runtime, queue ownership, playback state, persistence, and player business behavior.

**Deferred:** Runtime keyboard and announcement validation.

## 15. Media Accessibility

**Observed:** Shared media primitives provide artwork alternative text, hidden decorative icons, duration direction isolation, and playback labels according to existing contracts.

**Validated:** No media code changed in DESIGN.14. RTL and media primitive tests remained green.

## 16. Keyboard Interaction

**Observed:** Native links and buttons preserve Enter/Space behavior without custom keyboard handlers in the audited canonical path.

**Implemented:** The primary action remains a native link; no keyboard emulation was added.

**Deferred:** Real Tab, Shift+Tab, Escape, arrow-key, and range-control checks require a browser.

## 17. Touch Targets

**Observed:** Bottom-navigation primary and regular items have stable dimensions; shared icon-button styling exists.

**Deferred:** Complete rendered 44px target and collision matrix across all routes and viewports.

## 18. Reduced Motion

**Observed:** `globals.css` contains a `prefers-reduced-motion: reduce` rule that shortens transitions/animations and disables smooth scrolling. The navigation fix preserves existing hover/active motion.

**Validated:** Source contract observed; runtime reduced-motion behavior deferred.

## 19. Color / Non-Color Semantics

**Observed:** Active navigation has `aria-current` in addition to visual styling. The corrected primary action has a text name independent of its icon/color.

**Validated:** Static semantics and focused test pass.

## 20. Contrast / Token Audit

**Observed:** Changed classes use existing accent and surface tokens. No hard-coded color or new semantic token was introduced.

**Deferred:** Pixel-level contrast measurement in rendered themes.

## 21. RTL + Accessibility

**Observed:** DESIGN.13 establishes document RTL ownership and preservation of DOM/keyboard order. The fix does not reorder nodes, mirror icons, or add direction overrides.

**Implemented:** Label text follows inherited RTL flow; the icon remains decorative and unchanged.

## 22. Responsive + Accessibility

**Observed:** Both mobile bottom-navigation implementations retain their existing responsive geometry and stable target dimensions.

**Deferred:** Browser checks at 320, 375, 390, 768, 1024, 1280, and 1440 pixels, including focus clipping and fixed-navigation overlap.

## 23. Browser Validation

**Attempted:** Playwright is installed and a headless Chromium launch was attempted.

**Deferred:** Chromium exited with `error while loading shared libraries: libatk-1.0.so.0`. No browser, axe, screenshot, viewport, or screen-reader validation is claimed.

## 24. Automated Tests

**Validated:** Focused bottom-navigation test: `1/1`. Full web suite: 59 test files and 214 tests passed. API suite: 13 tests passed.

## 25. Typecheck

**Validated:** The added test introduced no remaining type error. `pnpm --filter @castaminofen/web exec tsc --noEmit` still reports only two pre-existing player test errors: missing `onMove`/`onClear` props in `PlayerDataIntegration.test.tsx`, and possibly undefined `read.queue` in `runtime/__tests__/persistence.test.ts`.

## 26. Lint

**Validated:** `pnpm lint` passes. One existing warning remains for `<img>` in `WelcomeScreen.test.tsx`.

## 27. Build

**Validated:** `pnpm build` succeeds for shared types, web, and API. The same existing `<img>` warning is reported.

## 28. Changed Files

- `apps/web/src/components/design-system/navigation/bottom-navigation.tsx`
- `apps/web/src/components/design-system/navigation/bottom-navigation.test.tsx`
- `apps/web/src/components/layout/bottom-navigation.tsx`
- `docs/phase-reports/DESIGN.14-accessibility-interaction-integrity-report.md`

## 29. Intentionally Untouched Files

API/backend, authentication/authorization, route semantics, React Query/Zustand ownership, player runtime/store, queue and playback behavior, persistence, playlist business logic, feature data fetching, and unrelated design-system primitives.

## 30. Pre-existing Issues

- Web typecheck has two player test errors described in section 25.
- Lint/build retain the existing Next `no-img-element` warning in `WelcomeScreen.test.tsx`.
- Browser automation cannot launch because `libatk-1.0.so.0` is unavailable.
- No repository instruction files listed in the onboarding request were found.

## 31. Deferred Accessibility Debt

1. Add a browser and axe route matrix after the container has the required browser libraries.
2. Validate keyboard focus, dialog/drawer containment and restoration, menu behavior, fixed-player overlap, and responsive target integrity.
3. Validate live-region timing, player progress semantics, mixed-script metadata, and screen-reader output with representative routes.
4. Review remaining feature-local interactive surfaces individually; do not perform a mechanical migration without evidence.

## 32. Architecture Safety Confirmation

**Validated:** DESIGN.14 changes are limited to accessible naming, focus-visible presentation, a focused regression test, and documentation. Business logic, API, auth, routing semantics, player, queue, persistence, playback engine, and feature ownership were not changed.
