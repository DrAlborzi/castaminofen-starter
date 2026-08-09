# DESIGN.5 — Welcome, Discovery & Catalog Experience Report

## 1. Executive Summary

**Observed:** Welcome and Discovery are hybrid surfaces: real API-backed podcast/episode queries and session-aware actions are combined with static orientation copy and intentional placeholder/editorial sections. The podcast catalog route is a real API-backed list with feature-owned search, pagination, and subscription behavior, but its route-level wrappers still used legacy presentation classes.

**Implemented:** Normalized the podcast catalog route with canonical `PageContainer`, `Card`, `Field`, `Input`, `EmptyState`, and `Button` primitives. Successful zero-result catalog responses now use `EmptyState` with `category="no-results"` instead of error styling. Added focused route tests and documented the adoption boundary.

**Validated:** Focused podcast route tests pass. Full web tests pass with 54 files and 202 tests; API tests pass with 13 tests. Lint and production build pass. Standalone web typecheck reports two pre-existing Player test errors and no DESIGN.5 diagnostics.

**Confidence:** HIGH for the implemented catalog contract and automated route semantics; MEDIUM for visual, browser, mixed-script, and screen-reader behavior because browser automation was not available.

## 2. Audit Scope

**Observed:** Inspected repository guidance, prior DESIGN.0–DESIGN.4 reports, current worktree state, Welcome, Discovery, podcast catalog, podcast card, episode card, canonical design-system primitives, and nearby tests. No `AGENTS.md` or repository-specific Copilot instruction file was present.

**Observed:** Existing user/worktree changes were protected. The baseline was clean at the start of this phase, and no backend, API, auth, player, queue, persistence, route semantics, or feature data-fetching files were changed.

**Deferred:** Broad route-by-route migration across Library, Search, Playlists, Profile, Creator, Community, Admin, and Auth remains outside this controlled phase.

## 3. Welcome Surface

**Observed:** `WelcomeScreen` is a public, RTL-first onboarding and discovery entry surface. It owns no data; `usePodcasts` supplies real public podcast data. Its heading, orientation copy, login/discovery links, branding treatment, and supporting copy are static presentation. The public podcast collection is REAL when returned by the API, with loading, error, and empty branches already present.

**Observed:** Welcome uses canonical `ContentArtwork`, `MediaCard`, and `Button` in its populated and action states. Its loading skeleton and empty/error compositions remain feature-specific because they include Welcome-specific copy and recovery links.

**Recommendation:** Review whether the public catalog heading and empty/error copy need explicit provenance language after product copy review. Do not label clearly static orientation copy mechanically.

**Deferred:** No Welcome migration was made in this phase because the existing composition is already semantically coherent and further changes would require product decisions rather than a clear duplicate-primitive fix.

## 4. Discovery Surface

**Observed:** `DiscoveryPage` combines real podcast and episode queries, real continue-listening query state, session-aware intro content, and static editorial guidance. `DiscoverySection` renders podcast and episode collections, category content, and a deliberate placeholder mode. Placeholder, category, and journey panels are not evidence of live recommendation or personalization functionality.

**Observed:** Discovery uses several canonical primitives, including `PageContainer`, `MediaCard`, `Tag`, and `Button`, while retaining specialized section geometry and feature-owned data composition. Loading is represented by a feature-specific stable skeleton; error ownership is retained by the feature and no fake success content is introduced.

**Recommendation:** Add `Provenance` selectively to high-visibility placeholder or illustrative recommendation areas only after copy/product review identifies where users could mistake editorial guidance for personalized results.

**Deferred:** No generic `DiscoverySection` abstraction or repository-wide card migration was introduced. Category and placeholder semantics need product-level decisions before stronger normalization.

## 5. Catalog Surface

**Observed:** The podcast catalog route calls `usePodcasts({ page, limit: 12, search, sort: 'newest' })`; search reset and pagination are local route state, while subscription and podcast-card behavior remain feature-owned. Podcast cards already compose canonical `Card` but retain podcast-specific artwork, metadata, and subscription action composition.

**Implemented:** The route now uses `PageContainer` and `Card` for page layout, `Field` and `Input` for the labeled search control, `EmptyState(category="no-results")` for successful empty results, and canonical `Button` for pagination. Native links remain links for navigation actions.

**Validated:** Route tests cover loading, query error, semantic heading/no-results output, populated catalog content, accessible pagination labeling, and native disabled pagination behavior.

**Deferred:** Podcast and episode feature cards were not forcibly converted to generic `MediaCard`/`MediaRow` because their subscription, playback, queue, and edit actions are domain-specific compositions with existing feature ownership.

## 6. Component Adoption

**Observed:** Canonical equivalents were available for route-level surface, form, empty state, and buttons. Welcome and Discovery already use several canonical primitives. Feature-specific card compositions remain legitimate compositions rather than duplicate global primitives.

**Implemented:** Adopted `PageContainer`, `Card`, `Field`, `Input`, `EmptyState`, and `Button` only in the podcast catalog route. No new global primitive or state ownership was introduced.

**Recommendation:** Continue selective migration only when a local component is clearly canonical-equivalent and its behavior can remain unchanged.

## 7. State Contract

**Observed:** Welcome has loading, error, and successful empty branches. Discovery has a query loading branch and feature-owned collection composition. The catalog query distinguishes loading, error, successful populated, and successful empty results.

**Implemented:** Catalog loading uses `LoadingState`; catalog failures use `ErrorState`; successful zero-result data uses `EmptyState` with `no-results`. No empty state is used to mask a request failure.

**Deferred:** A distinct partial state for Discovery's multiple query sources was not added because the current feature does not expose a user-facing scoped failure boundary for that decision.

## 8. Data Provenance

**Observed:** Welcome orientation copy is STATIC; returned podcasts and episodes are REAL when API-backed; Discovery's journey/category/placeholder areas are STATIC, PARTIAL, or MOCK/PREVIEW depending on the section definition. The podcast catalog is REAL/PARTIAL according to API availability and existing feature behavior.

**Implemented:** No misleading mock data, fake availability, or fake success state was added. Existing placeholder treatment remains visibly distinct from populated catalog content.

**Recommendation:** Use `Provenance` where a high-visibility Discovery placeholder could reasonably be read as live recommendation or personalization. Avoid labels on obvious onboarding copy.

## 9. Accessibility

**Observed:** Welcome and Discovery use semantic `main`, headings, native links, labeled content sections, and accessible names on key actions. Catalog had a native labeled input and links but its route-level state and empty result markup were less semantically explicit.

**Implemented:** Catalog search uses `Field`/`Input` for programmatic labeling and canonical invalid/loading-compatible form semantics. Catalog empty results expose a heading through `EmptyState`; pagination remains native buttons with disabled behavior and an accessible page label.

**Validated:** Focused server-render tests verify heading output, loading `aria-busy`, error `role="alert"`, no-results category, native pagination disabled output, and accessible pagination labeling.

**Deferred:** Browser keyboard focus order, axe, screen-reader output, and dynamic announcement validation were not available.

## 10. RTL

**Observed:** The document contract remains `lang="fa" dir="rtl"`. Welcome explicitly preserves RTL. Catalog changes use flex flow, semantic form controls, and no physical left/right positioning. Directional icons in untouched surfaces were not automatically mirrored.

**Validated:** Static source inspection confirms no new physical directional layout assumptions in the implemented route.

**Deferred:** Mixed Persian/Latin titles, search text, durations, identifiers, and browser rendering require the later RTL and visual QA phases.

## 11. Responsive

**Observed:** Catalog uses existing responsive utilities for route heading/action layout, card padding, and the existing feature card collection. The canonical field and button primitives preserve stable native control geometry. Welcome and Discovery already use existing responsive grids and flex wrapping.

**Implemented:** Removed the catalog route's inline pagination spacing declaration in favor of the existing tokenized utility class `mt-6`.

**Deferred:** No browser viewport matrix was available for 320px, 375px, 768px, 1024px, 1280px, or 1440px. No new breakpoint was added.

## 12. Token / Motion Integration

**Observed:** Existing canonical primitives use semantic tokens and established focus/reduced-motion behavior. Welcome and Discovery retain their existing feature styling and motion.

**Implemented:** Catalog route-level controls now inherit canonical surface, input, button, state, and focus contracts. No arbitrary color, radius, shadow, or animation token was added.

## 13. Feature Adoption

**Implemented:** The podcast catalog route adopted canonical route-level presentation primitives without moving query ownership, search state, pagination state, subscription actions, navigation, or podcast data into the design system.

**Observed:** Welcome and Discovery already consume canonical components where equivalent, while their feature-specific composition remains local.

**Deferred:** Feature adoption for podcast/episode detail, Library, Search, Playlists, Profile, Creator, Community, Admin, and Auth belongs to later phases or targeted follow-up audits.

## 14. Files Changed

- `apps/web/src/app/podcasts/page.tsx`
- `apps/web/src/app/podcasts/page.test.tsx`
- `apps/web/src/components/design-system/README.md`
- `docs/phase-reports/DESIGN.5-welcome-discovery-catalog-report.md`

## 15. Files Intentionally Untouched

Backend and API implementation, API request/response contracts, authentication, authorization, route semantics, React Query ownership, Zustand ownership, Player runtime/store, queue semantics, playback runtime, playlist behavior, persistence, and feature data-fetching algorithms were intentionally untouched.

Welcome, Discovery, PodcastCard, EpisodeCard, and Search implementations were inspected but not changed because no equally small, high-confidence presentation-only migration was required there.

## 16. Tests

**Validated:** Focused catalog route test: 1 file, 4 tests passed.

**Validated:** `pnpm test` passes with 13 API tests. `pnpm --filter @castaminofen/web test` passes with 54 files and 202 tests. The web Vitest command emits the existing Vite `configLoader: 'native'` warning; it does not fail tests.

## 17. Typecheck

**Validated:** `pnpm --filter @castaminofen/web exec tsc --noEmit` reports two pre-existing Player test errors: missing `onMove`/`onClear` props in `PlayerDataIntegration.test.tsx` and possibly undefined `read.queue` in `persistence.test.ts`. No DESIGN.5 file diagnostic was reported.

## 18. Lint

**Validated:** `pnpm lint` passes. The existing warning for an `<img>` in `WelcomeScreen.test.tsx` remains.

## 19. Build

**Validated:** `pnpm build` passes for shared types, web, and API. The existing Welcome `<img>` warning is emitted during the web build.

## 20. Runtime Validation

**Deferred:** Browser/runtime automation for Welcome, Discovery, catalog states, responsive viewports, keyboard focus, and RTL rendering was not available. No visual, pixel-level, or screen-reader correctness claim is made.

**Validated:** Static DOM tests and production build output provide automated evidence for the implemented catalog states and semantics.

## 21. Pre-existing Issues

- The Vite config-loader warning is emitted during Vitest runs and does not fail tests.
- The existing Welcome test `<img>` warning may remain during lint/build, as documented by prior design reports.
- Any pre-existing Player test type errors reported by standalone web typecheck remain unrelated unless the command demonstrates otherwise.

## 22. Deferred Design Debt

- Add browser viewport, keyboard, mixed-script RTL, reduced-motion, axe, and screen-reader validation.
- Review high-visibility Discovery placeholders for selective `Provenance` adoption.
- Decide whether multiple Discovery query failures need an explicit `PartialState` contract.
- Audit feature-local podcast and episode media compositions for selective DESIGN.4 adoption without moving feature behavior.
- Review specialized loading skeleton geometry in later visual QA work.

## 23. Architecture Safety Confirmation

**Validated:** DESIGN.5 changed only catalog route presentation, focused route tests, design-system documentation, and this phase report. No backend, API, authentication, authorization, routing semantics, React Query ownership, Zustand ownership, Player runtime/store, queue semantics, persistence, playlist behavior, or feature business logic was changed.
