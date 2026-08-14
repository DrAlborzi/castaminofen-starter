# Layout Components Quick Reference

## Component Hierarchy

```
app/layout.tsx (Root)
└── AppShell
    ├── ThemeBoundary
    ├── MobileHeader (adapter) → MobileHeader (primitive) + DesktopNavigation
    ├── MobileContainer
    │   └── PageContainer
    │       ├── SectionHeader + content
    │       └── ContentCarousel (optional)
    ├── PlayerBar
    └── BottomNavigation (adapter) → BottomNavigation (primitive)
```

---

## Component Usage Matrix

| Component | Location | Type | Mobile | Tablet | Desktop | Usage |
|-----------|----------|------|--------|--------|---------|-------|
| AppShell | `layout/app-shell.tsx` | Canonical | ✅ | ✅ | ✅ | App wrapper |
| MobileHeader (adapter) | `layout/mobile-header.tsx` | Adapter | ✅ | ✅ | ✅ | Route header |
| BottomNavigation (adapter) | `layout/bottom-navigation.tsx` | Adapter | ✅ | ✅ | ❌ (md:hidden) | Mobile nav |
| MobileContainer | `layout/mobile-container.tsx` | Adapter | ✅ | ✅ | ✅ | Content padding |
| PageContainer | `design-system/layout/page-container.tsx` | Canonical | ✅ | ✅ | ✅ | Page spacing (80+) |
| SectionHeader | `design-system/layout/section-header.tsx` | Canonical | ✅ | ✅ | ✅ | Section titles (20+) |
| DesktopNavigation | `design-system/navigation/desktop-navigation.tsx` | Canonical | ❌ | ✅ | ✅ | Horizontal nav |
| MobileHeader (primitive) | `design-system/navigation/mobile-header.tsx` | Canonical | ✅ | ✅ | ✅ | Header primitive |
| BottomNavigation (primitive) | `design-system/navigation/bottom-navigation.tsx` | Canonical | ✅ | ✅ | ✅ | Bottom nav primitive |
| ContentCarousel | `layout/content-carousel.tsx` | Utility | ✅ | ✅ | ✅ | Horizontal scroll |
| ThemeBoundary | `layout/theme-boundary.tsx` | Canonical | - | - | - | Theme provider |

---

## Responsive Breakpoint Guide

| Breakpoint | Width | Padding | Usage |
|-----------|-------|---------|-------|
| Base (mobile) | <640px | px-3/px-4 | Default styling |
| sm: | 640px+ | px-6 | Tablet adjustments |
| md: | 768px+ | - | Desktop nav shows, bottom nav hides |
| lg: | 1024px+ | px-8 | Larger spacing, grid layouts |
| xl: | 1280px+ | - | Extra large screens |

---

## Common Layout Patterns

### Pattern 1: Full Page with Title and Content
```tsx
<PageContainer>
  <SectionHeader 
    eyebrow="Section"
    title="Page Title"
    description="Description"
    actions={<Button>Action</Button>}
  />
  {/* Content goes here */}
</PageContainer>
```

### Pattern 2: Responsive Grid
```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>
```

### Pattern 3: Horizontal Scroll (Carousel)
```tsx
<ContentCarousel>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</ContentCarousel>
```

### Pattern 4: Responsive Flex
```tsx
<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <h2>Title</h2>
  <div className="flex gap-2">{actions}</div>
</div>
```

### Pattern 5: Max-Width Constraint (Text)
```tsx
<div className="max-w-2xl space-y-3">
  {/* Content limited to 2xl width */}
</div>
```

---

## Spacing Reference

### Vertical Gaps (Space-Y)
- `space-y-4`: 1rem gap (mobile)
- `space-y-6`: 1.5rem gap (tablet)
- `space-y-8`: 2rem gap (desktop)

### Horizontal Padding
- `px-3`: 0.75rem (mobile)
- `px-4`: 1rem (mobile)
- `px-6`: 1.5rem (tablet)
- `px-8`: 2rem (desktop)

### Gap Classes
- `gap-1`: 0.25rem
- `gap-2`: 0.5rem
- `gap-3`: 0.75rem
- `gap-4`: 1rem
- `gap-6`: 1.5rem

---

## Z-Index Stacking

```
z-50  ← Dialogs, overlays
z-30  ← Headers (sticky)
z-20  ← Bottom navigation (fixed)
z-0   ← Content area
```

---

## Tailwind Utilities Used in Layout

### Flexbox
- `flex flex-col` - vertical stack
- `flex flex-row` - horizontal row
- `flex-1` - grow to fill available space
- `items-center` - vertical center (flex-col) / horizontal center (flex-row)
- `items-end` - align to bottom
- `justify-between` - space between
- `justify-center` - center content
- `gap-*` - space between flex children

### Sizing
- `w-full` - 100% width
- `h-screen` - 100% viewport height
- `min-h-screen` - at least full viewport height
- `max-w-app` - 72rem (app max width)
- `max-w-{size}` - limit content width

### Positioning
- `sticky` - stick to viewport edge
- `fixed` - fixed to viewport
- `z-*` - z-index layers

### Spacing
- `p-*` - padding all sides
- `px-*` - padding horizontal
- `py-*` - padding vertical
- `m-*` - margin all sides
- `mx-auto` - center horizontally
- `space-y-*` - gap between vertical children
- `space-x-*` - gap between horizontal children

### Responsive Prefix
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+
- `2xl:` - 1536px+

---

## RTL Considerations

### ✅ Correct RTL Pattern
```tsx
// Uses logical properties - works RTL automatically
<div className="flex flex-row gap-3 items-center justify-between">
  <div className="ms-2">Start</div>
  <div className="me-2">End</div>
</div>
```

### ❌ Wrong RTL Pattern
```tsx
// Uses physical properties - breaks in RTL
<div className="flex flex-row gap-3 items-center justify-between">
  <div className="ml-2">Left</div>
  <div className="mr-2">Right</div>
</div>
```

### Logical Utilities
- `ms-*` / `me-*` → margin start/end
- `ps-*` / `pe-*` → padding start/end
- `start-*` / `end-*` → inset start/end
- `flex`, `flex-row`, `flex-col` → logical direction

---

## Design Tokens

### Surface Colors
| Variable | Value |
|----------|-------|
| `--surface-primary` | #060814 |
| `--surface-secondary` | #0E1220 |
| `--surface-card` | #161B2D |
| `--surface-card-elevated` | #1D243B |
| `--surface-hover` | #232A46 |

### Text Colors
| Variable | Value |
|----------|-------|
| `--text-primary` | #F7F8FC |
| `--text-secondary` | #A6ACC7 |
| `--text-muted` | #6C7491 |

### Accent
| Variable | Value |
|----------|-------|
| `--accent` | #776CFE (primary) |
| `--accent-green` | #00EA99 |
| `--accent-foreground` | #F7F8FC |

---

## Common CSS Classes

| Class | Purpose |
|-------|---------|
| `.page-container` | Page-level wrapper (spacing + max-width) |
| `.card` | Card surface (border + bg + shadow + padding) |
| `.app-shell` | App wrapper (bg + text colors) |
| `.app-header` | Sticky header (positioning + blur) |
| `.bottom-navigation` | Fixed bottom nav (positioning + styling) |
| `.icon-button` | Small icon-only button (size + bg) |
| `.mobile-container` | Responsive padding wrapper |

---

## Common Props Patterns

### Container Components
```typescript
{
  children: ReactNode;
  className?: string;
}
```

### Header Components
```typescript
{
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}
```

### Section Header
```typescript
{
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
```

### Navigation Components
```typescript
interface NavigationItem {
  id: string;
  label: ReactNode;
  href: string;
  icon?: ComponentType;
  active?: boolean;
  primary?: boolean;
}
```

---

## Import Paths

### Canonical Paths (Prefer These)
```tsx
import { PageContainer, SectionHeader } from '@/components/design-system';
import { BottomNavigation, MobileHeader } from '@/components/design-system';
```

### Compatibility Paths (Legacy)
```tsx
import { PageContainer } from '@/components/layout/page-container';
import { SectionHeader } from '@/components/design-system/layout/section-header';
```

---

## Route-Aware Header Configurations

| Route | Title | Tagline | Actions |
|-------|-------|---------|---------|
| `/library*` | کتابخانه | از اینجا به بازگشت... | Search, Create, Profile |
| `/search*` | جستجو | پیدا کردن مسیر... | Search, Profile |
| `/creator*` | سازنده | از اولین انتشار... | Search, Profile |
| `/profile*` | پروفایل | تنظیمات و حساب... | - |
| `/community*` | اجتماع | از گوش دادن تا... | Search, Profile |
| `/create*` | ایجاد | از ایده تا انتشار... | - |

---

## Testing Checklist

- [ ] Page renders at mobile width
- [ ] Page renders at tablet width (sm:)
- [ ] Page renders at desktop width (lg:)
- [ ] Text flows correctly RTL (Persian)
- [ ] Bottom nav hidden on md: width
- [ ] Desktop nav hidden on mobile
- [ ] Focus rings visible on interactive elements
- [ ] Touch targets at least 44x44px
- [ ] Safe area insets respected on notched devices
- [ ] Theme toggle works (light/dark)
- [ ] Navigation active state shows correctly
- [ ] Max-width container centers properly

---

## Common Issues & Solutions

### Issue: Content too wide on desktop
**Solution**: Wrap in `PageContainer` or use `max-w-app mx-auto`

### Issue: Navigation hidden on mobile
**Solution**: Use `md:hidden` for bottom nav, `hidden md:flex` for desktop nav

### Issue: Padding inconsistent
**Solution**: Use `mobile-container` wrapper or `px-3 sm:px-6 lg:px-8` pattern

### Issue: RTL layout broken
**Solution**: Check for physical `ml-`/`mr-`, replace with logical `ms-`/`me-`

### Issue: Theme not switching
**Solution**: Check `ThemeBoundary` is wrapping content, verify localStorage key

### Issue: Bottom nav overlaps content
**Solution**: Add `pb-24 sm:pb-28` to content (`page-container` does this)

---

**Last Updated**: 2026-08-13  
**Version**: 1.0  
**Scope**: Castaminofen v4.5+ layout system
