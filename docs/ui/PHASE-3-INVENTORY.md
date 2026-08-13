# Phase 3 — Component Inventory & Classification

**Date:** August 13, 2026  
**Status:** Inventory in progress  
**Scope:** Feature-owned UI components and overlays

## Classification Rules

| Decision | Meaning |
|----------|---------|
| **KEEP** | Working component, no changes needed |
| **MIGRATE** | Safe migration to shared primitive available and low-risk |
| **DEFER** | Potential issue but complexity/risk requires more analysis or later phase |
| **REMOVE** | Duplicate or truly obsolete; safe to delete |

---

## Inventory

### Tab/Navigation Components

| Component | Location | Type | Current Implementation | Decision | Reason | Risk |
|-----------|----------|------|----------------------|----------|--------|------|
| LibraryCategoryTabs | `features/library/LibraryCategoryTabs.tsx` | Navigation | Tabs primitive | KEEP | Already migrated in Phase 2 | None |
| CommunityHome feedTabs | `features/community/components/CommunityHome.tsx:17-24` | Tab Navigation | Custom buttons with aria-pressed | MIGRATE | Safe replacement with Tabs, no state management complexity | Low |
| ContentStatusFilter tabs | `features/creator/components/ContentStatusFilter.tsx:7-14` | Tab Navigation | Button array with variant switching | MIGRATE | Simple state switching, safe for Tabs | Low |
| ImmersivePlayerPanel tabs | `features/player/components/ImmersivePlayerPanel.tsx:26-30` | Tab Navigation | Custom button implementation | MIGRATE | Pure state variable switching, no side effects | Low |

### Form Components

| Component | Location | Type | Current Implementation | Decision | Reason | Risk |
|-----------|----------|------|----------------------|----------|--------|------|
| ContentMetadataEditor | `features/create/components/ContentMetadataEditor.tsx:28` | Textarea | Raw `<textarea>` | MIGRATE | Should use Textarea primitive for consistency | Low |
| EpisodeCreateForm | `features/episodes/components/EpisodeCreateForm.tsx:38` | Select | Raw `<select>` with className="input" | MIGRATE | Should use Select primitive | Low |
| CreationWizard | `features/create/components/CreationWizard.tsx:152,156,161` | Input/Textarea | Raw `<input>` and `<textarea>` elements | MIGRATE | Should use Input and Textarea primitives | Low |
| EpisodeAudioUploadCard | `features/episodes/components/EpisodeAudioUploadCard.tsx:28` | File Input | Raw `<input type="file">` | KEEP | File inputs are typically not styled; current implementation is acceptable | None |
| LoginForm | `features/auth/components/LoginForm.tsx:57,60` | Input | Using Input primitive | KEEP | Already using shared primitives | None |
| RegisterForm | `features/auth/components/RegisterForm.tsx:64,67` | Input | Using Input primitive | KEEP | Already using shared primitives | None |

### Player/Media Components (Protected Areas)

| Component | Location | Type | Current Implementation | Decision | Reason | Risk |
|-----------|----------|------|----------------------|----------|--------|------|
| PlayerVolume | `features/player/components/PlayerVolume.tsx:15` | Range Input | Raw `<input type="range">` | KEEP | Feature-specific volume control with proper ARIA attributes; protected area | None |
| PlayerBar queue dialog | `features/player/components/PlayerBar.tsx:156-200` | Custom Dialog | role="dialog" pattern | KEEP | Protected area (player); only change if concrete regression found | Protected |
| BookmarkPanel | `features/player/components/BookmarkPanel.tsx:44` | Input | Raw `<input>` | DEFER | Part of player feature; needs careful review | Protected |
| TranscriptPanel | `features/player/components/TranscriptPanel.tsx:33` | Input | Raw `<input>` for search | DEFER | Part of player feature; query-specific; review later | Protected |

### Dialog/Overlay Components

| Component | Location | Type | Current Implementation | Decision | Reason | Risk |
|-----------|----------|------|----------------------|----------|--------|------|
| PlaylistFormDialog | `features/playlists/components/PlaylistFormDialog.tsx` | Dialog | Dialog + form primitives | KEEP | Already migrated in Phase 2 | None |
| SearchFilterDrawer | `features/search/components/SearchFilterDrawer.tsx` | Sheet | Sheet primitive | KEEP | Already migrated in Phase 2 | None |

### Buttons/Interactive Components

| Component | Location | Type | Current Implementation | Decision | Reason | Risk |
|-----------|----------|------|----------------------|----------|--------|------|
| FavoriteActionButton | `features/library/components/FavoriteActionButton.tsx:38` | Button | aria-pressed toggle | KEEP | Working correctly with proper semantics | None |
| SubscriptionActionButton | `features/library/components/SubscriptionActionButton.tsx:42` | Button | aria-pressed toggle | KEEP | Working correctly with proper semantics | None |
| PlayerControls | `features/player/components/PlayerControls.tsx:94` | Buttons | aria-pressed toggles | KEEP | Working correctly; player protected area | None |
| ReactionBar | `features/social/components/ReactionBar.tsx:44` | Buttons | aria-pressed patterns | KEEP | Working correctly | None |

### Forms in Protected/Feature Domains

| Component | Location | Type | Current Implementation | Decision | Reason | Risk |
|-----------|----------|------|----------------------|----------|--------|------|
| EpisodeForm | `features/episodes/EpisodeForm.tsx:36` | File Input | Raw `<input type="file">` | KEEP | File input; acceptable as-is | None |
| PodcastFormFields | `features/podcasts/components/PodcastFormFields.tsx` | Input Fields | Using Input primitive | KEEP | Already using shared primitives | None |
| SettingsPage volume input | `features/settings/components/SettingsPage.tsx:186` | Range Input | Raw `<input type="range">` | KEEP | Settings-specific range control; proper ARIA attributes | None |
| SearchInput | `features/search/components/SearchInput.tsx:34` | Input | Using Input primitive | KEEP | Already using shared primitives | None |
| LoginForm | `features/auth/components/LoginForm.tsx` | Form | Using Input primitive with React Hook Form | KEEP | Properly implemented | None |

---

## Summary

**Total Components Reviewed:** 28  
**KEEP:** 18  
**MIGRATE:** 4  
**DEFER:** 2  
**REMOVE:** 0

### High-Confidence Migrations (Low Risk)

1. **CommunityHome** — feedTabs → Tabs primitive
2. **ContentStatusFilter** — tabs → Tabs primitive
3. **ImmersivePlayerPanel** — tabs → Tabs primitive
4. **ContentMetadataEditor** — textarea → Textarea primitive
5. **EpisodeCreateForm** — select → Select primitive
6. **CreationWizard** — inputs/textarea → Input/Textarea primitives

### Protected Areas (No Changes)

- Player (PlayerBar, PlayerVolume, PlayerControls, BookmarkPanel, TranscriptPanel)
- Media components
- Admin features

### Notes

- No backend changes required
- No API contract changes
- No state management changes
- All migrations are cosmetic/structural only
- Player/media protected per user requirements
- File inputs kept as-is (acceptable default styling)
