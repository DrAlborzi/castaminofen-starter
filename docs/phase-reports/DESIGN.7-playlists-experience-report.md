# DESIGN.7 - Playlists Experience Report

## 1. Executive Summary

The Playlist feature is a real, API-backed feature with feature-owned CRUD, React Query hooks, route pages, playlist item presentation, and Player dispatch adapters. The audit found canonical state wrappers already in use, but identified small presentation gaps in form controls, empty-item semantics, route containers, and destructive action styling.

Implemented changes are limited to canonical `Field`, `Input`, `Button` loading/destructive semantics, `EmptyState(category="no-items")`, and `PageContainer` adoption. Focused playlist tests, the complete web test suite, API tests, lint, and production build were run. Browser viewport, keyboard, screen-reader, and runtime automation were unavailable. Confidence is HIGH for the changed DOM/state contracts and ownership preservation, and MEDIUM for visual/responsive behavior pending browser validation.

No repository `AGENTS.md`, `CLAUDE.md`, nested instruction file, or usable `.github/copilot-instructions.md` was present in the current worktree; the task prompt and prior phase reports were used as the governing contract.

## 2. Audit Scope

Inspected:

- `/playlists` list route and `/playlists/[id]` detail route.
- `PlaylistList`, `PlaylistCard`, `PlaylistHeader`, `PlaylistActionBar`, `PlaylistEmptyState`, `PlaylistLoadingState`, `PlaylistErrorState`, `PlaylistFormDialog`, `PlaylistEpisodeList`, and `PlaylistItemRow`.
- Playlist hooks, services, types, playlist utility/playback-plan tests, and API-facing mutation code.
- Existing playlist create/edit/delete, add/remove, reorder hook surface, and player queue adapters.
- Canonical design-system state, form, button, card, artwork, media, page-container, RTL, and reduced-motion contracts.
- Prior DESIGN.0-DESIGN.6 reports and Playlist architecture/frontend reports.
- Player runtime/store and queue integration points for boundary verification.

## 3. Playlist Architecture

Playlist owns playlist queries, mutations, forms, route content, ownership-related data supplied by the API, item rendering, and local presentation state. React Query remains the data/cache owner through `usePlaylists` and related hooks. The design system only renders supplied props and state.

No query, mutation, API request, cache invalidation, authorization decision, route decision, persistence adapter, or business rule moved into the design system.

## 4. Data Provenance

- **REAL:** Playlist list/detail data, playlist metadata, item relationships, and CRUD results are API-backed through the existing feature services and React Query hooks.
- **PARTIAL:** The current frontend supports real playlist CRUD and playback integration, while adding an episode from the detail surface remains disabled/unsupported in the existing UI. Supporting artwork is real only when an API `imageUrl` exists.
- **MOCK / PREVIEW:** No mock playlist data or fabricated playlist items were introduced or found in the inspected Playlist feature surface.
- **STATIC:** Empty-state copy, explanatory form copy, visibility labels, and the instruction that episodes are added from other surfaces are static presentation copy.
- **UNSUPPORTED:** The visible `افزودن اپیزود` control remains truthfully disabled because the current route does not implement that action. No fake success or persistence was added. No offline support was claimed.

## 5. State Contract

- **Loading:** Existing feature-owned query branches use canonical `LoadingState` through `PlaylistLoadingState`, preserving stable geometry and `aria-busy`.
- **Empty:** No playlists uses `PlaylistEmptyState` and canonical `EmptyState`; an empty playlist's item collection now uses `EmptyState(category="no-items")`.
- **Error:** List/detail query failures use canonical `ErrorState` through `PlaylistErrorState` and preserve retry callbacks. Failures are not represented as empty content.
- **Partial:** No speculative `PartialState` was introduced; the feature does not currently expose a scoped usable-content failure boundary.
- **Success:** No new notification architecture or fake mutation success was introduced. Existing mutation completion behavior remains feature-owned and silent where it was silent before.
- **Unsupported:** The disabled add-item action remains disabled and is now given an accessible name describing its unsupported state.

## 6. Component Adoption

Adopted canonical `Field` and `Input` for playlist title and image URL fields. This preserves `react-hook-form` registration while providing programmatic labels, error association, and `aria-invalid` behavior through the canonical field contract.

Adopted canonical `Button` loading semantics for create/edit submit and cancel controls. Native disabled behavior and `aria-busy` are now supplied by the shared primitive without changing submission ownership or duplicate-submit behavior.

Adopted canonical `PageContainer` in both playlist routes while retaining the native `main` landmark. No duplicate design-system primitive was introduced.

## 7. Media Adoption

Playlist-specific artwork, metadata, action groups, and item rows were retained. The existing rows expose play, queue, and remove actions whose ownership and layout are feature-specific; forcing them into `MediaRow` would require a broader action/metadata contract without a clear behavior-preserving gain. No Player or queue presentation primitive was changed.

The existing playlist artwork treatment was left untouched because it has feature-specific placeholder behavior and no safe need for a media migration in this phase.

## 8. Playlist CRUD

Create, rename/edit, delete, add-item service support, remove-item behavior, React Query invalidation, confirmation prompts, and navigation remain feature-owned. Presentation changes were limited to canonical form controls, native loading/disabled semantics, route container composition, and destructive button styling.

## 9. Reordering

The feature exposes a `useReorderPlaylistItems` mutation and preserves its existing ownership, algorithm, persistence, and cache invalidation. No reorder UI or algorithm was changed in DESIGN.7. Keyboard reorder and drag/drop behavior were not present in the inspected Playlist presentation surface and were not fabricated.

## 10. Player / Queue Boundary

Playlist playback continues through the existing `usePlayerRuntime`, `replaceQueue`, `appendToQueue`, `mapEpisodeToPlayableItem`, and `buildPlaylistPlaybackPlan` boundaries. Player runtime/store, queue ownership, queue mutation semantics, persistence, playback timing, and audio behavior were untouched.

## 11. Accessibility

Native `main`, headings, links, and buttons were preserved. The route back link remains a native link. Playlist edit/delete controls retain accessible names, and the delete action now uses the canonical destructive Button variant. Form labels remain associated with inputs through `Field`; title errors use `aria-invalid` and `aria-describedby` through the canonical contract. Loading submit controls use native `disabled` and `aria-busy`. The unsupported add-item control has an explicit accessible name.

Focused tests assert `role="status"`, the `no-items` category, labels, and loading disabled/`aria-busy` output. Browser focus order, axe, screen-reader announcements, and dialog focus return were not run.

## 12. RTL

The document remains `lang="fa" dir="rtl"`. Changes use existing flex flow and canonical logical-safe layout. No directional icon was mirrored; play, plus, edit, and delete icons are non-directional in this context. Mixed Persian/Latin titles, dates, durations, and browser-level action placement require runtime validation.

## 13. Responsive

Existing `sm`, `md`, and `xl` breakpoints and feature-specific wrapping remain unchanged. The route now uses canonical `PageContainer` with the existing app max-width and spacing contract. Playlist cards, headers, action groups, forms, and item rows retain their prior responsive composition. No new breakpoint was added.

Conceptual sizes 320px, 375px, 768px, 1024px, 1280px, and 1440px were not browser-tested in this environment. No visual screenshot or overflow claim is made.

## 14. Tokens / Motion

New presentation consumes canonical Button, Field, Input, EmptyState, and PageContainer token contracts. No arbitrary color, shadow, radius, spacing token, CSS variable, or animation was added. Existing reduced-motion behavior remains centralized; no new motion was introduced.

## 15. Files Changed

DESIGN.7 implementation files:

- `apps/web/src/app/playlists/page.tsx`
- `apps/web/src/app/playlists/[id]/page.tsx`
- `apps/web/src/features/playlists/components/PlaylistActionBar.tsx`
- `apps/web/src/features/playlists/components/PlaylistCard.tsx`
- `apps/web/src/features/playlists/components/PlaylistDetailsPage.tsx`
- `apps/web/src/features/playlists/components/PlaylistEpisodeList.tsx`
- `apps/web/src/features/playlists/components/PlaylistFormDialog.tsx`
- `apps/web/src/features/playlists/components/PlaylistPresentation.test.tsx`
- `docs/phase-reports/DESIGN.7-playlists-experience-report.md`

## 16. Files Intentionally Untouched

- Backend and API architecture/contracts.
- Authentication, authorization, route semantics, and navigation ownership.
- React Query ownership, Zustand ownership, persistence adapters, and caching strategy.
- Player runtime/store, queue ownership/semantics, playback runtime, and audio behavior.
- Playlist services, hooks, mutation algorithms, and business rules.
- Existing specialized playlist artwork, item-row layout, confirmation behavior, and playback adapters.
- Unrelated feature implementations and pre-existing worktree content.

## 17. Tests

- Focused DESIGN.7 playlist presentation tests: **1 file, 2 tests passed**.
- Focused existing playlist utility/playback tests: **2 files, 3 tests passed**.
- Complete web suite: **55 files, 205 tests passed**.
- Root `pnpm test` / API suite: **13 tests passed**.
- Vitest emits the existing Vite `configLoader: 'native'` warning; it does not fail tests.

## 18. Typecheck

`pnpm --filter @castaminofen/web exec tsc --noEmit` remains **blocked by 2 pre-existing Player test errors**:

- `src/features/player/components/PlayerDataIntegration.test.tsx`: `QueuePanel` test props omit existing `onMove` and `onClear` requirements.
- `src/features/player/runtime/__tests__/persistence.test.ts`: `read.queue` is possibly undefined.

No DESIGN.7 file was reported in the typecheck diagnostics.

## 19. Lint

`pnpm lint` **passed** across API and web. The existing warning in `WelcomeScreen.test.tsx` for a raw `<img>` remains and is unrelated to DESIGN.7.

## 20. Build

`pnpm build` **passed** for shared types, web, and API. Next.js emitted the same unrelated Welcome `<img>` warning during web build.

## 21. Runtime Validation

Static DOM tests and the production build validated changed state/control output. No browser automation was available, so playlist list/detail runtime flows, responsive screenshots, keyboard navigation, screen-reader output, RTL mixed-script rendering, reduced-motion behavior, mutation feedback, and focus management were not browser-validated.

## 22. Pre-existing Issues

- Two unrelated Player test type errors prevent a clean standalone web typecheck.
- The existing Welcome `<img>` lint/build warning remains.
- Vitest emits the existing Vite config-loader warning.
- Browser and assistive-technology automation were unavailable.

## 23. Deferred Design Debt

- Add browser viewport, keyboard, axe, screen-reader, mixed-script RTL, and reduced-motion coverage.
- Decide and implement the product-owned add-episode workflow when its API/UI contract is ready.
- Add explicit mutation success/error presentation only if the feature requires persistent contextual feedback; no toast host was introduced.
- Revisit playlist item media composition if a canonical artwork/metadata/action contract becomes genuinely equivalent without moving playback or queue ownership.
- Add and validate keyboard reorder controls if reorder UI is exposed to users.

## 24. Architecture Safety Confirmation

> DESIGN.7 remained a presentation and UX-consistency phase. Playlist ownership, CRUD behavior, API contracts, authentication, routing, persistence, Player runtime, queue semantics, playback behavior, and feature business logic remained outside the design system.

Final `git diff --check` passed. The initial worktree was clean, and no unrelated pre-existing changes were overwritten.
