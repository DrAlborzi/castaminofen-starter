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
- Duration — renders a supplied numeric or normalized duration without parsing media data.
- MediaMetadata — composable title, subtitle, and metadata hierarchy for media surfaces.
- PlaybackAffordance — presentational play/pause button; callers own playback behavior.
- ProgressIndicator — determinate or honestly indeterminate progress presentation.

## Media contracts

- `ContentArtwork` is the canonical artwork surface and supports square, portrait, and landscape ratios, image-error fallback, `object-cover`, and supplied accessible alternative text. It does not fetch images or invent artwork data.
- `Avatar` is the canonical identity image primitive. Creator and user surfaces compose it rather than duplicating image fallback behavior. Identity primitives receive presentation props only.
- `MediaMetadata` keeps title content in a truncatable `min-w-0` hierarchy and exposes subtitle and metadata as composable children. It does not define podcast or episode domain data.
- `Duration` accepts seconds or an already-normalized display string. Missing or non-finite numeric values render `مدت نامشخص`; no fake duration is inferred.
- `MediaCard` and `MediaRow` provide optional `artwork`, `playback`, and `actions` slots. They are non-owning containers: they do not navigate, fetch, play audio, or mutate queue state.
- `PlaybackAffordance` accepts `isPlaying` and an optional callback. `aria-pressed` and the accessible label communicate state; player stores and runtime remain feature-owned.
- `ProgressIndicator` clamps determinate values to 0–100 and omits `aria-valuenow` for unknown progress. It never calculates timing or synchronizes with audio.

Media components use the existing semantic tokens and breakpoints, logical flex flow, truncation, and native button semantics. They do not distinguish REAL, PARTIAL, MOCK, STATIC, or UNSUPPORTED data unless a caller supplies the relevant presentation content. Keep feature-specific composition and data ownership outside this namespace.

## Catalog adoption

The podcast catalog route composes `PageContainer`, `Card`, `Field`, `Input`, `EmptyState`, and `Button` for its route-level presentation. The podcast query, subscription actions, navigation links, search state, and pagination state remain feature-owned; this adoption does not make catalog primitives responsible for fetching or mutations.

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

## RTL & Bidirectional UI Contract

- `apps/web/src/app/layout.tsx` is the sole global direction owner: keep `<html lang="fa" dir="rtl">`. Do not add duplicate RTL wrappers or a second CSS direction owner.
- Prefer logical Tailwind utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) and logical CSS (`margin-inline`, `padding-inline`, `inset-inline`, and `border-inline-*`) for layout. Physical left/right values are acceptable only for fixed geometry, external conventions, or intentionally isolated LTR content.
- Mirror only semantically directional icons such as back, next, previous, and breadcrumbs. Do not mirror play, pause, stop, volume, search, settings, status, identity, or other invariant icons. Review send, share, external-link, and carousel icons in their local context.
- Keep Persian prose in inherited RTL flow. Give URLs, email addresses, usernames, slugs, identifiers, durations, timestamps, and other inherently LTR or mixed values a local `dir="ltr"` or `dir="auto"` only when it improves reading order. Do not force a whole field or card to LTR.
- Forms keep labels and Persian text in RTL flow; email, URL, username, search, and identifier controls may opt into local direction based on their value. Adornments and clear actions use logical placement, and every control keeps a native accessible name and focus order.
- Media and player controls preserve product semantics. Progress remains chronological, durations remain readable, and playback icons are not mirrored automatically. Previous/next navigation is reviewed independently.
- Preserve DOM reading order and keyboard order. Never use CSS `order` or a duplicate accessible node solely to make a visual RTL arrangement.

Forbidden: global SVG mirroring, blanket `scaleX(-1)`, unnecessary `direction: ltr`, arbitrary `text-align: right`, physical spacing where logical spacing applies, duplicated RTL owners, and mixed-script content forced into RTL.

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

## Library and Profile adoption

- Library and Profile features own their queries, identity, navigation, playback, queue, mutations, and domain-specific media composition.
- Use `LoadingState` and `ErrorState` for equivalent feature-owned query branches so loading and failure semantics remain explicit; preserve specialized skeleton geometry when it carries feature meaning.
- Profile may compose `Avatar`, `MediaCard`, and `MediaRow`, but identity and continuation data remain feature-owned. Use `Provenance` selectively around high-visibility mock or preview content that could be mistaken for live profile data.

## DESIGN.11 Conformance Rules

- Prefer imports from `@/components/design-system` for new shared UI and safe migrations from compatibility aliases.
- A migration is safe only when the canonical primitive preserves semantics, visual intent, accessibility behavior, feature ownership, and public behavior without moving data or business logic.
- Local components remain valid for specialized geometry, feature-owned actions, domain-specific composition, legacy compatibility, and ambiguous equivalence. Do not replace them mechanically.
- Use existing semantic tokens when they express the same intent. Arbitrary values require local evidence for feature geometry, browser/native requirements, or intentional one-off treatment; do not replace them repository-wide.
- Use the state primitive matching the owning outcome: loading, empty, error, partial, offline, unsupported, or success. Never reinterpret an error as empty, fabricate success, or add offline behavior without a real capability.
- Media primitives may own artwork, metadata, duration, playback affordance, and progress presentation. Feature code retains navigation, playback dispatch, queue behavior, fetching, and mutations.
- Compatibility modules remain functional forwarding layers. Do not remove them until all consumers and external compatibility requirements have been proven safe.
- Do not add a second primitive layer, move application state into this namespace, or perform broad button/card/state/token replacement without semantic evidence and focused validation.
