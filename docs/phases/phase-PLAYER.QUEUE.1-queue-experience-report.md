# Phase PLAYER.QUEUE.1 — Queue Experience & Management

## Objective
Improve Queue clarity and interaction quality in the existing Player UI without changing playback semantics, queue ownership, persistence format, or the Player runtime contract.

## Scope
- Keep Queue state owned by the Player store/runtime boundary.
- Improve current-item clarity in the compact and immersive Queue surfaces.
- Add clearer actions for play, remove, reorder, and clear.
- Strengthen empty-state and accessibility messaging for Queue interactions.
- Preserve the existing Player runtime, persistence, and playback behavior.

## Completed Work
- Added stronger current-item presentation in the compact queue and immersive queue panel with clearer active-state labeling.
- Added reorder controls for upcoming Queue items through the existing Player runtime boundary.
- Added explicit remove controls for both upcoming items and the current item while preserving the existing runtime semantics.
- Added clearer Queue empty and clear-state affordances for the existing Player UI.
- Added regression coverage for current-item removal and queue reordering interactions in the Player bar tests.
- Verified the web test suite, lint, and production build.

## Files Changed
- apps/web/src/features/player/components/PlayerBar.tsx
- apps/web/src/features/player/components/QueuePanel.tsx
- apps/web/src/features/player/components/ImmersivePlayerPanel.tsx
- apps/web/src/features/player/components/PlayerBar.test.tsx

## Validation Results
- Focused PlayerBar queue tests: 8 passed
- Full web test suite: 178 passed
- Web lint: passed
- Web build: passed
