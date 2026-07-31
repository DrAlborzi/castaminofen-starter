# FOUNDATION.AUTH.1 — Auth Runtime Stabilization & Routing Alignment

## Changes Made

- Connected the root route to the existing onboarding experience so unauthenticated visitors now see the welcome screen instead of Discovery.
- Tightened the auth decision logic so the home route treats a resolved session as authenticated even if the Zustand store is still catching up.
- Simplified the protected-route guard to rely on a single resolved-auth state path and avoid the previous race between React Query and Zustand.
- Kept the login/register flows intact while ensuring successful auth resolves the user state consistently for protected routing.

## Files Changed

- [apps/web/src/app/page.tsx](apps/web/src/app/page.tsx)
- [apps/web/src/app/home-page-mode.ts](apps/web/src/app/home-page-mode.ts)
- [apps/web/src/features/auth/components/ProtectedRoute.tsx](apps/web/src/features/auth/components/ProtectedRoute.tsx)
- [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts)
- [apps/web/src/app/page.test.ts](apps/web/src/app/page.test.ts)

## Auth Flow Before

1. User submits login/register.
2. Auth API returns a token and profile fetch begins.
3. Form component updates Zustand directly.
4. Protected routes depend on both React Query session state and Zustand auth state.
5. During the handoff window, the guard can still reject the session as unauthenticated.

## Auth Flow After

1. User submits login/register.
2. Auth API returns a token and the session resolves through the existing auth helper.
3. The auth hook syncs the resolved session into Zustand.
4. Protected routes evaluate a single resolved-auth state path.
5. Successful auth is accepted immediately for the protected experience.

## Redirect Behavior Before/After

### Before

- Root route rendered Discovery for anonymous visitors.
- The root experience and onboarding were disconnected.
- Protected routes mixed multiple auth signals and could redirect too early.

### After

- Root route shows onboarding for unauthenticated visitors.
- Authenticated users continue to be routed into the authenticated experience.
- Protected routes wait for the resolved auth state and only redirect once the session is clearly unavailable.

## Validation Results

- Regression test for home-route auth alignment passed.
- Web lint completed successfully with only the existing onboarding test warning from the project baseline.
- Full project build completed successfully.

## Remaining Risks

- The current auth model remains client-side and route-based; this phase stabilizes runtime behavior without introducing a new architecture.
- Full end-to-end browser validation of sign-up/login/logout flows should still be exercised in a local browser session for final UX confirmation.
