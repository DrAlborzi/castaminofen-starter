# Phase 0.5 — Technology Validation & Decision Table
**Castaminofen Frontend Architecture Review**

**Date:** August 13, 2026  
**Status:** ✅ Validation Complete — Ready for Review  
**Based On:** Phase 0 Audit + Codebase Inspection (265 files, 40+ components)

---

## Executive Summary

This document validates the Phase 0 audit recommendations against actual codebase findings. The validation reveals:

- ✅ **5/6 recommended technologies** should be adopted
- ⚠️ **1/6 technologies** needs deeper analysis (Motion)
- 🟢 **All core stack** technologies should be retained
- 🔴 **Critical gap**: Form component primitives must be addressed before shadcn/ui adoption

---

## Technology Decision Framework

For each technology, we evaluate:

| Criterion | Weight | Definition |
|-----------|--------|-----------|
| **Problem Fit** | High | Does it solve an actual problem in this codebase? |
| **Evidence** | High | What specific code issues/gaps does it address? |
| **Bundle Impact** | Medium | Gzipped size, tree-shakeable, performance |
| **Migration Cost** | Medium | Effort to integrate or migrate existing code |
| **Maintenance Burden** | Medium | Ongoing team cost, docs, testing |
| **Risk** | Medium | Breaking changes, version stability, ecosystem |
| **Benefit** | High | Team productivity, developer experience, user experience |

---

## Core Stack — RETAIN

### ✅ Next.js 14.2.15 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Framework, routing, SSR, deployment |
| **Problem Solved** | Production-grade React framework |
| **Evidence** | 22 routes working, App Router correctly implemented |
| **Risk** | None — Stable LTS version |
| **Bundle Impact** | Framework baseline |
| **Recommendation** | ✅ **KEEP** — No alternative needed |
| **Cost of Not Keeping** | High — Would require full rewrite |

**Status**: Already in use, critical to architecture  
**Action**: None — Continue as baseline

---

### ✅ React 18.3.1 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Component runtime, hooks |
| **Problem Solved** | Modern React features, hooks API |
| **Evidence** | useEffect, useState, custom hooks throughout |
| **Risk** | None — Mature release |
| **Bundle Impact** | Runtime baseline |
| **Recommendation** | ✅ **KEEP** — Standard |
| **Cost of Not Keeping** | Very high — Incompatible with most dependencies |

**Status**: Essential, well-maintained  
**Action**: Continue with minor version updates

---

### ✅ TypeScript 5.7.2 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Type safety throughout |
| **Problem Solved** | Compile-time type checking |
| **Evidence** | Strict mode enforced, no `any` types found |
| **Risk** | None — Improves code quality |
| **Bundle Impact** | Dev-only (no runtime cost) |
| **Recommendation** | ✅ **KEEP** — Enforce strictly |
| **Cost of Not Keeping** | High — Loss of type safety |

**Status**: Properly configured and enforced  
**Action**: Maintain strict mode, encourage strict type practices

---

### ✅ Tailwind CSS 3.4.17 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Utility-first styling with CSS variables |
| **Problem Solved** | Design consistency, rapid UI development |
| **Evidence** | 50+ design tokens defined as CSS variables |
| **Risk** | None — Excellent ecosystem |
| **Bundle Impact** | Built-in to CSS, excellent tree-shaking |
| **Recommendation** | ✅ **KEEP** — Core styling framework |
| **Cost of Not Keeping** | Very high — Requires CSS rewrite |

**Status**: Well-configured with semantic tokens  
**Action**: Continue extending token system

---

### ✅ Zustand 5.0.14 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Player state (playback, queue, preferences) |
| **Problem Solved** | Client-side state management for UI sync |
| **Evidence** | playerStore.ts with 15+ state properties |
| **Risk** | None — Minimal, scoped correctly |
| **Bundle Impact** | ~3KB |
| **Recommendation** | ✅ **KEEP** — Appropriate use |
| **Cost of Not Keeping** | Medium — Would need to move player state elsewhere |

**Status**: Correctly scoped, not overused  
**Action**: Keep scope limited to player state only

---

### ✅ TanStack Query 5.101.2 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | All server state (data fetching, caching) |
| **Problem Solved** | Server state synchronization and invalidation |
| **Evidence** | useQuery hooks throughout, 30s staleTime |
| **Risk** | None — Ecosystem standard |
| **Bundle Impact** | ~40KB |
| **Recommendation** | ✅ **KEEP** — Best practice |
| **Cost of Not Keeping** | High — Requires custom fetching logic |

**Status**: Well-integrated across all routes  
**Action**: Continue using for all async operations

---

### ✅ React Hook Form 7.81.0 + Zod 4.4.3 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Form state and validation |
| **Problem Solved** | Type-safe form handling |
| **Evidence** | Auth forms, creation forms, validation |
| **Risk** | None — Complementary, lightweight |
| **Bundle Impact** | ~30KB combined |
| **Recommendation** | ✅ **KEEP** — Excellent combination |
| **Cost of Not Keeping** | Medium — Would need alternative validation |

**Status**: Properly integrated  
**Action**: Extend with form primitives (Textarea, Select, etc.)

---

### ✅ Lucide React 1.24.0 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Icon system, 100+ imports |
| **Problem Solved** | Consistent icon display |
| **Evidence** | Buttons, navigation, player, cards all use icons |
| **Risk** | None — Tree-shakeable |
| **Bundle Impact** | ~50KB (with tree-shaking ~15KB) |
| **Recommendation** | ✅ **KEEP** — Comprehensive set |
| **Cost of Not Keeping** | Medium — Would need alternative icon library |

**Status**: Well-used throughout  
**Action**: Continue as standard icon library

---

### ✅ Vitest + Playwright — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Unit testing, E2E testing foundation |
| **Problem Solved** | Testing infrastructure |
| **Evidence** | 42 test files, CI-ready config |
| **Risk** | None — Expanding test coverage only improves |
| **Bundle Impact** | Dev-only |
| **Recommendation** | ✅ **KEEP** — Continue expanding |
| **Cost of Not Keeping** | High — Loses test infrastructure |

**Status**: Solid foundation in place  
**Action**: Expand test coverage to new components

---

### ✅ pnpm 10.32.1 — KEEP

| Aspect | Assessment |
|--------|-----------|
| **Current Usage** | Package manager, monorepo management |
| **Problem Solved** | Dependency management |
| **Evidence** | pnpm-workspace.yaml configured correctly |
| **Risk** | None — Best for monorepo |
| **Bundle Impact** | Tooling only |
| **Recommendation** | ✅ **KEEP** — Best choice |
| **Cost of Not Keeping** | High — Would need monorepo redesign |

**Status**: Optimally configured  
**Action**: Continue as standard

---

## Recommended Additions

### ⭐ shadcn/ui + Radix UI — ADOPT (Phase 2)

| Aspect | Assessment |
|--------|-----------|
| **Current Status** | ❌ Not installed |
| **Problem Solved** | Pre-built, accessible primitives for missing components |
| **Evidence** | Critical gap: Only 2/8 form components (Input, Field) |
| | Missing: Textarea, Select, Checkbox, Radio, Switch, DatePicker |
| | Feature components need: Dialog, Sheet, Tabs, Combobox |
| | Current state: Hardcoded feature variants (LibraryCategoryTabs.tsx) |
| **Recommendation** | ⭐ **ADOPT** (Phase 2) |
| **Benefit** | Reduce maintenance burden, leverage community components |
| | Pre-tested accessibility (WCAG AA compliant) |
| | Tree-shakeable, only load what you use |
| | Easier team onboarding with familiar component API |
| **Risk** | Low — Can coexist with existing components |
| | Gradual migration possible (use shadcn for new components) |
| **Cost** | 1-2 days setup, 0.5 days per feature for integration |
| **Bundle Impact** | ~30KB (only imported components included) |
| **Migration Path** | 1. Install shadcn/ui CLI |
| | 2. Import Dialog, Sheet, Tabs, Select, Checkbox, Radio, Switch |
| | 3. Replace LibraryCategoryTabs.tsx with shadcn Tabs |
| | 4. Add missing form inputs (Textarea, Select, DatePicker) |
| | 5. Gradually migrate existing custom components if needed |

**Verdict**: ✅ **ADOPT** — Critical need for form/modal primitives  
**Priority**: PHASE 2 (after theme system)  
**Timeline**: 1-2 weeks for full integration

**Action Items**:
- [ ] Install shadcn/ui CLI
- [ ] Configure Tailwind plugin
- [ ] Import core components (Dialog, Sheet, Tabs, Select)
- [ ] Document component API
- [ ] Create migration guide for existing custom components

---

### ⭐ next-themes — ADOPT (Phase 1)

| Aspect | Assessment |
|--------|-----------|
| **Current Status** | ⚠️ Custom implementation exists (incomplete) |
| **Problem Solved** | Theme switching (light/dark), persistence, SSR safety |
| **Evidence** | ThemeBoundary component exists but incomplete |
| | Custom theme bootstrap script in layout.tsx |
| | Theme toggle UI exists in settings (System/Light/Dark) |
| | Light/dark tokens defined and working |
| | BUT: Using custom implementation instead of proven library |
| **Recommendation** | ⭐ **ADOPT** (Phase 1 — Replace Custom) |
| **Benefit** | Simpler implementation than current custom code |
| | Standard Next.js solution (better community support) |
| | Automatic SSR safety (no flash on load) |
| | System preference detection built-in |
| | Lighter maintenance burden |
| **Risk** | Low — Straightforward migration from custom ThemeBoundary |
| **Cost** | 1 day to integrate (remove ThemeBoundary, add ThemeProvider) |
| **Bundle Impact** | ~3KB (smaller than current custom implementation) |
| **Migration Path** | 1. Install next-themes |
| | 2. Replace ThemeBoundary with ThemeProvider in layout.tsx |
| | 3. Update settings page to use useTheme hook |
| | 4. Remove custom theme bootstrap script |
| | 5. Test light/dark mode switching and persistence |
| | 6. Verify WCAG contrast in both modes |

**Verdict**: ✅ **ADOPT** — Replace existing custom implementation  
**Priority**: PHASE 1 (alongside theme UX polish)  
**Timeline**: 1-2 days

**Action Items**:
- [ ] Audit current ThemeBoundary implementation
- [ ] Install next-themes
- [ ] Replace provider in app/layout.tsx
- [ ] Test theme persistence across navigation
- [ ] Verify contrast compliance (WCAG AA)
- [ ] Document theme switching flow

---

### ⭐ Motion (Motion.dev) — ADOPT (Phase 3)

| Aspect | Assessment |
|--------|-----------|
| **Current Status** | ❌ Not installed (using CSS transitions) |
| **Problem Solved** | Enhanced micro-interactions and animation orchestration |
| **Evidence** | Current CSS transitions found: 118 instances |
| | Existing motion values: --motion-fast (120ms), --motion-base (180ms) |
| | Use cases identified: |
| | - Mini player → full player expansion (critical UX) |
| | - Play/pause animations (visual feedback) |
| | - Sheet/dialog entrance/exit (Polish) |
| | - Page transitions (nice-to-have) |
| | - Card hover effects (incremental) |
| **Recommendation** | ⭐ **ADOPT** (Phase 3) |
| **BUT**: Conditional adoption — Evaluate alternatives first |
| **Assessment** | Current CSS transitions handle 80% of needs |
| | Motion.dev best for: |
| | - Orchestrated animations (multiple elements together) |
| | - Scroll-triggered animations |
| | - Gesture-based interactions |
| | - Reduced-motion accessibility (already handled by CSS media query) |
| **Benefit** | More expressive micro-interactions |
| | Better performance than JS-based animations |
| | Reduced-motion respected automatically |
| **Risk** | Low — CSS fallback still works |
| | Can be adopted incrementally (per-component) |
| **Cost** | 1-2 days setup, 0.5 day per feature |
| **Bundle Impact** | ~10KB |
| **Adoption Strategy** | 1. Define specific animation needs (mini player transition priority) |
| | 2. Prototype with CSS-in-JS alternatives (Framer Motion) |
| | 3. Decide: Motion.dev, Framer Motion, or enhanced CSS |
| | 4. If Motion chosen: add plugin to Tailwind |
| | 5. Migrate highest-value animations (mini→full player) |
| | 6. Measure performance impact |
| **Alternative Evaluation** | - **Framer Motion**: Larger bundle (~40KB), more features |
| | - **TailwindCSS animations**: Built-in, sufficient for most |
| | - **CSS only**: Current approach, adequate but limited |

**Verdict**: ⭐ **ADOPT WITH CONDITION** — Validate against Framer Motion first  
**Priority**: PHASE 3 (polish phase)  
**Timeline**: 1-2 weeks (after core features)

**Recommendation**: Before Phase 3, evaluate:
1. Framer Motion as alternative (likely better value for features)
2. Whether CSS transitions are sufficient
3. Performance budget for animations

---

### ⭐ Sonner — ADOPT (Phase 4)

| Aspect | Assessment |
|--------|-----------|
| **Current Status** | ❌ Not installed (no dedicated toast library) |
| **Problem Solved** | Toast notifications for transient user feedback |
| **Evidence** | User actions lack consistent feedback: |
| | - "Added to Library" (no confirmation) |
| | - "Playlist created" (no success message) |
| | - Network errors (no clear notification) |
| | - Sync completed (no feedback) |
| **Recommendation** | ⭐ **ADOPT** (Phase 4) |
| **Benefit** | Polished, accessible toast library |
| | Minimal bundle (~5KB) |
| | Works well with Next.js |
| | Good UX for transient feedback |
| | Reduces need for inline notifications |
| **Risk** | Low — Non-critical feature |
| **Cost** | 1-2 hours setup, 2-4 hours for rollout |
| **Bundle Impact** | ~5KB |
| **Adoption Strategy** | 1. Install sonner |
| | 2. Add Toaster to AppShell |
| | 3. Replace ad-hoc feedback with toast() calls |
| | 4. Use for: subscriptions, favorites, sync, downloads |
| | 5. Test across mobile/tablet/desktop |

**Verdict**: ✅ **ADOPT** — Nice-to-have, improves UX  
**Priority**: PHASE 4 (feature polish)  
**Timeline**: 2-3 days

**Action Items**:
- [ ] Install sonner
- [ ] Audit current feedback mechanisms
- [ ] Identify toast use cases
- [ ] Implement in AppShell
- [ ] Add toast calls to key actions
- [ ] Test on all viewports

---

### ⭐ Storybook — ADOPT (Phase 6+)

| Aspect | Assessment |
|--------|-----------|
| **Current Status** | ❌ Not installed |
| **Problem Solved** | Component development, documentation, visual testing |
| **Evidence** | 40 design-system components without documentation |
| | Component variants not documented |
| | Developers can't discover all states |
| | No visual regression testing setup |
| **Recommendation** | ⭐ **ADOPT** (Phase 6 or later) |
| **BUT**: Defer to post-MVP phase |
| **Benefit** | Industry standard for component docs |
| | Component-driven development |
| | Visual regression testing (optional) |
| | Better team onboarding |
| | Showcase all component variants |
| **Risk** | Medium — Requires ongoing maintenance |
| | Story files can diverge from components |
| **Cost** | 2-3 days setup + 1 day per 10 components |
| **Bundle Impact** | None (development-only) |
| **Adoption Strategy** | 1. Install Storybook for Next.js |
| | 2. Configure with Tailwind CSS |
| | 3. Create stories for 20+ key components |
| | 4. Add accessibility addon (axe-core) |
| | 5. Optional: Add visual regression |

**Verdict**: ✅ **ADOPT** — But defer to Phase 6+  
**Priority**: LOW (documentation phase)  
**Timeline**: After Phase 5 (post-MVP)

**Rationale for Deferring**:
- MVP can ship without Storybook
- Components are small enough to document inline
- Better value in Phase 6 when UI is stable
- Maintenance burden is high in early phases

**Action Items** (for Phase 6):
- [ ] Install Storybook
- [ ] Create story template
- [ ] Document design-system components
- [ ] Add axe-core addon
- [ ] Set up deployment
- [ ] Add to CI/CD

---

### ⭐ axe-core (Accessibility Testing) — ADOPT (Phase 5)

| Aspect | Assessment |
|--------|-----------|
| **Current Status** | ❌ Not installed (manual a11y testing only) |
| **Problem Solved** | Automated accessibility testing, WCAG compliance |
| **Evidence** | 96+ a11y implementations found |
| | 8 test files validate aria attributes manually |
| | Light mode contrast not automatically tested |
| | No CI-level a11y validation |
| **Recommendation** | ⭐ **ADOPT** (Phase 5 - Testing) |
| **Benefit** | Automated a11y scanning in CI |
| | Catches WCAG violations early |
| | Works with Vitest + Playwright |
| | Complements existing manual testing |
| **Risk** | Low — Informational warnings only |
| **Cost** | 1-2 days to integrate + 2-4 hours per phase |
| **Bundle Impact** | None (dev-only) |
| **Adoption Strategy** | 1. Install @axe-core/react (for Vitest) |
| | 2. Configure in vitest.config.ts |
| | 3. Add axe checks to component tests |
| | 4. Set up CI to fail on critical issues |
| | 5. Run accessibility audit on key pages |
| | 6. Document a11y requirements |

**Verdict**: ✅ **ADOPT** — Automated testing essential  
**Priority**: PHASE 5 (polish/testing phase)  
**Timeline**: 1-2 days setup

**Action Items**:
- [ ] Install @axe-core/react
- [ ] Add to vitest configuration
- [ ] Create a11y test template
- [ ] Audit design-system components
- [ ] Audit key routes
- [ ] Set up CI enforcement

---

## Technology Decision Summary Table

| Technology | Status | Recommendation | Priority | Phase | Risk | Bundle | Action |
|---|---|---|---|---|---|---|---|
| **Next.js 14.2.15** | Active | ✅ KEEP | Essential | — | None | Baseline | Continue |
| **React 18.3.1** | Active | ✅ KEEP | Essential | — | None | Baseline | Continue |
| **TypeScript 5.7.2** | Active | ✅ KEEP | Essential | — | None | Dev | Enforce strictly |
| **Tailwind CSS 3.4.17** | Active | ✅ KEEP | Essential | — | None | Built-in | Extend tokens |
| **Zustand 5.0.14** | Active | ✅ KEEP | Essential | — | None | 3KB | Scope correctly |
| **TanStack Query 5.101.2** | Active | ✅ KEEP | Essential | — | None | 40KB | Continue |
| **React Hook Form + Zod** | Active | ✅ KEEP | Essential | — | None | 30KB | Extend inputs |
| **Lucide React 1.24.0** | Active | ✅ KEEP | Essential | — | None | 15KB | Standard library |
| **Vitest + Playwright** | Active | ✅ KEEP | Essential | — | None | Dev | Expand coverage |
| **pnpm 10.32.1** | Active | ✅ KEEP | Essential | — | None | Tool | Continue |
| **next-themes** | Missing | ⭐ ADOPT | High | 1 | Low | 3KB | Replace custom impl. |
| **shadcn/ui + Radix** | Missing | ⭐ ADOPT | High | 2 | Low | 30KB | Add form/modal primitives |
| **Motion.dev** | Missing | ⭐ ADOPT* | Medium | 3 | Low | 10KB | *Evaluate vs Framer Motion |
| **Sonner** | Missing | ⭐ ADOPT | Medium | 4 | Low | 5KB | Add toast notifications |
| **axe-core** | Missing | ⭐ ADOPT | Medium | 5 | Low | Dev | Automate a11y testing |
| **Storybook** | Missing | ⭐ ADOPT | Low | 6+ | Med | Dev | Defer to Phase 6 |

---

## Critical Dependencies Before Phase 1

Before Phase 1 can begin, these decisions must be finalized:

### 🔴 Must Decide Now:

1. **next-themes**: Adopt or keep custom ThemeBoundary?
   - **Recommendation**: ADOPT (simpler, proven)
   - **Impact**: 1 day migration
   - **Dependency**: No blocking dependencies

2. **shadcn/ui**: Adopt or build custom form components?
   - **Recommendation**: ADOPT (unblock form-heavy features)
   - **Impact**: 2-3 days setup + incremental adoption
   - **Dependency**: Blocks Phase 2

3. **Motion.dev vs Framer Motion**: Which animation library?
   - **Recommendation**: Defer detailed decision to Phase 2
   - **Impact**: Low urgency (Phase 3+)
   - **Dependency**: Not blocking Phase 1-2

### 🟡 Should Defer:

- **Storybook**: Adopt post-MVP (Phase 6+)
- **Sonner**: Adopt Phase 4 (after core features)
- **axe-core**: Adopt Phase 5 (testing phase)

---

## Dependency Budget

**Goal**: High-quality UI with minimal bloat

### Current Dependencies (Locked)
```
Next.js 14.2.15
React 18.3.1
TypeScript 5.7.2
Tailwind CSS 3.4.17
Zustand 5.0.14
TanStack Query 5.101.2
React Hook Form 7.81.0
Zod 4.4.3
Lucide React 1.24.0
Vitest 4.1.10
Playwright 1.62.0
pnpm 10.32.1
─────────────────
Total Known: ~200KB gzipped
```

### Planned Additions (Phased)

| Phase | Dependency | Gzipped | Total After |
|-------|-----------|---------|-----------|
| Current | — | — | ~200KB |
| Phase 1 | next-themes | +3KB | ~203KB |
| Phase 2 | shadcn/ui (Dialog, Sheet, Tabs, Select, etc.) | +30KB | ~233KB |
| Phase 3 | Motion.dev | +10KB | ~243KB |
| Phase 4 | Sonner | +5KB | ~248KB |
| Phase 5 | axe-core | Dev-only | ~248KB |
| Phase 6 | Storybook | Dev-only | ~248KB |

**Final Production Bundle Target**: ~250KB gzipped  
**Status**: ✅ Within acceptable range for modern PWA

---

## NOT Recommended

### ❌ Redux
- **Why Not**: Overkill for this architecture; Zustand + React Query sufficient
- **Current State**: Not used, not needed
- **Cost**: High (unnecessary complexity)

### ❌ Styled Components / Emotion
- **Why Not**: Tailwind CSS + CSS variables superior
- **Current State**: Not used, Tailwind established
- **Cost**: High (CSS rewrite required)

### ❌ MobX
- **Why Not**: Zustand is simpler and sufficient
- **Current State**: Not used
- **Cost**: High (unnecessary complexity)

### ❌ Apollo Client
- **Why Not**: TanStack Query handles server state perfectly
- **Current State**: Not used
- **Cost**: High (would require API client redesign)

### ❌ Chakra UI
- **Why Not**: Tailwind CSS + shadcn/ui better for this architecture
- **Current State**: Not used
- **Cost**: High (CSS rewrite)

---

## Recommendation Summary

### ✅ Proceed with Phase 1
**Prerequisites**: None — theme system can be modernized with next-themes

**Phase 1 Scope**:
- Replace ThemeBoundary with next-themes
- Verify light/dark mode contrast
- Polish theme toggle UI in settings
- Test persistence across navigation
- Estimated effort: 3 days

### ✅ Plan for Phase 2
**Prerequisites**: Phase 1 complete

**Phase 2 Scope**:
- Install shadcn/ui
- Add Dialog, Sheet, Tabs, Select, Checkbox, Radio, Switch
- Replace LibraryCategoryTabs with shadcn Tabs
- Add Textarea, DatePicker inputs
- Estimated effort: 5 days

### ✅ Evaluate for Phase 3
**Prerequisites**: Phase 2 complete

**Phase 3 Scope**:
- Decide: Motion.dev vs Framer Motion vs CSS-only
- If adopted: mini player → full player animation
- Prototype high-value transitions
- Estimated effort: 3-4 days

### ✅ Optional Phases
- **Phase 4**: Sonner (toasts)
- **Phase 5**: axe-core (automated a11y)
- **Phase 6+**: Storybook (component docs)

---

## Next Steps

1. **Approve Technology Decisions** — Team review of this document
2. **Finalize Phase 1 Scope** — next-themes migration details
3. **Plan Phase 2** — shadcn/ui integration strategy
4. **Monitor Migration** — Validate adoption during implementation
5. **Adjust as Needed** — Real-world experience may warrant changes

---

**Document Owner**: Frontend Architecture Team  
**Last Updated**: August 13, 2026  
**Status**: ✅ Ready for team review and approval
