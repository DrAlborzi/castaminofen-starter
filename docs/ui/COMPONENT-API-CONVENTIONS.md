# Component API Conventions

## Recommended Canonical Conventions

To keep the current component architecture safe and consistent, the repo should converge on the following API conventions.

### 1. Shared primitives should use stable prop names

Recommended:

- `variant` for visual styles
- `size` for scale
- `disabled` for disabled state
- `loading` for async loading state
- `className` for consumer styling overrides
- `children` for content

Avoid mixing naming patterns within the same component family.

### 2. Shared primitives should prefer data-first composition

A primitive should usually compose by prop shape rather than by unpredictable child assumptions.

Examples of good patterns:

- `Button` accepts `children`, `variant`, `size`, `loading`, and `disabled`
- `Field` accepts `label`, `description`, `error`, and children
- `LoadingState` accepts `message`, `title`, `variant`, `announce`, and `skeleton`

### 3. Feature-specific cards should remain structured and explicit

Feature cards should favor explicit props rather than hidden metadata structures.

Examples:

- `PodcastCard` should be data-specific and explicit about podcast properties
- `EpisodeCard` should stay domain-aware rather than becoming a generic card engine
- `PlaylistCard` should remain a feature-level presentation rather than a generic `MediaCard` replacement

### 4. Accessibility should be part of component contract

Every shared primitive should provide:

- semantic element choice
- focus-visible ring behavior
- aria attributes for dynamic state
- clear visible label text or screen-reader label
- disabled state semantics
- keyboard interaction support in interactive elements

### 5. A single canonical import path should exist

Canonical path should be the shared design-system barrel, not scattered `ui/` aliases and feature-specific wrappers.

Good pattern:

- central imports from the design-system barrel

Avoid:

- mixing imports from both `components/ui` and `components/design-system`
- duplicating the same component in multiple import paths

## Problematic Existing API Patterns

### Pattern A: `Badge` and `Tag` are semantically overlapping

Both are metadata pills but use different styling conventions and naming semantics.

Observed issue:

- one component uses `variant` and semantic color tokens
- the other uses a more generic label appearance

Recommendation:

- select one canonical metadata pill primitive
- keep the second as a legacy alias or remove it once usage is consolidated

### Pattern B: `Field` relies on child prop injection

The current implementation in [apps/web/src/components/design-system/forms/field.tsx](apps/web/src/components/design-system/forms/field.tsx) clones the child element to attach `id`, `aria-describedby`, and `aria-invalid`.

Pros:

- compact and ergonomic

Cons:

- brittle when the child is not a compatible input element
- less explicit than a typed `control` prop or a customizable `inputProps` pattern
- more difficult to reason about than a standard design-system form API

Recommendation:

- keep the wrapper for simple forms
- improve it with explicit `renderInput` or `control` patterns if broader adoption is needed

### Pattern C: `MediaCard` is flexible but not fully standardized

The current implementation in [apps/web/src/components/design-system/media/media-card.tsx](apps/web/src/components/design-system/media/media-card.tsx) uses a set of flexible slots: `title`, `subtitle`, `meta`, `artwork`, `actions`, `playback`, `children`.

Pros:

- very flexible for content lists

Cons:

- easily becomes a feature ad hoc container rather than a consistent shared primitive
- not as standardized as a simple `data + variant + action` API

Recommendation:

- keep as a generic media container
- preserve feature cards as wrappers rather than forcing them into a single `MediaCard` API

### Pattern D: custom modal and drawer patterns are not central

Feature dialogs such as [apps/web/src/features/playlists/components/PlaylistFormDialog.tsx](apps/web/src/features/playlists/components/PlaylistFormDialog.tsx) are implemented as custom overlays and raw HTML form controls.

Recommendation:

- create a shared dialog/sheet primitive
- allow explicit `onOpenChange`, `title`, `description`, and `footer` patterns

## Target Conventions for Phase 2

The Phase 2 safe target is:

- one canonical shared primitive for each category
- one canonical public import path
- consistent variant naming (`variant`, `size`, `tone` only where needed)
- consistent disabled/loading patterns
- consistent `className` merging via utility helpers or merges
- stronger focus and a11y defaults
- no broad feature component promotion without clear reuse evidence

## Proposed API Rules

1. Keep the public API shallow and explicit.
2. Prefer composition over hidden behavior.
3. Avoid child-cloning patterns unless the API is intentionally constrained to a single control type.
4. Keep feature-specific semantics out of generic primitives.
5. Document whether a component is a primitive, composite, or feature wrapper.
6. Standardize on one import path for all shared primitives.

These conventions should be adopted in Phase 2 documentation and enforced incrementally in future component work.
