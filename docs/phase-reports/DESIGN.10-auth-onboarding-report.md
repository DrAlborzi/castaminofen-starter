# DESIGN.10 — Auth & Onboarding Experience Audit, Normalization & Trust Contract

**Repository:** `PicoRmin/castaminofen-starter`  
**Phase date:** 2026-08-09  
**Scope:** Presentation-system, UX consistency, accessibility, RTL, responsive, state, provenance, and trust-boundary audit for authentication and onboarding.

## 1. Executive Summary

### Observed

- Login and registration are live, API-backed feature surfaces owned by `features/auth`.
- The auth shell is intentionally isolated from `AppShell` navigation and Player UI on `/login` and `/register`.
- `ProtectedRoute` owns protected-route presentation and redirects; `useSession`, the auth store, auth services, and route semantics remain feature-owned.
- The repository has one public Welcome/orientation surface, but no dedicated multi-step onboarding route, onboarding state machine, profile setup flow, preference setup flow, or completion persistence flow.
- Registration currently redirects to `/profile`; this is existing behavior, not a new onboarding implementation.

### Implemented

- Login and registration now use the canonical `Field` primitive while preserving their existing schemas, submit handlers, API calls, profile hydration, and redirects.
- Canonical `Field` now propagates its declared `id` to the child control, ensuring labels and error descriptions remain programmatically associated when callers compose the field without duplicating the id.
- Auth forms expose `aria-busy` on the native form while submitting; the existing canonical `Button` continues to provide native `disabled` and `aria-busy` behavior.
- Protected-route loading copy now uses the existing canonical `LoadingState` with Persian titles/messages; session resolution and redirect conditions are unchanged.
- Added focused auth presentation tests and strengthened the existing canonical Field regression.

### Validated

- Auth and canonical Field tests: 2 files, 8 tests passed.
- Complete web suite: 57 files, 211 tests passed.
- API suite: 13 tests passed.
- `pnpm lint`: passed with one pre-existing `WelcomeScreen.test.tsx` raw `<img>` warning.
- `pnpm build`: passed for shared types, web, and API; all 19 web routes generated.
- `git diff --check`: passed.
- Standalone web typecheck reports only the two pre-existing Player test diagnostics documented below.

### Recommendation

Keep auth and any future onboarding state machine feature-owned. Continue selective presentation migration only where a canonical primitive is semantically equivalent and the change does not alter auth, routing, persistence, authorization, or API ownership.

### Deferred

- There is no evidence-backed multi-step onboarding implementation to normalize or test.
- Session-expired and authenticated-but-unauthorized states are not explicitly exposed as separate application states in the inspected architecture.
- Browser viewport, keyboard, screen-reader, visual, reduced-motion runtime, and mixed-script RTL validation were not available.
- Logout behavior was audited by source inspection and intentionally left feature-owned.

## 2. Audit Scope

Inspected repository structure, current worktree state and diff, repository README/documentation, DESIGN.0 through DESIGN.9 reports, auth routes/forms/shell, session and protected-route presentation, profile logout presentation, Welcome/orientation, canonical form/state primitives, and nearby tests. No repository-level `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, or Copilot instruction file was found outside dependencies. Existing worktree changes were preserved; no unrelated baseline changes were overwritten.

## 3. Authentication Surface

| State | Evidence-based presentation classification |
| --- | --- |
| AUTHENTICATED | Session data or auth-store state resolves to an authenticated user; protected content renders. |
| UNAUTHENTICATED | Session is resolved without a user; `ProtectedRoute` preserves the existing redirect to `/login`. |
| AUTHENTICATING | Login/registration request is executing; feature form submission state drives the existing loading Button and form `aria-busy`. |
| SESSION_LOADING | `useSession()` or auth-store hydration is unresolved; `ProtectedRoute` renders canonical `LoadingState`. |
| SESSION_EXPIRED | Not separately exposed by the inspected UI architecture; not invented. |
| UNAUTHORIZED | No explicit authenticated-but-forbidden presentation was found; not invented. |
| AUTH_ERROR | Login/registration catches feature errors and renders the existing alert copy; API error classification remains feature-owned. |

Auth services, auth store, token/session handling, route guards, redirects, and API calls were inspected but not modified.

## 4. Login

**Observed:** Login validates email and password with the existing Zod schema, submits through `loginUser`, fetches the profile, updates the existing auth store, and redirects to `/profile`. It already uses canonical `Button` and `Input` but previously used the compatibility form wrappers and local error markup.

**Implemented:** Login fields now compose canonical `Field` and `Input`. Labels, control ids, error ids, `aria-describedby`, and `aria-invalid` are supplied by the canonical field contract. The native form exposes `aria-busy` during submission. Existing auth failure alert, copy, button loading copy, password type, autocomplete, and redirect behavior are preserved.

**Validated:** Focused tests cover labeled email/password controls, native form busy state at rest, password autocomplete, and registration navigation. No synthetic or real credentials were added.

## 5. Signup / Registration

**Observed:** Registration validates email, password, and optional name with the existing schema, submits through `registerUser`, fetches the profile, updates the existing auth store, and redirects to `/profile`. No terms, email verification, password reset, or additional onboarding completion event is present in the inspected surface.

**Implemented:** Registration fields now compose canonical `Field` and `Input`, preserving name optionality, validation copy, password policy, input types, autocomplete, alert handling, loading copy, and redirect behavior. Native field labeling and error associations are improved without changing validation rules or API payload ownership.

**Validated:** Focused tests cover name labeling, email/password field presence, new-password autocomplete, and the existing login navigation link.

## 6. Session Loading & Protected Routes

**Observed:** `ProtectedRoute` renders while `useSession()` is loading or the auth store is not hydrated, then redirects unresolved unauthenticated users to `/login`. It does not render protected children before session resolution. The compatibility `components/auth/ProtectedRoute.tsx` forwards to the feature implementation.

**Implemented:** Only the loading presentation was normalized: canonical `LoadingState` now has Persian auth-specific title/message pairs for session checking and redirecting. Loading geometry, busy/status semantics, hydration condition, redirect target, and effect ownership remain unchanged.

**Validated:** Focused test confirms unresolved session presentation is busy, localized, and does not render private content. No authenticated content was fabricated.

## 7. Auth Error Contract

**Observed:** Login and registration preserve feature-specific error copy through `getErrorMessage` and render request failures in `role="alert"` containers. Field validation remains distinct from request failure. No explicit network/server/permission taxonomy is exposed by these forms.

**Implemented:** Field-level errors now use canonical error IDs and descriptions through `Field`; request failures remain separate alerts. No mechanical error reclassification was introduced.

**Deferred:** A richer auth error taxonomy requires feature/API error semantics and is outside this presentation-only phase.

## 8. Logout

**Observed:** Profile owns the active logout action, calls the existing `logoutUser`, and navigates to `/login`. The action and session cleanup remain auth/feature-owned. A legacy header implementation was observed but is not part of the active shell route composition.

**Implemented:** None. The existing logout action was intentionally untouched because no small, high-confidence presentation defect required changing its feature-owned composition.

## 9. Onboarding Surface

**Observed:** `WelcomeScreen` is a public orientation/discovery surface with static introductory copy, login/discovery links, real public podcast query data when returned, and loading/error/empty states. There is no dedicated onboarding route or multi-step onboarding flow. Registration ends at `/profile`, and no profile/preference/discovery setup persistence flow was found.

**Classification:** Welcome is REAL/PARTIAL/STATIC by subsection: public podcast content is API-backed when returned; orientation copy and actions are static; discovery/supporting content is partial or preview-oriented. A future authenticated onboarding flow is currently unsupported rather than silently implied.

**Implemented:** None. Welcome already has coherent feature-specific state and route ownership, and the task prohibits inventing onboarding steps or functionality.

## 10. Onboarding State Contract

- **Entry:** public root/Welcome orientation.
- **Session requirement:** Welcome is public; protected application surfaces resolve session through existing auth ownership.
- **Steps:** no implemented multi-step flow found.
- **Completion:** no onboarding completion event found; no completion messaging was added.
- **Skip/cancel:** no onboarding step controls found.
- **Loading/error:** Welcome has feature-owned query loading/error/empty states; these are not authentication or onboarding completion states.
- **First-use:** no new `EmptyState(category="first-use")` was added because no actual first-use onboarding data contract exists.
- **Unsupported:** future personalization/profile setup is documented as unsupported/undemonstrated rather than represented as successful setup.

## 11. Welcome → Auth → Onboarding Boundary

The existing route journey is preserved: public Welcome can link to `/login` or discovery; Login/Register own authentication requests and redirect to `/profile`; authenticated routes remain under the application shell and protected-route boundary. Auth routes retain the simplified shell without application navigation or Player UI. No funnel, route, redirect, shell, theme, or RTL behavior was redesigned.

## 12. Component Adoption

Adopted only where equivalent:

- `Field` for login and registration field anatomy.
- Existing canonical `Input` for controls.
- Existing canonical `Button` loading/disabled contract remains in use.
- Existing canonical `LoadingState` for protected session loading.
- Existing compatibility `Form` wrapper remains because it is a neutral native form wrapper and does not own auth behavior.

Feature-specific auth card composition, request alerts, navigation links, schemas, and submit handlers remain local. No repository-wide migration or compatibility alias removal occurred.

## 13. Data Provenance

| Surface | Classification | Evidence |
| --- | --- | --- |
| Authenticated identity after profile fetch | REAL | Existing profile fetch and auth-store update. |
| Login/registration validation copy | STATIC | Feature-owned product copy, not server state. |
| Auth request result/error | REAL/PARTIAL | Controlled by existing auth/API result; presentation does not reinterpret it. |
| Welcome public podcasts | REAL when returned | Existing API-backed podcast query. |
| Welcome orientation copy | STATIC | Local introductory content. |
| Future personalized onboarding | UNSUPPORTED | No route, state machine, persistence, or API-backed setup flow found. |

No `Provenance` label was added to ordinary auth copy because it is not plausibly confused with live personalized data.

## 14. Accessibility

Implemented and validated statically through focused DOM tests:

- Native labels associate with controls via `for`/`id`.
- Login and registration use appropriate email, password, and text input types.
- Canonical `Field` supplies stable `aria-describedby` for field errors and `aria-invalid` when an error exists.
- Request failures remain `role="alert"`.
- Forms expose `aria-busy` during submission; canonical Button exposes native `disabled` and `aria-busy` during loading.
- Native links and buttons remain native interactive elements.

Browser focus order, keyboard interaction, axe, and screen-reader announcements were not run.

## 15. RTL

The document contract remains `<html lang="fa" dir="rtl">`. Auth copy remains Persian-first. Email/password controls preserve their semantic input types and existing mixed-script-safe values. No directional icons, physical left/right layout assumptions, or mirroring behavior was introduced.

Browser-level mixed Persian/Latin rendering and directional focus/visual validation were unavailable.

## 16. Responsive

Existing auth shell width, page container, spacing, card, and `sm`/`md`/`lg`/`xl` project breakpoints were preserved. No new breakpoint or fixed physical direction was introduced. The canonical field and button geometry remain responsible for responsive controls.

The required 320px, 375px, 768px, 1024px, 1280px, and 1440px viewport matrix was not browser-tested in this environment.

## 17. Token / Motion Integration

The implementation reuses canonical Field, Input, Button, LoadingState, surface, border, text, focus, and motion contracts. No arbitrary color, spacing, radius, shadow, animation, or breakpoint token was added. Existing reduced-motion CSS remains the runtime contract; no new decorative transition was introduced.

## 18. Feature Ownership

Auth services, auth store, `useSession`, token/session handling, route guards, redirects, validation schemas, request lifecycle, profile fetch, logout, onboarding ownership, persistence, and API contracts remain outside the design system. Canonical components receive presentation state and render ordinary native UI only.

## 19. Files Changed

- `apps/web/src/components/design-system/forms/field.tsx`
- `apps/web/src/components/design-system/common/common-primitives.test.tsx`
- `apps/web/src/features/auth/components/LoginForm.tsx`
- `apps/web/src/features/auth/components/RegisterForm.tsx`
- `apps/web/src/features/auth/components/ProtectedRoute.tsx`
- `apps/web/src/features/auth/components/AuthPresentation.test.tsx`
- `docs/phase-reports/DESIGN.10-auth-onboarding-report.md`

## 20. Files Intentionally Untouched

- Auth services, auth hooks, auth store, token handling, session persistence, and API clients.
- Route definitions, route guards beyond presentation text, redirects, middleware, and authorization rules.
- Welcome/onboarding feature data and route behavior.
- Profile logout implementation and session invalidation behavior.
- Player, Queue, shell ownership, persistence architecture, backend contracts, and feature business logic.

## 21. Tests

- Focused auth and Field tests: **2 files, 8 tests passed**.
- Full web suite: **57 files, 211 tests passed**.
- Root/API suite: **13 tests passed**.
- Vitest emits the existing Vite `configLoader: 'native'` warning; it is non-fatal.

## 22. Typecheck

`pnpm --filter @castaminofen/web exec tsc --noEmit` remains blocked by two pre-existing diagnostics outside the changed auth/design-system files:

- `src/features/player/components/PlayerDataIntegration.test.tsx`: a `QueuePanel` test omits existing `onMove` and `onClear` props.
- `src/features/player/runtime/__tests__/persistence.test.ts`: `read.queue` is possibly undefined.

The production build's type validation passed, and no DESIGN.10 implementation file was implicated by the standalone typecheck output.

## 23. Lint

`pnpm lint` passed across the workspace. One pre-existing warning remains in `src/features/onboarding/components/WelcomeScreen.test.tsx` for a raw `<img>` element. No new warning remains in the DESIGN.10 test.

## 24. Build

`pnpm build` passed for shared types, web, and API. The web build compiled successfully and generated all 19 existing routes. The existing Welcome test `<img>` warning remains non-fatal.

## 25. Runtime Validation

Static DOM tests and production compilation were available and passed. Browser viewport, keyboard, visual, screen-reader, axe, real session, and reduced-motion runtime validation were not available in this environment. No visual correctness, successful authentication, persistence, or assistive-technology claim is made.

## 26. Pre-existing Issues

- Two standalone web typecheck diagnostics in Player tests, listed in Section 22.
- Existing raw `<img>` lint/build warning in `WelcomeScreen.test.tsx`.
- Existing Vitest Vite config-loader warning.
- No explicit session-expired or forbidden presentation state was exposed by the inspected auth architecture.

## 27. Deferred Design Debt

- Add an evidence-backed session-expired presentation only if auth architecture exposes that state.
- Add a forbidden/unauthorized presentation only if authorization semantics expose authenticated-but-forbidden results.
- Design and audit onboarding only after a real feature-owned route/state/persistence contract exists; do not fabricate steps or completion.
- Add browser viewport, keyboard, screen-reader, axe, reduced-motion, and mixed-script RTL validation.
- Review the legacy unused header presentation separately if it becomes reachable; it was not part of the active auth shell path.

## 28. Architecture Safety Confirmation

**Confirmed by final diff inspection:** DESIGN.10 changed presentation composition, canonical field association behavior, focused tests, and this report only. No authentication implementation, authorization decision, session ownership, token handling, route semantics, persistence contract, API/backend contract, Player, Queue, or feature business logic was changed. No fake authentication, fake identity, fake onboarding completion, credential fixture, secret, or new onboarding functionality was added.
