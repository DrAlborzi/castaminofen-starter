# DESIGN.12 - Responsive Consistency & Layout QA Report

**Repository:** `PicoRmin/castaminofen-starter`  
**Phase date:** 2026-08-09  
**Scope:** Presentation-only responsive audit and safe layout fixes across the Castaminofen web application.

## 1. Executive Summary

**Observed:** The web application uses Tailwind's default mobile-first breakpoints, the `max-w-app` container token, responsive shell gutters, fixed mobile bottom navigation, and a player surface mounted by `AppShell`. Prior DESIGN.0-DESIGN.11 reports consistently deferred rendered viewport validation.

**Implemented:** Three concrete, low-risk responsive fixes were made:

- The playlist form dialog now starts safely on narrow screens, scrolls within the viewport, and remains centered from `sm` upward.
- The playlist detail episode-section header stacks its description and action below `sm` and protects the action width.
- Community discussion title/status rows stack on narrow screens and use `min-w-0`/`shrink-0` where content and tags share a row.

**Validated:** Focused tests and the complete web test suite pass. Lint and `git diff --check` pass. The production build and root API test command were run after this report was prepared.

**Deferred:** Playwright could not launch because the container lacks `libatk-1.0.so.0`; no browser viewport or screenshot claim is made. Player queue density and control arrangement remain deferred because a safe fix would need a more deliberate player presentation decision.

## 2. Audit Scope

**Observed:** Reviewed repository README and design-system guidance, current worktree state, the DESIGN.0-DESIGN.11 reports, Tailwind configuration, shell and container primitives, state/media/form surfaces, player presentation, public/auth/search/library/playlist/profile/community/creator/admin surfaces, and responsive class usage.

**Observed:** No repository-level `AGENTS.md`, `copilot-instructions.md`, or `CONTRIBUTING.md` was present. The root README, design-system README, prior phase reports, and this task contract governed the work.

**Observed:** The worktree was clean before implementation. No unrelated user changes were present.

## 3. Responsive Breakpoint Contract

**Observed:** No custom Tailwind screens are defined. The canonical values are:

| Token | Width | Use |
| --- | ---: | --- |
| base | 0px | small mobile-first layout |
| `sm` | 640px | larger mobile spacing and horizontal action transitions |
| `md` | 768px | tablet boundary and desktop/mobile navigation visibility |
| `lg` | 1024px | desktop container spacing and larger compositions |
| `xl` | 1280px | dense desktop and player horizontalization |
| `2xl` | 1536px | available default breakpoint; not materially used in inspected surfaces |

**Validated:** No new breakpoint was introduced. The requested audit widths of 320, 375, 430, 768, 1024, 1280, and 1440px were used as the validation target, but rendered browser execution was unavailable.

**Recommendation:** Preserve these defaults. Do not create product-specific breakpoints without a measured contract.

## 4. Container Audit

**Observed:** `MobileContainer` and `PageContainer` both use `w-full max-w-app mx-auto`; the shell uses `px-4 sm:px-6 lg:px-8`. The compatibility `.page-container` also reserves bottom clearance with `pb-24 sm:pb-28` for fixed mobile navigation/player context.

**Validated:** No duplicate global container primitive was introduced. Auth uses its existing `max-w-5xl` shell and constrained form cards.

**Classification:** `NOT AN ISSUE` for canonical containers. Compatibility and legacy paths remain intentionally untouched.

## 5. Grid/Flex Audit

**Observed:** Major feature grids default to one column and add columns at `sm`, `md`, `lg`, or `xl`. Search controls and section headers already stack at narrow widths. Carousel/filter surfaces intentionally use horizontal overflow and `whitespace-nowrap`.

**Implemented:** Playlist detail actions now use a column layout below `sm`; the community discussion metadata rows also stack below `sm`.

**Classification:** Safe local fixes only. No mechanical breakpoint normalization was performed.

## 6. Typography & Content Responsiveness

**Observed:** Canonical media components use `min-w-0`, `flex-1`, `shrink-0`, and truncation for media metadata. Long Persian, Latin, mixed-script, duration, and identifier behavior was source-audited but not browser-rendered.

**Implemented:** Community title containers now explicitly use `min-w-0` where a status tag shares the row. This prevents a long title/description block from refusing to shrink.

**Deferred:** Full mixed-script, long URL, username, and typography validation belongs with browser and RTL testing in DESIGN.13-DESIGN.15.

## 7. Form Responsiveness

**Observed:** Auth forms use full-width controls with `w-full max-w-xl`; search input/actions stack below `sm`. Playlist fields use canonical `Field`/`Input` composition and full-width inputs.

**Implemented:** The playlist dialog now has `max-h-[calc(100vh-2rem)] overflow-y-auto`, so fields, validation messages, and actions remain reachable on short mobile viewports without changing form behavior or validation.

**Classification:** `SAFE`.

## 8. Media Responsiveness

**Observed:** Canonical `MediaCard`, `MediaRow`, `MediaMetadata`, `Artwork`, and `Duration` compositions preserve stable artwork geometry and allow text metadata to shrink. Feature rows retain domain-owned actions.

**Classification:** `VALIDATED` by source inspection; browser artwork-ratio validation is `DEFERRED` because the browser could not launch.

**Untouched:** Playback dispatch, queue integration, media ownership, and feature data composition.

## 9. Player/Queue Responsive Safety

**Observed:** `PlayerBar` is compact below `xl` and horizontalized at `xl`; the shell keeps player presentation in normal flow and the compatibility page container reserves bottom space for fixed mobile navigation. Bottom navigation preserves safe-area padding and stable touch-target geometry.

**Observed:** Queue rows reserve a dense action cluster alongside title metadata on narrow screens. This is a legitimate responsive risk, especially at 320px, but it is coupled to the player presentation and queue interaction surface.

**Deferred:** `DEFERRED` - no player or queue changes were made. Resolving the dense action arrangement requires a deliberate player UX decision and must not alter player runtime, store, queue semantics, or playback behavior.

## 10. Navigation/Shell Responsiveness

**Observed:** `MobileHeader` mounts desktop navigation at `md`; `BottomNavigation` is mobile-only below `md` and includes safe-area bottom padding. `AppShell` owns header, content container, player, install banner, and bottom navigation.

**Classification:** `NOT AN ISSUE` by source audit. Duplicate navigation semantics were not introduced or changed.

**Deferred:** Rendered navigation collision and fixed-surface clearance remain browser-validation work.

## 11. Dense Data Surface Audit

**Observed:** Creator, admin, and community surfaces generally collapse their top-level grids at smaller widths. Creator content actions wrap rather than overflow. Dense tables and specialized dashboard geometry were preserved rather than converted to cards.

**Classification:** `SPECIALIZED` for admin/creator/community dense compositions. No forced information-architecture change was justified.

## 12. Modal/Overlay/Fixed Surface Audit

**Implemented:** `PlaylistFormDialog` now has narrow-screen viewport containment and internal vertical scrolling while retaining the existing dialog semantics and submission behavior.

**Observed:** Fixed bottom navigation uses safe-area padding. The player queue is rendered inside the player surface rather than moving ownership to a global overlay.

**Deferred:** Keyboard/focus-management architecture is outside DESIGN.12 and belongs to DESIGN.14. Browser containment and visual clipping could not be verified without a runnable browser.

## 13. Responsive State Surface Audit

**Observed:** Canonical loading, empty, error, partial, offline, unsupported, success, alert, toast, and provenance components are present and prior phases established their semantic use. State action groups generally use wrapping compositions.

**Classification:** `NOT AN ISSUE` by source inspection for the audited surfaces. No state semantics or data outcomes were changed.

**Deferred:** Rendered narrow-screen wrapping of every state message/action combination remains part of the unavailable browser matrix.

## 14. Feature-by-Feature Responsive Audit

| Surface | 320/375 | 430/768 | 1024/1280/1440 | Classification | Action |
| --- | --- | --- | --- | --- | --- |
| Welcome/Discovery/Catalog | mobile-first containers and grids observed | existing breakpoint transitions | existing desktop grids | `NOT AN ISSUE` / `DEFERRED` browser proof | untouched |
| Login/Signup/Onboarding | full-width constrained forms observed | existing auth shell | centered auth shell | `NOT AN ISSUE` | untouched |
| Podcasts/Episodes/Search | cards/forms use existing responsive primitives | existing feature transitions | existing catalog composition | `NOT AN ISSUE` / `DEFERRED` browser proof | untouched |
| Library/History/Favorites | media rows and tabs have shrink/overflow patterns | existing grid transitions | existing desktop density | `SPECIALIZED` | untouched |
| Profile | media and continuation composition can shrink | existing feature layout | existing profile composition | `SPECIALIZED` | untouched |
| Playlists list | existing responsive list/actions | existing transitions | existing desktop composition | `SAFE` for shared rules | untouched |
| Playlist detail | episode header action could crowd narrow content | stacked below `sm` | horizontal from `sm` | `SAFE` | fixed |
| Playlist editing dialog | dialog could exceed short mobile viewport | contained/scrollable | centered dialog | `SAFE` | fixed |
| Player bar/queue | dense queue action cluster is a risk | existing compact player | horizontal player at `xl` | `DEFERRED` | untouched |
| Community | discussion title/status row could compress | stacked metadata below `sm` | existing two-column composition | `SAFE` | fixed |
| Creator/Admin | specialized actions/tables preserved | existing local grids | existing dense dashboards | `SPECIALIZED` | untouched |
| Modals/overlays | playlist dialog now scroll-safe | existing overlay geometry | existing dialog geometry | `SAFE` / `DEFERRED` browser proof | fixed only playlist dialog |

**Observed:** The matrix above is an audit classification, not a claim of rendered browser validation.

## 15. Browser Viewport Validation

**Attempted:** Playwright was provisioned and a matrix was attempted for `/`, `/login`, `/search`, `/playlists`, and `/community` at 320, 375, 430, 768, 1024, 1280, and 1440px.

**Deferred:** Browser viewport validation was not available in this environment. Chromium could not launch because the container is missing the system library `libatk-1.0.so.0`. Consequently, no screenshot, overflow measurement, clipping result, or rendered navigation/player claim is presented as validated.

## 16. Migrations/Fixes Performed

**Implemented:**

- `PlaylistFormDialog`: narrow-screen scroll containment and safe vertical alignment.
- `PlaylistDetailsPage`: responsive episode-section header stacking and action shrink protection.
- `CommunityHome`: narrow-screen stacking plus `min-w-0`/`shrink-0` protections for discussion metadata.

**Observed:** All changes are Tailwind class composition only. No props, callbacks, form rules, data fetching, routing, state ownership, or business behavior changed.

## 17. Deferred Responsive Debt

**Deferred:**

- Player queue action density at 320/375px; requires a player presentation decision.
- Full rendered viewport matrix and screenshot review once browser system dependencies are available.
- Mixed Persian/Latin, long URL, username, duration, and typography stress cases.
- Full RTL validation, accessibility interaction validation, and visual regression validation, which belong to DESIGN.13-DESIGN.15.
- Specialized admin/creator/community density review beyond source-level overflow safety.

## 18. Files Changed

**Implemented:**

- `apps/web/src/features/playlists/components/PlaylistFormDialog.tsx`
- `apps/web/src/features/playlists/components/PlaylistDetailsPage.tsx`
- `apps/web/src/features/community/components/CommunityHome.tsx`
- `docs/phase-reports/DESIGN.12-responsive-consistency-layout-qa-report.md`

## 19. Files Intentionally Untouched

**Validated:** Backend/API files, API contracts, authentication, authorization, route semantics, React Query ownership, Zustand ownership, persistence, Player runtime, Player store, queue semantics, playback runtime, playlist semantics, feature fetching/mutations, and feature ownership were untouched.

**Observed:** No new responsive state manager, breakpoint, design-system primitive, or device-specific business behavior was introduced.

## 20. Tests

**Validated:** Focused tests: `2` files, `5` tests passed.  
**Validated:** Full web suite: `57` files, `211` tests passed.  
**Validated:** Root `pnpm test`: `13` API tests passed.

**Observed:** Vitest emits the existing non-fatal Vite `configLoader: 'native'` warning.

## 21. Typecheck

**Observed:** `pnpm --filter @castaminofen/web exec tsc --noEmit` reports two pre-existing diagnostics in Player tests:

- `features/player/components/PlayerDataIntegration.test.tsx`: test props omit existing `QueuePanel` `onMove` and `onClear` requirements.
- `features/player/runtime/__tests__/persistence.test.ts`: `read.queue` may be undefined.

**Classification:** `PRE-EXISTING`; neither changed implementation file is implicated.

## 22. Lint

**Validated:** `pnpm lint` passed across API and web.  
**Observed:** Existing warning in `features/onboarding/components/WelcomeScreen.test.tsx` for a raw `<img>` and LCP guidance.

## 23. Build

**Validated:** `pnpm build` passed for shared types, the web application, and the API. The existing onboarding raw-image warning was emitted during the web build.

## 24. Pre-existing Issues

**Observed:** The two Player test typecheck diagnostics and the onboarding raw-image lint warning predate this phase and are outside the responsive presentation scope. Browser validation is blocked by the container's missing `libatk-1.0.so.0` system library.

## 25. Architecture Safety Confirmation

**Validated:** No architectural or business contracts changed.

**Confirmed untouched:** backend, API contracts, authentication, authorization, route semantics, React Query ownership, Zustand ownership, persistence, Player runtime, Player store, queue semantics, playback runtime, playlist semantics, feature ownership, and product behavior.

**Expected result:** **No architectural/business contracts changed.**
