# Phase 0.5 — Migration Strategy & Risk Management
**Castaminofen UI Modernization — Safe Implementation Plan**

**Date:** August 13, 2026  
**Status:** ✅ Ready for Review  
**Approach:** Incremental, low-risk migrations in logical phases

---

## Executive Summary

This document defines how to migrate the frontend through Phases 1-6 **without breaking existing functionality**.

**Key Principles**:
1. **Incremental changes** — No big-bang refactoring
2. **Feature branches** — Each change in isolation
3. **Backward compatibility** — Old and new coexist during transition
4. **Testing at each step** — Validate before proceeding
5. **Rollback ready** — Can revert any change easily

**Risk Level**: 🟢 **LOW** — All migrations are non-breaking

---

## Migration Risk Assessment

### Low Risk ✅

| Change | Why | Mitigation |
|--------|-----|-----------|
| **next-themes adoption** | Drop-in replacement for ThemeBoundary | Keep ThemeBoundary code, switch provider gradually |
| **shadcn/ui form components** | New imports, doesn't break existing code | Add alongside existing components |
| **Sonner toast library** | Additive, new feature | No existing toast system to replace |
| **axe-core testing** | Dev-only, non-breaking | Add to test suite without changing behavior |
| **Storybook** | Dev-only, non-breaking | Deploy alongside app |

### Medium Risk ⚠️

| Change | Why | Mitigation |
|--------|-----|-----------|
| **Route state refactoring** | Affects 20 routes | One route at a time, verify before next |
| **Component naming standardization** | Potential breaking imports | Automated search/replace with verification |
| **Modal/dialog migration** | Feature-specific modals exist | Create new shadcn modals, migrate one feature at a time |
| **Tab component migration** | LibraryCategoryTabs is in use | Parallel implementation, swap one section at a time |

### High Risk ❌

| Change | Why | Why NOT doing | Alternative |
|--------|-----|---|---|
| **Full CSS rewrite** | Would break all styling | Don't do this | Extend Tailwind incrementally |
| **Redux adoption** | Major dependency addition | Zustand + Query sufficient | Keep current stack |
| **Complete redesign** | Would affect all routes | Focus on polish, not redesign | Phase 1 improvements are polish |

---

## Phase 1: Theme System Modernization (3 Days)

**Goal**: Replace custom theme implementation with next-themes, verify light/dark mode works

### Current State
```
ThemeBoundary (custom)
  └─ handleStorage, applyTheme
  └─ data-theme on <html>
  └─ CSS variables
  
SettingsPage
  └─ theme toggle UI (System/Light/Dark)
  └─ updateTheme() calls
```

### Target State
```
ThemeProvider (next-themes)
  └─ useTheme() hook
  └─ data-theme on <html>
  └─ CSS variables (same as before)

SettingsPage
  └─ theme toggle UI (same)
  └─ useTheme().setTheme() calls
```

### Execution Plan

#### Step 1.1: Prepare (30 min)
```bash
# Create feature branch
git checkout -b feat/migrate-next-themes

# Install dependency
pnpm add next-themes

# Document current theme behavior
# - Screenshot settings page
# - Test theme persistence
# - Verify light/dark contrast
```

#### Step 1.2: Update Root Layout (1 hour)
**File**: `apps/web/src/app/layout.tsx`

```diff
- import { AppShell } from '@/components/layout/app-shell';
+ import { ThemeProvider } from 'next-themes';
+ import { AppShell } from '@/components/layout/app-shell';

  export default function RootLayout({ children }) {
    return (
      <html lang="fa" dir="rtl">
        <head>
          {/* Remove custom theme bootstrap script */}
-         <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        </head>
        <body>
          <AppProviders>
+           <ThemeProvider
+             attribute="data-theme"
+             defaultTheme="system"
+             enableSystem
+             disableTransitionOnChange
+           >
              <AppShell>{children}</AppShell>
+           </ThemeProvider>
          </AppProviders>
        </body>
      </html>
    );
  }
```

**Changes**:
- Remove custom `themeBootstrapScript`
- Add `<ThemeProvider>` wrapper
- Configure with `data-theme` attribute (matches current implementation)

**Risk**: Low — next-themes handles SSR bootstrap internally  
**Testing**:
- Verify no flash on load (check in incognito window)
- Verify theme persists after page reload

---

#### Step 1.3: Update Settings Page (1.5 hours)
**File**: `apps/web/src/features/settings/components/SettingsPage.tsx`

```diff
+ import { useTheme } from 'next-themes';
- import { useSettingsPreferences } from '../hooks/useSettingsPreferences';

  export function SettingsPage() {
+   const { theme, setTheme } = useTheme();
-   const { preferences, updateTheme } = useSettingsPreferences();

    // Update getDisplayValue
    const getDisplayValue = (item: SettingsItemContent) => {
      if (item.label === 'Theme') {
-       return preferences.theme;
+       return theme || 'System';
      }
      // ... rest unchanged
    };

    // Update onClick handlers
    onClick={() => {
      if (item.label === 'Theme') {
-       updateTheme(option as SettingsThemePreference);
+       setTheme(option);
      }
    }}
  }
```

**Changes**:
- Replace `useSettingsPreferences` with `useTheme` for theme-only logic
- Keep other preferences (autoplay, volume, etc.) using existing store
- Update button click handlers to call `setTheme()`

**Risk**: Low — UI logic remains the same  
**Testing**:
- Click "Light" → page theme changes to light
- Click "Dark" → page theme changes to dark
- Click "System" → respects system preference
- Reload page → theme persists

---

#### Step 1.4: Remove Custom Theme Provider (1 hour)
**File**: `apps/web/src/components/layout/theme-boundary.tsx`

**Option A: Delete** (if no longer needed)
```bash
rm apps/web/src/components/layout/theme-boundary.tsx
```

**Option B: Keep as Deprecated** (for reference)
```typescript
/**
 * @deprecated Use next-themes ThemeProvider instead
 * This component was replaced in Phase 1
 * 
 * @see apps/web/src/app/layout.tsx
 */
export function ThemeBoundary({ children }: { children: ReactNode }) {
  // ... old implementation for reference
}
```

**Update AppShell**:
```diff
- import { ThemeBoundary } from '@/components/layout/theme-boundary';
- 
- export function AppShell(...) {
-   return (
-     <ThemeBoundary>
-       {/* content */}
-     </ThemeBoundary>
-   );
- }

  export function AppShell(...) {
    return (
      {/* content — ThemeBoundary no longer needed */}
    );
  }
```

**Risk**: Very low — Provider moved to root layout  
**Testing**:
- Verify AppShell still renders
- Verify theme still works

---

#### Step 1.5: Validation (1 hour)

**Verification Checklist**:
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes
- [ ] Dev server runs without errors
- [ ] Theme toggle in settings works
- [ ] Light mode loads (contrast verified)
- [ ] Dark mode loads
- [ ] System preference respected
- [ ] Theme persists after page reload
- [ ] Theme persists after browser close/reopen
- [ ] No flash of unstyled theme on initial load
- [ ] RTL (Persian) still works
- [ ] Mobile/tablet/desktop all work

**Rollback Plan**:
```bash
git revert HEAD  # Reverts to previous ThemeBoundary implementation
```

---

#### Step 1.6: Settings Preferences Cleanup (1.5 hours)
**File**: `apps/web/src/features/settings/services/preferencesPersistence.ts`

**Option**: Keep or Remove theme-related code?

**Recommendation**: KEEP but document as legacy
- Theme switching moved to next-themes
- Keep other preferences (autoplay, volume, notifications) in settings store
- This is a partial migration, not full

```typescript
/**
 * User Settings Preferences
 * 
 * NOTE: Theme preference is now managed by next-themes.
 * This file handles other preferences (autoplay, volume, notifications).
 * 
 * @see next-themes package for theme management
 */

export interface SettingsPreferences {
  // theme: 'Light' | 'Dark' | 'System'; // MOVED to next-themes
  autoplay: boolean;
  defaultVolume: number;
  resumePlayback: boolean;
  notifications: {
    enabled: boolean;
    newEpisodes: boolean;
    productUpdates: boolean;
  };
}
```

**Impact**: Cleaner separation of concerns  
**Risk**: Low — Only removing theme-related code

---

### Phase 1 Validation

**Before Merge**:
- [ ] Code review of all changes
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Manual testing on mobile/tablet/desktop
- [ ] Contrast verification (WCAG AA both modes)

**After Merge**:
- [ ] Deploy to staging
- [ ] QA team tests theme switching
- [ ] Monitor for any errors
- [ ] Commit to main branch

**Estimated Time**: 3 days (1 dev)

---

## Phase 2: Design System Expansion & shadcn/ui Adoption (5 Days)

**Goal**: Add missing form components and modal primitives via shadcn/ui

### Current State
```
components/design-system/
├── forms/ (2 components: Input, Field)
└── ❌ Missing: Textarea, Select, Checkbox, Radio, Switch, DatePicker
└── ❌ Missing modals: Dialog, Sheet, Popover, AlertDialog
```

### Target State
```
components/design-system/
├── forms/ (8 components via shadcn)
├── modals/ (4 components via shadcn)
└── ✅ All form/modal needs covered
```

### Execution Plan

#### Step 2.1: Install shadcn/ui (30 min)
```bash
git checkout -b feat/shadcn-ui-adoption

# Install shadcn/ui CLI
pnpm add -D shadcn-ui

# Initialize shadcn/ui
# This creates shadcn.json and utils directory
npx shadcn-ui init
```

**Configuration** (`shadcn.json`):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "aliasPrefix": "@",
  "aliases": {
    "components": "components",
    "utils": "lib/utils"
  }
}
```

**Risk**: Very low — Setup is straightforward  
**Verification**: Check that `shadcn.json` exists and paths are correct

---

#### Step 2.2: Add Form Components (2 days)
**Target Components**: Textarea, Select, Checkbox, Radio, Switch, DatePicker

```bash
# Add each component via shadcn CLI
npx shadcn-ui add textarea --overwrite
npx shadcn-ui add select --overwrite
npx shadcn-ui add checkbox --overwrite
npx shadcn-ui add radio-group --overwrite
npx shadcn-ui add switch --overwrite
# DatePicker is not in shadcn, might need custom

# Move to design-system folder
mv components/ui/textarea.tsx components/design-system/forms/
mv components/ui/select.tsx components/design-system/forms/
# ... etc
```

**Update `components/design-system/forms/index.ts`**:
```typescript
export { Input } from './input';
export { Field } from './field';
export { Textarea } from './textarea';
export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './select';
export { Checkbox } from './checkbox';
export { RadioGroup, Radio } from './radio-group';
export { Switch } from './switch';
```

**Create DatePicker** (custom implementation or use alternative):
```bash
# Option 1: Use react-day-picker (minimal)
pnpm add react-day-picker date-fns

# Option 2: Create custom input[type=date]
# Option 3: Use shadcn date-picker demo code
```

**Risk**: Medium — Requires testing each component  
**Testing**:
- [ ] Each form component renders
- [ ] Integrates with React Hook Form
- [ ] Passes Zod validation
- [ ] Keyboard navigation works
- [ ] Mobile responsive

---

#### Step 2.3: Add Modal/Dialog Components (1 day)
```bash
npx shadcn-ui add dialog --overwrite
npx shadcn-ui add sheet --overwrite
npx shadcn-ui add popover --overwrite
npx shadcn-ui add alert-dialog --overwrite

# Create modals folder
mkdir -p components/design-system/modals

# Move components
mv components/ui/dialog.tsx components/design-system/modals/
mv components/ui/sheet.tsx components/design-system/modals/
mv components/ui/popover.tsx components/design-system/modals/
mv components/ui/alert-dialog.tsx components/design-system/modals/
```

**Create `components/design-system/modals/index.ts`**:
```typescript
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './dialog';
export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './sheet';
export { Popover, PopoverTrigger, PopoverContent } from './popover';
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from './alert-dialog';
```

**Risk**: Medium — New dependencies to test  
**Testing**:
- [ ] Each modal renders
- [ ] Keyboard navigation (Esc to close)
- [ ] Focus management
- [ ] Accessibility
- [ ] Mobile/desktop

---

#### Step 2.4: Migrate LibraryCategoryTabs (1 day)
**Current**: `features/library/components/LibraryCategoryTabs.tsx` (custom)  
**Target**: Use shadcn/ui Tabs

```bash
npx shadcn-ui add tabs --overwrite
mv components/ui/tabs.tsx components/design-system/forms/
```

**Create new component**: `features/library/components/LibraryCategoryTabsRefactored.tsx`
```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/design-system';

export function LibraryCategoryTabsRefactored() {
  return (
    <Tabs defaultValue="subscribed" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
        <TabsTrigger value="followed">Followed</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="subscribed">{/* content */}</TabsContent>
      <TabsContent value="followed">{/* content */}</TabsContent>
      <TabsContent value="archived">{/* content */}</TabsContent>
    </Tabs>
  );
}
```

**Migration Strategy**:
1. Create new component alongside old
2. Test new component
3. Replace in LibraryPage
4. Delete old component
5. Verify all tests pass

**Risk**: Medium — Behavioral change in tabs  
**Testing**:
- [ ] Tab switching works
- [ ] Content updates
- [ ] Keyboard navigation
- [ ] Mobile responsive

---

#### Step 2.5: Test & Validate (1 day)
**Test Cases**:
- [ ] All new form components render
- [ ] Form validation works (React Hook Form + Zod)
- [ ] Modal open/close works
- [ ] Tabs tab switching works
- [ ] Keyboard accessibility verified
- [ ] Mobile layout verified
- [ ] Light/dark mode verified
- [ ] No conflicts with existing Button/Card components

**Rollback Plan**:
```bash
git revert HEAD  # Reverts to before shadcn additions
```

---

### Phase 2 Validation

**Before Merge**:
- [ ] All form components tested with React Hook Form
- [ ] All modals tested for keyboard/focus
- [ ] All tabs tested for switching
- [ ] Contrast verified in light/dark mode
- [ ] Mobile tested

**After Merge**:
- [ ] Deploy to staging
- [ ] QA team creates forms and uses modals
- [ ] Commit to main branch

**Estimated Time**: 5 days (1-2 devs)

---

## Phase 3: Route State Coverage (2 Days)

**Goal**: Add LoadingState/ErrorState to all 20 routes (currently only 25%)

### Current State
- 5/20 routes have LoadingState (25%)
- 4/20 routes have ErrorState (20%)
- Goal: 20/20 routes with both

### Execution Plan

#### Step 3.1: Audit & Document (4 hours)
```bash
git checkout -b feat/complete-route-states

# Find all routes without loading states
grep -r "LoadingState" apps/web/src/app/ > routes_with_loading.txt

# Manual audit of each route
# Document pattern for each route type
```

#### Step 3.2: Add Loading States (1 day)
**Pattern for each route**:
```typescript
// Before
export default function [Route]Page() {
  const { data, isLoading, error } = useQuery(/* ... */);
  
  return (
    <main>
      {/* content */}
    </main>
  );
}

// After
export default function [Route]Page() {
  const { data, isLoading, error } = useQuery(/* ... */);
  
  if (isLoading) {
    return <LoadingState message="Loading [feature]..." />;
  }
  
  if (error) {
    return <ErrorState message={error.message} onRetry={() => refetch()} />;
  }
  
  return (
    <main>
      {/* content */}
    </main>
  );
}
```

**Routes to Update**:
1. `/` (Home/Discovery)
2. `/search`
3. `/podcasts`
4. `/podcasts/[id]`
5. `/episodes/[id]`
6. `/library`
7. `/playlists`
8. `/playlists/[id]`
9. `/community`
10. `/profile`
11. `/offline-library`
12. `/admin` (if server-rendered)
13. `/creator` (if server-rendered)
14. `/[others]`

**Risk**: Low — Adding UI states doesn't change logic  
**Testing**: Manually verify loading/error states work

---

### Phase 3 Validation

**Before Merge**:
- [ ] All 20 routes have LoadingState or Suspense
- [ ] All 20 routes have ErrorState
- [ ] Visual verification of all states

**Estimated Time**: 2 days (1 dev)

---

## Phase 4+: Additional Improvements (Optional)

### Phase 4: Sonner Toast Integration (2-3 days)
- Install Sonner
- Add toast calls to key actions (subscribe, favorite, sync)
- Test on all viewports

### Phase 5: axe-core Accessibility Testing (1-2 days)
- Install @axe-core/react
- Add to vitest
- Run accessibility audit
- Fix critical issues

### Phase 6+: Storybook Setup (3-5 days)
- Install Storybook for Next.js
- Create stories for design-system components
- Add accessibility addon
- Deploy Storybook

---

## Rollback Strategy

### If Anything Breaks

**Option 1: Revert Last Commit**
```bash
git revert HEAD
pnpm install
pnpm dev
```

**Option 2: Revert Branch**
```bash
git checkout main
git reset --hard origin/main
pnpm install
pnpm dev
```

**Option 3: Manual Fix**
- Identify breaking change
- Fix in feature branch
- Create new PR with fix

---

## Testing Strategy

### Unit Tests
- Test each new component in isolation
- Verify props work correctly
- Check accessibility attributes

### Integration Tests
- Test components within routes
- Verify form validation flow
- Test modal lifecycle

### Manual Testing
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)
- Light mode
- Dark mode
- RTL (Persian)
- Keyboard navigation

### Accessibility Audit
- Use axe DevTools
- Verify focus management
- Check contrast ratios
- Test keyboard-only navigation

---

## Timeline Overview

| Phase | Scope | Duration | Risk | Owner |
|-------|-------|----------|------|-------|
| **Phase 1** | next-themes adoption | 3 days | Low | 1 dev |
| **Phase 2** | shadcn/ui integration | 5 days | Medium | 1-2 devs |
| **Phase 3** | Route state coverage | 2 days | Low | 1 dev |
| **Phase 4** | Sonner toasts | 2 days | Low | 1 dev |
| **Phase 5** | axe-core testing | 2 days | Low | 1 dev |
| **Phase 6+** | Storybook docs | 3-5 days | Low | 1 dev |

**Total**: ~17-20 days (2-3 weeks, 1-2 devs)

---

## Dependency Management

### Installation Order

**Phase 1**:
```bash
pnpm add next-themes
```

**Phase 2**:
```bash
pnpm add -D shadcn-ui
# (shadcn installs Radix dependencies automatically)
```

**Phase 3**: No new dependencies

**Phase 4**:
```bash
pnpm add sonner
```

**Phase 5**:
```bash
pnpm add -D @axe-core/react
```

**Phase 6**:
```bash
pnpm add -D storybook @storybook/nextjs
```

### Version Pinning

Keep dependencies pinned to tested versions:
```json
{
  "dependencies": {
    "next-themes": "~0.2.1",
    "sonner": "~1.2.0"
  },
  "devDependencies": {
    "shadcn-ui": "~0.3.0",
    "@axe-core/react": "~4.8.0",
    "storybook": "~7.5.0"
  }
}
```

---

## Success Metrics

### Phase 1
- ✅ Theme toggle works in settings
- ✅ Light/dark mode persists
- ✅ No theme flash on page load
- ✅ WCAG AAA contrast verified

### Phase 2
- ✅ All form components render
- ✅ Form validation works with React Hook Form
- ✅ Modal/dialog open/close works
- ✅ Tabs switching works

### Phase 3
- ✅ All 20 routes have LoadingState
- ✅ All 20 routes have ErrorState
- ✅ User perceives faster performance

### Phase 4
- ✅ Toast notifications work
- ✅ Users get action feedback

### Phase 5
- ✅ axe-core integration in CI
- ✅ No critical a11y violations

### Phase 6+
- ✅ Storybook deployed
- ✅ Components documented

---

## Risk Mitigation Checklist

- [ ] Each phase is reviewed before merge
- [ ] Tests pass at each phase
- [ ] Manual QA before production
- [ ] Rollback plan ready
- [ ] Team trained on new patterns
- [ ] Documentation updated
- [ ] Performance monitored
- [ ] Bundle size checked

---

## Conclusion

This migration strategy balances **speed** (get value quickly) with **safety** (minimize risk). Each phase is self-contained and can be reverted if needed.

**Recommendation**: ✅ **PROCEED WITH PHASE 1**

---

**Document Owner**: Frontend Architecture Team  
**Last Updated**: August 13, 2026  
**Next Review**: After Phase 1 completion
