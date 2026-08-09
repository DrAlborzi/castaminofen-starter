# HOME.PUBLIC.CONTENT.1 — Implementation Report

## 1. Executive Summary

The public Home now composes the existing Persian-first orientation surface with a small real podcast preview. Unauthenticated visitors can see up to three publicly available podcasts and open them through existing routes. Authentication, Library, Player, persistence, analytics, and backend contracts were unchanged.

## 2. Data Source Used

Reused `usePodcasts` from `apps/web/src/features/podcasts/hooks/usePodcasts.ts` with `{ page: 1, limit: 3, sort: 'newest' }`. The API contract is the existing public `GET /podcasts` endpoint.

## 3. Public Content Contract

Only catalog items with both an `id` and a non-empty `title` are rendered. Artwork uses the existing fallback behavior. The API controller exposes list and detail reads without `JwtAuthGuard`; mutation operations remain protected. No authentication-only metadata, metrics, or fabricated content is rendered.

## 4. Components Reused

- `MediaCard`
- `ContentArtwork`
- `Button`
- `usePodcasts`
- Existing Next `Link`
- Existing design-system tokens and utility classes

## 5. Components Created

No new component was created. The existing `WelcomeScreen` owns the public composition and consumes the existing read-only catalog hook.

## 6. UX Changes

Added a `کشف کن` section titled `پادکست‌هایی برای شروع` below the orientation area. Each real podcast has artwork, title, optional description, and an `باز کردن پادکست` action. The original `/login` primary CTA and `/podcasts` discovery CTA remain intact.

## 7. Loading State

While the query is loading, the section renders three stable skeleton blocks with `role="status"`, `aria-live="polite"`, and an accessible Persian loading label. No catalog content is fabricated during loading.

## 8. Empty State

When no usable public podcasts are returned, a restrained Persian status explains that public content is currently unavailable. `/login` and `/podcasts` actions remain available.

## 9. Error State

When the catalog request fails, Home renders a concise Persian alert, a retry action backed by the existing query `refetch`, and a fallback link to `/podcasts`. Raw API errors are not exposed.

## 10. Navigation Contract

Preview cards link to the verified existing `/podcasts/[id]` route. The fallback discovery actions link to the verified `/podcasts` route. No new route was introduced.

## 11. RTL Validation

The Home composition retains application-level RTL behavior through `dir="rtl"`. Persian copy remains right-to-left, while the existing logical `start` utility and flex layout are preserved. No conflicting direction rule was added.

## 12. Responsive Validation

The preview uses the existing responsive grid pattern: one column by default, two columns at medium widths, and a maximum of three columns at extra-large widths. The content remains bounded by `max-w-app`; controls use existing minimum-height classes suitable for touch targets.

## 13. Accessibility Validation

- One existing `h1` remains the page heading.
- The preview uses an `h2`.
- Card links include the podcast title and destination context in their accessible names.
- Loading, empty, and error states expose appropriate status semantics.
- Artwork is decorative when the title and link provide the content name.
- Existing visible focus styles are retained on links and buttons.

## 14. Performance Considerations

The initial query is limited to three items. No episode history, playback state, recommendations, personalization, or duplicate API layer was added. `ContentArtwork` uses the existing image sizing and fallback behavior.

## 15. Architecture Safety

Home consumes catalog data but does not own catalog, auth, library, persistence, queue, or playback state. No API, route ownership, state-management, package, or design-token changes were made.

## 16. Files Changed

- `apps/web/src/features/onboarding/components/WelcomeScreen.tsx`
- `apps/web/src/features/onboarding/components/WelcomeScreen.test.tsx`
- `docs/phase-reports/home-public-content-1-implementation-report.md`

## 17. Files Explicitly Untouched

`apps/web/src/app/page.tsx`, `apps/web/src/app/home-page-mode.ts`, authentication, `authStore`, Library, Player, PlayerBar, backend source, API contracts, package manifests, lockfiles, Discovery, unrelated routes, and unrelated tests.

## 18. Tests Run

`pnpm --filter @castaminofen/web exec vitest run src/features/onboarding/components/WelcomeScreen.test.tsx`

Result: 5 tests passed.

## 19. Build/Lint Results

- Focused Vitest: passed, 5/5 tests.
- `pnpm --filter @castaminofen/web lint`: passed with one existing test-mock warning for `<img>` in `WelcomeScreen.test.tsx`.
- `pnpm --filter @castaminofen/web build`: passed; all routes compiled and static generation completed.
- `git diff --check`: passed.

## 20. Pre-existing Issues

The worktree already contained unrelated changes before this phase: deletion of `.github/copilot-instructions.md` and modifications to `pnpm-lock.yaml`. They were not changed or reverted. Lint/build also report the non-blocking `@next/next/no-img-element` warning from the test-only `next/image` mock.

## 21. Remaining Limitations

The preview depends on the existing public catalog availability. If the backend returns no public podcasts, Home correctly shows the empty state. No episode preview or playback was added because this phase does not establish a public playback contract.

## 22. Product Risks

The newest three podcasts are a lightweight discovery sample, not editorial ranking or recommendation logic. Catalog ordering and availability remain owned by the existing API.

## 23. Recommended Next Phase

Validate the public discovery journey end to end with representative catalog data and browser-level accessibility checks, without expanding Home into authenticated history, recommendations, or playback ownership.

## 24. Git Diff Scope

Feature diff is limited to the existing onboarding component, its focused test, and this report. No backend, API, route, package, lockfile, Library, Player, or global design-system change was introduced by this phase.

## 25. Final Acceptance Criteria Status

- Real public content preview: PASS
- Maximum three initial items: PASS
- Existing data layer reused: PASS
- Loading, empty, and error states: PASS
- Verified navigation: PASS
- Persian-first RTL composition: PASS
- Responsive bounded layout: PASS
- Focused tests: PASS
- Lint: PASS with non-blocking existing test-mock warning
- Production build: PASS
- No unsupported personalization or playback behavior: PASS

## 26. Final Verdict

`PASS WITH PRE-EXISTING ISSUES`
