# PHASE 8 BASELINE

## Date
2026-08-14

## Repository snapshot
- Next.js: 14.2.15
- React: 18.3.1
- App Router: enabled
- Web app: apps/web
- API app: apps/api
- Monorepo: pnpm workspaces

## Commands run
1. `cd /workspaces/castaminofen-starter && pnpm lint`
2. `cd /workspaces/castaminofen-starter && pnpm test:web`
3. `cd /workspaces/castaminofen-starter && pnpm --filter @castaminofen/web build`
4. `cd /workspaces/castaminofen-starter && pnpm test:e2e`
5. `cd /workspaces/castaminofen-starter && pnpm exec playwright test apps/web/e2e/smoke.spec.ts --project=chromium`

## Results
### Lint
Passed with one non-blocking warning:
- `apps/web/src/features/onboarding/components/WelcomeScreen.test.tsx`
- Warning: `next/image` recommendation for an `<img>` element

### Unit tests
Passed:
- 60 test files
- 222 tests passed

### Web production build
Passed:
- Next.js production compile succeeded
- static generation completed for 19 routes
- no fatal build errors

### E2E
Not yet executable in this environment because Playwright browsers were not installed.
Observed error:
- `browserType.launch: Executable doesn't exist ... /home/codespace/.cache/ms-playwright/...`

Required remediation:
- `cd /workspaces/castaminofen-starter && pnpm exec playwright install`

## Environment assumptions
- Playwright installation has not run in this devcontainer yet.
- The repository itself is healthy enough to lint and build, but browser-based tests are blocked by missing local test assets rather than application code failures.
- The web app remains Persian-first and RTL-first by default, with no locale-aware routing support in place before this Phase 8 change.

## Summary
The baseline is green for lint, unit tests, and web build. The only active blocker for E2E validation in this environment is missing Playwright browser binaries, not a failing app implementation.
