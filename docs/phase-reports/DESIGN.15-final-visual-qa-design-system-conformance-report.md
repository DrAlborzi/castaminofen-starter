# DESIGN.15 — Final Visual QA, Cross-Viewport Consistency & Design-System Conformance Report

**Repository:** `PicoRmin/castaminofen-starter`  
**Phase date:** 2026-08-09  
**Status:** `PARTIAL`  
**Scope:** Final presentation, token, state, RTL, accessibility, responsive, theme, and component-adoption audit. No product or architecture migration was performed.

## 1. Executive Summary

**Observed:** The web application has a canonical design-system namespace at `apps/web/src/components/design-system/`, semantic theme tokens, a single global RTL owner, shared state primitives, and feature-owned presentation composition. Prior DESIGN.11-DESIGN.14 reports document selective adoption and several browser-validation limitations.

**Implemented:** The canonical typography token `--letter-spacing-tight` was changed from `-0.03em` to `0`, aligning the global heading contract with the DESIGN.15 requirement that letter spacing remain zero. This is a presentation-only, behavior-preserving change.

**Validated:** API tests passed (`13/13`), web tests passed (`59` files, `214` tests), lint passed with one existing warning, production build passed, and `git diff --check` passed. Static RTL, state, accessibility, motion, token, and canonical-export evidence was reviewed.

**Attempted:** Playwright was launched against the running web app at `/search` and `320x800`.

**Deferred:** Browser visual validation could not execute because Chromium cannot load `libatk-1.0.so.0`. No screenshot, pixel comparison, rendered overflow, focus-runtime, axe, or screen-reader result is claimed as validated.

## 2. Audit Scope

**Observed:** Reviewed the root README, package scripts, web package, Tailwind configuration, token CSS, global CSS, app shell, root layout, canonical design-system README/index, feature-local presentation, state/media/navigation primitives, route inventory, static token/RTL/accessibility patterns, and DESIGN.0-DESIGN.14 reports.

**Observed:** No repository-level `AGENTS.md`, `CONTRIBUTING.md`, nested project instruction file, or usable repository Copilot instruction file exists in the workspace. The root README, design-system README, prior phase reports, and this task contract governed the audit.

**Observed:** The design documentation set contains DESIGN.0 and DESIGN.2-DESIGN.14 reports. An exact `DESIGN.1` phase report was not present; related design-system reports exist under `docs/reports/` and `docs/design-system/`.

## 3. Baseline

**Validated before the final token edit:**

- `git status --short`, `git diff --check`, and `git diff --stat` showed a clean baseline.
- `pnpm test`: 13 API tests passed.
- `pnpm --filter @castaminofen/web test`: 59 test files and 214 tests passed.
- `pnpm lint`: passed; existing Next image warning remained.
- `pnpm build`: shared types, web, and API build passed.
- `pnpm --filter @castaminofen/web exec tsc --noEmit`: two pre-existing Player test diagnostics remained.

## 4. Design-System Conformance

**Observed:** `apps/web/src/components/design-system/index.ts` exports the canonical layout, navigation, common controls, forms, states, provenance, identity, media, social, and player presentation primitives. The README defines presentation-only ownership: primitives do not fetch, route, persist, mutate, own playback, or own application state.

**Observed:** Canonical components include `Button`, `IconButton`, `Card`, `Badge`, `Input`, `Field`, `LoadingState`, `EmptyState`, `PartialState`, `ErrorState`, `OfflineState`, `UnsupportedState`, `SuccessState`, `Alert`, `Toast`, `Provenance`, `ContentArtwork`, `Avatar`, `MediaMetadata`, `Duration`, `PlaybackAffordance`, `ProgressIndicator`, navigation primitives, and media compositions.

**Validated:** Canonical exports and README contracts are present. Prior reports document safe migration of equivalent primitives and preservation of feature-owned composition.

**Recommendation:** Continue importing new shared UI from `@/components/design-system`; retire compatibility aliases only after a complete consumer and external-compatibility proof.

## 5. Duplicate Primitive Audit

| Classification | Observed evidence | Decision |
| --- | --- | --- |
| A — Canonical equivalent | Compatibility aliases for selected Button/Card/Badge/Input/state/media primitives | Safe migrations were already performed in prior phases; no new broad migration justified |
| B — Feature composition | Creator, Admin, Community, Profile, Library, Playlist, Player, and Search panels with domain actions or specialized geometry | Preserve |
| C — Domain-specific | Queue rows, playback controls, playlist rows, creator/admin panels, feature forms, tables, and dashboard sections | Preserve |
| D — Legacy compatibility | `components/ui/*`, selected `components/layout/*`, and `PageState` compatibility composition | Preserve compatibility contract |
| E — Actual inconsistency | Global heading token used negative tracking against the current zero-spacing contract | Fixed in `apps/web/src/styles/tokens.css` |

**Observed:** Search results include native `<button>`, `<input>`, `<textarea>`, and `<select>` usage as expected. Local `div` surfaces, badges, cards, loading skeletons, artwork, and avatars are not automatically duplicates: most are feature composition or domain-specific geometry.

**Recommendation:** Do not perform mechanical repository-wide primitive replacement.

## 6. Token Audit

**Observed:** Tailwind maps semantic roles for surfaces, text, borders, action, accent, status, playback, type, shadows, radii, and app/container width. Canonical primitives use these semantic tokens.

**Observed:** Remaining arbitrary values are concentrated in feature geometry, progress widths, artwork background URLs, gradients, responsive widths, editorial labels, and specialized player/navigation surfaces. Inline styles found are dynamic progress widths or supplied artwork URLs, not token bypasses for static color or spacing.

**Classification:**

- **Valid geometry:** progress widths, stable minimum widths, viewport-safe dialog sizing, artwork ratios.
- **Content-specific:** supplied image URLs and progress values.
- **Feature-specific:** hero gradients, dashboard density, player composition, social nesting, and navigation emphasis.
- **Legacy/compatibility:** retained compatibility classes and wrappers.
- **Actual inconsistency:** the negative global heading tracking value, fixed above.

**Implemented:** Changed `--letter-spacing-tight` to `0` without changing component ownership or layout APIs.

**Deferred:** Full arbitrary-radius/shadow normalization requires rendered visual measurement and should be handled selectively, not as a blanket token migration.

## 7. Typography

**Observed:** `Vazirmatn` is loaded through `next/font/google` with Arabic and Latin subsets and assigned to the body/heading token variables. Heading, body, label, metadata, caption, and code roles exist in the token and Tailwind configuration.

**Implemented:** Global heading letter spacing now uses zero tracking, preserving Persian readability and matching the current DESIGN.15 contract.

**Validated:** The token is applied through `globals.css`; web tests, lint, and build remain green after the change.

**Deferred:** Rendered stress validation for long Persian text and mixed values such as `Castaminofen`, `Episode 42`, `@username`, `12:45`, dates, and URLs remains blocked by browser launch failure.

## 8. Spacing

**Observed:** Shared page containers use responsive gutters and bottom clearance; canonical primitives use tokenized/common Tailwind spacing. Feature surfaces use repeated `p-4`, `p-5`, `p-6`, `gap-3`, and `gap-4` rhythms with local exceptions for density and hierarchy.

**Classification:** Repeated local spacing is mostly feature composition, not a proven defect. Player clearance and bottom-navigation clearance are represented in shell/container classes.

**Deferred:** Rendered rhythm and visual density across every route and viewport cannot be claimed without browser execution.

## 9. Container / Page Width

**Observed:** `PageContainer` and `MobileContainer` use full width plus `max-w-app`; Tailwind defines `--container-max` as the app content width. Auth uses an independent constrained shell. App shell owns content, player, install banner, and bottom navigation composition.

**Validated:** Static source shows no second global container owner or route/business-logic change.

**Deferred:** Actual clipping, excessive whitespace, nested-container appearance, and fixed-surface clearance at 320, 375, 390, 768, 1024, 1280, and 1440 pixels.

## 10. Responsive QA

**Observed:** The project uses Tailwind mobile-first defaults and existing `sm`, `md`, `lg`, `xl` transitions. Routes exist for `/`, `/library`, `/profile`, `/podcasts`, `/search`, `/playlists`, `/creator`, `/community`, `/admin`, `/settings`, `/login`, `/register`, `/create`, `/offline-library`, and related detail/editor routes.

**Observed:** Prior DESIGN.12 implemented narrow-screen safeguards for the playlist dialog, playlist detail action header, and community discussion metadata. Player queue action density at very narrow widths remains an explicit deferred risk.

**Attempted:** The final browser attempt targeted `/search` at `320x800` against the running dev server.

**Deferred:** The complete route matrix, viewport matrix, light/dark matrix, screenshots, horizontal-overflow checks, card wrapping, dialogs, tables, and fixed player/bottom-navigation overlap remain unvalidated in a browser.

## 11. Visual QA

**Observed:** Source composition presents a consistent dark-first semantic surface system with accent, status, border, and playback roles. Canonical media primitives provide stable artwork/metadata composition and feature code owns actions.

**Validated:** Static source and automated tests confirm class contracts, canonical exports, and state/media primitive behavior.

**Deferred:** No rendered visual regression result is claimed. No screenshot baseline was found or created for this phase.

## 12. State Consistency

**Observed:** Canonical vocabulary covers `loading`, `empty`, `error`, `partial`, `success`, `offline`, `unsupported`, `playing`, `paused`, `queued`, `disabled`, `selected`, and `active`. State primitives use distinct roles and actionable content.

**Validated:** Existing state tests cover `aria-busy`, `role="alert"`, `role="status"`, field errors, and state rendering. Web tests remained green after the token edit.

**Recommendation:** Preserve distinctions between no-results, empty, error, partial, offline, and unsupported outcomes; do not add fake success or offline behavior.

## 13. Provenance

**Observed:** The design-system README defines `REAL`, `PARTIAL`, `MOCK / PREVIEW`, `STATIC`, and `UNSUPPORTED`. Prior audits identify Creator, Admin, Community, Profile preview, immersive-player supporting panels, discovery placeholders, settings coming-soon areas, and offline library as high-risk provenance surfaces.

**Validated:** Provenance is available as a canonical primitive and prior reports record selective use.

**Deferred:** A rendered high-risk route-by-route provenance review requires browser execution. No mock data was converted into a real-data claim.

## 14. RTL Regression

**Observed:** `apps/web/src/app/layout.tsx` is the sole global direction owner and renders `<html lang="fa" dir="rtl">`. The design-system README requires logical spacing/positioning, local LTR isolation for durations and mixed identifiers, and no blanket icon mirroring.

**Validated:** `Duration` renders `dir="ltr"`; navigation exposes `aria-current`; RTL contract tests cover duration behavior; static search found no second global RTL owner. Existing source retains some physical classes in local contexts, but no mechanical migration was justified.

**Deferred:** Rendered bidirectional validation for navigation, player, queue, forms, pagination, carousels, usernames, URLs, and mixed-script content.

## 15. Accessibility Regression

**Observed:** Native links, buttons, inputs, labels, and semantic regions are used in the canonical surface. State primitives expose `aria-busy`, `role="alert"`, `role="status"`, and field `aria-describedby`/`aria-invalid`; active navigation uses `aria-current="page"`.

**Validated:** DESIGN.14 fixes and tests remain present. Web tests pass, including state, navigation, form, and RTL contract coverage. Reduced-motion CSS is present in `globals.css`.

**Deferred:** Runtime keyboard traversal, focus restoration/containment, touch-target measurement, contrast sampling, axe, screen-reader output, and live-region timing.

## 16. Interaction State Consistency

**Observed:** Canonical controls support hover, focus-visible, pressed, active, selected, disabled, loading, and playback-related presentation. Native disabled behavior and accessible names are documented in the design-system README.

**Validated:** Static source and automated tests cover the key semantic states; no interaction logic was changed in DESIGN.15.

**Deferred:** Runtime pointer/keyboard state rendering and focus clipping at all target viewports.

## 17. Theme QA

**Observed:** `tokens.css` provides dark root values and a `[data-theme='light']` token layer. Root layout bootstraps the stored/system theme before rendering; `color-scheme` is kept in sync.

**Validated:** Semantic roles for surfaces, borders, text, focus, status, playback, and accent exist in both theme layers. No theme token or switching behavior was changed.

**Deferred:** Rendered light/dark route sampling, contrast, muted text, player, navigation, card, focus, destructive, and success appearance.

## 18. Motion QA

**Observed:** Motion tokens and a global `prefers-reduced-motion: reduce` rule exist. Canonical progress also uses `motion-reduce:transition-none` where applicable.

**Validated:** Source inspection confirms reduced-motion coverage and no new animation was added.

**Deferred:** Runtime reduced-motion behavior, dialog transitions, navigation motion, player progress motion, and skeleton motion.

## 19. Player / Queue Visual Safety

**Observed:** Player and queue presentation remain feature-owned. Progress, duration, artwork, controls, and queue surfaces use canonical or feature-composed presentation without moving runtime/store ownership.

**Deferred:** Mobile queue density, player clearance, safe-area rendering, controls, progress, overflow, and fixed-surface interaction could not be rendered. No player, queue, playback, persistence, or store code was changed.

## 20. Tables / Data-Dense Surfaces

**Observed:** Creator, Admin, Community, and other dense surfaces retain specialized local panels and tables. No responsive table-to-card information architecture was introduced.

**Deferred:** Rendered horizontal overflow, column density, action alignment, numeric readability, sorting, pagination, and RTL behavior.

## 21. Image / Artwork QA

**Observed:** `ContentArtwork` is the canonical artwork surface with supplied alt text, stable ratios, fallback behavior, and `object-cover`. Avatar is the canonical identity image primitive. Feature-local playlist background spans are domain-specific compositions.

**Validated:** Canonical exports and media contracts are present; no artwork ownership or fetching changed.

**Deferred:** Rendered ratio, fallback, broken-image, alt presentation, avatar sizing, and layout-shift checks.

## 22. Browser Validation

**Attempted:** Started the web app with `pnpm --filter @castaminofen/web dev` at `http://localhost:3000` and attempted Playwright Chromium navigation to `/search` at `320x800`.

**Deferred:** Chromium exited with:

```text
error while loading shared libraries: libatk-1.0.so.0: cannot open shared object file: No such file or directory
```

Static and automated validation passed; browser visual validation remains deferred. No screenshots or pixel comparisons were produced.

## 23. Visual Regression

**Observed:** No screenshot baseline or repository visual-regression policy artifact was found for this phase.

**Deferred:** Pixel or screenshot comparison. New screenshots were not introduced as baselines.

## 24. Implemented Fixes

**Implemented:**

- Changed `--letter-spacing-tight` from `-0.03em` to `0` in `apps/web/src/styles/tokens.css`.

**Reason:** The token is applied to global headings and conflicted with the DESIGN.15 zero-letter-spacing contract, especially for Persian and mixed-script headings.

**Safety:** No props, routes, API calls, data fetching, state ownership, player runtime, queue semantics, persistence, or business behavior changed.

## 25. Tests

**Validated after the fix:** `pnpm --filter @castaminofen/web test` passed with 59 files and 214 tests.

**Validated baseline/final:** `pnpm test` passed with 13 API tests.

**Observed:** Vitest emits the existing non-fatal Vite `configLoader: 'native'` warning.

## 26. Typecheck

**Observed:** `pnpm --filter @castaminofen/web exec tsc --noEmit` reports two pre-existing diagnostics:

- `features/player/components/PlayerDataIntegration.test.tsx`: `QueuePanel` test props omit `onMove` and `onClear`.
- `features/player/runtime/__tests__/persistence.test.ts`: `read.queue` may be undefined.

**Classification:** Pre-existing and outside the token-only DESIGN.15 change. The production build's type validation passed.

## 27. Lint

**Validated:** `pnpm lint` and focused web lint passed.

**Observed:** Existing warning in `features/onboarding/components/WelcomeScreen.test.tsx` for raw `<img>` and Next image optimization guidance. It does not fail lint or build.

## 28. Build

**Validated:** `pnpm build` passed for `@castaminofen/shared-types`, `@castaminofen/web`, and `@castaminofen/api`. Next generated the existing 19 web routes.

## 29. Changed Files

- [apps/web/src/styles/tokens.css](../../apps/web/src/styles/tokens.css) — zeroed the canonical heading tracking token.
- [docs/phase-reports/DESIGN.15-final-visual-qa-design-system-conformance-report.md](DESIGN.15-final-visual-qa-design-system-conformance-report.md) — this final audit report.

## 30. Intentionally Untouched Files

**Confirmed untouched:** Backend, API contracts, authentication, authorization, route semantics, React Query ownership, Zustand ownership, persistence, player runtime, player store, queue semantics, playback engine, playlist business logic, feature fetching, feature mutations, and feature ownership.

**Also untouched:** Canonical component APIs, compatibility wrappers, feature-local composition, mock data, artwork fetching, navigation semantics, theme switching behavior, and responsive breakpoints.

## 31. Pre-existing Issues

- Web standalone typecheck has two Player test diagnostics described in Section 26.
- Lint/build retain the existing raw `<img>` warning in `WelcomeScreen.test.tsx`.
- Vitest emits the existing Vite config-loader warning.
- Browser validation is blocked by missing `libatk-1.0.so.0`.
- Repository-level `AGENTS.md`, `CONTRIBUTING.md`, and Copilot instruction files are absent.
- No exact DESIGN.1 report was found; related design-system reports are available elsewhere in `docs/`.

## 32. Resolved Debt

- Global heading tracking now conforms to the zero-letter-spacing contract.
- Canonical design-system exports, semantic state vocabulary, media contracts, global RTL owner, and reduced-motion foundation were re-audited.
- Prior safe migrations and compatibility boundaries remain documented.

## 33. Deferred Debt

| Priority | Area | Reason | Recommendation |
| --- | --- | --- | --- |
| P0 | Browser visual matrix | Chromium missing `libatk-1.0.so.0` | Add safe container browser libraries and run route × viewport × theme × RTL checks |
| P1 | Player/queue narrow layout | Dense action cluster is coupled to player UX | Review at 320/375/390px without changing runtime/store/queue contracts |
| P1 | Accessibility runtime | Static evidence cannot prove focus, axe, or screen-reader behavior | Run Playwright + axe and keyboard/screen-reader checks |
| P1 | RTL mixed-script rendering | Source contracts pass but rendered ordering is unverified | Test Persian prose, URLs, usernames, durations, and player controls |
| P2 | Feature-local token normalization | Arbitrary geometry is often intentional composition | Normalize only after screenshots identify a concrete inconsistency |
| P2 | Compatibility alias retirement | External/legacy consumers are not proven absent | Inventory consumers and remove only in a dedicated compatibility task |
| P2 | Provenance depth review | High-risk preview panels need rendered context | Review Creator/Admin/Community/Profile/Settings/Offline surfaces in browser |

## 34. New Debt

**Observed:** No new product or architecture debt was created by DESIGN.15.

**New audit finding:** `P2` browser validation remains blocked by the container's missing `libatk-1.0.so.0`; this is an environment limitation, not an application regression. Recommended next step: provide the required safe system dependency or run the matrix in CI with a browser-capable image.

## 35. Final Design System Scorecard

| Area | Status | Confidence | Evidence |
| --- | --- | --- | --- |
| Design Tokens | PASS | HIGH | Semantic token inventory; heading tracking fixed; tests/lint/build pass |
| Canonical Components | PASS | HIGH | Canonical index/README and prior migration reports |
| Shell | PARTIAL | MEDIUM | Static app-shell review; rendered fixed-surface check deferred |
| Navigation | PARTIAL | MEDIUM | Static `aria-current` and canonical navigation evidence; browser focus/layout deferred |
| States | PASS | HIGH | Canonical state primitives and automated tests |
| Media | PASS | MEDIUM | Canonical artwork/metadata/duration contracts; rendered image QA deferred |
| Welcome / Discovery | PARTIAL | MEDIUM | Source and route inventory; browser/provenance sampling deferred |
| Catalog | PASS | MEDIUM | Canonical catalog adoption and existing tests; rendered QA deferred |
| Library / Profile | PARTIAL | MEDIUM | Prior adoption reports and source review; browser matrix deferred |
| Playlists | PARTIAL | MEDIUM | Prior responsive fixes and tests; rendered dialog/table QA deferred |
| Player / Queue | PARTIAL | LOW | Source ownership safe; narrow layout and fixed-surface rendering deferred |
| Creator / Admin / Community | PARTIAL | MEDIUM | Specialized composition and provenance reviewed statically |
| Auth / Onboarding | PASS | MEDIUM | Forms/state contracts and production build; rendered focus QA deferred |
| Consistency | PASS | MEDIUM | Semantic tokens and prior conformance work; screenshot comparison unavailable |
| Responsive | PARTIAL | LOW | Source-level responsive rules; browser matrix blocked |
| RTL | PASS | MEDIUM | `lang/dir`, logical-layout contract, duration test, static audit |
| Accessibility | PARTIAL | MEDIUM | Automated semantic/state tests; runtime axe/keyboard/screen-reader deferred |
| Visual QA | PARTIAL | LOW | Static/automated validation passed; browser visual validation deferred |

## 36. Architecture Safety Confirmation

**Validated:** DESIGN.15 made one token-only presentation fix and added this report. The following contracts were not changed:

- API or backend implementation
- authentication or authorization
- routing semantics
- React Query ownership
- Zustand ownership
- persistence
- player runtime or player store
- queue semantics
- playback engine
- playlist business logic
- feature data fetching or ownership

No DESIGN.16 was created. Remaining work is recorded as `Deferred Design Debt` or `Post-Design Follow-up` above.
