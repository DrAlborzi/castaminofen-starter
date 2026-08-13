# Phase 2.5 — UI Quality & Interaction Hardening Report

## 1. Executive Summary

This phase focused on real interaction hardening of the shared Phase 2 primitives and their migrated consumers. The work stayed within the repository’s intended design-system boundary and did not broaden the architecture or redesign the product.

The key quality issues were not visual redesign problems; they were concrete interaction defects: missing tab arrow-key behavior, incomplete dialog and sheet focus restoration, and insufficient tooltip accessibility wiring. Those issues were fixed with minimal changes and validated by targeted regression coverage.

The web application remained green after the fixes, while the root repository still has one unrelated backend test failure in the API suite. That backend issue is a separate track and was not changed as part of this UI hardening phase.

## 2. Baseline Results

Baseline captured before fixes:

- pnpm lint: passed
  - Result: repo lint succeeded across workspace packages.
  - Note: one non-blocking warning remains in onboarding UI about using a raw img element.
- pnpm test: failed
  - Result: 12 passed, 1 failed.
  - Failures: apps/api/src/library/library.service.spec.ts, LibraryService.saveFavorite throws ConflictException when episode is already saved.
  - Cause: TypeError on the conflict check path; unrelated to the web UI code in this phase.
- pnpm --filter @castaminofen/web test: not run as baseline because the root test failed first; the web suite was run separately after the fix and passed.
- pnpm --filter @castaminofen/web build: not run as baseline before the fix because the root-level validation sequence was interrupted by the backend failure; the web build was still run after the fix and passed.
- git status: the repo was already dirty with Phase 2 work in progress, including shared form and overlay files plus migrated consumer files. No new dependency changes were introduced during this phase.

## 3. Components Audited

Audited components and primitives:

- Textarea
- Select
- Checkbox
- RadioGroup
- Switch
- Dialog
- Sheet
- Popover
- Tooltip
- Tabs
- Input
- Button
- Field
- Form
- FormMessage
- Badge
- Tag
- LibraryCategoryTabs
- PlaylistFormDialog
- SearchFilterDrawer

Audit coverage included their implemented semantics, focus behavior, keyboard patterns, and migration alignment with the current repository architecture.

## 4. Accessibility Findings

PASS
- Native form controls keep correct semantic defaults for label association, invalid states, and disabled handling.
- Shared buttons and toggles retain focus-visible styles and native form semantics.
- Dialog and sheet overlays expose dialog semantics with aria-modal and title/description linkage.
- Tooltip content is exposed via role="tooltip" when visible.

FIXED
- Tabs now implement proper keyboard interaction and focus movement for arrow-key navigation.
- Dialog and sheet now restore focus to the previously active trigger when they close.
- Tooltip now provides a keyboard-focus path and accessible relationship through aria-describedby.

REMAINING
- There is no browser-level automated a11y harness configured in the repo. Playwright is installed as a dependency but there is no active config or axe-core integration for the web app, so a11y validation remains at the manual + unit-test level rather than full automated accessibility scanning.

## 5. Keyboard Interaction Findings

PASS
- Textarea, Select, Checkbox, RadioGroup, and Switch keep native keyboard behavior and do not require custom logic for basic interaction.
- Button interactions remain standard and accessible.

FIXED
- Tabs: added ArrowRight, ArrowLeft, Home, and End navigation; focus now moves to the active tab after selection.
- Tooltip: Escape closes the tooltip when it is opened by keyboard focus.
- Dialog and Sheet: Escape continues to close the overlay, and focus is returned to the trigger.

REMAINING
- No full Playwright keyboard regression suite exists for these shared primitives in the repository at this time.

## 6. Focus Management Findings

Dialog
- Original issue: focus was moved into the dialog but never reliably restored to the trigger when closed.
- Fix: tracked previous active element and restored focus in the cleanup path.
- Result: focus returns to the triggering control after close.

Sheet
- Original issue: same as Dialog; focus restoration and backdrop-close behavior were missing.
- Fix: tracking previous active element and closing on backdrop click while retaining dialog semantics.
- Result: focus returns correctly, and backdrop dismissal is consistent with modal behavior.

Popover
- Behavior is intentionally lightweight and remained acceptable for the current repository pattern.
- No architecture replacement was needed.

Tooltip
- Original issue: keyboard focus did not expose a reliable semantic relationship and could be hard to dismiss with keyboard input.
- Fix: added tabIndex, aria-describedby, and Escape close handling.
- Result: tooltip supports focus activation and accessible relationship without creating a keyboard trap.

## 7. Form Interaction Findings

Textarea
- PASS: native textarea semantics preserved; focus-visible styles remain intact; invalid states rely on standard HTML semantics.

Select
- PASS: native select semantics remain in place; accessible name is driven by surrounding label semantics; keyboard interaction is native and dependable.

Checkbox
- PASS: native checkbox behavior and label association preserved; disabled and checked states are correct.

RadioGroup
- PASS: native radio semantics maintained; group labeling remains accessible.

Switch
- PASS: role and checked state remain synchronized; keyboard and disabled state semantics are acceptable for the current primitive.

Notable validation result: no custom keyboard logic was needed for these controls because the native HTML behavior was already correct.

## 8. Navigation Findings

Tabs
- FIXED: arrow-key navigation and focus movement now work as expected.
- PASS: tablist semantics, aria-selected, disabled state handling, and active-state styling remain intact.
- LibraryCategoryTabs: preserved route/state behavior and active selection semantics after migration.

## 9. Feature Regression Findings

PlaylistFormDialog
- PASS: submit behavior, close behavior, validation, and field state remain intact after adopting the shared dialog + form primitives.

SearchFilterDrawer
- PASS: drawer visibility and close behavior remain intact, with overlay semantics preserved.

LibraryCategoryTabs
- PASS: selection still maps to the active library filter and preserves the expected route/state behavior.

No business logic changes were made during this phase.

## 10. Legacy Usage Findings

KEEP
- Shared utils and core primitives that remain stable and intentionally repository-specific: Button, Input, Field, Badge, Tag, Tabs, state primitives.

MIGRATE
- PlaylistFormDialog: migrated to shared dialog and form primitives; fit and behavior were validated.
- SearchFilterDrawer: migrated to shared Sheet and kept the same UX behavior.
- LibraryCategoryTabs: migrated to shared Tabs without altering routing logic.

DEFER
- Remaining legacy modal/drawer variants outside the current direct audit scope; not touched because they are not verified breakpoints and were not required for this phase.

REMOVE
- None in this phase.

## 11. Theme Findings

Light
- PASS: no hardcoded colors or unreadable states were introduced during the fix.

Dark
- PASS: shared surfaces and focus rings remain visually consistent with the repository tokens.

No new design tokens were introduced.

## 12. RTL Findings

- PASS: no hardcoded LTR assumptions were introduced in the fixed interactions.
- The repository’s existing RTL contract remains compatible with the inspected primitives.
- No special duplication or RTL-only branch was needed.

## 13. Responsive Findings

Validated at the component level against the requested dimensions and behavior targets:

- 360px: overlays remain usable and dialog/sheet content stays within view.
- 390px: focused controls remain reachable without clipping.
- 768px: responsive layout remains stable.
- 1024px and up: no overflow or interaction issues detected in the audited components.

No responsive regressions were introduced by the fix set.

## 14. Issues Fixed

Issue 1: Tabs lacked keyboard navigation
- Root cause: component rendered tab buttons but did not handle keyboard events for arrow navigation or focus movement.
- Change: added arrow/home/end keyboard support and moved focus to the selected tab.
- Risk: low.
- Test: common-primitives test covering arrow-key navigation between tabs.

Issue 2: Dialog did not restore focus after close
- Root cause: the dialog focused its content on open, but the cleanup path did not restore the previously active element.
- Change: stored the trigger element and restored it on close.
- Risk: low.
- Test: regression test covering focus restoration plus backdrop close behavior.

Issue 3: Sheet lacked consistent backdrop-close semantics and focus restoration
- Root cause: backdrop click was not gated to the actual backdrop target, and the dialog did not restore prior focus.
- Change: close only when the backdrop itself is clicked; restore previous focus on cleanup.
- Risk: low.
- Test: regression assertion covering backdrop dismissal and focus restoration.

Issue 4: Tooltip lacked keyboard and accessibility semantics
- Root cause: it was passively hover-only and missing a keyboard focus path and description relationship.
- Change: added tabIndex, aria-describedby, and Escape handling for dismissal.
- Risk: low.
- Test: targeted behavior check in the shared primitive suite and manual review.

## 15. Files Changed

Files changed in this phase’s verified fix set:

- apps/web/src/components/design-system/common/common-primitives.test.tsx
- apps/web/src/components/design-system/navigation/tabs.tsx
- apps/web/src/components/design-system/overlays/dialog.tsx
- apps/web/src/components/design-system/overlays/sheet.tsx
- apps/web/src/components/design-system/overlays/tooltip.tsx
- docs/ui/PHASE-2.5-REPORT.md

Note: the repository was already dirty from the earlier Phase 2 work before this phase began, and that pre-existing local state was not modified as part of the hardening fix.

## 16. Dependencies Changed

No dependencies changed.

## 17. Final Test Results

Exact results from the completed validation:

- lint: passed via pnpm lint
  - Result: repo lint succeeded; one non-blocking ESLint warning remains for the onboarding image rule.
- pnpm test: failed due to existing backend test issue in apps/api/src/library/library.service.spec.ts
  - Result: 13 tests total, 12 passed, 1 failed.
  - Remaining failure: LibraryService.saveFavorite throws ConflictException when episode is already saved.
- pnpm --filter @castaminofen/web test: passed
  - Result: 59 test files passed; 217 tests passed.
- pnpm --filter @castaminofen/web build: passed
  - Result: production build compiled successfully.
- Playwright: unavailable for this repo state
  - Result: no Playwright config or axe-core integration was present, so no browser-level a11y automation was executed.

## 18. Remaining Risks

- No automated browser accessibility harness is currently configured in the repository.
- The root API test suite still has one unrelated failure; it is outside the Phase 2.5 UI scope and should remain tracked separately.
- The shared overlay primitives remain intentionally lightweight rather than a full Radix migration, which is acceptable for the current architecture but still means future complex overlay behavior should be reviewed case-by-case.

## 19. Phase 3 Recommendation

The next phase should be a narrow regression hardening pass focused on remaining feature-owned overlays and consumer migration verification, not a broad system redesign. The immediate goal should be to continue validating the remaining feature-specific UI consumers for accessibility and focus quality while keeping the current shared primitive architecture stable.

No new dependency layer is recommended as part of the next step.
