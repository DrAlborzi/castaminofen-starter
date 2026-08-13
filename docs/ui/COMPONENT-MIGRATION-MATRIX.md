# Component Migration Matrix

| Component | Current Path | Category | Status | Canonical? | Duplicate? | Radix? | shadcn? | Action | Priority | Risk |
|---|---|---|---|---|---|---|---|---|---|---|
| Button | apps/web/src/components/design-system/common/button.tsx | A | Active | Yes | Yes | No | No | Keep custom, standardize API | P0 | Low |
| Card | apps/web/src/components/design-system/common/card.tsx | A | Active | Yes | Yes | No | No | Keep custom | P0 | Low |
| Badge | apps/web/src/components/design-system/common/badge.tsx | A | Active | Yes | Yes | No | No | Consolidate with Tag | P0 | Low |
| Tag | apps/web/src/components/design-system/common/tag.tsx | A | Active | No | Yes | No | No | Consolidate with Badge | P0 | Low |
| Chip | apps/web/src/components/design-system/common/chip.tsx | A | Active | Yes | No | No | No | Keep custom | P2 | Low |
| IconButton | apps/web/src/components/design-system/common/icon-button.tsx | A | Active | Yes | No | No | No | Keep custom | P1 | Low |
| Input | apps/web/src/components/design-system/forms/input.tsx | A | Active | Yes | No | No | No | Improve custom | P1 | Low |
| Field | apps/web/src/components/design-system/forms/field.tsx | A | Active | Yes | No | No | No | Improve custom | P1 | Low |
| Textarea | Missing shared primitive | A | Missing | No | No | No | Yes | Create primitive | P0 | Medium |
| Select | Missing shared primitive | A | Missing | No | No | Yes | Yes | Create primitive | P0 | Medium |
| Checkbox | Missing shared primitive | A | Missing | No | No | Yes | Yes | Create primitive | P0 | Medium |
| Radio | Missing shared primitive | A | Missing | No | No | Yes | Yes | Create primitive | P0 | Medium |
| Switch | Missing shared primitive | A | Missing | No | No | Yes | Yes | Create primitive | P0 | Medium |
| Dialog | Custom feature wrappers | A | Partial | No | No | Yes | Yes | Adopt shared overlay primitive | P1 | Medium |
| Sheet | Custom feature wrappers | A | Partial | No | No | Yes | Yes | Adopt shared overlay primitive | P1 | Medium |
| Popover | Missing shared primitive | A | Missing | No | No | Yes | Yes | Create primitive | P1 | Medium |
| Tooltip | Missing shared primitive | A | Missing | No | No | Yes | No | Adopt Radix | P1 | Low |
| Tabs | Custom feature pattern in LibraryCategoryTabs | A | Partial | No | No | Yes | Yes | Adopt shared tab primitive | P1 | Low |
| Toast | Partial custom / state wrapper | A | Partial | No | No | No | Yes | Adopt SHADCN pattern | P2 | Low |
| Alert | apps/web/src/components/design-system/states/alert.tsx | A | Active | Yes | No | No | No | Improve custom | P2 | Low |
| Skeleton | Not explicit | A | Missing | No | No | No | Medium | Create simple primitive | P2 | Low |
| Avatar | apps/web/src/components/design-system/identity/avatar.tsx | A | Active | Yes | No | No | No | Keep custom | P2 | Low |
| ProgressIndicator | apps/web/src/components/design-system/player/progress-indicator.tsx | A | Active | Yes | No | No | No | Keep custom | P2 | Low |
| MediaCard | apps/web/src/components/design-system/media/media-card.tsx | B | Active | Yes | No | No | No | Keep custom, document API | P1 | Low |
| ContentArtwork | apps/web/src/components/design-system/media/content-artwork.tsx | B | Active | Yes | No | No | No | Keep custom | P1 | Low |
| MediaRow | apps/web/src/components/design-system/media/media-row.tsx | B | Active | Yes | No | No | No | Keep custom | P2 | Low |
| MediaMetadata | apps/web/src/components/design-system/media/media-metadata.tsx | B | Active | Yes | No | No | No | Keep custom | P2 | Low |
| Duration | apps/web/src/components/design-system/media/duration.tsx | B | Active | Yes | No | No | No | Keep custom | P2 | Low |
| PlaybackAffordance | apps/web/src/components/design-system/media/playback-affordance.tsx | B | Active | Yes | No | No | No | Keep custom | P2 | Low |
| BottomNavigation | apps/web/src/components/design-system/navigation/bottom-navigation.tsx | B | Active | Yes | Yes | No | No | Canonicalize with layout version | P0 | Low |
| DesktopNavigation | apps/web/src/components/design-system/navigation/desktop-navigation.tsx | B | Active | Yes | No | No | No | Keep custom | P1 | Low |
| MobileHeader | apps/web/src/components/design-system/navigation/mobile-header.tsx | B | Active | Yes | Yes | No | No | Canonicalize with layout version | P0 | Low |
| PageContainer | apps/web/src/components/design-system/layout/page-container.tsx | C | Active | Yes | No | No | No | Keep custom | P2 | Low |
| SectionHeader | apps/web/src/components/design-system/layout/section-header.tsx | C | Active | Yes | No | No | No | Keep custom | P2 | Low |
| AppShell | apps/web/src/components/layout/app-shell.tsx | C | Active | Yes | No | No | No | Keep custom | P1 | Low |
| ThemeBoundary | apps/web/src/components/layout/theme-boundary.tsx | F | Active | Yes | No | No | No | Keep custom unless next-themes is later adopted | P3 | Low |
| PlayerBar | apps/web/src/features/player/components/PlayerBar.tsx | D | Active | No | No | No | No | Protect as feature-owned | P0 | Medium |
| PlayerControls | apps/web/src/features/player/components/PlayerControls.tsx | D | Active | No | No | No | No | Protect as feature-owned | P0 | Medium |
| PlayerProgress | apps/web/src/features/player/components/PlayerProgress.tsx | D | Active | No | No | No | No | Protect as feature-owned | P0 | Medium |
| PlayerVolume | apps/web/src/features/player/components/PlayerVolume.tsx | D | Active | No | No | No | No | Protect as feature-owned | P0 | Medium |
| PlaylistCard | apps/web/src/features/playlists/components/PlaylistCard.tsx | D | Active | No | No | No | No | Keep feature-specific | P2 | Low |
| PodcastCard | apps/web/src/features/podcasts/PodcastCard.tsx | D | Active | No | No | No | No | Keep feature-specific wrapper | P2 | Low |
| EpisodeCard | apps/web/src/features/episodes/EpisodeCard.tsx | D | Active | No | No | No | No | Keep feature-specific wrapper | P2 | Low |
| MediaArtwork | apps/web/src/components/design-system/media/content-artwork.tsx | B | Active | Yes | No | No | No | Keep generic | P2 | Low |
| LibraryCategoryTabs | apps/web/src/features/library/components/LibraryCategoryTabs.tsx | D | Active | No | No | Yes | Yes | Replace with tab primitive | P1 | Low |
| PlaylistFormDialog | apps/web/src/features/playlists/components/PlaylistFormDialog.tsx | D | Active | No | No | No | No | Replace with shared dialog + form primitives | P1 | Medium |
| SearchFilterDrawer | apps/web/src/features/search/components/SearchFilterDrawer.tsx | D | Partial | No | No | Yes | Yes | Replace with shared sheet/popover pattern | P1 | Medium |
| LoadingState | apps/web/src/components/design-system/states/loading-state.tsx | A | Active | Yes | No | No | No | Keep canonical state primitive | P0 | Low |
| ErrorState | apps/web/src/components/design-system/states/error-state.tsx | A | Active | Yes | No | No | No | Keep canonical state primitive | P0 | Low |
| EmptyState | apps/web/src/components/design-system/states/empty-state.tsx | A | Active | Yes | No | No | No | Keep canonical state primitive | P0 | Low |
| OfflineState | apps/web/src/components/design-system/states/offline-state.tsx | A | Active | Yes | No | No | No | Keep canonical state primitive | P2 | Low |
| SuccessState | apps/web/src/components/design-system/states/success-state.tsx | A | Active | Yes | No | No | No | Keep canonical state primitive | P2 | Low |
| Provenance | apps/web/src/components/design-system/states/provenance.tsx | A | Active | Yes | No | No | No | Keep custom | P3 | Low |
| Form | apps/web/src/components/ui/form.tsx | A | Active | Yes | No | No | No | Improve custom | P1 | Low |
| FormLabel | apps/web/src/components/ui/form.tsx | A | Active | Yes | No | No | No | Improve custom | P1 | Low |
| FormMessage | apps/web/src/components/ui/form.tsx | A | Active | Yes | No | No | No | Improve custom | P1 | Low |

## Notes

- The matrix intentionally keeps feature-specific player and media card components out of a broad design-system migration.
- Layout navigation duplication is a higher-priority cleanup than visual redesign.
- The biggest medium-risk gap is form and overlay primitives, not the existing basic card/button layer.
