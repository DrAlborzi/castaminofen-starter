# DESIGN.4 — Core Components & Media Report

## 1. Executive Summary

**Observed:** The canonical namespace already contained artwork, avatar, media card, media row, creator card, and progress primitives. Media-specific metadata and playback presentation contracts were not consolidated, and unknown progress was rendered as zero.

**Implemented:** Added `Duration`, `MediaMetadata`, and `PlaybackAffordance`; extended `MediaCard` and `MediaRow` with optional artwork, playback, and action slots; made `ProgressIndicator` honestly indeterminate when progress is unknown; documented the contracts in the design-system README.

**Validated:** Focused media tests pass, the full web suite passes, API tests pass, lint passes with one pre-existing warning, and the production build passes. Browser viewport and screen-reader validation was not available.

**Confidence:** HIGH for component contracts and automated tests; MEDIUM for visual behavior because browser automation was unavailable.

## 2. Core Component Architecture

**Observed:** `apps/web/src/components/design-system/` is the canonical reusable namespace. Existing compatibility imports remain in place.

**Implemented:** New primitives are presentational and accept supplied props or slots. They do not fetch data, call APIs, access React Query or Zustand, own player or queue state, route, persist, or contain feature business logic.

## 3. Artwork Contract

**Observed:** `ContentArtwork`, exported as `Artwork`, supports square, portrait, and landscape ratios, Next Image rendering, `object-cover`, blank-source handling, and image-error fallback. `Avatar` provides analogous identity fallback behavior.

**Implemented:** No duplicate artwork or image infrastructure was added. Existing fallback and ratio behavior was preserved.

**Deferred:** Browser image loading, layout-shift, and viewport evidence remain deferred.

## 4. Identity Components

**Observed:** `Avatar` is canonical for identity imagery; `CreatorBadge` and `UserBadge` remain composition-specific presentation primitives.

**Implemented:** No new identity component was introduced. Creator and user surfaces can compose `Avatar` without fetching profile data.

## 5. Media Metadata

**Implemented:** `MediaMetadata` provides a small composable hierarchy for title, optional subtitle, and metadata children. It uses `min-w-0`, truncation, wrapping metadata flow, and semantic heading/paragraph elements. It does not define a domain-wide media object or giant card props API.

## 6. Duration Contract

**Implemented:** `Duration` accepts finite numeric seconds or an already-normalized string. Numeric values render `m:ss`; zero is safe; blank, null, missing, and non-finite values render `مدت نامشخص`. No media parsing, fetching, or invented duration occurs.

## 7. MediaCard

**Observed:** The existing card retained its public title, subtitle, meta, children, and className props.

**Implemented:** Optional `artwork`, `playback`, and `actions` slots now compose with `MediaMetadata`. The card remains a presentational article and does not navigate or control media.

## 8. MediaRow

**Implemented:** Optional `artwork`, `playback`, and `actions` slots were added while preserving the existing title, subtitle, and className API. The row uses min-width-safe flex flow and shrink-resistant action slots. It does not force feature-specific list semantics.

## 9. Playback Presentation

**Implemented:** `PlaybackAffordance` renders play/pause icons, native button semantics, an accessible label, and `aria-pressed` from supplied `isPlaying`. `ProgressIndicator` renders determinate progress or an indeterminate surface with `aria-valuetext`.

**Architecture boundary:** Player ownership, audio runtime, store behavior, queue semantics, and playback timing remain untouched.

## 10. State Integration

**Observed:** DESIGN.3 vocabulary already includes `loading`, `error`, `offline`, `unsupported`, `playing`, `paused`, and `queued`.

**Implemented:** Media primitives use supplied presentation state only. Unknown progress is not represented as false zero progress. No new product state vocabulary was introduced.

## 11. Accessibility

**Validated:** Focused tests verify native playback button output, `aria-pressed`, progress role semantics, and omission of `aria-valuenow` for unknown progress. Existing artwork and avatar tests verify image fallback behavior.

**Observed:** Existing canonical button and icon-button styles provide focus-visible behavior and touch-target conventions.

**Deferred:** Browser keyboard focus order, axe, and screen-reader validation were not run.

## 12. RTL

**Observed:** The application remains `lang="fa" dir="rtl"`. New layouts use flex flow and inline-safe composition; play and pause icons are not mirrored.

**Validated:** Static source inspection and existing DESIGN.2 runtime evidence support RTL preservation.

**Deferred:** Mixed Persian/Latin browser rendering matrix remains deferred.

## 13. Responsive

**Implemented:** Existing breakpoints and tokenized spacing remain unchanged. Media slots use stable shrink behavior and metadata uses truncation/wrapping to avoid action overflow.

**Deferred:** Browser viewport validation at mobile, tablet, desktop, and wide desktop sizes was not available.

## 14. Token / Motion Integration

**Implemented:** New primitives use existing semantic surface, text, border, accent, and focus classes. Progress transitions respect reduced motion with `motion-reduce:transition-none`; no decorative animation was added.

## 15. Feature Adoption

**Adopted:** Canonical exports, media documentation, focused media tests, and reusable card/row slots.

**Deferred:** Broad migration of Library, Profile, Playlists, Player, Creator, Community, Admin, Auth, and route-level compositions belongs to later feature phases.

**Intentionally untouched:** Feature data fetching, actions, routing, player runtime, queue behavior, persistence, and API contracts.

## 16. Files Changed

**Implemented by this phase:**

- `apps/web/src/components/design-system/README.md`
- `apps/web/src/components/design-system/index.ts`
- `apps/web/src/components/design-system/media/duration.tsx`
- `apps/web/src/components/design-system/media/media-metadata.tsx`
- `apps/web/src/components/design-system/media/playback-affordance.tsx`
- `apps/web/src/components/design-system/media/media-card.tsx`
- `apps/web/src/components/design-system/media/media-row.tsx`
- `apps/web/src/components/design-system/player/progress-indicator.tsx`
- `apps/web/src/components/design-system/media/image-with-fallback.test.tsx`
- `docs/phase-reports/DESIGN.4-core-components-media-report.md`

**Observed pre-existing worktree changes:** Numerous feature/UI files and `docs/phase-reports/DESIGN.4-feature-ui-primitive-migration-consistency-surface-normalization-report.md` were already modified or untracked at baseline and were preserved.

## 17. Files Intentionally Untouched

Backend, API contracts, authentication, authorization, route definitions, React Query ownership, Zustand ownership, persistence, Player runtime/store, queue semantics, playback runtime, and feature business logic were not changed by this implementation.

## 18. Tests

**Validated:** Focused media test: 1 file, 6 tests passed.

**Validated:** Full web test: 53 files, 198 tests passed.

**Validated:** `pnpm test`: 13 API tests passed.

**Observed:** Vitest emits an existing Vite `configLoader: 'native'` warning; it does not fail tests.

## 19. Typecheck

**Validated:** `pnpm --filter @castaminofen/web exec tsc --noEmit` reports two pre-existing Player test errors: missing `onMove`/`onClear` props in `PlayerDataIntegration.test.tsx` and possibly undefined `read.queue` in `persistence.test.ts`. No D4 file diagnostics were reported.

## 20. Lint

**Validated:** `pnpm lint` passes. One pre-existing warning remains for an `<img>` in `WelcomeScreen.test.tsx`.

## 21. Build

**Validated:** `pnpm build` passes for shared types, web, and API. The same pre-existing Welcome `<img>` warning is emitted during the web build.

## 22. Runtime Validation

**Validated:** Automated DOM tests cover artwork fallback, avatar fallback, duration output, indeterminate progress semantics, playback state, and card/row slot composition.

**Deferred:** Browser viewport / screen-reader validation was not available in this environment. No visual screenshot or live assistive-technology claim is made.

## 23. Pre-existing Issues

- Web standalone typecheck has the two Player test errors documented above.
- Lint/build emit the existing Welcome `<img>` warning.
- Vitest emits the existing Vite config-loader warning.
- The worktree contained broad unrelated user changes before this phase began.

## 24. Deferred Design Debt

- Add browser viewport, keyboard, RTL mixed-script, reduced-motion, and screen-reader automation.
- Review feature-local media cards/rows for selective adoption in DESIGN.5–DESIGN.10.
- Decide whether queued and paused need dedicated visual indicators beyond supplied affordance composition.
- Audit specialized loading skeleton geometry without changing feature ownership.

## 25. Architecture Safety Confirmation

**Validated:** DESIGN.4 remained a Core Components & Media design-system phase. No API, backend, authentication, authorization, routing, persistence, Player runtime, Player store, queue semantics, playback runtime, React Query ownership, Zustand ownership, or feature business logic was changed by this implementation.