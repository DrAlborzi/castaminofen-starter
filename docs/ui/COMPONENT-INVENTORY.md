# Component Inventory & Analysis
**Castaminofen Frontend**

**Date:** August 13, 2026  
**Last Updated:** During Phase 0 Audit  
**Status:** Complete inventory with refactor recommendations

---

## Component Classification

Components are organized by architectural layer:

1. **Primitives** — Low-level, reusable UI elements (Button, Card, etc.)
2. **Composite** — Mid-level components combining primitives (MediaCard, FormField)
3. **Feature** — High-level feature-specific components (LibraryPage, PlayerBar)
4. **Page** — Route pages combining features and layouts

---

## Primitive Components (Design System)

### Directory: `components/design-system/common/`

#### Button
- **File**: `button.tsx`
- **Purpose**: Primary interactive element
- **Variants**: `primary`, `secondary`, `ghost`, `destructive`
- **Sizes**: `sm` (12px), `md` (16px), `lg` (20px)
- **Props**: 
  - `variant?: ButtonVariant`
  - `size?: ButtonSize`
  - `loading?: boolean`
  - `disabled?: boolean`
- **Status**: ✅ Well-designed, should be baseline for all buttons
- **Refactor**: Extract size logic into separate sized variants
- **Used By**: ~30+ components, 50+ instances

#### Card
- **File**: `card.tsx`
- **Purpose**: Container for grouped content
- **Variants**: `default`, `interactive`, `selected`, `playing`, `queued`, `disabled`
- **Props**:
  - `variant?: CardVariant`
  - `role?: string`
- **Status**: ✅ Solid, but should add semantic variants
- **Refactor**: Add `clickable`, `focusable` variants for accessibility
- **Used By**: ~20 components, 100+ instances

#### Badge
- **File**: `badge.tsx`
- **Purpose**: Small label/tag for metadata
- **Variants**: `default`, `accent`, `success`, `warning`, `error`
- **Status**: ✅ Simple, works well
- **Used By**: ~8 components, metadata displays

#### Chip
- **File**: `chip.tsx`
- **Purpose**: Selectable tag (filter, toggle)
- **Props**: `active?: boolean`
- **Status**: ⚠️ Good but underutilized
- **Usage**: Only in filters/selections
- **Refactor**: Could be used more for category selections

#### Tag
- **File**: `tag.tsx`
- **Purpose**: Metadata label (similar to Badge)
- **Status**: ⚠️ Duplicate functionality with Badge
- **Refactor**: Consolidate with Badge or differentiate use cases
- **Used By**: 5 components

#### IconButton
- **File**: `icon-button.tsx`
- **Purpose**: Small clickable icon
- **Props**: `label: string` (required, `aria-label`)
- **Status**: ✅ Accessible, well-implemented
- **Used By**: ~15 components

#### Common Test Suite
- **File**: `common-primitives.test.tsx`
- **Status**: ✅ Tests exist for rendering, accessibility
- **Coverage**: Button, IconButton rendering, basic a11y

---

### Directory: `components/design-system/forms/`

#### Input
- **File**: `input.tsx`
- **Purpose**: Text input field
- **Props**: Standard HTML input attributes
- **Status**: ✅ Basic, functional
- **Missing**: 
  - Textarea variant
  - Error state styling
  - Loading state (for async validation)
- **Refactor**: Add comprehensive variants, async validation UI

#### Field
- **File**: `field.tsx`
- **Purpose**: Form field wrapper (Label + Input + Error)
- **Props**:
  - `label?: string`
  - `error?: string`
  - `helperText?: string`
  - `children`: form control
- **Status**: ✅ Good wrapper pattern
- **Used By**: Forms (auth, creation, etc.)
- **Refactor**: Extend to support more input types

#### Missing Form Components
- ❌ Textarea
- ❌ Select / Combobox
- ❌ Checkbox
- ❌ Radio
- ❌ Switch/Toggle
- ❌ Slider
- ❌ Date Picker
- **Effort**: Should add as part of shadcn/ui adoption

---

### Directory: `components/design-system/layout/`

#### AppShell
- **File**: `app-shell.tsx`
- **Purpose**: Root layout wrapper
- **Props**: `children: ReactNode`
- **Renders**: Header, Navigation, Content, Player
- **Status**: ✅ Well-structured, handles routing logic
- **Config**: Uses `AppShellConfig` for route-specific behavior

#### MobileContainer
- **File**: `mobile-container.tsx`
- **Purpose**: Mobile viewport wrapper
- **Status**: ✅ Handles safe area insets
- **Used By**: AppShell

#### MobileHeader
- **File**: `mobile-header.tsx`
- **Purpose**: Top header bar
- **Props**: `pathname: string`
- **Renders**: Logo, Title, Navigation, Actions
- **Status**: ✅ Responsive, feature detection works
- **Shows/Hides Based On**: Route (config-driven)

#### PageContainer
- **File**: `page-container.tsx`
- **Purpose**: Content max-width wrapper
- **Tailwind Classes**: `mx-auto flex w-full max-w-app flex-col px-3 pb-24 pt-5 sm:px-6 sm:pb-28 lg:px-8 lg:pt-6`
- **Status**: ✅ Good, but padding varies per page
- **Refactor**: Standardize padding, consider variants

#### SectionHeader
- **File**: `section-header.tsx`
- **Purpose**: Section title with optional tag/description
- **Props**: `title`, `tag`, `description`, `action`
- **Status**: ✅ Reusable section header pattern
- **Used By**: Library, Discovery, Podcast pages

#### ThemeBoundary
- **File**: `theme-boundary.tsx`
- **Purpose**: Theme provider wrapper
- **Status**: ⚠️ Exists but light mode not functional
- **Refactor**: Complete implementation with next-themes

#### BottomNavigation
- **File**: `bottom-navigation.tsx` (also in design-system/navigation/)
- **Purpose**: Mobile navigation bar
- **Props**: `pathname: string`
- **Renders**: 5 nav items + floating FAB
- **Status**: ✅ Excellent mobile navigation design
- **Features**: Active state, responsive sizing

#### DesktopNavigation
- **File**: `desktop-navigation.tsx`
- **Purpose**: Desktop navigation menu
- **Status**: ⚠️ Incomplete, not fully integrated
- **Refactor**: Complete for desktop layout support

#### ContentCarousel
- **File**: `content-carousel.tsx`
- **Purpose**: Horizontal scrollable content
- **Status**: ✅ Works for section carousels
- **Used By**: Discovery, Library

---

### Directory: `components/design-system/media/`

#### MediaCard
- **File**: `media-card.tsx`
- **Purpose**: Podcast/Episode card (main content card)
- **Props**:
  - `image?: string`
  - `title: string`
  - `subtitle?: string`
  - `description?: string`
  - `metadata?: MetadataItem[]`
  - `onClick?: () => void`
  - `actionMenu?: MenuItem[]`
- **Variants**: Can show play button, download button, etc.
- **Status**: ✅ Core component, well-used
- **Used By**: ~20 components
- **Instances**: ~100+

#### ContentArtwork
- **File**: `content-artwork.tsx`
- **Purpose**: Image display with fallback (artwork/album art)
- **Props**: 
  - `src?: string`
  - `alt?: string`
  - `size?: 'sm' | 'md' | 'lg' | 'xl'`
  - `fallback?: ReactNode`
- **Status**: ⚠️ Fallback exists but placeholder visual unclear
- **Refactor**: Add branded fallback design
- **Used By**: ~15 components

#### MediaRow
- **File**: `media-row.tsx`
- **Purpose**: Horizontal media item (episode in list)
- **Props**: Episode/Podcast data + actions
- **Status**: ✅ Good for list presentations
- **Used By**: Episode lists, search results

#### MediaMetadata
- **File**: `media-metadata.tsx`
- **Purpose**: Display podcast/episode metadata
- **Props**: Metadata items array
- **Status**: ✅ Flexible metadata display
- **Used By**: Podcast detail, Episode detail

#### Duration
- **File**: `duration.tsx`
- **Purpose**: Format and display duration (RTL-aware)
- **Props**: `seconds: number`
- **Status**: ✅ RTL support proper (`dir="ltr"`)
- **Used By**: ~20 components

#### PlaybackAffordance
- **File**: `playback-affordance.tsx`
- **Purpose**: Play/Pause icon overlay
- **Props**: `state`, `onClick`, `aria-label`
- **Status**: ✅ Accessible, shows playback state
- **Used By**: MediaCard, Search results

#### CreatorCard
- **File**: `creator-card.tsx`
- **Purpose**: Show creator/author card
- **Status**: ✅ Used in podcast detail
- **Used By**: Podcast detail, Creator pages

#### MediaCarousel
- **File**: `media-carousel.tsx`
- **Purpose**: Scrollable carousel of media items
- **Status**: ✅ Reusable carousel pattern
- **Used By**: Home, Discovery sections

---

### Directory: `components/design-system/player/`

#### MiniPlayer
- **File**: `mini-player.tsx`
- **Purpose**: Compact player bar (bottom of screen)
- **Props**: 
  - `currentEpisode?: Episode`
  - `isPlaying: boolean`
  - `onPlay?: () => void`
  - `onPause?: () => void`
  - `onExpand?: () => void`
- **Status**: ✅ Good baseline
- **Refactor**: Add expand affordance, improve mobile touch targets

#### PlayerProgress
- **File**: `PlayerProgress.tsx`
- **Purpose**: Timeline progress bar with seek
- **Props**: 
  - `currentTime: number`
  - `duration: number`
  - `onSeek?: (time: number) => void`
- **Status**: ✅ Works, has aria-label
- **Used By**: MiniPlayer, Full player

#### ProgressIndicator
- **File**: `progress-indicator.tsx`
- **Purpose**: Generic progress bar (audio or other)
- **Props**: `value`, `max`, `aria-label`
- **Status**: ✅ Accessible (`role="progressbar"`)
- **Used By**: Player, Download status

#### TimelineMarker
- **File**: `timeline-marker.tsx`
- **Purpose**: Marker for timeline (bookmarks, comments)
- **Status**: ⚠️ Limited use, could be more visible
- **Used By**: Advanced player features

#### PlayerVolume
- **File**: `PlayerVolume.tsx`
- **Purpose**: Volume control slider
- **Status**: ✅ Works for player
- **Used By**: PlayerBar

#### PlayerControls
- **File**: `PlayerControls.tsx`
- **Purpose**: Play, Pause, Skip, Previous buttons
- **Status**: ✅ Core player controls
- **Used By**: PlayerBar

#### PlayerInfo
- **File**: `PlayerInfo.tsx`
- **Purpose**: Show current playing episode info
- **Status**: ✅ Displays episode/podcast info
- **Used By**: PlayerBar

#### ImmersivePlayerPanel
- **File**: `ImmersivePlayerPanel.tsx`
- **Purpose**: Full-screen player experience
- **Status**: ⚠️ Complex, many sub-panels
- **Used By**: Full player view (less common path)

---

### Directory: `components/design-system/identity/`

#### Avatar
- **File**: `avatar.tsx`
- **Purpose**: User/Creator profile picture
- **Props**: 
  - `src?: string`
  - `alt: string`
  - `size?: 'sm' | 'md' | 'lg'`
  - `fallback?: string`
- **Status**: ✅ Basic, good
- **Used By**: Profile, Creator cards, Comments

#### UserBadge
- **File**: `user-badge.tsx`
- **Purpose**: User indicator
- **Status**: ✅ Simple identifier
- **Used By**: Subscription states

#### CreatorBadge
- **File**: `creator-badge.tsx`
- **Purpose**: Creator indicator badge
- **Status**: ✅ Identifies creator content
- **Used By**: Podcast cards, Episode cards

---

### Directory: `components/design-system/states/`

#### LoadingState
- **File**: `loading-state.tsx`
- **Purpose**: Display loading feedback
- **Props**: 
  - `message?: string`
  - `announce?: boolean` (for aria-live)
- **Status**: ✅ Used extensively
- **Instances**: ~30+ pages use LoadingState

#### EmptyState
- **File**: `empty-state.tsx`
- **Purpose**: Show empty content with CTA
- **Props**: 
  - `title: string`
  - `description?: string`
  - `icon?: ReactNode`
  - `action?: CTA`
- **Status**: ✅ Good pattern, contextual messages needed
- **Used By**: Library, Playlists, Search

#### ErrorState
- **File**: `error-state.tsx`
- **Purpose**: Show error with recovery
- **Props**: 
  - `message: string`
  - `kind?: 'page' | 'card' | 'inline'`
  - `onRetry?: () => void`
- **Status**: ✅ Basic error display
- **Refactor**: Add more specific error messages
- **Used By**: ~10 pages

#### SuccessState
- **File**: `success-state.tsx`
- **Purpose**: Confirmation feedback
- **Status**: ✅ Simple success message
- **Used By**: Form submissions

#### OfflineState
- **File**: `offline-state.tsx`
- **Purpose**: Network connectivity feedback
- **Status**: ✅ Shows offline status
- **Used By**: Offline library, Player

#### UnsupportedState
- **File**: `unsupported-state.tsx`
- **Purpose**: Feature not available
- **Status**: ✅ For unavailable features
- **Used By**: Advanced player features

#### PartialState
- **File**: `partial-state.tsx`
- **Purpose**: Partial/incomplete content
- **Status**: ✅ For incomplete data states
- **Used By**: Library (when loading some items)

#### Alert
- **File**: `alert.tsx`
- **Purpose**: Alert/warning box
- **Props**: 
  - `kind?: 'info' | 'warning' | 'error' | 'success'`
  - `title?: string`
  - `message: string`
  - `action?: CTA`
- **Status**: ✅ Good alert pattern
- **Used By**: Form errors, Warnings

---

### Directory: `components/design-system/social/`

#### Reaction
- **File**: `reaction.tsx`
- **Purpose**: Like/reaction button
- **Props**: `count: number`, `liked: boolean`, `onClick`
- **Status**: ✅ Simple reaction display
- **Used By**: Episodes, Comments

#### CommentPreview
- **File**: `comment-preview.tsx`
- **Purpose**: Show comment thread preview
- **Status**: ✅ Displays comment info
- **Used By**: Episode detail, Discussion

#### DiscussionCard
- **File**: `discussion-card.tsx`
- **Purpose**: Full discussion thread card
- **Status**: ✅ Discussion display
- **Used By**: Community features

---

## Composite Components

### Directory: `components/`

#### AuthComponents
- **Path**: `auth/`
- **Components**: LoginForm, RegisterForm, ProtectedRoute, AuthRedirect
- **Status**: ✅ Auth flow complete
- **Props**: Form data, submission handlers
- **Status**: Forms could benefit from better error UX

#### PWA Components
- **Path**: `pwa/`
- **Components**: InstallBanner
- **Status**: ✅ Simple install prompt
- **Used By**: AppShell

#### UI Re-exports
- **Path**: `ui/`
- **Purpose**: Barrel exports from design-system
- **Status**: ✅ Convenience layer

---

## Feature Components

### Feature: Player (`features/player/`)

**Complexity**: ⭐⭐⭐⭐ (High)

**Components:**
1. `PlayerBar.tsx` — Mini player container
2. `PlayerControls.tsx` — Play/pause/skip UI
3. `PlayerProgress.tsx` — Timeline progress
4. `PlayerVolume.tsx` — Volume slider
5. `PlayerInfo.tsx` — Current episode info
6. `ImmersivePlayerPanel.tsx` — Full player
7. `BookmarkPanel.tsx` — Bookmark UI
8. `CreatorPanel.tsx` — Creator info panel
9. `DiscussionThreadPanel.tsx` — Comment thread
10. `MemoryPanel.tsx` — Note-taking
11. `QueuePanel.tsx` — Queue management
12. `RelatedContentPanel.tsx` — Suggested content
13. `TimelineMarkers.tsx` — Bookmarks timeline
14. `TranscriptPanel.tsx` — Transcript display

**Store**: `playerStore.ts` with 20+ actions

**Status**: ⚠️ **Feature-complete but needs UX polish**
- Mini player works well
- Full player has many features but UI is complex
- Queue management unclear
- **Refactor Need**: Simplify full player, better mobile UX

**Used By**: Every page (globally available)

---

### Feature: Discovery (`features/discovery/`)

**Complexity**: ⭐⭐⭐ (Medium)

**Components:**
1. `DiscoveryPage.tsx` — Main discovery feed
2. `DiscoverySection.tsx` — Reusable section

**Status**: ✅ **Functional, editorial feel**
- Shows podcasts, episodes, continue listening
- Good UX for discovery
- Loading states ✅

**Used By**: Home page (authenticated users)

---

### Feature: Library (`features/library/`)

**Complexity**: ⭐⭐⭐⭐ (High)

**Components:**
1. `LibraryPage.tsx` — Main library view
2. `LibraryHeader.tsx` — Header with personalization
3. `LibraryCategoryTabs.tsx` — Filter tabs
4. `ContinueListeningSection.tsx` — In-progress episodes
5. `SubscriptionsSection.tsx` — Followed podcasts
6. `LibraryEmptyState.tsx` — No content state
7. `LibraryErrorState.tsx` — Error state
8. `LibraryLoadingState.tsx` — Loading state
9. `LibraryHistorySection.tsx` — Listening history
10. `LibraryCollectionsSection.tsx` — Collections
11. `LibraryFavoritesSection.tsx` — Favorites
12. `SavedContentCarousel.tsx` — Carousel view
13. `SubscriptionActionButton.tsx` — Subscribe/Unsubscribe
14. `FavoriteActionButton.tsx` — Favorite toggle
15. `ContinueMediaSection.tsx` — In-progress section

**Status**: ✅ **Well-designed, comprehensive**
- Category filtering works
- Empty states ✅
- Loading states ✅
- Error states ✅
- Personalization metrics ✅

**Used By**: Authenticated users

---

### Feature: Search (`features/search/`)

**Complexity**: ⭐⭐⭐ (Medium)

**Components:**
1. `SearchPage.tsx` — Main search interface
2. Search input
3. Search results display
4. Category filters (optional)

**Status**: ⚠️ **Functional but needs UX**
- Search works
- Missing: Category filtering, recent searches, no-results UX
- **Refactor**: Add search refinements, better results UX

---

### Feature: Podcasts (`features/podcasts/`)

**Complexity**: ⭐⭐⭐⭐ (High)

**Components:**
1. `PodcastDetails.tsx` — Podcast detail page
2. `PodcastDetailsSkeleton.tsx` — Loading skeleton
3. `EpisodeList.tsx` — Episode list
4. `SubscriptionActionButton.tsx` — Subscribe/Unsubscribe
5. `FavoriteActionButton.tsx` — Favorite toggle
6. Creation forms (podcasts/new)
7. Edit forms (podcasts/[id]/edit)

**Status**: ✅ **Core functionality complete**
- Detail view good
- Skeleton loading ✅
- Actions work
- **Need**: Better empty podcast states

---

### Feature: Episodes (`features/episodes/`)

**Complexity**: ⭐⭐⭐ (Medium)

**Components:**
1. `EpisodeDetailView.tsx` — Episode detail
2. `EpisodeList.tsx` — List of episodes
3. Upload components (for creators)
4. Creation forms

**Status**: ✅ **Functional**
- Detail view complete
- Creator upload flow works
- **Could improve**: Mobile episode layout

---

### Feature: Playlists (`features/playlists/`)

**Complexity**: ⭐⭐⭐ (Medium)

**Components:**
1. `PlaylistPage.tsx` — Playlists list
2. `PlaylistDetail.tsx` — Single playlist
3. Playlist creation/edit
4. Reorder items (drag-drop)

**Status**: ✅ **Complete**
- CRUD operations work
- Drag-drop reorder ✅
- Loading states ✅

---

### Feature: Auth (`features/auth/`)

**Complexity**: ⭐⭐ (Low)

**Components:**
1. `LoginForm.tsx` — Login form
2. `RegisterForm.tsx` — Registration form
3. `ProtectedRoute.tsx` — Route guard
4. `AuthRedirect.tsx` — Auth redirects

**Status**: ✅ **Complete and working**
- Forms functional
- Auth flows work
- Route protection works

---

### Feature: Profile (`features/profile/`)

**Complexity**: ⭐⭐ (Low)

**Components:**
1. `ProfilePage.tsx` — User profile
2. Profile editing
3. Settings management

**Status**: ✅ **Functional but minimal**
- Shows user info
- Could have more customization

---

### Feature: Admin (`features/admin/`)

**Complexity**: ⭐⭐ (Low)

**Components:**
1. Admin dashboard
2. Moderation tools

**Status**: ⚠️ **Placeholder implementation**
- Needs proper admin panel UI
- No mobile optimization

---

### Feature: Creator (`features/creator/`)

**Complexity**: ⭐⭐⭐ (Medium)

**Components:**
1. Creator dashboard
2. Stats/analytics
3. Episode management

**Status**: ⚠️ **Incomplete**
- Needs more analytics
- UI needs polish

---

### Feature: Community (`features/community/`)

**Complexity**: ⭐⭐⭐ (Medium)

**Components:**
1. Community feed
2. Discussion threads
3. Social interactions

**Status**: ⚠️ **Works but could be better**
- Basic functionality
- UX could be improved

---

### Feature: Onboarding (`features/onboarding/`)

**Complexity**: ⭐⭐ (Low)

**Components:**
1. `WelcomeScreen.tsx` — Initial welcome
2. Onboarding steps

**Status**: ✅ **Good first experience**

---

## Component Issues & Refactor Recommendations

### Duplicate Components

| Issue | Components | Recommendation |
|-------|-----------|---|
| Badge/Tag duplication | Badge, Tag | Consolidate or differentiate use cases |
| Loading states per-feature | LibraryLoadingState, others | Use centralized LoadingState |
| Empty states scattered | LibraryEmptyState, others | Use EmptyState primitive |
| Error states scattered | LibraryErrorState, others | Use ErrorState primitive |

### Missing Components

| Component | Use Case | Priority |
|---|---|---|
| Dialog/Modal | Confirmations, forms | P1 |
| Sheet | Mobile drawer, full player | P1 |
| Tabs | Category filtering | P2 |
| Select/Combobox | Dropdown selections | P2 |
| Checkbox | Multi-select | P2 |
| Radio | Single select | P2 |
| Switch/Toggle | Settings, preferences | P2 |
| Breadcrumbs | Navigation path | P3 |
| Slider | Seek bar (exists as ProgressIndicator) | P2 |
| Date Picker | Episode date selection | P3 |

### Underutilized Components

| Component | Potential Use | Refactor |
|---|---|---|
| Chip | More category selections | Add to search filters |
| CreatorCard | Creator pages | More visibility |
| SectionHeader | Section titles | Use consistently |
| ContentCarousel | More sections | Use for recommendations |

### Overengineered Components

| Component | Issue | Simplification |
|---|---|---|
| PlayerBar | Too many features | Split full player separate |
| ImmersivePlayerPanel | Many sub-panels | Separate into modular panels |
| LibraryPage | Many sections | Could split into sub-components |

---

## Component API Improvements Needed

### Button
```tsx
// Current:
<Button variant="primary" size="md">Click</Button>

// Should support:
<Button variant="primary" size="md" loading>
<Button variant="primary" size="md" disabled>
<Button variant="primary" size="md" icon={<Icon />}>
```
✅ Already supported

### Card
```tsx
// Current:
<Card variant="default">Content</Card>

// Should support:
<Card variant="clickable" onClick={handler}>
<Card variant="focusable" tabIndex={0}>
<Card clickable interactive>
```
⚠️ Needs variants

### MediaCard
```tsx
// Current uses wrapper + MediaCard, should simplify
<MediaCard 
  image={url}
  title="Podcast"
  actions={[play, subscribe]}
/>
```
✅ Good API

### Player Components
```tsx
// Should be more modular
<PlayerControls />
<PlayerProgress />
<PlayerVolume />
// ✅ Already modular
```

---

## Component Test Coverage

### Tests Exist For:
- ✅ Button (rendering, variants, loading)
- ✅ IconButton (aria-label)
- ✅ Card (variants, role)
- ✅ Badge (variants)
- ✅ BottomNavigation (active states, icons)
- ✅ AppShell (route-specific behavior)
- ✅ PlayerBar (basic rendering)
- ✅ Podcasts page (pagination)
- ✅ MediaCard (image loading)

### Tests Missing For:
- ❌ Forms (Input, Field validation)
- ❌ EmptyState (content rendering)
- ❌ ErrorState (error message display)
- ❌ LoadingState (loading states)
- ❌ Player (all playback states)
- ❌ Search (search functionality)
- ❌ Library (filtering, sorting)
- ❌ Responsive behavior (all breakpoints)
- ❌ Accessibility (a11y audit)
- ❌ Dark mode switching

**Test Coverage Gap**: ~40% of components lack meaningful tests

---

## Component Metrics

| Metric | Count | Notes |
|---|---|---|
| Total Components | 72 | .tsx files in components/ |
| Primitives | 40 | design-system/common + forms + layout |
| Composites | 15 | auth, pwa, ui, media |
| Feature Components | 150+ | Across 17 features |
| Total Routes | 22 | Pages using these components |
| Reusable (High Use) | 25 | Button, Card, MediaCard, etc. |
| Specialized (Low Use) | 30 | Feature-specific components |
| Duplicate Patterns | 5 | Badge/Tag, Loading states, etc. |

---

## Refactoring Priority

### P0 — Critical (Do First)
1. Consolidate loading states → Use LoadingState primitive
2. Consolidate empty states → Use EmptyState primitive
3. Consolidate error states → Use ErrorState primitive
4. Add missing form components (textarea, select, checkbox, etc.)

### P1 — High (Do Next)
5. Add Dialog/Modal components (for confirmations)
6. Add Sheet component (for full player, mobile drawers)
7. Improve player component UX
8. Add Tabs component (for filters)

### P2 — Medium (Do After)
9. Consolidate Badge/Tag usage
10. Add more component variants
11. Improve component documentation
12. Extract media card variants

### P3 — Low (Polish)
13. Add remaining form controls
14. Add Breadcrumbs
15. Performance optimizations
16. Storybook documentation

---

## Summary

### Current State
- ✅ **40+ solid primitives** — Good foundation
- ✅ **150+ feature components** — Good coverage
- ⚠️ **~30% code duplication** — Mostly in state components
- ⚠️ **Limited test coverage** — ~40% of components lack tests
- ⚠️ **Incomplete form components** — Missing select, textarea, etc.
- ⚠️ **Player needs UX polish** — Complex but functional

### Recommendation
- Extract primitives to shadcn/ui
- Consolidate state components
- Add missing form controls
- Improve test coverage
- Document component APIs
- Create Storybook

**Effort Estimate**: 4-5 weeks for comprehensive refactoring
