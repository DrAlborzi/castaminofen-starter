# Phase PLAYER.HARDENING.1 — Queue determinism and current-item removal hardening

## Objective
Harden the Player queue behavior in a minimal, incremental way without expanding Player into an app-wide orchestrator. The scope is limited to queue mutations and runtime safety around current-item removal.

## Scope
- Keep queue ownership inside the Player store/runtime boundary.
- Add deterministic queue reordering support through the existing Player runtime controller.
- Ensure removing the current queue item transitions to a safe next item instead of leaving the runtime in an inconsistent state.
- Preserve the existing playback semantics and public Player API surface as much as possible.

## Completed Work
- Added a queue reordering action at the Player store layer and exposed it through the runtime controller.
- Hardened current-item removal so that removing the active item now selects the next valid queue item when one exists, or an empty-safe state when the queue becomes empty.
- Added regression coverage for queue reordering and current-item removal behavior in the Player runtime tests.
- Verified the Player runtime test suite, web lint, and web production build.

## Files Changed
- apps/web/src/features/player/store/playerStore.ts
- apps/web/src/features/player/runtime/playerRuntime.ts
- apps/web/src/features/player/runtime/playerRuntime.test.ts
- docs/architecture-decisions.md
- docs/development/changelog.md
- docs/project-status.md

## Validation Results
- Player runtime tests: 172 passed
- Web lint: passed with existing unrelated warning in WelcomeScreen test
- Web build: passed
