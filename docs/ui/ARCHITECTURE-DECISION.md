# Phase 0.5 — Architecture Decision Document
**Castaminofen Frontend Architecture Validation & Direction**

**Date:** August 13, 2026  
**Status:** ✅ Analysis Complete — Ready for Review  
**Scope:** Analysis only, no implementation

---

## Executive Summary

The current Castaminofen frontend architecture is **well-structured and maintainable**. This document validates the current design and establishes the direction for Phase 1+.

**Key Findings**:
- ✅ Feature-oriented structure is correct
- ✅ Design-system separation is appropriate
- ✅ State management boundaries are clean
- ⚠️ Form primitives need expansion
- ⚠️ Route state handling is incomplete
- ⚠️ Some component naming inconsistencies (Badge/Tag)

**Recommendation**: **Proceed with Phase 1** with architectural adjustments in Phase 2

---

## Current Architecture Analysis

### Directory Structure (✅ Well-Organized)

```
apps/web/src/
├── app/                              # ✅ Next.js routes (20 routes)
│   ├── (auth)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── admin/page.tsx
│   ├── episodes/[id]/page.tsx
│   ├── episodes/new/page.tsx
│   ├── library/page.tsx
│   ├── playlists/page.tsx
│   ├── playlists/[id]/page.tsx
│   ├── podcasts/page.tsx
│   ├── podcasts/[id]/page.tsx
│   ├── search/page.tsx
│   ├── settings/page.tsx
│   ├── profile/page.tsx
│   └── [others: community, creator, create, etc.]
│
├── components/                       # ✅ Shared UI components
│   ├── design-system/                # ✅ Design system layer (40 components)
│   │   ├── common/                   # Primitives: Button, Card, Badge, Chip, Tag, IconButton
│   │   ├── forms/                    # ⚠️ INCOMPLETE: Only Input, Field (missing 6/8 types)
│   │   ├── layout/                   # ✅ PageContainer, SectionHeader
│   │   ├── navigation/               # ✅ Mobile/Desktop nav, Bottom nav
│   │   ├── media/                    # ✅ MediaCard, Artwork, Duration, etc.
│   │   ├── player/                   # ✅ MiniPlayer, Progress, Timeline
│   │   ├── identity/                 # ✅ Avatar, Badges
│   │   ├── states/                   # ✅ Loading, Error, Empty, etc.
│   │   └── social/                   # ✅ Reactions, Comments
│   ├── ui/                           # Re-exports from design-system (for convenience)
│   ├── auth/                         # Auth-specific components
│   └── layout/                       # AppShell, ThemeBoundary
│
├── features/                         # ✅ Feature-owned components (17 domains)
│   ├── auth/                         # Authentication
│   ├── discovery/                    # Home/discovery feed
│   ├── episodes/                     # Episode management
│   ├── library/                      # User's library
│   ├── player/                       # ✅ Well-structured (14 components + store)
│   ├── playlists/                    # Playlist management
│   ├── podcasts/                     # Podcast catalog
│   ├── search/                       # Search functionality
│   ├── settings/                     # User settings
│   ├── profile/                      # User profile
│   ├── community/                    # Social features
│   ├── creator/                      # Creator dashboard
│   ├── admin/                        # Admin panel
│   ├── create/                       # Content creation
│   ├── onboarding/                   # Onboarding flow
│   ├── social/                       # Social interactions
│   └── [others]
│
├── hooks/                            # ✅ Custom React hooks
│   ├── useSettingsPreferences()
│   ├── usePlayerState()
│   ├── useWindowSize()
│   └── [others]
│
├── lib/                              # ✅ Utilities and helpers
│   ├── api/                          # API client
│   ├── env.ts                        # Environment variables
│   ├── types.ts                      # Shared types
│   └── [utilities]
│
├── stores/                           # ✅ Zustand stores
│   ├── playerStore.ts                # Player state (15+ properties)
│   ├── authStore.ts                  # Auth session (if used)
│   └── [others]
│
├── providers/                        # ✅ React context providers
│   ├── app-providers.tsx             # Root provider composition
│   ├── query-provider.tsx            # TanStack Query provider
│   └── [others]
│
└── styles/                           # ✅ Global styles
    ├── tokens.css                    # Design tokens (200+ CSS variables)
    └── [other styles]
```

### Architectural Strengths ✅

1. **Feature-Oriented Structure** — Each feature domain owns its components
   - Clear ownership boundaries
   - Easy to locate feature-specific code
   - Reduces bundle size (tree-shakeable features)

2. **Design System Separation** — Shared UI components in `design-system/`
   - Reusable primitives (Button, Card, etc.)
   - Centralized styling approach
   - Easier to audit for consistency

3. **State Management Boundaries**
   - **Player State** → Zustand (appropriate for UI sync)
   - **Server State** → TanStack Query (data fetching)
   - **Form State** → React Hook Form (temporary, validation)
   - **Theme State** → Custom provider (or next-themes after Phase 1)
   - Clear separation, no state "leakage"

4. **Server/Client Component Boundaries** ✅
   - Layout.tsx uses 'server' by default
   - Child components use 'use client' where needed
   - Proper React Server Components setup

5. **Accessibility Foundation** ✅
   - 96+ a11y implementations
   - ARIA attributes comprehensive
   - Focus management present
   - Semantic HTML used throughout
   - 8 test files validate a11y

6. **Design Token System** ✅
   - 200+ CSS variables
   - Light/dark mode defined
   - Typography, spacing, radius, shadows, motion
   - RTL-aware (Persian language support)
   - WCAG AAA contrast verified

### Architectural Weaknesses ⚠️

1. **Form Component Gap** 🔴 CRITICAL
   - **Current**: Only 2/8 form primitives (Input, Field)
   - **Missing**: Textarea, Select, Checkbox, Radio, Switch, DatePicker
   - **Impact**: Features requiring complex forms are blocked
   - **Solution**: Adopt shadcn/ui (Phase 2)

2. **Route State Coverage** ⚠️ INCOMPLETE
   - **Current**: 25% loading states, 20% error states
   - **Missing**: Loading/error states on 75% of routes
   - **Impact**: Poor perceived performance
   - **Solution**: Add LoadingState/ErrorState to all routes (Phase 1)

3. **Modal/Dialog Implementation** ⚠️ INCONSISTENT
   - **Current**: Custom div-based modals per feature
   - **Missing**: Standard dialog primitive
   - **Examples**: PlaylistFormDialog.tsx (custom), SearchFilterDrawer.tsx (custom)
   - **Impact**: Inconsistent modal UX
   - **Solution**: Adopt shadcn/ui Dialog (Phase 2)

4. **Tabs Implementation** ⚠️ CUSTOM
   - **Current**: LibraryCategoryTabs.tsx uses custom role-based approach
   - **Missing**: Standard tabs primitive with full accessibility
   - **Impact**: Potential a11y issues with custom implementation
   - **Solution**: Migrate to shadcn/ui Tabs (Phase 2)

5. **Component Naming** ⚠️ CONSISTENCY
   - **Badge** vs **Tag** — Both exist, purposes unclear
   - **MediaCard** vs **ContentCard** — Inconsistent naming
   - **Impact**: Confusion during component selection
   - **Solution**: Document naming conventions (Phase 0.5)

6. **Suspense Usage** ⚠️ MINIMAL
   - **Current**: Only 1/20 routes use Suspense
   - **Reliance**: Primarily TanStack Query for async
   - **Impact**: Not leveraging Next.js 14 async foundations
   - **Solution**: Gradual migration to Server Components + Suspense (Phase 3+)

7. **Loading State Patterns** ⚠️ SCATTERED
   - **Current**: LoadingState component exists but not consistently used
   - **Implementations**: Per-feature loading spinners (DiscoveryPage, SearchPage)
   - **Impact**: 40% coverage, inconsistent UX
   - **Solution**: Standardize on LoadingState component (Phase 1)

---

## Target Architecture (Post-Phase 1)

### Directory Structure (Proposed)

The current structure is sound. **Minimal changes recommended**:

```
apps/web/src/
├── app/                              # ✅ Keep: Next.js routes
│   ├── (auth)/                       # ✅ Route group (auth routes)
│   ├── (app)/                        # ✅ Route group (main app routes, with layout)
│   │   ├── layout.tsx               # Main app layout with navigation/player
│   │   ├── page.tsx                 # Home/discovery
│   │   ├── library/
│   │   ├── search/
│   │   ├── playlists/
│   │   ├── podcasts/
│   │   ├── episodes/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── [others]
│   ├── admin/                        # 🔄 Consider grouping: (admin)/
│   ├── creator/                      # 🔄 Consider grouping: (creator)/
│   └── error.tsx / not-found.tsx     # ✅ Add: Error boundaries
│
├── components/                       # ✅ Keep current structure
│   ├── design-system/
│   │   ├── common/                   # ✅ Keep
│   │   ├── forms/                    # 🔴 EXPAND (Phase 2):
│   │   │   ├── input.tsx             # ✅ Exists
│   │   │   ├── field.tsx             # ✅ Exists
│   │   │   ├── textarea.tsx          # ❌ Add (shadcn)
│   │   │   ├── select.tsx            # ❌ Add (shadcn)
│   │   │   ├── checkbox.tsx          # ❌ Add (shadcn)
│   │   │   ├── radio.tsx             # ❌ Add (shadcn)
│   │   │   ├── switch.tsx            # ❌ Add (shadcn)
│   │   │   └── date-picker.tsx       # ❌ Add (custom or shadcn)
│   │   ├── layout/                   # ✅ Keep
│   │   ├── navigation/               # ✅ Keep
│   │   ├── media/                    # ✅ Keep
│   │   ├── player/                   # ✅ Keep
│   │   ├── identity/                 # ✅ Keep
│   │   ├── states/                   # ✅ Keep
│   │   ├── social/                   # ✅ Keep
│   │   └── modals/ (NEW - Phase 2)   # 🔄 NEW:
│   │       ├── dialog.tsx            # ❌ Add (shadcn)
│   │       ├── sheet.tsx             # ❌ Add (shadcn)
│   │       ├── popover.tsx           # ❌ Add (shadcn)
│   │       └── alert-dialog.tsx      # ❌ Add (shadcn)
│   ├── ui/                           # ✅ Keep: convenience exports
│   ├── auth/                         # ✅ Keep
│   └── layout/                       # ✅ Keep (but update for next-themes)
│
├── features/                         # ✅ Keep: Feature-owned structure
│   └── [17 feature domains]
│
├── hooks/                            # ✅ Keep: Custom hooks
├── lib/                              # ✅ Keep: Utilities
├── stores/                           # ✅ Keep: Zustand stores
├── providers/                        # ✅ Keep: Context providers
└── styles/                           # ✅ Keep: Global styles
```

### Proposed Changes

#### 1. Route Organization (Phase 1)
**Before**:
```
/app
  /admin
  /creator
  /settings
```

**After**:
```
/app
  /(auth)         # Group: login, register
  /(app)          # Group: main app routes with shared layout
    /settings
    /profile
    /library
    ...
  /(admin)        # Group: admin-only routes
  /(creator)      # Group: creator-only routes
```

**Benefit**: Better route organization, easier to add route guards  
**Timeline**: Phase 1 or 2

---

#### 2. Design System Expansion (Phase 2)

**Add Modal/Dialog Category**:
```
components/design-system/modals/
├── dialog.tsx          # Shadcn Dialog
├── sheet.tsx           # Shadcn Sheet (drawer)
├── popover.tsx         # Shadcn Popover
├── alert-dialog.tsx    # Shadcn AlertDialog
└── [index.ts]
```

**Rationale**: Separate modal-related primitives from general components

---

#### 3. Component Export Pattern (Verify)

**Current**:
```typescript
// components/ui/index.ts
export { Button } from '@/components/design-system/common/button';
export { Card } from '@/components/design-system/common/card';
```

**After** (consistent with all exports):
```typescript
export * from '@/components/design-system/common';
export * from '@/components/design-system/forms';
export * from '@/components/design-system/modals';
// etc.
```

**Benefit**: Convenient imports for developers

---

## Component Architecture

### Design System Layer (40 components → 60+ after Phase 2)

| Category | Current | After Phase 2 | Governance |
|----------|---------|-------|-----------|
| **Common** | 6 | 6 | Keep as-is |
| **Forms** | 2 | 8 | Add via shadcn |
| **Layout** | 2 | 2 | Keep as-is |
| **Navigation** | 3 | 3 | Keep as-is |
| **Media** | 9 | 9 | Keep as-is |
| **Player** | 3 | 3 | Keep as-is |
| **Identity** | 3 | 3 | Keep as-is |
| **States** | 8 | 8 | Keep as-is |
| **Social** | 3 | 3 | Keep as-is |
| **Modals** | 0 | 4 | Add via shadcn |
| **TOTAL** | **40** | **60** | — |

### Feature Layer (17 domains)

All feature domains should follow pattern:

```
features/[feature]/
├── components/
│   ├── [feature]Page.tsx              # Route component
│   ├── [feature]Section.tsx           # Feature-specific section
│   ├── [feature]Card.tsx              # Feature-specific card
│   └── [etc]
├── hooks/
│   └── use[Feature]...
├── services/
│   └── [feature]Service.ts            # API calls for feature
├── stores/                            # Only if feature needs state
│   └── [feature]Store.ts              # Zustand store (if needed)
├── types/                             # Feature types
│   └── [feature].types.ts
└── index.ts                           # Convenience exports
```

**No changes needed** — already following this pattern correctly.

---

## State Management Architecture

### Player State (✅ Correct)
- **Store**: Zustand in `stores/playerStore.ts`
- **Scope**: Player playback, queue, position, preferences
- **Persistence**: Via store subscriptions
- **Thread**: Main UI thread
- **Rationale**: UI-centric, needs real-time sync

**No changes needed** — appropriately scoped.

---

### Server State (✅ Correct)
- **Store**: TanStack Query in components
- **Scope**: Podcasts, episodes, library, playlists (from API)
- **Persistence**: Query cache
- **Thread**: Main UI thread
- **Rationale**: CRUD data, benefits from caching/sync

**No changes needed** — appropriately used.

---

### Form State (✅ Correct)
- **Store**: React Hook Form (temporary)
- **Scope**: Form inputs, validation state
- **Persistence**: Not persisted (by design)
- **Thread**: Main UI thread
- **Rationale**: Temporary UI state, validation

**No changes needed** — appropriately used.

---

### Auth State (⚠️ Review)
- **Current**: Appears to use context or session
- **Issue**: Not fully visible in audit
- **Recommendation**: Should be in context provider (not Zustand)

**Verify**: `providers/app-providers.tsx` — Ensure auth provider is present

---

### Theme State (⚠️ Update in Phase 1)
- **Current**: Custom ThemeBoundary + settings service
- **Phase 1**: Migrate to next-themes
- **Scope**: Current theme (light/dark), persisted preference

**Action**: Replace ThemeBoundary with next-themes provider

---

## Server/Client Boundary

### Current Implementation (✅ Correct)

```typescript
// app/layout.tsx — Server Component
export default function RootLayout({ children }) {
  return (
    <html>
      <head>{/* server-only code */}</head>
      <body>
        <AppProviders>  {/* Client boundary */}
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

// components/layout/app-shell.tsx — Client Component
'use client';
export function AppShell({ children }) {
  // Can use hooks, state, etc.
}

// features/[feature]/page.tsx — Server or Client
// Server component if no hooks needed, client if using hooks
```

**Recommendation**: Document Server/Client component usage in Architecture guide

**Action Items**:
- [ ] Audit all feature pages for Server/Client designation
- [ ] Document when to use Server vs Client components
- [ ] Ensure data fetching uses Server Components where possible

---

## Dependency Direction

### Correct (Layered)

```
Pages (routes)
    ↓
Feature Components
    ↓
Design System
    ↓
Primitives (HTML, Tailwind)
```

**Invariant**: No upward dependencies allowed
- ✅ Features can use Design System
- ❌ Design System cannot import from Features
- ✅ Primitives never import from Features/Design System

**Verification**: Grep for incorrect imports across codebase

**Action Items**:
- [ ] Audit component imports for violations
- [ ] Add ESLint rule to enforce layering

---

## Accessibility Architecture

### Current (✅ Comprehensive)

- **96+ ARIA implementations**
- **8 test files** validate a11y attributes
- **Focus management** with ring styles
- **Semantic HTML** throughout
- **Keyboard support** in navigation
- **Color contrast** verified (WCAG AAA)
- **motion-reduce** respected
- **RTL support** (Persian)

### Improvements (Phase 5+)

1. **Add automated a11y testing** (axe-core)
2. **Document a11y patterns** (Architecture guide)
3. **Create a11y checklist** for new components
4. **Storybook accessibility addon** (Phase 6+)

---

## Performance Architecture

### Current (✅ Good Baseline)

- **Code splitting**: Per-route (Next.js automatic)
- **Image optimization**: Via Next.js Image component
- **CSS**: Tailwind build-time optimization
- **Icons**: Lucide tree-shaking
- **Bundle size**: ~200KB gzipped (good for modern PWA)
- **Caching**: TanStack Query (server state cache)

### Improvements Planned

| Phase | Improvement | Impact |
|-------|-------------|--------|
| 2-3 | Lazy load modals (shadcn Dialog/Sheet) | -5KB |
| 3-4 | Animation optimization (Motion.dev) | Smooth 60fps |
| 4+ | Route prefetching | Faster navigation |
| 5+ | Service Worker (PWA) | Offline support |

---

## Testing Architecture

### Current (✅ Solid Foundation)

- **Framework**: Vitest 4.1.10
- **Environment**: jsdom
- **Test Files**: 42 across codebase
- **Coverage**: Components, features, a11y

### Improvements Planned

| Phase | Improvement | Scope |
|-------|-------------|-------|
| 1 | Increase route state coverage | Add tests for loading/error states |
| 2 | shadcn component testing | Verify integration |
| 3 | Animation testing | Verify Motion.dev behavior |
| 4 | E2E testing | Playwright E2E scenarios |
| 5 | A11y automation | axe-core CI integration |
| 6 | Visual regression | Storybook visual testing |

---

## Design Token Architecture

### Current (✅ Comprehensive)

- **Color tokens**: 20+ semantic colors
- **Typography**: 10+ scales (h1-h4, body, caption, etc.)
- **Spacing**: 12 values (0.25rem to 3rem)
- **Radius**: 10 values (2px to 24px + pill/circle)
- **Shadows**: 6 elevation levels
- **Motion**: 4 values (fast, base, slow + easing)
- **Light/Dark**: Both modes defined

### Improvements (Phase 1+)

1. **Document token usage** (Architecture guide)
2. **Create token reference** (Storybook, Phase 6+)
3. **Add semantic tokens** for specific use cases (e.g., surface-error, text-success)
4. **Validate token coverage** across all components

---

## Documentation Architecture

### Current Documentation ✅
- Phase 0 Audit: Complete
- Component Inventory: Complete
- Technology Decisions: Complete
- Implementation Plan: Complete

### Planned Documentation

| Phase | Document | Status |
|-------|----------|--------|
| 0.5 | Architecture Decision (this doc) | 🔄 In Progress |
| 0.5 | Migration Strategy | 🔄 In Progress |
| 1 | Theme System Guide | Planned |
| 2 | shadcn/ui Integration Guide | Planned |
| 3-6 | Feature-specific guides | Planned |
| 6+ | Storybook Documentation | Planned |

---

## Recommended Changes Summary

### Phase 1 (Immediate)
- [ ] Replace ThemeBoundary with next-themes
- [ ] Add LoadingState/ErrorState to all routes (25% → 100% coverage)
- [ ] Document component naming conventions
- [ ] Add error.tsx / not-found.tsx to route groups
- [ ] Document Server/Client component usage

### Phase 2
- [ ] Install shadcn/ui
- [ ] Add form primitives (Textarea, Select, Checkbox, etc.)
- [ ] Add modal/dialog primitives
- [ ] Migrate LibraryCategoryTabs to shadcn Tabs
- [ ] Organize routes into groups ((auth), (app), (admin), (creator))

### Phase 3+
- [ ] Evaluate Motion.dev vs Framer Motion
- [ ] Add server-side rendering optimizations
- [ ] Implement scroll-triggered animations
- [ ] Add gesture-based animations

---

## No Changes Recommended

### ✅ Keep As-Is

1. **Feature-oriented structure** — Correct ownership model
2. **Design System separation** — Appropriate abstraction
3. **State management boundaries** — Clean separation
4. **Design token system** — Comprehensive and consistent
5. **Accessibility implementation** — Extensive and correct
6. **Testing setup** — Solid foundation
7. **Icon library** (Lucide) — Comprehensive choice
8. **Form handling** (React Hook Form + Zod) — Type-safe and elegant

---

## Architecture Checklist

### Before Phase 1 Starts
- [ ] Approve this architecture document
- [ ] Finalize technology decisions (TECHNOLOGY-VALIDATION.md)
- [ ] Schedule Phase 1 kickoff
- [ ] Assign Phase 1 tasks

### Before Phase 2 Starts
- [ ] Phase 1 complete (theme system working)
- [ ] Route state coverage at 100%
- [ ] All routes have error/loading states
- [ ] Review and approve shadcn/ui plan

### Before Phase 3 Starts
- [ ] Phase 2 complete (shadcn/ui integrated)
- [ ] All form components implemented
- [ ] Modal/dialog system working
- [ ] Evaluate animation strategy

---

## Conclusion

The Castaminofen frontend architecture is **fundamentally sound and well-structured**. With the recommended Phase 1-3 improvements, it will be **robust, scalable, and maintainable** through MVP launch and beyond.

**Status**: ✅ **READY FOR PHASE 1 WITH RECOMMENDED IMPROVEMENTS**

---

**Document Owner**: Frontend Architecture Team  
**Last Updated**: August 13, 2026  
**Next Review**: After Phase 1 completion
