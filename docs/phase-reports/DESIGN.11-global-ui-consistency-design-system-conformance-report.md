# DESIGN.11 - Global UI Consistency & Design-System Conformance Report

**Repository:** `PicoRmin/castaminofen-starter`  
**Phase date:** 2026-08-09  
**Scope:** Repository-wide presentation consistency audit with only high-confidence, behavior-preserving changes.

## 1. Executive Summary

**Observed:** DESIGN.0-DESIGN.10 established `apps/web/src/components/design-system/` as the canonical presentation layer, migrated most equivalent primitive consumers, and documented feature-specific exceptions. Remaining variation is concentrated in specialized feature composition, compatibility wrappers, mock/preview surfaces, and arbitrary geometry in feature-local layouts.

**Implemented:**

- Migrated the remaining direct `Avatar` consumers found in the Creator and Profile surfaces from the forwarding `components/ui/avatar` compatibility path to `@/components/design-system`.
- Added a concise DESIGN.11 conformance section to the canonical design-system README covering safe migrations, legitimate local components, semantic tokens, state selection, media ownership, compatibility policy, and forbidden mechanical replacement.

**Validated:** Focused profile/creator tests passed (2 files, 11 tests). The full web suite passed (57 files, 211 tests), API tests passed (13 tests), lint passed with one known warning, production build passed, and `git diff --check` passed.

**Deferred:** No broad token replacement, route redesign, state rewrite, browser visual matrix, RTL matrix, accessibility audit, or feature architecture change was justified by this presentation-only phase.

## 2. Audit Scope

**Observed:** Reviewed repository README, available repository instructions, design-system README and index, token and design-decision documentation, DESIGN.0-DESIGN.10 reports, current worktree status/diff, all major web feature areas, compatibility imports, local state implementations, media surfaces, and arbitrary styling patterns.

**Observed:** No repository-level `AGENTS.md`, `CONTRIBUTING.md`, nested project instruction file, or usable repository Copilot instruction file was present in the workspace outside dependency directories. The task contract, root README, design-system documentation, and prior phase reports were used as governing guidance.

**Validated:** The worktree was clean before implementation. No unrelated baseline changes were present to protect or overwrite.

## 3. Canonical Design System Inventory

**Observed:** `apps/web/src/components/design-system/index.ts` is the canonical export surface. It exports:

- **Layout and navigation:** `PageContainer`, `SectionHeader`, `MobileHeader`, `BottomNavigation`, `DesktopNavigation`.
- **Common controls and surfaces:** `Button`, `IconButton`, `Chip`, `Tag`, `Badge`, `Card`, `Input`, `Field`, and `Artwork`.
- **States and feedback:** `LoadingState`, `EmptyState`, `ErrorState`, `PartialState`, `OfflineState`, `UnsupportedState`, `SuccessState`, `Alert`, `Toast`, and `Provenance`.
- **Identity and media:** `Avatar`, `UserBadge`, `CreatorBadge`, `ContentArtwork`, `CreatorCard`, `MediaCard`, `MediaRow`, `MediaCarousel`, `MediaMetadata`, and `Duration`.
- **Player and social presentation:** `PlaybackAffordance`, `MiniPlayer`, `TimelineMarker`, `ProgressIndicator`, `Reaction`, `CommentPreview`, and `DiscussionCard`.

**Observed:** The canonical README defines presentation-only ownership. Primitives receive data and behavior through props; they do not fetch, route, persist, mutate, own playback, or own application state.

**Validated:** The changed Avatar consumers use the canonical index without a prop or behavior change.

## 4. Legacy Primitive Audit

**Observed:** `components/ui/*` and selected `components/layout/*` paths remain compatibility surfaces. The canonical-equivalent `Avatar`, `Button`, `Card`, `Badge`, `Input`, `LoadingState`, `EmptyState`, and `ErrorState` aliases forward to canonical implementations.

**Implemented:** Two direct Avatar imports were migrated:

- `features/creator/components/CreatorProfilePage.tsx`
- `features/profile/components/ProfileHero.tsx`

**Observed:** Remaining compatibility usage is not a safe one-to-one migration in this phase:

- `components/ui/form` provides a neutral form wrapper and field grouping API; no equivalent canonical Form primitive exists.
- `components/ui/page-state` is a compatibility composition that maps a legacy variant API to several canonical states; it is not a single primitive.

**Recommendation:** Keep compatibility aliases functional until all consumers and external compatibility requirements are proven safe. Remove aliases only in a separately scoped compatibility-retirement task.

## 5. Duplicate Component Audit

| Area | Issue | Classification | Action |
| --- | --- | --- | --- |
| Creator profile | `Avatar` imported through forwarding alias | SAFE | Migrated to canonical index |
| Profile hero | `Avatar` imported through forwarding alias | SAFE | Migrated to canonical index |
| Episode/Podcast/Auth forms | `components/ui/form` wrapper | SPECIALIZED / COMPATIBILITY | Preserved |
| Admin and route placeholders | `PageState` composition API | LEGACY COMPATIBILITY | Preserved |
| Library loading | Feature skeleton plus canonical loading state | SPECIALIZED GEOMETRY | Preserved |
| Library/profile media rows | Domain actions and playback composition | SPECIALIZED | Preserved |
| Creator/Admin/Community surfaces | Feature-specific cards and panels | SPECIALIZED / MOCK PRESENTATION | Preserved |
| Search/catalog/profile states | Canonical state adoption already present | VALIDATED | No change |

**Observed:** No remaining canonical-equivalent Button, Card, Badge, Input, LoadingState, EmptyState, or ErrorState imports were found through the focused compatibility audit.

## 6. Token Consistency Audit

**Observed:** Canonical primitives use semantic Tailwind tokens such as `bg-surface-card`, `text-text-primary`, `border-border`, `text-action-primary`, and the established focus/status tokens.

**Observed:** Feature-local code still contains arbitrary radii, typography sizes, gradients, shadows, opacity, and feature geometry. Examples include profile/creator hero surfaces, compact analytics items, social comment nesting, and specialized loading skeletons.

**Classification:** Most findings are **SPECIALIZED**, **FEATURE-SPECIFIC GEOMETRY**, or **DEFERRED**. They are not evidence of canonical-equivalent primitive duplication by themselves.

**Implemented:** The README now states that semantic tokens are preferred, while arbitrary values require local evidence for feature geometry, native/browser requirements, or intentional one-off treatment.

**Recommendation:** Perform token normalization only within a measured visual QA slice. Do not replace arbitrary classes repository-wide without confirming semantic intent and visual equivalence.

## 7. Typography Consistency Audit

**Observed:** Vazirmatn remains the documented product font and is used by the application foundation. Canonical roles exist for headings, body, metadata, captions, labels, and code.

**Observed:** Feature-local typography includes small uppercase/expanded labels, arbitrary `text-[11px]` and `text-[10px]` metadata, and custom tracking in mock/profile/creator surfaces.

**Classification:** **DEFERRED** where the local label is part of a specialized editorial or dashboard hierarchy. No content or copy was changed.

**Recommendation:** Validate script-sensitive tracking, Persian readability, mixed Persian/Latin titles, durations, identifiers, and heading wrapping in DESIGN.13/DESIGN.14 rather than changing type roles mechanically here.

## 8. Surface Consistency Audit

**Observed:** The product uses semantic surfaces and borders in canonical components, while feature surfaces use several intentional levels: hero surfaces, panels, list items, media cards, dialogs, player surfaces, and nested social content.

**Observed:** Repeated local radii and layered surfaces are present in Profile, Creator, Community, Admin, Settings, and loading skeletons. These areas contain specialized content density or mock/preview composition.

**Classification:** **SPECIALIZED**, **FEATURE-SPECIFIC GEOMETRY**, or **DEFERRED**. No flattening or card replacement was performed.

**Implemented:** The README now prohibits mechanical card replacement and distinguishes local specialized composition from canonical primitive adoption.

## 9. Interaction State Audit

**Observed:** Canonical Button, IconButton, Input, Field, navigation, and state primitives provide native semantics, disabled behavior, focus-visible treatment, loading state, and accessible naming contracts. Prior phases added focused coverage for auth, playlists, community controls, player progress, and state primitives.

**Observed:** Feature-specific controls remain where action ownership, domain copy, or layout is specialized. The Creator/Profile audit found no safe interaction-state migration coupled to the Avatar import cleanup.

**Validated:** Existing full web tests and production build passed. No callback, route, state manager, or native interaction semantics changed.

**Deferred:** Browser keyboard, focus order, screen-reader, and axe validation belongs to DESIGN.14.

## 10. Global State Presentation Audit

**Observed:** The canonical state vocabulary covers loading, empty, error, partial, offline, unsupported, success, alert, toast, and provenance. Prior phases migrated equivalent Search, Catalog, Library/Profile, Playlist, Player, Creator, Admin, Community, and Auth cases.

**Observed:** Local skeletons and feature alerts remain where geometry, copy, or ownership is meaningful. `PageState` remains a compatibility composition rather than a competing state system.

**Implemented:** The README now requires selecting a state from the owning data outcome and explicitly forbids converting errors to empty states, fabricating success, or adding offline behavior without a real capability.

**Recommendation:** Continue selective state migration only when the state outcome and semantics are equivalent. Review partial-result boundaries when feature data contracts expose them.

## 11. Media Consistency Audit

**Observed:** `ContentArtwork`, `Avatar`, `MediaCard`, `MediaRow`, `MediaMetadata`, `Duration`, `PlaybackAffordance`, and `ProgressIndicator` are canonical media presentation primitives. They preserve stable geometry, supplied alternative text, honest duration/progress, and feature-owned playback behavior.

**Observed:** Library, Profile, Playlist, Player, Podcast, Episode, Creator, and Community compositions retain domain-specific actions, navigation, queue dispatch, or feature-owned artwork treatment.

**Classification:** Canonical-equivalent media foundations are adopted where safe; domain-specific cards/rows are **SPECIALIZED** and preserved.

**Implemented:** The README explicitly records that media primitives own presentation only, while features retain navigation, playback dispatch, queue behavior, fetching, and mutations.

## 12. Feature-by-Feature Audit

| Area | Evidence | Classification | Action |
| --- | --- | --- | --- |
| Welcome | Static orientation plus real/partial discovery; canonical media and state usage | VALIDATED / PARTIAL | Untouched |
| Discovery | Real queries plus editorial/placeholder sections and specialized skeletons | SPECIALIZED / PARTIAL | Untouched |
| Catalog | Canonical route container, form, button, and no-results state already adopted | VALIDATED | Untouched |
| Auth | Canonical Field/Input/Button/LoadingState adoption already documented | VALIDATED | Untouched |
| Podcasts/Episodes | API-backed forms and feature-specific form wrapper | SPECIALIZED / COMPATIBILITY | Untouched |
| Search | Canonical state adoption and explicit no-results semantics | VALIDATED | Untouched |
| Library | Real query states plus specialized skeleton and playback rows | SPECIALIZED / REAL-PARTIAL | Untouched |
| Profile | Canonical continuation states and media composition; Avatar alias remained | SAFE | Avatar import migrated |
| Playlists | Canonical route/form/state controls; domain action rows preserved | VALIDATED / SPECIALIZED | Untouched |
| Player/Queue | Canonical progress/media presentation; runtime and queue remain feature-owned | VALIDATED / SPECIALIZED | Untouched |
| Community | Preview provenance and canonical IconButton adoption already present | VALIDATED / MOCK-PREVIEW | Untouched |
| Creator | Preview analytics and feature-specific creator profile composition | SAFE for Avatar only; SPECIALIZED otherwise | Avatar import migrated |
| Admin | Preview provenance and feature-specific dashboard panels | SPECIALIZED / MOCK-PREVIEW | Untouched |
| Settings | Local preference ownership and specialized surfaces | PARTIAL / LOCAL | Untouched |
| Offline library | Unsupported/partial capability without offline persistence | UNSUPPORTED / DEFERRED | Untouched |

## 13. Migrations Performed

**Implemented:**

1. `CreatorProfilePage` now imports `Avatar` from `@/components/design-system`.
2. `ProfileHero` now imports `Avatar` from `@/components/design-system`.
3. The canonical design-system README now contains the DESIGN.11 conformance rules.

**Evidence:** The compatibility Avatar module is a direct re-export of the canonical Avatar, and the two consumers use the same public props before and after the change.

## 14. Preserved Specialized Components

**Observed and intentionally preserved:**

- Library feature loading skeleton geometry.
- Feature-specific podcast, episode, playlist, profile, creator, admin, community, and social cards.
- Media rows containing play, queue, remove, reorder, follow, or other domain actions.
- `components/ui/form` wrappers where no canonical Form equivalent exists.
- `components/ui/page-state` as a stable multi-state compatibility composition.
- Feature-owned alerts, request errors, mock/preview panels, and local preference surfaces.

**Reason:** These components do not meet all safe migration criteria without changing composition, copy, interaction ownership, or behavior.

## 15. Deferred Design Debt

- Full token normalization of feature-local arbitrary geometry after visual measurement.
- Typography and tracking validation for Persian and mixed-script content.
- Selective provenance review for remaining nested mock/preview panels.
- Browser viewport, keyboard, RTL, reduced-motion, contrast, screen-reader, and axe validation.
- Compatibility alias retirement after a complete consumer and external-compatibility proof.
- Further media-card/row consolidation where feature actions can be represented without moving ownership.
- Explicit partial-state decisions for multi-source feature surfaces where the product exposes a scoped failure boundary.

## 16. Files Changed

- [apps/web/src/components/design-system/README.md](../../apps/web/src/components/design-system/README.md)
- [apps/web/src/features/creator/components/CreatorProfilePage.tsx](../../apps/web/src/features/creator/components/CreatorProfilePage.tsx)
- [apps/web/src/features/profile/components/ProfileHero.tsx](../../apps/web/src/features/profile/components/ProfileHero.tsx)
- [docs/phase-reports/DESIGN.11-global-ui-consistency-design-system-conformance-report.md](DESIGN.11-global-ui-consistency-design-system-conformance-report.md)

## 17. Files Intentionally Untouched

**Validated by final diff scope:** Backend/API files, API contracts, authentication, authorization, route definitions and semantics, React Query ownership, Zustand ownership, persistence, Player runtime, Player store, queue semantics, playback runtime, playlist business logic, feature data fetching, feature mutations, and feature ownership were untouched.

Feature-local specialized layouts, state wrappers, mock data, forms, and player/queue compositions were also intentionally untouched unless listed above.

## 18. Tests

**Validated:**

- Focused profile/creator presentation tests: **2 files, 11 tests passed**.
- Full web suite: **57 test files, 211 tests passed**.
- API suite via `pnpm test`: **13 tests passed**.

**Observed:** Vitest emits the existing non-fatal Vite `configLoader: 'native'` warning.

## 19. Typecheck

**Validated:** Production build type validation passed.

**Pre-existing failure:** `pnpm --filter @castaminofen/web exec tsc --noEmit` reports exactly two unrelated Player test diagnostics:

- `features/player/components/PlayerDataIntegration.test.tsx`: test props omit existing `QueuePanel` `onMove` and `onClear` requirements.
- `features/player/runtime/__tests__/persistence.test.ts`: `read.queue` may be undefined.

No changed DESIGN.11 implementation file is implicated.

## 20. Lint

**Validated:** `pnpm lint` passed across API and web.

**Pre-existing warning:** `features/onboarding/components/WelcomeScreen.test.tsx` uses a raw `<img>` and emits the existing Next.js image optimization warning.

## 21. Build

**Validated:** `pnpm build` passed for shared types, web, and API. Next.js compiled and generated all 19 existing web routes. The known Welcome `<img>` warning was emitted and did not fail the build.

## 22. Browser Validation

**Deferred:** Browser-level visual validation was not available in this phase.

> Browser-level visual validation was not available in this phase.

No screenshot, pixel, viewport, focus-order, or screen-reader claims are made. DESIGN.12-DESIGN.15 remain the appropriate phases for those checks.

## 23. Pre-existing Issues

- Standalone web typecheck has the two unrelated Player test diagnostics listed in Section 19.
- Lint/build emit the existing Welcome `<img>` warning.
- Vitest emits the existing Vite config-loader warning.
- Browser automation and assistive-technology validation were unavailable.

## 24. Architecture Safety Confirmation

**Confirmed:** DESIGN.11 changed presentation documentation and two equivalent presentation imports only. It did **not** change:

- backend implementation
- API contracts
- authentication or authorization
- routing semantics or route ownership
- React Query ownership
- Zustand ownership
- persistence architecture
- Player runtime or Player store
- queue semantics
- playback runtime
- playlist semantics
- feature ownership
- product behavior

**Expected result:** No architecture or product behavior changes occurred.

## 25. Final Status

**Observed:** The canonical design-system layer, compatibility policy, prior safe migrations, specialized exceptions, and remaining design debt are documented.

**Implemented:** Only the two high-confidence Avatar import migrations and the DESIGN.11 conformance rules.

**Validated:** Focused tests, full web/API tests, lint, build, diagnostics, worktree scope, and diff check were run and recorded.

**Recommendation:** Use the conformance rules in this report and the canonical README as the gate for future selective migrations. Defer broad visual normalization to the planned responsive, RTL, accessibility, and visual regression phases.
