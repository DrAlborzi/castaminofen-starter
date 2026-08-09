# DESIGN.3 — Global UI States, Data Provenance & Honest Product Surface Contract Report

**Repository:** `PicoRmin/castaminofen-starter`  
**Phase date:** 2026-08-09  
**Evidence convention:** `Observed`, `Implemented`, `Validated`, `Recommendation`, and `Deferred` are kept distinct. Confidence is stated where runtime evidence is incomplete.

## 1. Executive Summary

**Observed:** DESIGN.1 already established `LoadingState`, `EmptyState`, and `ErrorState`, while compatibility imports under `components/ui` forward to those primitives. State markup, skeletons, alerts, and mock/partial surfaces still varied by feature. No existing toast provider was found.

**Implemented:** the canonical design-system namespace now includes a complete presentation vocabulary for loading, empty categories, partial, error kinds, offline, unsupported, success, alert, toast, provenance, and async loading compatibility with `Button`.

**Validated:** focused state tests pass; Search consumes the canonical namespace without changing query ownership or behavior.

## 2. State Architecture

State remains owned by the data or feature surface. Canonical primitives render supplied content and actions only; they do not fetch, route, persist, mutate player state, or own business logic. `components/ui/page-state.tsx` remains a compatibility composition point and now maps loading, empty, partial, error, offline, and unsupported states.

## 3. Canonical Components

**Implemented:** `LoadingState`, `EmptyState`, `ErrorState`, `PartialState`, `UnsupportedState`, `OfflineState`, `SuccessState`, `Alert`, `Toast`, and `Provenance` under `apps/web/src/components/design-system/states/`. All are exported through `components/design-system/index.ts`.

## 4. State Vocabulary

**Implemented:** base states are `default`, `hover`, `focus`, `pressed`, `active`, `selected`, and `disabled`; async/data states are `loading`, `empty`, `partial`, `error`, `success`, `offline`, and `unsupported`; media states remain `playing`, `paused`, and `queued`. `state-types.ts` is the shared type vocabulary.

## 5. Loading Contract

**Implemented:** `LoadingState` supports `page`, `section`, `inline`, `action`, and `media` variants, stable wrapper geometry, optional skeleton styling, `aria-busy="true"`, and opt-in live announcements through `announce`. Existing callers retain their API.

## 6. Empty Contract

**Implemented:** `EmptyState` remains backward compatible and accepts `first-use`, `no-results`, `no-items`, `no-history`, `no-playlists`, and `no-queue` categories. Search now marks no-results explicitly. Empty content is not used to mask errors.

## 7. Error Contract

**Implemented:** `ErrorState` accepts `generic`, `network`, `server`, `permission`, `not-found`, `action-failed`, and `offline` kinds, preserves retry/action composition, and retains alert semantics. Backend implementation details remain caller-controlled.

## 8. Partial Contract

**Implemented:** `PartialState` provides a warning treatment, scoped explanation, preserved child content, and optional recovery action. It does not replace usable content or fabricate missing content.

## 9. Unsupported Contract

**Implemented:** `UnsupportedState` provides honest explanation and optional truthful navigation/action content. It does not create functionality or report fake completion.

## 10. Offline Contract

**Implemented:** `OfflineState` composes the canonical error presentation with an offline kind and connection recovery copy. No service worker, cache, IndexedDB, sync, or persistence behavior was added.

## 11. Success / Confirmation Contract

**Implemented:** `SuccessState` is a lightweight inline/status confirmation primitive. Existing `Button` loading behavior remains the async action contract: native `disabled`, `aria-busy`, stable child geometry, and no duplicate submission behavior change.

## 12. Alert / Toast Contract

**Observed:** no existing toast provider or toast runtime was found. Existing feature alerts remain feature-owned.

**Implemented:** `Alert` distinguishes persistent contextual feedback from `Toast`, which is an ephemeral `role="status"` surface with an accessible dismiss button. Destructive errors, auth failures, validation, and data-loss messaging remain unsuitable for toast-only communication.

## 13. Async Action Contract

**Observed:** canonical `Button` already supports idle, loading, disabled, destructive, and native button semantics.

**Implemented:** the state phase reuses that contract rather than introducing a second action primitive or changing API behavior. Feature actions continue to own submitting/success/failure transitions.

## 14. Data Provenance Contract

**Implemented:** documentation defines `REAL`, `PARTIAL`, `MOCK / PREVIEW`, `STATIC`, and `UNSUPPORTED`. `Provenance` is a minimal presentational label for Preview, Coming soon, Unavailable, Not yet supported, and Illustrative contexts.

## 15. Real / Partial / Mock / Static / Unsupported Surface Inventory

| Surface | Classification | Evidence / treatment |
| --- | --- | --- |
| Podcasts, episodes, library, search | REAL / PARTIAL | API-backed hooks and existing feature states; Search migrated to canonical state imports |
| Playlists | REAL / PARTIAL | API CRUD and player adapters observed; no ownership changes |
| Player bar and queue core | REAL | feature runtime/store ownership observed; untouched |
| Immersive player supporting panels | PARTIAL / MOCK | `mockPlayerExperience.ts` supplies transcript, discussions, memory, creator, and related presentation; no conversion attempted |
| Profile identity and continuation | PARTIAL | real identity/query data combined with `mockProfileExperience.ts` supporting data; deferred broader labeling migration |
| Settings preferences | PARTIAL / LOCAL | local preference persistence and explicit Coming Soon content observed |
| Community and social | MOCK / PREVIEW | mock data modules observed; no fake persistence added |
| Create and creator | MOCK / PREVIEW | mock creator studio/content/profile data observed; no feature behavior changed |
| Admin | MOCK / PREVIEW | mock admin governance, analytics, and moderation datasets observed |
| Offline Library | UNSUPPORTED / PARTIAL | route exists, but offline persistence architecture is not present; no offline implementation added |
| Welcome/discovery | PARTIAL / STATIC | real onboarding/session behavior with placeholder discovery sections observed |

## 16. Search State Contract

**Observed:** Search owns query hooks and has separate empty, error, loading, and empty-query branches; both legacy and current search result components existed.

**Implemented:** both result surfaces import canonical states. Search no-results uses `category="no-results"`; loading uses canonical `LoadingState` in the newer panel. Query algorithms, API contracts, player dispatch, and URL behavior were untouched.

**Deferred:** typing/result-count announcement and full partial-result modeling require feature behavior decisions and are deferred.

## 17. Accessibility Validation

**Validated, HIGH confidence:** focused server-render tests cover `aria-busy`, opt-in loading live regions, error `role="alert"`, success/status semantics, heading/action output, and keyboard-dismissable toast markup.

**Observed:** global reduced-motion CSS is present and native `Button` disabled/loading behavior exists.

**Deferred:** browser screen-reader, axe, focus-order, and dynamic live-region testing were not run in this phase.

## 18. RTL Validation

**Observed:** `html` remains `lang="fa" dir="rtl"` and new primitives use flex flow, logical-safe inline composition, and no physical left/right positioning. Directional icons were not mirrored automatically.

**Validated, MEDIUM confidence:** static source inspection and existing DESIGN.2 runtime evidence preserve document RTL. Mixed-script and duration rendering require browser matrix testing.

## 19. Responsive Validation

**Observed:** new components use existing `sm` utilities only and no breakpoints were added. Flex wrapping and `min-w-0` protect mixed-script/action content.

**Deferred:** viewport screenshots at 320, 375, 768, 1024, 1280, and 1440px were not available in this pass. No shell/player spacing was changed.

## 20. Migration Performed

**Implemented:** Search result components moved from `components/ui` state imports to `components/design-system`; Search no-results categories were added; the Search panel's local skeleton now composes canonical `LoadingState`.

**Deferred:** broad Library, Podcasts, Episodes, Playlists, Settings, Profile, and Auth migration is intentionally deferred where local copy, specialized geometry, or ownership semantics require separate review.

## 21. Files Changed

- `apps/web/src/components/design-system/states/state-types.ts`
- `apps/web/src/components/design-system/states/loading-state.tsx`
- `apps/web/src/components/design-system/states/empty-state.tsx`
- `apps/web/src/components/design-system/states/error-state.tsx`
- `apps/web/src/components/design-system/states/partial-state.tsx`
- `apps/web/src/components/design-system/states/unsupported-state.tsx`
- `apps/web/src/components/design-system/states/offline-state.tsx`
- `apps/web/src/components/design-system/states/success-state.tsx`
- `apps/web/src/components/design-system/states/alert.tsx`
- `apps/web/src/components/design-system/states/toast.tsx`
- `apps/web/src/components/design-system/states/provenance.tsx`
- `apps/web/src/components/design-system/states/state-primitives.test.tsx`
- `apps/web/src/components/design-system/index.ts`
- `apps/web/src/components/design-system/README.md`
- `apps/web/src/components/ui/page-state.tsx`
- `apps/web/src/features/search/components/SearchResults.tsx`
- `apps/web/src/features/search/components/SearchResultsPanel.tsx`
- `docs/phase-reports/DESIGN.3-global-ui-states-data-provenance-honest-product-surface-contract-report.md`

## 22. Files Intentionally Untouched

Backend/API contracts, authentication, authorization, routing definitions, React Query ownership, Zustand ownership, player runtime/store, queue semantics, playlist behavior, persistence architecture, shell/navigation/theme ownership, and feature business logic were intentionally untouched.

## 23. Tests

**Validated:** focused and full web Vitest execution after implementation: 53 test files and 195 tests passed. The repository emits an existing Vite config-loader warning; it does not fail tests.

## 24. Typecheck

**Validated:** `pnpm --filter @castaminofen/web exec tsc --noEmit` reports only two pre-existing Player test errors: missing `onMove`/`onClear` props in `PlayerDataIntegration.test.tsx` and possibly undefined `read.queue` in `persistence.test.ts`. The introduced `PageState` error was fixed and no DESIGN.3 file has a remaining diagnostic.

## 25. Lint

**Validated:** `pnpm lint` passes across API and web. One pre-existing warning remains for `<img>` in `WelcomeScreen.test.tsx`.

## 26. Build

**Validated:** `pnpm build` passes for shared types, web, and API. Next.js reports the same pre-existing Welcome `<img>` warning during the web build.

## 27. Runtime Validation

**Validated:** static rendering tests validate state markup; production build completes and route generation succeeds for all existing routes. **Deferred:** no browser viewport or screen-reader automation was available in this pass. DESIGN.2 runtime evidence remains valid for shell RTL/navigation behavior.

## 28. Pre-existing Issues

- Existing Player test type errors recorded by DESIGN.2 may block standalone web typecheck.
- Existing Welcome test `<img>` lint warning recorded by DESIGN.2 may remain.
- API proxy refusal during local web runtime when the API is not running is environmental and unrelated.
- The Vitest config emits an existing config-loader warning; all web tests still pass.

## 29. Deferred Design Debt

- Add provenance labels to high-visibility mock profile, creator, community, admin, and immersive-player supporting panels after product copy review.
- Decide whether Search should expose explicit partial-result state when one result source fails.
- Add browser viewport, keyboard, RTL mixed-script, reduced-motion, and screen-reader automation.
- Audit remaining feature-local state markup and migrate only equivalent semantics.
- Introduce a runtime toast host only if a product owner identifies a real ephemeral feedback workflow; this phase intentionally added no provider.

## 30. Architecture Safety Confirmation

**Validated by scope inspection:** DESIGN.3 is presentation-system and UX-state consolidation only. Authentication, authorization, routing, API contracts, backend behavior, React Query ownership, Zustand ownership, Player ownership, queue ownership, persistence, playlist semantics, feature ownership, shell ownership, theme ownership, and product behavior were preserved.