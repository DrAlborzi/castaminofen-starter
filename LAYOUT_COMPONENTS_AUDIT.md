# Castaminofen Layout Components Audit

**Date**: 2026-08-13  
**Workspace**: apps/web/src  
**Scope**: Comprehensive layout, container, and navigation component inventory

---

## Executive Summary

The Castaminofen web application uses a **canonical design system architecture** with a clear separation of concerns:

- **Global Layout**: `AppShell` wraps all pages and manages responsive structure
- **Design System Primitives**: `PageContainer`, `SectionHeader`, and navigation components
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Container Width**: `max-w-app` = 72rem (1152px)
- **RTL-First**: Entire app is Persian RTL with logical Tailwind utilities
- **Navigation Strategy**: Bottom-tab on mobile (md:hidden), desktop nav on larger screens

---

## 1. ROOT LAYOUT & APP SHELL

### [apps/web/src/app/layout.tsx](apps/web/src/app/layout.tsx)

**Type**: Root layout wrapper (Next.js)  
**Classification**: Canonical / Framework-level  
**Responsibility**: 
- Global metadata, font setup (Vazirmatn)
- Theme bootstrap script (dark/light mode detection)
- RTL directive and language setup (`lang="fa" dir="rtl"`)
- Wraps entire app in `AppProviders` and `AppShell`

**Key Features**:
- Sets up Vazirmatn font with Arabic and Latin subsets
- Theme preference stored in `castaminofen-settings-preferences` localStorage
- Metadata setup for PWA (manifest, icons, apple web app config)
- Color scheme supports dark/light modes

**Consumers**: All pages and components in the app

---

### [apps/web/src/components/layout/app-shell.tsx](apps/web/src/components/layout/app-shell.tsx)

**Type**: Top-level layout component  
**Classification**: Canonical / App-level  
**Responsibility**:
- Manages overall page structure with responsive behavior
- Conditionally renders mobile vs. auth vs. landing layouts
- Wraps children with `ThemeBoundary` for theme management
- Coordinates `MobileHeader`, `BottomNavigation`, `PlayerBar`, and content area

**Responsive Behavior**:
- **Auth Routes** (`/login`, `/register`): Centered max-width-5xl layout with no navigation
- **Landing Page** (`/`): No header, no bottom nav, no player bar
- **Default Pages**: Full navigation + player bar + responsive spacing

**Structure**:
```
AppShell
├── ThemeBoundary
│   ├── MobileHeader (pathname-aware config)
│   ├── div.app-shell__content (flex-1, flexible height)
│   │   └── MobileContainer
│   │       └── {children}
│   ├── PlayerBar
│   └── BottomNavigation
```

**Responsive Spacing** (CSS variables):
- Mobile: `px-1 py-3` (tighter padding)
- Tablet (sm): `px-0 py-4`
- Classes: `.app-shell`, `.app-shell__content`

**RTL Support**: Full, uses logical flex-col

**Consumers**: Root layout wrapper

---

### [apps/web/src/components/layout/theme-boundary.tsx](apps/web/src/components/layout/theme-boundary.tsx)

**Type**: Context/Provider wrapper  
**Classification**: Canonical / Theme management  
**Responsibility**:
- Applies theme to `document.documentElement` based on user preference
- Watches system theme changes
- Listens to settings storage events
- No visual output; purely behavioral

**Features**:
- Detects theme from `castaminofen-settings-preferences` localStorage
- Falls back to system preference if set to "System"
- Updates `root.dataset.theme = 'light'` for light mode
- Updates `root.style.colorScheme` for color scheme prop
- Syncs theme changes across browser tabs

**Consumers**: `AppShell` wrapper

---

## 2. DESIGN SYSTEM LAYOUT PRIMITIVES

### [apps/web/src/components/design-system/layout/page-container.tsx](apps/web/src/components/design-system/layout/page-container.tsx)

**Type**: Spacing container component  
**Classification**: Canonical / Design system primitive  
**Responsibility**:
- Provides consistent max-width, padding, and vertical spacing for pages
- Wraps main content area with semantic `<section>` tag
- Applies responsive spacing rhythm

**Structure**:
```
<section>
  mx-auto w-full max-w-app
  space-y-4 sm:space-y-6 lg:space-y-8
</section>
```

**Spacing Rhythm**:
- Mobile: `space-y-4` (1rem vertical gap between children)
- Tablet (sm): `space-y-6` (1.5rem)
- Desktop (lg): `space-y-8` (2rem)

**Max-width**: `max-w-app` = 72rem (1152px) centered with `mx-auto`

**Props**:
- `children: ReactNode` - content to wrap
- `className?: string` - additional classes merged with clsx

**Consumers**: 
- Almost all feature pages: `LibraryPage`, `DiscoveryPage`, `HomePage`, `SearchPage`, etc.
- Feature components: `AdminDashboard`, `CreatorStudioHome`, `CommunityPage`
- Imported from: `@/components/design-system` (canonical path)

**Test Coverage**: Verifies spacing class presence and children rendering

---

### [apps/web/src/components/design-system/layout/section-header.tsx](apps/web/src/components/design-system/layout/section-header.tsx)

**Type**: Section heading & action bar  
**Classification**: Canonical / Design system primitive  
**Responsibility**:
- Provides shared pattern for section titles with optional eyebrow, description, and action buttons
- Manages responsive flex layout for mobile vs. desktop alignment

**Structure**:
```
<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
  <div class="space-y-2">
    <p class="text-[11px] uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
    <h2 class="text-lg font-semibold">{title}</h2>
    <p class="text-sm text-text-secondary">{description}</p>
  </div>
  <div class="flex flex-wrap items-center gap-2">{actions}</div>
</div>
```

**Responsive Behavior**:
- **Mobile**: Vertical stack, eyebrow → title → description, actions below
- **Tablet+** (sm): Horizontal layout, text on left, actions on right (items-end)

**Props**:
- `eyebrow?: ReactNode` - uppercase label (accent color, optional)
- `title: ReactNode` - h2 heading (required)
- `description?: ReactNode` - supporting text (optional)
- `actions?: ReactNode` - action buttons/controls (optional)
- `className?: string` - additional classes

**Consumers**:
- `AdminDashboard`, `AdminAIAssistant`, `AdminConfigurationCenter`, `AdminIntelligenceDashboard`
- `EpisodeCreateForm`, `PodcastForm`
- `SearchPage`, `DiscoveryPage`

**Design Role**: Replaces repeated flex + spacing patterns across features

---

## 3. NAVIGATION COMPONENTS

### [apps/web/src/components/layout/mobile-header.tsx](apps/web/src/components/layout/mobile-header.tsx)

**Type**: Header component (layout adapter)  
**Classification**: Adapter / Route-aware wrapper  
**Responsibility**:
- Route-aware header that displays contextual title and actions based on pathname
- Shows different configurations for different feature areas
- Delegates to `DesktopNavigation` for desktop view

**Structure**:
```
<header class="app-header sticky top-0 z-30 backdrop-blur-2xl">
  <div class="mx-auto flex w-full max-w-app justify-between gap-3">
    <!-- Left: Title section -->
    <div> {config.title} / {config.tagline} </div>
    <!-- Center: Desktop nav (hidden on md:) -->
    <DesktopNavigation class="hidden md:flex" />
    <!-- Right: Action buttons -->
    <div> {create} {search} {notification} {profile} </div>
  </div>
</header>
```

**Responsive Behavior**:
- **Mobile (hidden)**: Not displayed, `MobileHeader` takes priority
- **Tablet+** (md): Shows full horizontal layout with nav in center
- **Actions**: Context-aware based on route (showCreateAction, showSearchAction, etc.)

**Route Configurations**:
- `/library*` → "کتابخانه" + Persian tagline + search, create, profile actions
- `/search*` → "جستجو" + search tagline
- `/creator*` → "سازنده" + creator tagline
- `/profile*` → "پروفایل" + settings tagline
- `/community*` → "اجتماع" + community tagline
- `/create*` → "ایجاد" + creation tagline

**RTL Support**: 
- Flexbox uses logical order
- Title and tagline in Persian
- Arabic numeral support

**Consumers**: Rendered by `AppShell` on non-landing pages

---

### [apps/web/src/components/layout/bottom-navigation.tsx](apps/web/src/components/layout/bottom-navigation.tsx)

**Type**: Mobile bottom navigation bar  
**Classification**: Layout adapter / Feature-specific wrapper  
**Responsibility**:
- Bottom tab bar for mobile navigation (md:hidden)
- Routes to main app sections: Home, Library, Create, Search, Community, Profile
- Highlights active route based on pathname
- "Create" button styled as prominent floating action button (FAB)

**Structure**:
```
<nav class="fixed inset-x-0 bottom-0 z-20 md:hidden">
  <div class="mx-auto flex max-w-app justify-between">
    {items.map(item => (
      item.isPrimary ? 
        <Link class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"> 
          {/* FAB style: h-14 w-14 rounded-full */>
        </Link>
      :
        <Link class="flex-1 flex-col items-center justify-center">
          {/* Normal tab: h-10 w-10 icon, text-[10px] label */}
        </Link>
    ))}
  </div>
</nav>
```

**Navigation Items** (6 items):
1. Home → `/`
2. Library → `/library` (active on `/library*`)
3. **Create** → `/create` (primary/FAB, `isPrimary: true`)
4. Search → `/search`
5. Community → `/community`
6. Profile → `/profile`

**Responsive**:
- **Mobile**: Always visible (fixed bottom)
- **Tablet+** (md): Hidden (`md:hidden` class)
- **Safe area**: Respects `env(safe-area-inset-bottom)` for notched devices

**Styling**:
- Background: `surface-secondary/95` with gradient and backdrop blur
- Active item: `bg-accent/12 text-accent` with shadow
- FAB: Gradient from accent → violet-500 → fuchsia-500
- Icons: Scale up (110%) when active
- Focus ring: 2px accent ring with offset

**RTL Support**: Flexbox row naturally reflects in RTL

**Consumers**: Rendered by `AppShell` on non-landing pages (not auth routes)

---

### [apps/web/src/components/design-system/navigation/bottom-navigation.tsx](apps/web/src/components/design-system/navigation/bottom-navigation.tsx)

**Type**: Reusable bottom navigation primitive  
**Classification**: Canonical / Design system primitive  
**Responsibility**:
- Generic bottom navigation bar component (not route-aware)
- Accepts items configuration and renders accordingly
- Used as building block for feature-specific navigation

**Props**:
```typescript
interface BottomNavigationItem {
  id: string;
  label: ReactNode;
  href: string;
  icon: ComponentType;
  active?: boolean;
  primary?: boolean;
}
```

**Styling**:
- Fixed at bottom with logical safe-area padding
- Border + backdrop blur
- Items flex with gap
- Primary items: FAB style (h-12 w-12 rounded-full)
- Secondary items: Tab style (min-h-[3.5rem], flex-col)

**Consumers**: Baseline primitive (feature code wraps with route awareness)

---

### [apps/web/src/components/design-system/navigation/mobile-header.tsx](apps/web/src/components/design-system/navigation/mobile-header.tsx)

**Type**: Reusable mobile header primitive  
**Classification**: Canonical / Design system primitive  
**Responsibility**:
- Generic sticky header with leading, title, subtitle, and trailing slots
- Handles sticky positioning, backdrop blur, z-index
- No route awareness (purely presentational)

**Props**:
```typescript
{
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}
```

**Structure**:
```
<header class="sticky top-0 z-30 backdrop-blur-2xl">
  <div class="mx-auto flex w-full max-w-app items-center justify-between gap-3">
    <div class="flex items-center gap-2.5">
      {leading}
      <div class="min-w-0">
        <p class="text-[11px] uppercase">{title}</p>
        <p class="text-sm truncate">{subtitle}</p>
      </div>
    </div>
    <div class="flex shrink-0 gap-1.5">{trailing}</div>
  </div>
</header>
```

**RTL Support**: Logical flex with shrink-0 and gap

---

### [apps/web/src/components/design-system/navigation/desktop-navigation.tsx](apps/web/src/components/design-system/navigation/desktop-navigation.tsx)

**Type**: Desktop horizontal navigation  
**Classification**: Canonical / Design system primitive  
**Responsibility**:
- Horizontal navigation for desktop/tablet views
- Renders links with optional icons
- Active state styling (accent background + bold text)

**Props**:
```typescript
interface DesktopNavigationItem {
  id: string;
  label: ReactNode;
  href: string;
  active?: boolean;
  icon?: ComponentType;
}
```

**Styling**:
- Flex row with gap-2
- Min-height 11 (h-11)
- Active: `bg-accent/12 font-semibold text-accent`
- Inactive: Hover background + text color change
- Focus ring: 2px focus ring with offset

**Consumers**: Embedded in `MobileHeader` (layout adapter) on md: screens

---

## 4. CONTAINER & SPACING COMPONENTS

### [apps/web/src/components/layout/mobile-container.tsx](apps/web/src/components/layout/mobile-container.tsx)

**Type**: Responsive padding container  
**Classification**: Adapter / Layout utility  
**Responsibility**:
- Applies consistent horizontal padding and max-width to content
- Wraps content area for proper spacing on all screens
- Ensures content doesn't exceed app max-width

**Structure**:
```
<div class="mobile-container mx-auto w-full max-w-app px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

**Responsive Padding**:
- Mobile: `px-4` (1rem)
- Tablet (sm): `px-6` (1.5rem)
- Desktop (lg): `px-8` (2rem)

**Props**:
- `children: ReactNode`
- `className?: string`

**Usage**: Wraps main content in `AppShell` to constrain width and padding

**Consumers**: AppShell content wrapper

---

### [apps/web/src/components/layout/header.tsx](apps/web/src/components/layout/header.tsx)

**Type**: Alternative header (legacy/compatibility)  
**Classification**: Legacy / Compatibility path  
**Responsibility**:
- Renders logo and app title with search/settings actions
- **Note**: Appears to be superseded by `MobileHeader` route-aware version

**Structure**:
```
<header class="app-header sticky top-0 z-30">
  <div class="mobile-container mx-auto flex w-full max-w-app justify-between gap-3">
    <div> Logo + Title </div>
    <div> Search / Settings icons </div>
  </div>
</header>
```

**Status**: May be legacy; recommend checking if still used in app routes

---

## 5. LAYOUT SUPPORT COMPONENTS

### [apps/web/src/components/layout/content-carousel.tsx](apps/web/src/components/layout/content-carousel.tsx)

**Type**: Horizontal scroll container  
**Classification**: Utility / Layout helper  
**Responsibility**:
- Provides horizontal scrolling for carousel-like layouts
- Hides scrollbars (webkit + firefox)
- Applies flex and gap

**Structure**:
```
<div class="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  {children}
</div>
```

**Props**:
- `children: ReactNode`
- `className?: string`

**Use Cases**: Media carousels, horizontally scrolling content areas

**Consumers**: Feature-specific carousel implementations

---

### [apps/web/src/components/layout/route-placeholder.tsx](apps/web/src/components/layout/route-placeholder.tsx)

**Type**: Development/placeholder page layout  
**Classification**: Development utility  
**Responsibility**:
- Provides consistent structure for route stubs and placeholders
- Shows badge, title, description, optional links, and page state

**Structure**:
```
<main class="page-container">
  <Card>
    <h1> title </h1>
    <p> description </p>
    {links && <div> Link buttons </div>}
    <PageState variant={stateVariant} />
  </Card>
</main>
```

**Props**:
- `title: string`
- `description: string`
- `badge?: string` (default: "Route foundation")
- `links?: RouteLink[]`
- `stateVariant?: 'empty' | ...`
- `stateTitle?: string`
- `stateDescription?: string`

**Consumers**: Placeholder pages for route stubs

---

### [apps/web/src/components/layout/app-shell-config.ts](apps/web/src/components/layout/app-shell-config.ts)

**Type**: Configuration module (not a component)  
**Classification**: Data / Configuration  
**Responsibility**:
- Centralized route-to-navigation mapping
- Provides navigation item configs with active state
- Provides header configs per route
- Route pattern matching logic

**Exports**:
- `getAppShellNavigationItems(pathname)` - 6-item navigation array
- `getBottomNavigationItems(pathname)` - alias to above
- `getMobileHeaderConfig(pathname)` - route-specific header config
- `AppShellNavigationItem` type
- `AppShellHeaderConfig` type

**Navigation Definition**:
```typescript
[
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'library', label: 'Library', href: '/library', icon: Bookmark },
  { id: 'create', label: 'Create', href: '/create', icon: Plus, isPrimary: true },
  { id: 'search', label: 'Search', href: '/search', icon: Search },
  { id: 'community', label: 'Community', href: '/community', icon: Users },
  { id: 'profile', label: 'Profile', href: '/profile', icon: UserRound },
]
```

**Route Matching**: 
- Exact match for `/`
- Prefix match for other routes (e.g., `/library/featured` matches `/library`)
- Trailing slash handling

**Consumers**: 
- `BottomNavigation` (layout adapter)
- `MobileHeader` (layout adapter)
- Tests for navigation logic

---

## 6. RESPONSIVE BREAKPOINTS & SPACING

### Tailwind Breakpoints (Defaults)
```
sm: 640px   (tablet)
md: 768px   (tablet to desktop threshold)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
2xl: 1536px (extra large)
```

### Container Sizing
```css
--container-max: 72rem;      /* 1152px (max-w-app) */
--container-content: 72rem;  /* same as max */
```

### Spacing Pattern Examples

**Page Container**:
- Mobile: `px-3 pb-24 pt-5`
- Tablet (sm): `px-6 pb-28 pt-5`
- Desktop (lg): `px-8 pt-6 pb-28`
- Vertical gap: `space-y-4 sm:space-y-6 lg:space-y-8`

**Section Header**:
- Mobile: `flex-col gap-3`
- Tablet+ (sm): `flex-row items-end justify-between gap-3`

**Header/Nav**:
- All widths: `mx-auto w-full max-w-app`
- Mobile: `px-3 py-3`
- Tablet (sm): `px-6`
- Desktop (lg): `px-8`

**Bottom Navigation**:
- Padding: `pb-[calc(env(safe-area-inset-bottom)+0.75rem)]`
- Items padding: `px-2 pb-2 sm:px-4`

---

## 7. RTL SUPPORT

### Global Direction Setup
- Root language: `<html lang="fa" dir="rtl">`
- Color scheme: `dark light`
- Theme data attribute: `data-theme` (set to "light" for light mode)

### Logical Tailwind Utilities Used
- `ms-*` / `me-*` (margin start/end)
- `ps-*` / `pe-*` (padding start/end)
- `start-*` / `end-*` (inset start/end)
- `flex-col`, `flex-row` (logical)
- `items-center`, `items-end` (flex alignment)
- `justify-between`, `justify-center` (flex alignment)
- `rounded-*` (direction-agnostic)
- `gap-*` (direction-agnostic)

### No Physical Left/Right
- ✅ Logical placement used throughout
- ✅ No `left:`, `right:` in layout components
- ✅ Icons not auto-mirrored (only semantically directional icons like back/next would be)

### Content Direction
- All Persian text flows RTL naturally
- URLs, identifiers, timestamps left in local context
- No forced `dir="ltr"` on whole components

---

## 8. GLOBAL STYLES & CSS CLASSES

### Root Classes in [apps/web/src/app/globals.css](apps/web/src/app/globals.css)

```css
.page-container {
  @apply mx-auto flex w-full max-w-app flex-col px-3 pb-24 pt-5 
         sm:px-6 sm:pb-28 lg:px-8 lg:pt-6;
}

.app-shell {
  @apply min-h-screen bg-surface-primary text-text-primary;
}

.app-shell__content {
  @apply pt-1;
}

.app-header {
  @apply sticky top-0 z-30 border-b backdrop-blur-2xl;
  border-color: var(--border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  box-shadow: var(--shadow-xs);
}

.bottom-navigation {
  @apply fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur-2xl;
  border-color: var(--border);
  background: linear-gradient(180deg, rgba(10, 12, 20, 0.75) 0%, rgba(10, 12, 20, 0.9) 100%);
  box-shadow: 0 -12px 30px rgba(2, 6, 20, 0.28);
}

.bottom-navigation__item {
  @apply flex min-h-[3.25rem] flex-1 flex-col items-center justify-center 
         gap-2 rounded-[var(--radius-16)] px-2 py-2 text-center text-xs 
         font-medium text-text-secondary transition-all duration-200
         hover:border-border hover:bg-surface-hover hover:text-text-primary;
  border: 1px solid transparent;
}

.icon-button {
  @apply inline-flex h-10 w-10 items-center justify-center 
         rounded-[var(--radius-16)] text-text-primary shadow-sm 
         transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-hover;
  border: 1px solid var(--border);
  background: var(--surface-card);
}

.card {
  @apply border border-border bg-surface-card p-4 shadow-sm sm:p-6;
  border-radius: var(--radius-20);
  background-color: var(--surface-card);
}
```

---

## 9. DESIGN TOKENS & VARIABLES

### Surface/Background Colors
```css
--surface-primary:     #060814
--surface-secondary:   #0E1220
--surface-card:        #161B2D
--surface-card-elevated: #1D243B
--surface-hover:       #232A46
--surface-sidebar:     #12172A (dark mode)
```

### Text Colors
```css
--text-primary:        #F7F8FC
--text-secondary:      #A6ACC7
--text-muted:          #6C7491
```

### Accent/Action
```css
--color-primary:       #776CFE (accent/action-primary)
--color-accent-green:  #00EA99
--accent-foreground:   #F7F8FC
```

---

## 10. COMPONENT ADOPTION PATTERNS

### Pattern 1: Feature Route with PageContainer + SectionHeader
```tsx
export function MyFeaturePage() {
  return (
    <PageContainer>
      <SectionHeader 
        eyebrow="Section"
        title="My Section"
        description="Description"
        actions={<Button>Action</Button>}
      />
      {/* Content */}
    </PageContainer>
  );
}
```

### Pattern 2: Horizontally Scrolling Content
```tsx
<ContentCarousel>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</ContentCarousel>
```

### Pattern 3: Responsive Grid Layout
```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card>{item}</Card>)}
</div>
```

### Pattern 4: Responsive Flex Layouts
```tsx
<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <h2>Title</h2>
  <div className="flex gap-2">{actions}</div>
</div>
```

---

## 11. FEATURE-SPECIFIC CONSUMERS

### Admin Features
- `AdminDashboard`, `AdminAIAssistant`, `AdminConfigurationCenter`, `AdminIntelligenceDashboard`
- All use `PageContainer` + `SectionHeader`

### Community Features
- `CommunityHome`, `CommunityPage`
- Max-width constraints: `max-w-3xl`, `max-w-2xl` for text areas

### Creator Features
- `CreatorStudioHome`, `CreatorProfilePage`, `CreatorContentManager`
- All use `PageContainer` + `SectionHeader`

### Discovery & Search
- `DiscoveryPage`, `SearchPage`
- Grid layouts: `md:grid-cols-2`, `lg:grid-cols-3`

### Library & Playlists
- `LibraryPage`, `PlaylistDetailsPage`, `PlaylistList`
- Flex layouts with responsive gaps

### Home & Onboarding
- `HomePage`
- `WelcomeScreen`: `lg:grid-cols-[1.05fr_0.95fr]` custom grid ratios

---

## 12. UNUSED/LEGACY COMPONENTS

### [apps/web/src/components/layout/header.tsx](apps/web/src/components/layout/header.tsx)
- **Status**: Likely superseded by `MobileHeader` (route-aware)
- **Recommendation**: Verify if still in use; may be a legacy component

---

## 13. MISSING PATTERNS NOT FOUND

❌ **Not Found**:
- Standalone `Grid` or `Stack` layout components (only Tailwind classes used)
- Dedicated `Sidebar` component (sidebar surface color exists in tokens, but no component)
- Explicit `TopBar` component (header components cover this)
- Standalone `Section` wrapper (only `SectionHeader` found)
- `ContentContainer` (only `PageContainer` found)

---

## 14. ARCHITECTURE PRINCIPLES

### Separation of Concerns

1. **Canonical Design System** (`@/components/design-system/*`)
   - Agnostic, reusable, non-owning primitives
   - PageContainer, SectionHeader, navigation basics
   - Media components (Card, Avatar, Artwork)
   - State components (Empty, Loading, Error, Success)

2. **Layout Adapters** (`@/components/layout/*`)
   - Route-aware, app-specific wrappers
   - MobileHeader, BottomNavigation, AppShell
   - Delegate to design system primitives
   - Coordinate app-level concerns

3. **Feature Code** (`@/features/*`)
   - Composes layout components
   - Owns data fetching, state, navigation
   - Supplies content to primitives
   - No duplicate layout or navigation logic

### Key Rules (from README)

✅ **DO**:
- Import from `@/components/design-system` for canonical components
- Use semantic Tailwind tokens (bg-surface-card, text-text-primary)
- Keep components non-owning (primitives don't fetch/route)
- Use native buttons, links, form controls
- Maintain logical RTL layout
- Keep `:focus-visible` rings on interactive elements

❌ **DON'T**:
- Add hardcoded brand colors to foundation code
- Make unsupported controls appear clickable
- Use fake production data to hide empty/error states
- Duplicate RTL owners or add multiple CSS direction sources
- Add feature-local global state primitives

---

## 15. TESTING & QUALITY

### Existing Tests

**page-container.test.tsx**:
- Verifies spacing class presence
- Checks section semantic element
- Validates children rendering

**app-shell-config.test.ts**:
- Tests active route matching
- Validates 6-item navigation structure
- Checks route-specific header metadata
- Verifies prefix matching (library/featured, etc.)

### Recommendation for Additional Tests
- Visual regression tests for responsive breakpoints
- RTL layout tests (text direction, flex order)
- Safe area inset tests for notched devices
- Theme switching tests

---

## APPENDIX A: FILE LOCATIONS QUICK REFERENCE

| Component | Path | Type | Status |
|-----------|------|------|--------|
| AppShell | `components/layout/app-shell.tsx` | Canonical | Active |
| PageContainer | `components/design-system/layout/page-container.tsx` | Canonical | Active |
| SectionHeader | `components/design-system/layout/section-header.tsx` | Canonical | Active |
| MobileHeader (adapter) | `components/layout/mobile-header.tsx` | Adapter | Active |
| MobileHeader (primitive) | `components/design-system/navigation/mobile-header.tsx` | Canonical | Active |
| BottomNavigation (adapter) | `components/layout/bottom-navigation.tsx` | Adapter | Active |
| BottomNavigation (primitive) | `components/design-system/navigation/bottom-navigation.tsx` | Canonical | Active |
| DesktopNavigation | `components/design-system/navigation/desktop-navigation.tsx` | Canonical | Active |
| MobileContainer | `components/layout/mobile-container.tsx` | Adapter | Active |
| Header | `components/layout/header.tsx` | Legacy | Check usage |
| ThemeBoundary | `components/layout/theme-boundary.tsx` | Canonical | Active |
| ContentCarousel | `components/layout/content-carousel.tsx` | Utility | Active |
| RoutePlaceholder | `components/layout/route-placeholder.tsx` | Development | Development only |
| app-shell-config | `components/layout/app-shell-config.ts` | Data | Active |

---

## APPENDIX B: RESPONSIVE BREAKPOINT USAGE MATRIX

| Breakpoint | Usage | Components |
|------------|-------|-----------|
| Base (mobile) | Default styling | All |
| sm: 640px | Tablet+ adjustments | Padding, gaps, grid cols |
| md: 768px | Desktop nav appears | DesktopNavigation shows, BottomNavigation hides |
| lg: 1024px | Larger spacing | PageContainer space-y-8, header px-8 |
| xl: 1280px | Extra large screens | Custom grid ratios (WelcomeScreen) |

---

## APPENDIX C: Z-Index Stacking Context

```
z-50: Dialogs/overlays
  ↓
z-30: Headers (app-header, sticky)
  ↓
z-20: Bottom Navigation (fixed)
  ↓
z-0: Content area
```

---

**End of Document**

Generated: 2026-08-13
