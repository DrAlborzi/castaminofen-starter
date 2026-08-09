# DESIGN.13 — RTL & Bidirectional Layout Integrity

## 1. Executive Summary

**Observed:** Castaminofen is a Persian-first application with a static document contract of `<html lang="fa" dir="rtl">`. The root attribute was correct, but CSS and onboarding duplicated direction ownership. The audit also found physical search adornment positioning, incorrect creation-wizard chevron semantics, physical icon spacing in library actions, and no explicit direction isolation in the shared duration primitive.

**Implemented:** Kept `apps/web/src/app/layout.tsx` as the sole document direction owner; removed duplicate CSS/local direction declarations; migrated the confirmed search and library spacing/positioning cases to logical utilities; corrected previous/next wizard chevrons; isolated shared duration output as LTR-readable metadata; added focused semantic tests and this contract.

**Validated:** Focused RTL tests pass (`2/2`), the affected search/library test slice passes (`5/5`), the complete web suite passes (`58` files, `213` tests), API tests pass (`13/13`), lint passes with one pre-existing warning, and the production build succeeds.

**Recommendation:** Continue with browser-based RTL interaction coverage for player timelines, native range keyboard behavior, navigation focus order, carousels, forms, and representative mixed-script content when the container has the required browser libraries.

**Deferred:** Playwright is installed, but Chromium could not launch because the container lacks `libatk-1.0.so.0`. No visual, viewport, screenshot, or screen-reader result is claimed. Web typecheck remains blocked by two pre-existing player test errors unrelated to DESIGN.13.

**Confidence:** High for the static contract, focused component tests, compilation/build, and source audit. Medium for rendered layout and interaction behavior because browser and screen-reader validation was unavailable.

## 2. Audit Scope

Inspected the web app, design-system primitives, app shell/navigation, forms/search, media/player surfaces, cards/lists, community/creator/admin surfaces, responsive classes, tests, prior DESIGN reports, and repository instructions. No repository-level `AGENTS.md`, `CONTRIBUTING.md`, Copilot instruction, or project instruction file exists. DESIGN.0 and DESIGN.2 through DESIGN.12 reports were reviewed where present. An exact DESIGN.1 report was not present; related `UI.DESIGN.1` and `UI.DESIGN.2` reports exist under `docs/reports/`.

## 3. Canonical RTL Contract

The application is statically Persian-first and RTL. `layout.tsx` owns the document contract. Local `dir` is reserved for content whose semantic direction differs from surrounding prose, such as URLs, email addresses, identifiers, and durations. There is no runtime direction switch and no RTL Tailwind plugin.

## 4. Document Direction

**Observed:** `apps/web/src/app/layout.tsx` emits `<html lang="fa" dir="rtl">`. `globals.css` also declared `direction: rtl`, and `WelcomeScreen` added `dir="rtl"` to its root main element.

**Implemented:** Removed the duplicate CSS and onboarding declarations. The document/root attribute is now the primary authority, with no competing global or local wrapper.

## 5. Logical CSS Audit

**Observed:** The inventory found physical `ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, and `text-left/right` usages. Findings were classified as follows:

- **Correct / intentional:** centered geometry (`left-1/2` plus translation), fixed artwork geometry, vertical controls, and explicit text hierarchy.
- **RTL-safe:** flex/grid flow, `justify-between`, `min-w-0`, truncation, and most tokenized spacing.
- **Confirmed RTL defect:** search icon/clear-button placement and input padding used physical sides; library icon spacing used physical margins.
- **Potential / deferred:** player labels, progress fill direction, and broad feature-local physical utilities need rendered interaction evidence before migration.
- **Requires product decision:** horizontal collection scroll origin and any content-dependent share/send/external-link direction.
- **Out of scope:** API, business behavior, player runtime/store, queue ownership, and route semantics.

**Implemented:** Search uses `end-4`, `start-2`, and `pe-11`; library action icons use `me-2`.

## 6. Tailwind RTL Audit

**Observed:** Tailwind 3.4 supports logical `ms/me/ps/pe/start/end` utilities. The repository has limited existing logical utility use and no RTL plugin.

**Implemented:** Migrated only confirmed directional search/library cases. No plugin or broad mechanical migration was introduced.

**Deferred:** Remaining physical utilities require local semantic review; they are not automatically defects.

## 7. Icon Direction Audit

**Observed:** Lucide icons are used without global SVG mirroring. Invariant icons such as play, pause, volume, search, settings, and status icons are not automatically mirrored. The creation wizard used `ChevronLeft` for previous and `ChevronRight` for next, conflicting with Persian RTL directional meaning.

**Implemented:** Previous now uses `ChevronRight`; next uses `ChevronLeft`. Their spacing uses logical `me-1`. This is a semantic navigation correction, not a global icon transform.

**Deferred:** Content-dependent share, send, external-link, carousel, and player seek icon behavior needs browser/product-context review.

## 8. Navigation RTL Audit

**Observed:** App-shell compatibility navigation owns the mounted header/bottom navigation, with the canonical desktop navigation nested at the responsive breakpoint. DOM order and native controls remain intact. The centered bottom action is geometric and intentionally centered, not a directional placement defect.

**Implemented:** No DOM order or navigation model changes. The creation wizard directional control semantics were corrected.

**Deferred:** Browser keyboard/focus validation for desktop/mobile navigation, breadcrumbs, tabs, pagination, and carousel controls.

## 9. Forms RTL Audit

**Observed:** Shared `Input` and `Field` inherit document RTL, which is appropriate for Persian labels/prose. Search had physical adornment placement. Email, URL, username, and identifier fields need local content direction rather than blanket RTL or LTR.

**Implemented:** Search adornments and padding use logical placement; accessible labels and native form semantics are unchanged.

**Deferred:** Browser checks for password visibility, clear buttons, validation messages, focus rings, and mixed-direction entry fields.

## 10. Mixed-Script Contract

**Observed:** The product contains Persian prose alongside English titles, usernames, URLs, identifiers, timestamps, and durations. Prior reports documented this as a DESIGN.13 gap.

**Implemented:** The shared `Duration` primitive now renders its display value with `dir="ltr"`. The design-system contract requires local `dir="ltr"` or `dir="auto"` only for inherently LTR/mixed values when needed; it does not force whole cards or fields LTR.

**Deferred:** Representative browser rendering for `Castaminofen`, `@example`, email, URL, `Episode 42`, `12:45`, and ISO dates.

## 11. Media & Player RTL Audit

**Observed:** Play/pause/volume semantics were not globally mirrored. Player progress and seek handling are direction-sensitive, and prior reports explicitly defer real-browser range/timeline checks.

**Implemented:** No player runtime, store, queue, persistence, playback, or progress behavior was changed. Duration presentation gained local LTR isolation.

**Deferred:** Native range keyboard mapping, chronological progress fill, seek controls, queue navigation, immersive controls, and transcript mixed-script rendering require browser validation.

## 12. Cards / Lists / Collections

**Observed:** Media/card layouts use `min-w-0`, flex/grid flow, and truncation. Library action icon spacing was a confirmed physical-margin issue.

**Implemented:** Library play/add action spacing now follows inline direction. No artwork, metadata hierarchy, action ownership, or feature data behavior changed.

**Deferred:** Long title, creator identity, badge, overflow-menu, and mixed-script card rendering at viewport widths.

## 13. Horizontal Scrolling / Carousels

**Observed:** Media carousel primitives and horizontal collections exist; no browser evidence establishes scroll origin, snap behavior, or focus clipping under RTL.

**Implemented:** No native scroll behavior was changed.

**Deferred:** First-item visual position, previous/next semantics, keyboard navigation, snap, and focus visibility.

## 14. Typography / Text Alignment

**Observed:** Explicit `text-right` and `text-left` occur in feature-specific hierarchy and player metadata. They were not globally replaced because alignment can be intentional and browser evidence is absent.

**Implemented:** No cosmetic alignment rewrite. The contract prefers natural RTL flow and requires explicit alignment to communicate a real hierarchy.

**Deferred:** Persian/mixed-script truncation and typography inspection in a real browser.

## 15. Tables / Data-Dense Surfaces

**Observed:** Admin/data-dense surfaces exist, but no dedicated browser RTL matrix or table contract test exists.

**Implemented:** No column or DOM order changes; numeric and action semantics remain product-owned.

**Deferred:** Column order, numeric alignment, sorting indicators, pagination, overflow, and keyboard navigation.

## 16. Responsive RTL

**Observed:** Source inspection covered responsive header, navigation, cards, forms, player, and collections. Tailwind breakpoints include mobile, tablet, desktop, and wide-desktop layouts.

**Implemented:** Logical search placement is responsive without changing breakpoints or product behavior.

**Deferred:** Browser viewport validation at 320, 375, 390, 768, 1024, 1280, and 1440 pixels. Playwright could not launch due missing `libatk-1.0.so.0`.

## 17. Accessibility

**Observed:** Existing controls use native buttons/inputs, labels, `aria-label`, and `aria-hidden` for decorative icons. No CSS `order` or duplicate accessible content was introduced.

**Implemented:** Preserved DOM order, keyboard order, native semantics, and accessible names. Added no global transform or automatic icon mirroring.

**Deferred:** Screen-reader, focus-ring, keyboard navigation, live-region, and axe validation. Browser viewport and screen-reader validation was not available in this environment.

## 18. Tests

**Validated:** Added `rtl-contract.test.tsx` with semantic assertions for LTR duration isolation and logical search placement: `2/2` passed. Affected search/library tests passed: `5/5`. Full web suite passed: `58` test files and `213` tests. API regression tests passed: `13/13`.

## 19. Typecheck

**Observed:** `pnpm --filter @castaminofen/web exec tsc --noEmit` fails on two pre-existing player test errors: missing `onMove`/`onClear` props in `PlayerDataIntegration.test.tsx`, and possibly undefined `read.queue` in `runtime/__tests__/persistence.test.ts`. Neither touched file is part of DESIGN.13.

## 20. Lint

**Validated:** `pnpm lint` passes across workspaces. One pre-existing warning remains in `WelcomeScreen.test.tsx` for using `<img>` instead of `next/image`.

## 21. Build

**Validated:** `pnpm build` succeeds for shared types, web, and API. Next build reports the same pre-existing `<img>` warning.

## 22. Runtime / Browser Validation

**Attempted:** Started the production web server on port 3100 and attempted a Playwright matrix for `/`, `/library`, `/profile`, `/podcasts`, `/search`, `/playlists`, `/creator`, `/community`, `/admin`, and `/settings` at mobile, tablet, desktop, and wide desktop sizes.

**Deferred:** Chromium failed to launch because `libatk-1.0.so.0` is unavailable in the container. No route, screenshot, overflow, focus, visual, or screen-reader result is claimed.

## 23. Files Changed

- `apps/web/src/app/globals.css`
- `apps/web/src/components/design-system/README.md`
- `apps/web/src/components/design-system/media/duration.tsx`
- `apps/web/src/components/design-system/rtl-contract.test.tsx`
- `apps/web/src/features/create/components/CreationWizard.tsx`
- `apps/web/src/features/library/components/LibraryFavoritesSection.tsx`
- `apps/web/src/features/onboarding/components/WelcomeScreen.tsx`
- `apps/web/src/features/search/components/SearchInput.tsx`
- `docs/phase-reports/DESIGN.13-rtl-bidirectional-layout-integrity-report.md`

## 24. Files Intentionally Untouched

Player runtime/store, queue and persistence, API/backend, authentication/authorization, routing semantics, React Query/Zustand ownership, feature data fetching, navigation model, media playback behavior, and unrelated physical CSS patterns were intentionally untouched.

## 25. Pre-existing Issues

- Web typecheck has two existing player test errors described in section 19.
- Lint/build retain the existing `no-img-element` warning in `WelcomeScreen.test.tsx`.
- Browser automation cannot launch because the container lacks `libatk-1.0.so.0`.
- No exact DESIGN.1 report exists under the expected naming; related UI.DESIGN reports were available.

## 26. Deferred RTL Debt

1. Add a real-browser RTL matrix with the missing system libraries or CI browser image.
2. Verify player range keyboard semantics and chronological progress rendering.
3. Add mixed-script fixtures for URLs, email, usernames, identifiers, dates, durations, and long titles.
4. Validate navigation, pagination, tabs, breadcrumbs, carousels, tables, focus order, and screen-reader announcements.
5. Review remaining physical utilities individually; do not perform a blanket migration.

## 27. Architecture Safety Confirmation

DESIGN.13 changes are presentation, direction-ownership, documentation, and focused test changes only. No API contract, backend, authentication, authorization, routing semantics, React Query ownership, Zustand ownership, player runtime/store, queue semantics, playback behavior, persistence, playlist business logic, feature fetching, or product functionality was changed.
