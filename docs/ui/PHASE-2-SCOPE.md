# Phase 2 Scope

## Objective

Phase 2 should deliver the smallest safe set of component architecture improvements that unlock better consistency without trying to fully redesign the frontend.

## Non-Goals

Phase 2 explicitly does not include:

- broad UI modernization
- full component library overhaul
- replacing player architecture
- redesigning media cards in all feature domains
- converting the repo to Radix/shadcn everywhere
- changing business logic or state management
- a global refactor of all feature components

## Minimum Safe Phase 2 Scope

### P0 — Critical

1. Canonicalize shared component ownership
   - choose the design-system barrel as the canonical public import path
   - resolve duplicate legacy `ui/` exports
   - document one canonical implementation for common primitives

2. Standardize the public API of the current core primitives
   - Button
   - Card
   - Badge / Tag resolution
   - Input / Field
   - LoadingState / ErrorState / EmptyState

3. Add missing form primitives with minimal risk
   - Textarea
   - Select
   - Checkbox
   - Radio
   - Switch

4. Add a shared dialog/sheet primitive pattern
   - not a full migration of every modal
   - only for new or high-value usage patterns

### P1 — High

5. Standardize tabs for library and similar filters
   - replace the custom tab role pattern with a shared tabs primitive

6. Consolidate overlapping layout navigation implementations
   - resolve duplicate wrapper paths between layout and design-system navigation

7. Standardize custom forms and validation wrappers
   - keep feature-specific logic, but reduce ad hoc raw HTML form controls

### P2 — Medium

8. Add a small shared toast/alert pattern only if a real application need exists

9. Evaluate a small skeleton primitive for loading surfaces

10. Document a clean split between generic media primitives and feature-specific cards

## Implementation Rules

- Small number of primitives only
- Minimal new abstraction depth
- One canonical API pattern per shared family
- Strong regression testing around each migrated component
- No forced migration of feature-specific player or media flows

## Why This Scope Is Safe

This plan addresses the actual gaps without creating a new architecture in one step.

The repo already has:

- a stable feature orientation
- a defined design-system boundary
- working layout composition patterns
- functioning state wrappers
- strong custom player logic

What it lacks is mostly:

- a small set of missing form and overlay primitives
- API consistency
- ownership clarity
- a reduced amount of duplication

That is a targeted Phase 2 problem, not a full redesign problem.

## Expected Outcomes

By the end of Phase 2, the repo should have:

- a small, documented set of canonical shared primitives
- consistent naming and prop conventions
- a clear split between design-system and feature ownership
- a predictable migration path for forms and dialogs
- no broad churn in player or media architecture

This leaves the next phase for optional broader modernization if the app outgrows the current structure.
