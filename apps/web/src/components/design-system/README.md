# Canonical Design System

## Overview

Import shared primitives from `@/components/design-system`. This is the canonical foundation for reusable Castaminofen UI; feature code supplies data and behavior, while primitives supply presentation and native interaction semantics.

## Components

- PageContainer — page-level spacing wrapper used for top-level screens.
- SectionHeader — shared section title and actions pattern.
- MediaCard — generic surface for cards and summaries.
- EmptyState / LoadingState / PartialState / ErrorState / OfflineState / UnsupportedState — standard page-state presentation.
- SuccessState / Alert / Toast — contextual and ephemeral feedback primitives.
- Provenance — minimal Preview, Coming soon, Unavailable, Unsupported, and Illustrative labeling.
- MobileHeader / BottomNavigation / DesktopNavigation — navigation primitives for mobile and desktop layouts.
- Avatar / UserBadge / CreatorBadge — identity and creator presentation.
- ContentArtwork / CreatorCard / MediaRow / MediaCarousel — media-centric composition primitives.
- Reaction / CommentPreview / DiscussionCard — social interaction surfaces.
- MiniPlayer / TimelineMarker / ProgressIndicator — player-oriented presentation primitives.
- Button / IconButton / Chip / Tag — common interaction and labeling primitives.
- Card / Input / Field / Artwork — canonical surfaces and form/media foundations.
- ErrorState — actionable error presentation; LoadingState, EmptyState, PartialState, OfflineState, and UnsupportedState provide the other shared page states.

## Contracts

- Use semantic Tailwind tokens such as `bg-surface-card`, `text-text-primary`, `border-border`, and `text-action-primary`; do not add hardcoded brand colors to foundation code.
- Use native buttons, links, and form controls. Icon-only actions require an accessible name and every field needs a programmatic label.
- Every interactive primitive keeps a visible `:focus-visible` ring, native disabled behavior, and a stable touch target.
- Components must work under the product's permanent RTL direction. Use logical layout properties and mirror only semantically directional icons.
- State vocabulary is shared: `default`, `hover`, `focus`, `pressed`, `active`, `selected`, `disabled`, `loading`, `empty`, `error`, `partial`, `success`, `offline`, `unsupported`, `playing`, `paused`, and `queued`.

## State Selection

- Use `LoadingState` while the owning query or action is pending. Keep geometry stable; use `announce` only when a meaningful announcement is justified.
- Use `EmptyState` when the owner successfully loaded zero items. `no-results` is distinct from an error and an empty query; use a category when the meaning is known.
- Use `ErrorState` when the requested content or action failed. Use `PartialState` when usable content remains and only a scoped portion failed.
- Use `OfflineState` for network-unavailable presentation only. It does not provide caching or offline persistence.
- Use `UnsupportedState` when an interaction is not implemented or cannot honestly be completed. Do not attach a fake success action.
- Use `SuccessState` or inline status for persistent confirmation. Use `Toast` only for non-critical ephemeral confirmation; errors, validation, authentication failures, and data-loss warnings remain contextual.
- State components render presentation only. The data owner supplies content and actions; primitives do not fetch, route, or own business state.

## Data Provenance

- `REAL`: API-backed or actually persisted user state. Normal production presentation and real action feedback are permitted.
- `PARTIAL`: a real surface with explicitly unavailable supporting portions. Preserve real content and label the missing scope.
- `MOCK / PREVIEW`: presentation data for prototyping. It must not imply persistence, real users, or a live backend. Use `Provenance` where context could mislead.
- `STATIC`: explanatory or onboarding content, not live user data.
- `UNSUPPORTED`: the product cannot perform the interaction. Keep controls truthful and avoid fake completion.

## Accessibility and RTL

- `LoadingState` uses `aria-busy`; live-region announcements are opt-in through `announce` for noisy or repeated loading contexts.
- Errors use `role="alert"`; success and non-error contextual messages use `role="status"`. Toast dismissal is a native, labeled button and does not steal focus.
- Use native `disabled` for unavailable actions. Reserve `aria-disabled` for focusable semantic controls that must remain in the tab order.
- Every state needs a semantic heading or clear accessible label, visible recovery/action text, and meaning that is not communicated by color alone.
- Use logical layout and spacing properties. Mirror only directional icons; keep non-directional status icons unchanged. Isolate mixed-script URLs, durations, and identifiers where the surrounding RTL text would reduce readability.

## Forbidden Patterns

- Do not use fake production data to hide an empty, error, or unsupported state.
- Do not make unsupported controls clickable or report fake successful completion.
- Do not add feature-local global state primitives, a second toast system, or a second design-system layer.
- Do not communicate state through color alone, bypass native disabled behavior, or add arbitrary state styling outside semantic tokens.

## Compatibility

`@/components/ui/*` and selected `@/components/layout/*` imports are compatibility paths. New code should use the canonical index above; compatibility modules must forward to canonical implementations rather than create competing primitives.

Do not put API calls, player state, persistence, mock data, or feature-specific business logic in this directory. Do not use clickable `div` elements, unlabeled icon buttons, nested interactive elements, or local duplicate Button/Card/Input/state implementations.

## Usage location

These primitives are intended for reuse in app shell, discovery, community, library, profile, playlists, and upcoming creator/admin experiences.
