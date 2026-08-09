# Canonical Design System

## Overview

Import shared primitives from `@/components/design-system`. This is the canonical foundation for reusable Castaminofen UI; feature code supplies data and behavior, while primitives supply presentation and native interaction semantics.

## Components

- PageContainer — page-level spacing wrapper used for top-level screens.
- SectionHeader — shared section title and actions pattern.
- MediaCard — generic surface for cards and summaries.
- EmptyState / LoadingState — standard page-state presentation.
- MobileHeader / BottomNavigation / DesktopNavigation — navigation primitives for mobile and desktop layouts.
- Avatar / UserBadge / CreatorBadge — identity and creator presentation.
- ContentArtwork / CreatorCard / MediaRow / MediaCarousel — media-centric composition primitives.
- Reaction / CommentPreview / DiscussionCard — social interaction surfaces.
- MiniPlayer / TimelineMarker / ProgressIndicator — player-oriented presentation primitives.
- Button / IconButton / Chip / Tag — common interaction and labeling primitives.
- Card / Input / Field / Artwork — canonical surfaces and form/media foundations.
- ErrorState — actionable error presentation; LoadingState and EmptyState provide the other shared page states.

## Contracts

- Use semantic Tailwind tokens such as `bg-surface-card`, `text-text-primary`, `border-border`, and `text-action-primary`; do not add hardcoded brand colors to foundation code.
- Use native buttons, links, and form controls. Icon-only actions require an accessible name and every field needs a programmatic label.
- Every interactive primitive keeps a visible `:focus-visible` ring, native disabled behavior, and a stable touch target.
- Components must work under the product's permanent RTL direction. Use logical layout properties and mirror only semantically directional icons.
- State vocabulary is shared: `default`, `hover`, `focus`, `pressed`, `selected`, `disabled`, `loading`, `empty`, `error`, `success`, `playing`, `paused`, `queued`, `offline`, and `partial`.

## Compatibility

`@/components/ui/*` and selected `@/components/layout/*` imports are compatibility paths. New code should use the canonical index above; compatibility modules must forward to canonical implementations rather than create competing primitives.

Do not put API calls, player state, persistence, mock data, or feature-specific business logic in this directory. Do not use clickable `div` elements, unlabeled icon buttons, nested interactive elements, or local duplicate Button/Card/Input/state implementations.

## Usage location

These primitives are intended for reuse in app shell, discovery, community, library, profile, playlists, and upcoming creator/admin experiences.
