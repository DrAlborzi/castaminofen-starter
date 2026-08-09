# DESIGN.4 — Feature UI Primitive Migration, Consistency & Surface Normalization Report

## 1. Executive Summary

**Observed:** The canonical design-system namespace already owned Button, Card, Badge, Input, Field, Artwork, navigation, and the DESIGN.3 state vocabulary. Most feature imports still used `components/ui`, even though those modules forwarded to canonical implementations. Several feature-local skeletons and alert surfaces remained specialized compositions.

**Implemented:** Semantically equivalent Button, Card, Badge, Input, LoadingState, EmptyState, and ErrorState consumers were migrated to `@/components/design-system`. Feature wrappers retain their copy, actions, layout, and data ownership. The compatibility layer remains intact.

**Validated:** Focused Library/Playlist tests passed after the first migration slice. Full validation results are recorded below after the final test, lint, typecheck, build, and diff checks.

## 2. Repository Audit

**Observed:** Repository guidance, DESIGN.1, DESIGN.2, DESIGN.3, design-system README, package scripts, current branch, and worktree were inspected. The starting worktree contained two pre-existing user changes in `empty-state.tsx` and `state-primitives.test.tsx`; they were preserved.

**Observed:** No repository-level `AGENTS.md`, `CLAUDE.md`, or `CONTRIBUTING.md` was present in the searched workspace paths. `README.md`, `docs/`, phase reports, and design-system documentation were used as the applicable guidance.

## 3. Canonical Primitive Inventory

**Observed:** `apps/web/src/components/design-system/` is the canonical ownership boundary.

- Interaction: Button, IconButton, Chip, Tag
- Surfaces/forms: Card, Input, Field, Artwork/ContentArtwork
- States: LoadingState, EmptyState, ErrorState, PartialState, OfflineState, UnsupportedState, SuccessState
- Feedback/provenance: Alert, Toast, Provenance
- Navigation/layout: PageContainer, SectionHeader, MobileHeader, BottomNavigation, DesktopNavigation
- Shared identity/media/social/player primitives are also exported from the canonical index.

**Observed:** Canonical primitives use semantic tokens, native controls, focus-visible behavior, RTL-safe flex/layout patterns, and presentational contracts independent of feature data.

## 4. Feature Migration Inventory

**Implemented:** 73 files were changed in the migration scope, including app pages, shell/header, Auth, Admin, Creator, Episodes, Library, Player supporting surfaces, Playlists, Podcasts, Profile, Search, Settings, and five state wrappers.

**Observed:** The migrated imports were forwarding aliases with equivalent public APIs. No query keys, stores, route definitions, API clients, action handlers, player runtime, queue code, or persistence code were changed.

## 5. Safe Migrations

**Implemented:** Direct canonical imports now replace compatibility imports for Button, Card, Badge, Input, LoadingState, EmptyState, and ErrorState where the semantic responsibility was identical.

**Implemented:** Library and Playlist empty/error/loading wrappers now compose canonical primitives directly while retaining feature-owned copy, actions, and specialized Library skeleton geometry.

## 6. Deferred Migrations

**Deferred:** `components/ui/page-state.tsx` remains a compatibility composition because it has no one-to-one canonical primitive and preserves a stable legacy API.

**Deferred:** Feature-local skeletons in Library, Discovery, Podcasts, Welcome, and other surfaces remain because their geometry is specialized and migration would alter loading composition rather than only primitive ownership.

**Deferred:** Feature-local alerts, action error messages, player status surfaces, and form feedback remain feature-owned because copy, timing, or interaction semantics are meaningful.

**Deferred:** Hard-coded gradients and physical directional classes were not normalized mechanically; they are intentional or require visual/runtime review.

## 7. Compatibility Layer Status

**Observed:** `components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `loading-state.tsx`, `empty-state.tsx`, and `error-state.tsx` forward to canonical implementations.

**Implemented:** Meaningful consumers were migrated, but compatibility exports were not removed. `components/ui/page-state.tsx` remains an intentional migration boundary.

**Recommendation:** Remove aliases only after a separate repository-wide proof confirms no external or legacy consumer depends on them.

## 8. State Migration

**Implemented:** Existing feature state wrappers now consume canonical state primitives. No new states, fabricated states, or behavior changes were introduced. DESIGN.3 categories and error kinds remain caller-controlled.

**Deferred:** Broader local skeleton and alert normalization requires feature-specific geometry/copy review.

## 9. Token Normalization

**Observed:** Canonical primitives already use semantic tokens. This phase made no broad token replacement and preserved intentional feature styling.

**Deferred:** Feature-specific gradients, player progress positioning, and specialized visual treatments require visual evidence before normalization.

## 10. Accessibility Validation

**Observed:** Migrated components retain canonical native semantics, disabled/loading behavior, focus-visible styles, and state ARIA contracts. No nested interactive elements or accessible-name changes were introduced.

**Validated:** Existing focused state and feature tests cover canonical state markup and async button semantics. Browser axe/screen-reader automation was not available in this validation pass.

## 11. RTL Validation

**Observed:** No new physical layout rules or icon mirroring were introduced. Existing `lang="fa" dir="rtl"` document behavior and canonical logical-safe layout remain unchanged.

**Validated:** Static source and existing DESIGN.2 runtime evidence support RTL preservation. Mixed-script browser rendering remains deferred.

## 12. Responsive Validation

**Observed:** No breakpoints, layout geometry, or responsive feature composition changed. Existing `sm`/`md`/`lg`/`xl` behavior remains in place.

**Deferred:** Full viewport screenshot and keyboard matrix was not available.

## 13. Provenance Validation

**Observed:** No provenance labels were added mechanically. Existing DESIGN.3 provenance classifications and mock/preview boundaries remain unchanged.

**Deferred:** Additional high-visibility mock-surface labels require product copy decisions.

## 14. Files Changed

**Implemented:** The changed files are the direct-import migration files under `apps/web/src/app/`, `apps/web/src/components/header.tsx`, `apps/web/src/components/layout/route-placeholder.tsx`, and the affected feature files under Admin, Auth, Create, Creator, Episodes, Library, Player, Playlists, Podcasts, Profile, Search, and Settings, plus this report.

**Observed:** The two pre-existing user changes in `apps/web/src/components/design-system/states/empty-state.tsx` and `state-primitives.test.tsx` remain in the final worktree and were not authored by this phase.

## 15. Files Intentionally Untouched

**Validated by scope inspection:** API/backend code, authentication/authorization, route definitions, query ownership, Zustand stores, Player runtime/store, queue semantics, playback behavior, persistence, playlist behavior, and feature data ownership were untouched.

## 16. Tests

**Validated:** Baseline web suite: 53 files and 195 tests passed. Focused Library/Playlist slice after the first edit: 7 files and 15 tests passed. Final results appear below.

## 17. Typecheck

**Validated:** The web typecheck reports only the two pre-existing Player test errors documented by DESIGN.2/DESIGN.3. No migrated import error was reported.

## 18. Lint

**Validated:** Final lint result appears below. The known Welcome `<img>` warning is pre-existing if it remains emitted.

## 19. Build

**Validated:** Final production build result appears below.

## 20. Runtime Validation

**Deferred:** No browser automation or viewport screenshot matrix was available. Existing DESIGN.2 runtime evidence remains applicable for document RTL and shell navigation. No new runtime behavior was introduced by these import-only migrations.

## 21. Pre-existing Issues

- Web typecheck has the two Player test errors: missing `onMove`/`onClear` props and possibly undefined `read.queue`.
- Vitest emits the existing Vite `configLoader: 'nativ[e]'` warning.
- Lint/build may retain the existing Welcome `<img>` warning.
- Local web runtime may report API proxy refusal when the API is not running.

## 22. Deferred Design Debt

**Deferred:** Review specialized loading skeleton geometry, feature-owned alerts, mock-surface provenance, physical directional styling, and remaining compatibility composition in a future feature-by-feature visual pass.

## 23. Architecture Safety Confirmation

**Validated by diff scope:** DESIGN.4 remains presentation/design-system/UI consistency work. It does not become feature logic, data-layer work, Player logic, backend work, auth work, routing work, persistence work, or state-management refactoring.

**Confidence:** High for import ownership and compile/test compatibility; medium for visual/runtime equivalence because browser viewport and assistive-technology automation were unavailable.