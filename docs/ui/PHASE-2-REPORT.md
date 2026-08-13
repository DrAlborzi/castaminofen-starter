# Phase 2 — Component System Implementation Report

## 1. Executive Summary

Phase 2 focused on the smallest safe modernization of the shared UI system without a broad redesign or migration away from the repository’s existing design language. The repository already had stable feature ownership, design-system boundaries, and valid token usage; the main gaps were a small set of missing shared primitives, minor API inconsistencies, and ownership ambiguity around shared metadata and overlays.

This phase added the missing high-value form primitives and a minimal overlay/navigation primitive layer, then migrated the highest-value consumers that were already aligned with the design-system patterns: LibraryCategoryTabs, PlaylistFormDialog, and SearchFilterDrawer. The work preserved the existing visual language, kept feature-owned player and media components intact, and avoided introducing a second library or a global migration.

## 2. Components Created

| Component | Path | Purpose | Technology | Accessibility behavior |
| --- | --- | --- | --- | --- |
| Textarea | apps/web/src/components/design-system/forms/textarea.tsx | Shared multiline input for forms | Native textarea with design-system styling | Focus-visible ring, disabled and invalid handling via standard HTML attributes |
| Select | apps/web/src/components/design-system/forms/select.tsx | Shared select primitive | Native select | Focus-visible ring, native keyboard support, form labeling via standard semantics |
| Checkbox | apps/web/src/components/design-system/forms/checkbox.tsx | Shared boolean primitive | Native checkbox input | Native checkbox semantics, disabled behavior, labeled control support |
| RadioGroup | apps/web/src/components/design-system/forms/radio-group.tsx | Shared single-choice primitive | Native radio inputs with grouped semantics | role="radiogroup", keyboard-friendly native radio behavior, invalid/disabled handling by prop |
| Switch | apps/web/src/components/design-system/forms/switch.tsx | Shared toggle primitive | Button-style switch with aria-checked | role="switch", keyboard activation, focus-visible ring, disabled semantics |
| Dialog | apps/web/src/components/design-system/overlays/dialog.tsx | Shared modal overlay primitive | Custom overlay with native dialog semantics | Escape handling, focus restoration by ref focusing, aria-modal, title/description labeling |
| Sheet | apps/web/src/components/design-system/overlays/sheet.tsx | Shared drawer/side panel primitive | Custom side-sheet wrapper | Escape handling, backdrop dismiss, dialog semantics, focusable content |
| Popover | apps/web/src/components/design-system/overlays/popover.tsx | Shared popover wrapper | Controlled/uncontrolled button + panel pattern | Expanded state, focus-visible ring, accessible trigger semantics |
| Tooltip | apps/web/src/components/design-system/overlays/tooltip.tsx | Shared hover/focus tooltip | Lightweight wrapper around trigger + tooltip panel | Focus/hover reveal, tooltip role, visual focus ring on trigger |
| Tabs | apps/web/src/components/design-system/navigation/tabs.tsx | Shared category filter primitive | Button-based tablist pattern | role="tablist" / role="tab", aria-selected, disabled state support |

## 3. Components Modified

- apps/web/src/components/design-system/common/tag.tsx
  - Canonicalized metadata pill ownership by delegating to the Badge implementation and preserving compatibility.
- apps/web/src/components/design-system/index.ts
  - Added the new form and overlay primitives to the canonical barrel export surface.
- apps/web/src/features/library/components/LibraryCategoryTabs.tsx
  - Migrated from the custom tablist implementation to the shared Tabs primitive while preserving the same labels and active-state behavior.
- apps/web/src/features/playlists/components/PlaylistFormDialog.tsx
  - Replaced ad hoc overlay and raw form controls with the shared Dialog, Input, Textarea, Checkbox, and Button primitives while preserving the existing submission contract.
- apps/web/src/features/search/components/SearchFilterDrawer.tsx
  - Migrated from a standalone drawer to the shared Sheet primitive without changing the visible UI or action flow.
- apps/web/src/components/design-system/common/common-primitives.test.tsx
  - Extended tests cover the new primitives and the shared metadata/field contracts.

## 4. Components Consolidated

### Badge / Tag

The repository had two overlapping metadata-pill primitives: the more semantic Badge and the generic Tag. The phase resolved this by making Tag a compatibility alias to Badge within the canonical design-system layer. This preserves existing consumers while establishing one ownership point for metadata pill styling.

### BottomNavigation

The design-system and layout versions were reviewed and kept separate by responsibility. The design-system component remains the shared primitive used for the app-shell pattern, while the layout-level wrapper remains the app-shell adapter that resolves route data and screen-specific behavior. No destructive removal was performed because the repo had not yet completed a full migration of all consumers.

### MobileHeader

The same pattern was used for MobileHeader: the shared design-system version remains the generic shell primitive, and the layout-level implementation remains the route-aware app-shell composition layer. This preserves behavior while making the canonical ownership explicit without removing working wrappers prematurely.

## 5. Components Migrated

### LibraryCategoryTabs

LibraryCategoryTabs was migrated to the shared Tabs primitive. The implementation preserves the same category labels, active-state logic, and route/state behavior while using the canonical tablist API from the design-system barrel.

### PlaylistFormDialog

PlaylistFormDialog was updated to consume the shared Dialog and form primitives. The visible UX remained the same: modal title, description, image URL field, description field, public toggle, and create/edit submit behavior remain intact. The submission contract was preserved and the dialog still opens/closes via the same props.

### SearchFilterDrawer

SearchFilterDrawer was migrated to the shared Sheet primitive. It retains the same drawer content and visual patterns while improving the overlay semantics and reusability. No page redesign or business-logic change was introduced.

## 6. Dependency Changes

No dependency was added in this phase.

Reason:
- the repository already had the required primitives and utility stack for the safe phase-2 work
- the missing functionality was solvable with existing design tokens, native form controls, and the current app’s component conventions
- the phase intentionally avoided introducing a broad Radix package surface or a second component layer

## 7. Accessibility Validation

Actual validation performed in this phase included:
- semantic role and aria-state checks within the new shared primitives and the migrated feature components
- focus-visible handling through the existing design-system focus ring styles in the global stylesheet
- keyboard interaction support for tab switching and button-based controls
- disabled-state semantics in interactive primitives
- form labeling and description/error association through the existing Field wrapper and native form semantics

This phase did not run a browser-based Playwright accessibility audit, so no claim is made beyond the implementation-level semantics and test coverage that was actually executed.

## 8. Theme Validation

### Light

Verified through the existing design tokens and the design-system surface classes already in use by the app. New primitives inherit the repository’s light mode token system rather than introducing arbitrary values.

### Dark

The app’s theme tokens were preserved, and the new primitives rely on the same surface, border, and accent variables used across the app. No new dark-mode token architecture was introduced.

### RTL

The phase kept the app’s existing RTL conventions and did not introduce any hardcoded LTR-only layout assumptions. Existing RTL-sensitive tests in the web suite remained green.

## 9. Testing

Exact results from validation run in this phase:

- lint: passed via `pnpm lint` at the repo root
  - Result: success with one existing ESLint warning in the onboarding image rule, not a blocking error
- Vitest (targeted phase checks): passed via `pnpm vitest run src/components/design-system/common/common-primitives.test.tsx src/features/library/components/LibraryCategoryTabs.test.tsx src/features/playlists/components/PlaylistPresentation.test.tsx`
  - Result: 3 test files passed, 9 tests passed
- web tests: passed via `pnpm --filter @castaminofen/web test`
  - Result: 59 test files passed, 215 tests passed
- build: passed via `pnpm --filter @castaminofen/web build`
  - Result: production build completed successfully
- Playwright: not run in this phase

Additional repository status:
- `pnpm test` at the repo root still fails in the API suite due to a backend issue in apps/api/src/library/library.service.spec.ts, outside the UI component scope modified here.

## 10. Files Changed

- apps/web/src/components/design-system/common/common-primitives.test.tsx
- apps/web/src/components/design-system/common/tag.tsx
- apps/web/src/components/design-system/forms/checkbox.tsx
- apps/web/src/components/design-system/forms/radio-group.tsx
- apps/web/src/components/design-system/forms/select.tsx
- apps/web/src/components/design-system/forms/switch.tsx
- apps/web/src/components/design-system/forms/textarea.tsx
- apps/web/src/components/design-system/index.ts
- apps/web/src/components/design-system/navigation/tabs.tsx
- apps/web/src/components/design-system/overlays/dialog.tsx
- apps/web/src/components/design-system/overlays/popover.tsx
- apps/web/src/components/design-system/overlays/sheet.tsx
- apps/web/src/components/design-system/overlays/tooltip.tsx
- apps/web/src/features/library/components/LibraryCategoryTabs.tsx
- apps/web/src/features/playlists/components/PlaylistFormDialog.tsx
- apps/web/src/features/search/components/SearchFilterDrawer.tsx
- docs/ui/PHASE-2-REPORT.md

## 11. Risk / Regression Analysis

Remaining risks and limitations:
- no full shadcn migration was performed; the phase intentionally kept the custom approach where it was already stable
- no broad migration of feature-specific cards or player components was attempted
- the shared overlay primitives are intentionally lightweight and rely on the repository’s existing structural patterns rather than a full Radix implementation
- the phase did not replace all legacy form usage across the application; the goal was to add the missing shared primitives and migrate the highest-value consumers safely

Known limitations:
- complex compositional patterns and future feature-specific overlays may still require additional wrapper APIs
- the current overlay primitives are intentionally compact and do not attempt to replace all application modal patterns in one step
- the repo’s broader API test suite still contains an unrelated backend failure outside the scope of this phase

## 12. Phase 3 Recommendation

The next phase should focus on selective expansion rather than a broad redesign. The correct continuation is to collect a small, evidence-based set of remaining shared form/overlay migration candidates and consolidate any remaining duplicate layout wrappers only where consumers are already ready for migration.

Recommended focus for the next phase:
- continue incremental provider-layer cleanup around the shared primitives already added in Phase 2
- migrate the next highest-value feature forms or drawers only when consumer usage is clear and stable
- review the remaining app-shell wrappers for canonical ownership without performing large destructive removals
- keep the player and media feature ownership boundary unchanged

This recommendation preserves the project’s existing architecture while making continued component modernization safe.
