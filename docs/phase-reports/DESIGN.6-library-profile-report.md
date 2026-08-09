# DESIGN.6 — Library / Profile Experience Report

## 1. Executive Summary

**Observed:** Library is a feature-owned, API-backed surface with real overview, continuation, history, subscriptions, and favorites query paths. Profile is a partial surface: authenticated identity and continuation are real, while most supporting profile content is mock/preview data.

**Implemented:** Replaced Profile continuation's local loading and error panels with canonical `LoadingState` and `ErrorState` primitives. Added focused semantic assertions. No Library behavior required migration because its equivalent state and route primitives are already adopted where safe.

**Validated:** Focused ProfilePage tests pass. Broader validation is recorded below; browser validation remains deferred unless available.

## 2. Audit Scope

**Observed:** Reviewed repository guidance, DESIGN.0-DESIGN.5 reports, current worktree state, Library and Profile routes/pages/hooks/components/tests, and the canonical design-system namespace.

**Observed:** `/library` and `/profile` remain protected routes. Feature boundaries, query ownership, auth ownership, routing, playback, queue, and persistence are separate from the design system.

**Implemented:** Only Profile presentation and its focused test changed.

## 3. Library Surface

**Observed:** `LibraryPage` owns the `useLibraryOverview` query, category selection, derived collection/history summaries, and state branching. Real sections include continuation, history, subscriptions, favorites, and collections. Video, audiobook, and shorts category panels are static/preview-oriented. `ContinueMediaSection` and `SavedContentCarousel` contain local preview defaults and are not evidence of persisted user data.

**Observed:** Loading, no-content empty, full error, and partial-error-with-usable-data branches are distinct. Library actions remain feature-owned, including playback, queue insertion, favorites, subscriptions, and navigation.

**Implemented:** No Library business or presentation migration was necessary beyond its existing canonical primitive adoption. Bespoke playback rows were intentionally retained because their actions are domain-specific.

## 4. Profile Surface

**Observed:** `ProfilePage` reads identity from `useAuthStore`, continuation from `useContinueListening`, and supporting sections from `mockProfileExperience`. Authenticated display name, username, and bio are real session-derived presentation; journey, memories, collections, activity, creator, social, interests, achievements, and subscription content are mock/preview or static.

**Observed:** Profile continuation distinguishes loading, error, and populated/empty states. Owner actions, logout, settings, and Library navigation remain Profile-owned.

**Implemented:** Continuation loading and failure now use canonical state primitives without changing query behavior or recovery ownership.

## 5. Component Adoption

**Observed:** Library already uses canonical `PageContainer`, `EmptyState`, `LoadingState`, `ErrorState`, `Card`, `Button`, `ContentArtwork`, and `Tag` where equivalent. Profile already composes canonical `Button`, `PageContainer`, and media primitives within feature-specific sections.

**Implemented:** Profile continuation adopted `LoadingState` (`variant="section"`) and `ErrorState`. No duplicate primitive or new ownership boundary was introduced.

## 6. Media Adoption

**Observed:** Profile sections use `MediaCard` selectively. Library episode/history/favorite rows retain feature-specific playback and queue composition rather than being forced into generic `MediaRow`.

**Deferred:** Further media migration requires per-row action and navigation review; no safe behavior-preserving reduction was identified in this pass.

## 7. State Contract

**Observed:** Library distinguishes loading, empty, error, and partial error. Profile distinguishes continuation loading, error, and successful empty/populated states.

**Implemented:** Profile loading exposes canonical `role="status"` and `aria-busy="true"`; Profile errors expose canonical `role="alert"`. No failure is converted into an empty state.

## 8. Data Provenance

**Observed:** Library API-backed items are REAL when returned; preview category panels and local carousel defaults are STATIC or MOCK/PREVIEW. Profile is PARTIAL, with real identity/continuation and mock supporting content.

**Recommendation:** Add visible `Provenance` labels to selected high-visibility Profile preview sections after product copy review identifies the exact sections users could mistake for live data. Avoid mechanically labeling ordinary headings or static instructions.

## 9. Accessibility

**Implemented:** Canonical Profile continuation state semantics now provide status and alert roles plus busy semantics. Existing native buttons and links were preserved; no interactive nesting was introduced.

**Validated:** Focused tests assert loading text, `aria-busy`, `role="status"`, error text, and `role="alert"`.

**Deferred:** Browser keyboard focus order, axe, screen-reader output, and dynamic announcement checks were not available.

## 10. RTL

**Observed:** The application retains its `fa` and `rtl` document contract. The change uses existing canonical layout primitives and introduces no physical-direction CSS.

**Deferred:** Browser-level mixed Persian/Latin and directional-icon validation.

## 11. Responsive

**Observed:** Existing Profile and Library layouts use current breakpoints, wrapping, and feature-specific stable geometry. No new breakpoint was added.

**Deferred:** Direct viewport validation at 320px, 375px, 768px, 1024px, 1280px, and 1440px.

## 12. Token / Motion Integration

**Implemented:** The migrated states inherit canonical semantic tokens, focus behavior, and reduced-motion behavior. No arbitrary token, color, radius, shadow, or animation was added.

## 13. Feature Ownership

**Validated:** Library continues to own queries, filters, saved state, mutations, playback/queue callbacks, and navigation decisions. Profile continues to own identity composition, session-aware behavior, profile navigation, and logout. Design-system components remain presentational.

## 14. Files Changed

- `apps/web/src/features/profile/components/ProfilePage.tsx`
- `apps/web/src/features/profile/components/ProfilePage.test.tsx`
- `apps/web/src/components/design-system/README.md`
- `docs/phase-reports/DESIGN.6-library-profile-report.md`

## 15. Files Intentionally Untouched

Backend/API, authentication, authorization, route semantics, React Query, Zustand, Player runtime/store, queue, persistence, playlist logic, Library hooks/mutations, and Profile data contracts were intentionally untouched. Library media rows, specialized skeletons, preview sections, and mock profile data were also left unchanged.

## 16. Tests

**Validated:** `pnpm --filter @castaminofen/web exec vitest run src/features/profile/components/ProfilePage.test.tsx` passes: 1 file, 9 tests.

**Validated:** `pnpm test` passes with 13 API tests. `pnpm --filter @castaminofen/web test` passes with 54 files and 203 tests, including the updated ProfilePage suite. Vitest emits the existing Vite `configLoader: 'native'` warning without failing.

## 17. Typecheck

**Validated:** `pnpm --filter @castaminofen/web exec tsc --noEmit` reports two pre-existing Player test errors: missing `onMove`/`onClear` props in `PlayerDataIntegration.test.tsx` and possibly undefined `read.queue` in `persistence.test.ts`. No DESIGN.6 file is involved.

## 18. Lint

**Validated:** `pnpm lint` passes. The existing `<img>` warning in `WelcomeScreen.test.tsx` remains.

## 19. Build

**Validated:** `pnpm build` passes for shared types, web, and API. The existing Welcome `<img>` warning is emitted during the web build.

## 20. Runtime Validation

**Deferred:** Browser automation and visual viewport validation were not performed. No visual or screen-reader correctness claim is made.

## 21. Pre-existing Issues

**Observed:** The Vite config-loader warning remains during Vitest runs. Web typecheck retains the two unrelated Player test errors described in Section 17. Lint/build retain the existing Welcome `<img>` warning.

## 22. Deferred Design Debt

- Selective provenance labeling for mock Profile supporting content.
- Browser, keyboard, RTL, mixed-script, reduced-motion, and screen-reader validation.
- Further Library/Profile media composition review where feature actions can remain explicit.
- Product decisions for static/preview Library categories and Profile owner CTA behavior.

## 23. Architecture Safety Confirmation

**Validated:** DESIGN.6 changes only canonical Profile state presentation, its focused tests, design-system usage guidance, and this report. No business logic, data ownership, API contract, authentication, persistence, Player, queue, or routing semantics moved into the design system.