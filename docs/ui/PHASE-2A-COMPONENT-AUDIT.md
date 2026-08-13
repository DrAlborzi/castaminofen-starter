# Phase 2A — Component Architecture Audit

Date: 2026-08-13
Status: Analysis complete
Scope: Audit only; no source code or dependency changes

## Executive Summary

The repo already contains a mature but uneven component layer. The strongest assets are the feature ownership model, the design-system boundary, and the shared page/state primitives. The biggest risk is not missing architecture; it is inconsistency: a small number of shared primitives are duplicated, naming is not canonical, and many higher-order components are effectively feature-specific wrappers around custom logic rather than reusable design primitives.

The repository does not presently have a clean, fully adopted design-system layer for form, overlay, and navigation primitives. It has a workable custom system, but it is not yet consistent enough to justify a broad migration away from custom components. The safest Phase 2 is therefore narrow: standardize API conventions, fix the canonical shared set, and add a small number of missing primitives without trying to replace the entire system.

## Source-of-Truth Check and Prior-Report Discrepancies

This audit uses the actual repository as the source of truth.

Discrepancies observed against earlier reports:

- The repo still uses a custom theme boundary in [apps/web/src/components/layout/theme-boundary.tsx](apps/web/src/components/layout/theme-boundary.tsx) and the app shell wraps content with it in [apps/web/src/components/layout/app-shell.tsx](apps/web/src/components/layout/app-shell.tsx). Earlier documents recommended migrating to next-themes, but the codebase has not yet adopted it.
- Prior reports describe a large component library and a high level of completion, but actual inventory shows a hybrid architecture: a sizable shared layer plus many feature-specific components with overlapping responsibilities.
- The repo does contain multiple shared primitives, but the form/overlay stack is still incomplete rather than fully available.
- The component system is not fully standardized around a single naming model. `Badge` and `Tag` both represent metadata pills, while the layout layer duplicates the same mobile navigation concept in multiple directories.

In other words: the repo is functionally stable and far more mature than a blank-slate app, but the architecture is still in a partially consolidated stage rather than a fully normalized design system.

## Component Inventory Summary

### Quantitative Snapshot

From repository inspection:

- 76 files under [apps/web/src/components](apps/web/src/components)
- 48 files under [apps/web/src/components/design-system](apps/web/src/components/design-system)
- 13 files under [apps/web/src/components/layout](apps/web/src/components/layout)
- Many additional feature-owned components under [apps/web/src/features](apps/web/src/features)

### Shared / Reusable Component Inventory

A. Design-system primitive candidates:

- Button — [apps/web/src/components/design-system/common/button.tsx](apps/web/src/components/design-system/common/button.tsx)
- Card — [apps/web/src/components/design-system/common/card.tsx](apps/web/src/components/design-system/common/card.tsx)
- Badge — [apps/web/src/components/design-system/common/badge.tsx](apps/web/src/components/design-system/common/badge.tsx)
- Tag — [apps/web/src/components/design-system/common/tag.tsx](apps/web/src/components/design-system/common/tag.tsx)
- Chip — [apps/web/src/components/design-system/common/chip.tsx](apps/web/src/components/design-system/common/chip.tsx)
- IconButton — [apps/web/src/components/design-system/common/icon-button.tsx](apps/web/src/components/design-system/common/icon-button.tsx)
- Input — [apps/web/src/components/design-system/forms/input.tsx](apps/web/src/components/design-system/forms/input.tsx)
- Field — [apps/web/src/components/design-system/forms/field.tsx](apps/web/src/components/design-system/forms/field.tsx)
- Avatar — [apps/web/src/components/design-system/identity/avatar.tsx](apps/web/src/components/design-system/identity/avatar.tsx)
- LoadingState — [apps/web/src/components/design-system/states/loading-state.tsx](apps/web/src/components/design-system/states/loading-state.tsx)
- ErrorState — [apps/web/src/components/design-system/states/error-state.tsx](apps/web/src/components/design-system/states/error-state.tsx)
- EmptyState — [apps/web/src/components/design-system/states/empty-state.tsx](apps/web/src/components/design-system/states/empty-state.tsx)
- MiniPlayer — [apps/web/src/components/design-system/player/mini-player.tsx](apps/web/src/components/design-system/player/mini-player.tsx)
- ProgressIndicator — [apps/web/src/components/design-system/player/progress-indicator.tsx](apps/web/src/components/design-system/player/progress-indicator.tsx)
- TimelineMarker — [apps/web/src/components/design-system/player/timeline-marker.tsx](apps/web/src/components/design-system/player/timeline-marker.tsx)
- MediaCard — [apps/web/src/components/design-system/media/media-card.tsx](apps/web/src/components/design-system/media/media-card.tsx)
- ContentArtwork — [apps/web/src/components/design-system/media/content-artwork.tsx](apps/web/src/components/design-system/media/content-artwork.tsx)
- MediaRow — [apps/web/src/components/design-system/media/media-row.tsx](apps/web/src/components/design-system/media/media-row.tsx)
- MediaMetadata — [apps/web/src/components/design-system/media/media-metadata.tsx](apps/web/src/components/design-system/media/media-metadata.tsx)
- Duration — [apps/web/src/components/design-system/media/duration.tsx](apps/web/src/components/design-system/media/duration.tsx)
- PlaybackAffordance — [apps/web/src/components/design-system/media/playback-affordance.tsx](apps/web/src/components/design-system/media/playback-affordance.tsx)
- BottomNavigation — [apps/web/src/components/design-system/navigation/bottom-navigation.tsx](apps/web/src/components/design-system/navigation/bottom-navigation.tsx)
- DesktopNavigation — [apps/web/src/components/design-system/navigation/desktop-navigation.tsx](apps/web/src/components/design-system/navigation/desktop-navigation.tsx)
- MobileHeader — [apps/web/src/components/design-system/navigation/mobile-header.tsx](apps/web/src/components/design-system/navigation/mobile-header.tsx)
- PageContainer — [apps/web/src/components/design-system/layout/page-container.tsx](apps/web/src/components/design-system/layout/page-container.tsx)
- SectionHeader — [apps/web/src/components/design-system/layout/section-header.tsx](apps/web/src/components/design-system/layout/section-header.tsx)

### Feature Components Requiring Ownership Boundaries

- Player bar and player panels: [apps/web/src/features/player/components/PlayerBar.tsx](apps/web/src/features/player/components/PlayerBar.tsx)
- Library category tabs: [apps/web/src/features/library/components/LibraryCategoryTabs.tsx](apps/web/src/features/library/components/LibraryCategoryTabs.tsx)
- Playlist dialog: [apps/web/src/features/playlists/components/PlaylistFormDialog.tsx](apps/web/src/features/playlists/components/PlaylistFormDialog.tsx)
- Podcast and episode cards: [apps/web/src/features/podcasts/PodcastCard.tsx](apps/web/src/features/podcasts/PodcastCard.tsx), [apps/web/src/features/episodes/EpisodeCard.tsx](apps/web/src/features/episodes/EpisodeCard.tsx)
- Collection and row components in library and search features

## Classification

### A. Design-System Primitive

- Button
- Card
- Badge
- Tag
- Chip
- IconButton
- Input
- Field
- Avatar
- LoadingState
- ErrorState
- EmptyState
- MediaCard
- ContentArtwork
- Duration
- PlaybackAffordance
- PageContainer
- SectionHeader

### B. Design-System Composite

- MobileHeader
- BottomNavigation
- DesktopNavigation
- MediaRow
- MediaMetadata
- MiniPlayer
- LibraryCategoryTabs (feature-coded but close to a composite)

### C. Layout

- AppShell — [apps/web/src/components/layout/app-shell.tsx](apps/web/src/components/layout/app-shell.tsx)
- MobileHeader — layout implementation — [apps/web/src/components/layout/mobile-header.tsx](apps/web/src/components/layout/mobile-header.tsx)
- BottomNavigation — layout implementation — [apps/web/src/components/layout/bottom-navigation.tsx](apps/web/src/components/layout/bottom-navigation.tsx)
- ThemeBoundary — [apps/web/src/components/layout/theme-boundary.tsx](apps/web/src/components/layout/theme-boundary.tsx)

### D. Feature Component

- PlayerBar
- PlayerControls
- PlayerProgress
- QueuePanel
- PlaylistCard
- PlaylistFormDialog
- LibraryCollectionCard
- SearchResultCard
- PodcastCard
- EpisodeCard
- CreatorPanel
- BookmarkPanel

### E. Page-Level Component

- HomePage, library pages, podcast detail pages, playlist detail pages, settings page, auth forms, onboarding screens

### F. Infrastructure

- ThemeBoundary
- AppProviders or layout wrappers
- Error boundaries and page states wrapping route-level UI

## Duplication Analysis

### 1) Button / Card / Badge Aliasing and Redundant APIs

There are multiple access paths for essentially the same primitives.

Examples:

- [apps/web/src/components/design-system/common/button.tsx](apps/web/src/components/design-system/common/button.tsx)
- [apps/web/src/components/ui/button.tsx](apps/web/src/components/ui/button.tsx)
- [apps/web/src/components/design-system/common/card.tsx](apps/web/src/components/design-system/common/card.tsx)
- [apps/web/src/components/ui/card.tsx](apps/web/src/components/ui/card.tsx)
- [apps/web/src/components/design-system/common/badge.tsx](apps/web/src/components/design-system/common/badge.tsx)
- [apps/web/src/components/ui/badge.tsx](apps/web/src/components/ui/badge.tsx)

This is not a functional bug, but it creates ambiguity about the canonical shared implementation.

### 2) Mobile Navigation Duplicates

The same responsibility exists in both layout and design-system directories:

- [apps/web/src/components/layout/bottom-navigation.tsx](apps/web/src/components/layout/bottom-navigation.tsx)
- [apps/web/src/components/design-system/navigation/bottom-navigation.tsx](apps/web/src/components/design-system/navigation/bottom-navigation.tsx)
- [apps/web/src/components/layout/mobile-header.tsx](apps/web/src/components/layout/mobile-header.tsx)
- [apps/web/src/components/design-system/navigation/mobile-header.tsx](apps/web/src/components/design-system/navigation/mobile-header.tsx)

The layout version is the runtime app shell. The design-system version is a more general component. The repo currently has both active layers.

### 3) Metadata Tagging Redundancy

`Badge` and `Tag` are near-duplicates for metadata chips and status labels.

- [apps/web/src/components/design-system/common/badge.tsx](apps/web/src/components/design-system/common/badge.tsx)
- [apps/web/src/components/design-system/common/tag.tsx](apps/web/src/components/design-system/common/tag.tsx)

The difference is mostly visual and semantics, not structural. This should be consolidated into one canonical primitive or a strongly documented split.

### 4) Form Controls Are Only Partially Shared

The form layer currently exposes only Input and Field. Many feature forms reimplement raw HTML elements with minimal standardization.

Examples:

- [apps/web/src/features/playlists/components/PlaylistFormDialog.tsx](apps/web/src/features/playlists/components/PlaylistFormDialog.tsx)
- [apps/web/src/components/ui/form.tsx](apps/web/src/components/ui/form.tsx)

The repo is still using a mix of:

- custom form wrappers
- raw HTML form controls
- feature-level form field duplication

### 5) Page and State Wrappers Are Repeated Across Features

Several feature-level components reinvent loading, error, and empty states rather than reusing the design-system state primitives.

Examples:

- [apps/web/src/features/library/components/LibraryLoadingState.tsx](apps/web/src/features/library/components/LibraryLoadingState.tsx)
- [apps/web/src/features/playlists/components/PlaylistLoadingState.tsx](apps/web/src/features/playlists/components/PlaylistLoadingState.tsx)
- [apps/web/src/features/library/components/LibraryErrorState.tsx](apps/web/src/features/library/components/LibraryErrorState.tsx)

## Design-System Gap Analysis

### Forms

Available:

- Input — yes
- Field — yes
- Form wrappers — yes

Partially available:

- Textarea — not present as a shared primitive; raw textarea used in playlist dialog
- Select — no shared primitive
- Checkbox — no shared primitive
- Radio — no shared primitive
- Switch — no shared primitive
- Label — partial through FormLabel and Field, but not standardized for all controls
- FormField — exists but it is a wrapper, not a fully typed form solution
- FormMessage — exists but not used consistently

Missing / critical gaps:

- Textarea
- Select
- Checkbox
- Radio
- Switch
- FormFieldGroup
- FormMessage variant support
- validation helper API

### Overlays

Available:

- None in shared design-system form

Missing:

- Dialog
- AlertDialog
- Sheet
- Drawer
- Popover
- DropdownMenu
- ContextMenu
- Tooltip

Current custom implementations exist ad hoc in feature UIs, especially modal-like patterns for dialogs and drawers.

### Navigation

Available:

- BottomNavigation
- DesktopNavigation
- MobileHeader
- PageContainer
- SectionHeader

Partially available:

- Tabs are custom in feature code, e.g. LibraryCategoryTabs

Missing:

- Tabs
- Accordion
- Breadcrumb
- Pagination
- NavigationMenu

### Feedback

Available:

- LoadingState
- ErrorState
- EmptyState
- Alert
- Toast

Partial / inconsistent:

- Toast exists but is not clearly standardized or adopted across features
- Skeleton is not strongly represented as a design-system primitive; the repo uses pulse/loading patterns rather than a dedicated skeleton primitive
- Spinner is effectively represented by LoaderCircle inside LoadingState, not a reusable primitive

Missing:

- Sonner or standard toast stack
- dedicated Skeleton primitive
- Progress bar component beyond custom player-specific progress

### Data Display

Available:

- Badge
- Card
- Avatar
- MediaCard
- MediaRow
- MediaMetadata

Missing:

- Table
- Separator
- proper generic list item primitives

### Utilities

Available:

- ContentArtwork
- Duration
- PlaybackAffordance

Missing:

- ScrollArea
- Command
- Collapsible

## API Consistency Audit

### Naming Inconsistencies

Examples:

- `variant` vs `type` vs `kind` are used interchangeably in shared UI and state wrappers.
- `loading` is used in Button, but other components use `isLoading`-style naming patterns in their surrounding logic.
- `Badge` and `Tag` both serve metadata styling but are not functionally differentiated.
- `PageContainer` and `SectionHeader` are often used without a standard object config API; they are more templates than reusable component contracts.

### Composition Patterns

- Field clones child props to inject `id`, `aria-describedby`, and `aria-invalid`. This creates a rigid API contract based on the child element and is only safe when children are a specific control.
- `MediaCard` accepts a weave of `title`, `subtitle`, `meta`, `artwork`, `actions`, `playback`, and `children`, making it flexible but not yet uniform with other cards.
- Feature dialogs are custom wrappers that mix form logic, modal shell, and feature-specific semantics in one component.

### Accessibility API Patterns

- Button handles `aria-busy` correctly.
- LoadingState exposes `announce` and `variant` with a good pattern.
- Field wires label/error descriptions correctly.
- Player components rely mostly on custom focus states and ARIA labels.

However:

- Many custom dialogs are still plain `div` overlays with `role="dialog"` rather than a standardized headless primitive.
- Tabs in library are a custom `role="tablist"` pattern without a shared primitive contract.
- there is no shared `Dialog`, `Popover`, or `DropdownMenu` abstraction to enforce consistent semantics.

### Problematic API Examples

1. `Button` exposes `variant` and `size`, but the library still has multiple wrappers and legacy alias paths.
2. `Field` requires the child input to accept `id` and validation props; this is a fragile composition contract.
3. `Badge` and `Tag` overlap in semantics while using different styling rules.
4. `MediaCard` is generic enough to be used almost anywhere but is still effectively a content-card pattern rather than a truly design-system-neutral primitive.
5. `PlaylistFormDialog` mixes modal shell + form logic + validation + layout while keeping accessible labeling ad hoc.

## Radix / shadcn Decision Matrix

| Primitive / Pattern | Current implementation | Radix benefit | shadcn benefit | Migration cost | Recommendation |
|---|---|---|---|---|---|
| Button | Custom, stable | Low | Low | Low | KEEP CUSTOM |
| Input | Custom | Low | Low | Low | IMPROVE CUSTOM |
| Textarea | Missing | Medium | High | Low | ADOPT SHADCN |
| Select | Missing | High | High | Medium | ADOPT SHADCN |
| Checkbox | Missing | Medium | High | Low | ADOPT SHADCN |
| Radio | Missing | Medium | High | Low | ADOPT SHADCN |
| Switch | Missing | Medium | High | Low | ADOPT SHADCN |
| Dialog | Custom ad hoc | High | High | Medium | ADOPT SHADCN |
| Sheet | Custom ad hoc | High | High | Medium | ADOPT SHADCN |
| Popover | Missing | High | High | Medium | ADOPT SHADCN |
| Tooltip | Missing | High | High | Low | ADOPT RADIX |
| Tabs | Custom feature tabs | High | High | Low | ADOPT RADIX |
| Accordion | Missing | Medium | Medium | Low | DEFER |
| Breadcrumb | Not currently a first-class primitive | Low | Low | Low | DEFER |
| Pagination | Not currently a first-class primitive | Low | Medium | Low | DEFER |
| NavigationMenu | Missing / not necessary | Medium | Medium | Medium | DEFER |
| Toast | Existing custom or partial | Medium | High | Low | ADOPT SHADCN |
| Alert | Partial custom | Low | Medium | Low | IMPROVE CUSTOM |
| Progress | Player-specific only | Medium | Medium | Low | KEEP CUSTOM |
| Skeleton | Not explicit | Low | Medium | Low | IMPROVE CUSTOM |
| Card | Custom but stable | Low | Low | Low | KEEP CUSTOM |
| Badge | Stable custom | Low | Low | Low | KEEP CUSTOM |
| Avatar | Stable custom | Low | Low | Low | KEEP CUSTOM |
| Table | Missing | Medium | High | Medium | DEFER |
| ScrollArea | Missing | High | Medium | Low | ADOPT RADIX |
| Command | Missing / unnecessary for current app | Medium | Medium | Medium | DEFER |
| Collapsible | Missing | Medium | Medium | Low | DEFER |

## Special Case Analysis

### Player Architecture

Protected from broad migration:

- PlayerBar — [apps/web/src/features/player/components/PlayerBar.tsx](apps/web/src/features/player/components/PlayerBar.tsx)
- PlayerControls — [apps/web/src/features/player/components/PlayerControls.tsx](apps/web/src/features/player/components/PlayerControls.tsx)
- PlayerProgress — [apps/web/src/features/player/components/PlayerProgress.tsx](apps/web/src/features/player/components/PlayerProgress.tsx)
- PlayerVolume — [apps/web/src/features/player/components/PlayerVolume.tsx](apps/web/src/features/player/components/PlayerVolume.tsx)
- TimelineMarkers — [apps/web/src/features/player/components/TimelineMarkers.tsx](apps/web/src/features/player/components/TimelineMarkers.tsx)
- EpisodePlayer or immersive panels — part of player runtime architecture

These should remain feature-specific because the player is not a generic UI primitive; it is a runtime stateful system. The design-system layer should only include small, generic helpers such as a compact audio-progress control or a tiny media status token, not the full player shell.

### Media Components

Media cards and artwork have a valid design-system presence, but they are not generic enough to be incompatible with feature ownership.

Recommended split:

- Keep in design-system: `MediaCard`, `ContentArtwork`, `MediaMetadata`, `Duration`, `PlaybackAffordance`
- Keep in feature layer: `PodcastCard`, `EpisodeCard`, `PlaylistCard` wrappers that tailor data and interactions to domain semantics

This keeps the generic media primitives reusable while preserving domain-specific card behaviors and labels.

### Navigation

Ownership should be split as follows:

- Design-system: generic navigation primitives, row layouts, nav item rendering, pill tabs, etc.
- Layout: app-shell composition, mobile header, route-specific nav composition, floating bottom nav placement
- Features: route-specific sections and category filters (for example, library tabs)

This boundary reduces duplication while preserving route-aware logic at the app shell layer.

## Ownership Rules

1. Design-system owns generic, stateless, reusable UI that can be used across multiple features.
2. Layout owns application shell composition and route-aware navigation semantics.
3. Features own domain models, business rules, and route-specific interactions.
4. No feature component should be promoted to a design-system primitive unless it is genuinely generic and reused across at least two independent feature domains.
5. Duplicate wrappers must be consolidated to one canonical implementation and one public import path.

## Target Architecture

The repo should evolve toward a lean architecture like this:

```text
apps/web/src/
  components/
    design-system/
      common/
      forms/
      layout/
      navigation/
      media/
      player/
      states/
      identity/
      social/
    layout/
      app-shell/
      shell-config/
      route-shells/
    ui/
      legacy-exports/
  features/
    auth/
    player/
    podcast/
    episodes/
    library/
    playlists/
    search/
    settings/
    profile/
```

This is not a ground-up rewrite. It is a normalization of the current structure in place, with clearer responsibilities and stricter canonical ownership.

## Migration Priority

| Priority | Change | Effort | Risk |
|---|---|---|---|
| P0 | Canonicalize shared primitive ownership and remove duplicate export paths | S | Low |
| P0 | Standardize API conventions: `Button`, `Field`, `Badge`/`Tag`, `LoadingState`/`ErrorState` | S | Low |
| P0 | Add missing form primitives: Textarea, Select, Checkbox, Radio, Switch | M | Medium |
| P1 | Add dialog/sheet/popover primitive layer via shadcn/Radix pattern | M | Medium |
| P1 | Replace custom tab pattern in library with a shared tabs primitive | S | Low |
| P1 | Consolidate layout navigation duplication | S | Low |
| P2 | Evaluate toast and skeleton primitives | S | Low |
| P2 | Standardize more feature cards around a media/card API | M | Medium |
| P3 | Deal with broader table/scroll area/command utilities if needed later | M | Medium |

## Phase 2 Scope Recommendation

Phase 2 should not attempt to modernize the whole component library. The narrowest safe scope is:

1. Canonicalize and document the public API of the current shared primitives.
2. Introduce a small missing primitive set for forms and dialogs.
3. Keep player and media feature architecture intentionally custom.
4. Consolidate duplicate navigation and metadata component paths.
5. Add regression-oriented component testing rather than a wide refactor.

This keeps Phase 2 small, safe, and high-value.

## Final Decision

# Phase 2A Decision

## Keep

- Button
- Card
- Badge
- Input
- Field
- LoadingState
- ErrorState
- EmptyState
- MediaCard
- ContentArtwork
- Duration
- AppShell
- PageContainer
- SectionHeader
- DesktopNavigation and BottomNavigation as layout-level patterns

## Improve

- `Tag` vs `Badge` semantics and naming
- `Field` composition API and validation ergonomics
- shared form helpers and state patterns
- layout navigation ownership and canonical import paths
- feature-level custom tabs and form patterns for consistency

## Migrate

- Dialog/sheet/popover primitives to a shared Radix/shadcn-based implementation
- Tabs primitive from custom role-based pattern to a standard tabs primitive
- Textarea/select/checkbox/radio/switch primitives to a standardized shared layer
- Toast primitive if the app adopts a general notification system

## Create

- dedicated shared form primitives for textarea, select, checkbox, radio, switch
- a shared dialog/sheet primitive layer
- a canonical navigation-tab primitive
- explicit helper patterns for form field groups and validation messages

## Remove / Consolidate

- duplicate export paths under legacy `ui/` and design-system aliasing
- `Badge` / `Tag` duality
- duplicate layout nav implementations
- overlapping feature-specific loading/error wrappers that duplicate shared design-system state wrappers

## Defer

- table, command pattern, navigation menu, collapsible, breadcrumb, pagination, broader design-system expansion
- full migration of all media card wrappers
- high-volume app-wide UI replatforming

## Conclusion

The codebase already has a workable design-system foundation. The highest-value Phase 2 work is not a rewrite; it is a controlled normalization of component ownership, API conventions, and the missing form/overlay primitives. The player and media domains should remain custom and feature-owned, while the shared primitives should become more consistent and less duplicated.

This aligns with the actual repo state and keeps the scope narrow enough for a safe Phase 2.
