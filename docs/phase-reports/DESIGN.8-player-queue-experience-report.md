# DESIGN.8 - Player / Queue Experience Report

**Repository:** `PicoRmin/castaminofen-starter`  
**Phase date:** 2026-08-09  
**Scope:** Presentation-only Player and Queue consistency audit and normalization.

## 1. Executive Summary

**Observed:** Player runtime, Zustand state, audio engine, persistence, queue mutations, and Player/Queue presentation are feature-owned under `apps/web/src/features/player`. The design system already provides canonical artwork, media metadata, duration, mini-player, and progress primitives. Player progress previously rendered an unknown duration as a determinate `0 of 0` range.

**Implemented:** `PlayerProgress` now composes the canonical `ProgressIndicator`. Unknown duration remains indeterminate, displays `مدت نامشخص`, and does not expose a seek range. Known duration preserves the existing range keyboard behavior and runtime `setCurrentTime` delegation. The canonical indeterminate indicator is reduced-motion safe.

**Validated:** Focused progress tests pass 2/2; the full web suite passes 56 files and 207 tests; API tests pass 13/13; lint passes with one pre-existing warning; production build passes. Web typecheck retains two pre-existing Player test errors.

**Confidence:** High for ownership preservation and progress semantics; medium for visual and assistive-technology behavior because no browser or screen-reader automation was available.

## 2. Audit Scope

Inspected:

- Repository root, package/workspace configuration, README and design-system README.
- DESIGN.0, DESIGN.2, DESIGN.3, DESIGN.4, DESIGN.6, DESIGN.7, and prior Player reports.
- `PlayerBar`, `PlayerControls`, `PlayerInfo`, `PlayerProgress`, `QueuePanel`, immersive player entry point, and Player experience panels.
- Player runtime, audio engine boundary, Zustand Player store, persistence adapter, queue display utilities, and playback presentation tests.
- PlayerBar integration tests, runtime tests, queue tests, persistence tests, and web/API validation commands.
- Canonical `ContentArtwork`, `MediaMetadata`, `Duration`, `MiniPlayer`, `ProgressIndicator`, and playback/media primitives.

No `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, or nested instruction file was found in the workspace search.

## 3. Player Architecture

`features/player/runtime/playerRuntime.ts` owns playback lifecycle, audio-engine interaction, loading, play/pause, stop, next/previous, seek, volume, queue dispatch, and runtime event synchronization. `features/player/store/playerStore.ts` owns the Player state model and mutations. `features/player/runtime/playerPersistence.ts` owns persisted snapshots and restoration. `PlayerBar` and its child components render state and invoke the runtime controller; the design system does not own any playback behavior.

## 4. Queue Architecture

The Player store is the single queue owner. It owns queue contents, current index, current item, append, move, remove, clear, next, previous, repeat, shuffle, and current-index normalization. The runtime delegates queue operations to that store and persists the resulting snapshot. `PlayerBar` and `QueuePanel` receive or read the feature-owned queue and call feature-owned handlers. No second queue store, persistence layer, or synchronization layer was introduced.

## 5. State Ownership

- **Playing/status:** `playerStore.playbackStatus` and its derived `isPlaying`, synchronized by `playerRuntime` and `audioEngine` events.
- **Current item:** `playerStore.currentItem`, derived alongside `currentIndex` from queue mutations.
- **Progress:** `playerStore.currentPosition`, updated by the runtime/audio engine; `PlayerProgress` only displays and delegates seek.
- **Duration:** `playerStore.duration`, supplied by the audio engine/runtime. Unknown duration is not fabricated.
- **Queue:** `playerStore.queue` and `currentIndex`.
- **Errors:** `playerStore.error`, classified by the runtime and rendered by Player presentation.
- **Loading:** `playerStore.playbackStatus === 'loading'`, classified by the runtime and rendered by Player presentation.
- **Persistence:** `playerPersistence.ts` and the existing local storage snapshot contract.

No UI state mirror was added.

## 6. Component Adoption

The phase selectively adopted canonical `ProgressIndicator` in `PlayerProgress`. Existing specialized Player and Queue layouts remain feature-owned because their runtime actions, queue controls, and responsive composition are domain-specific. Existing canonical `ContentArtwork`, `MiniPlayer`, `Tag`, and `Button` usage was preserved.

## 7. Artwork / Metadata

`PlayerInfo` uses canonical `ContentArtwork` with the existing feature fallback and supplied accessible title. Queue current-item presentation uses the existing `MiniPlayer` composition in `PlayerBar`; queue metadata remains feature-specific and does not move behavior into a generic media component. No media URL, loading strategy, fallback, title, subtitle, creator, or duration source changed.

## 8. Playback Presentation

`PlayerControls` remains feature-owned and delegates play, pause, stop, previous, next, repeat, and shuffle to `usePlayerRuntime`/`usePlayerState`. Native `Button` semantics, accessible labels, `aria-pressed`, disabled behavior, and loading behavior remain intact. No playback handler moved into the design system.

## 9. Progress Contract

Known duration remains determinate and seekable. `PlayerProgress` preserves current-position display, duration display, keyboard seeking, and runtime `setCurrentTime` calls.

Unknown or non-positive duration is now indeterminate: `ProgressIndicator` omits `aria-valuenow`, exposes `پیشرفت نامشخص`, and uses a non-determinate visual. The seek range is not rendered and the duration label is `مدت نامشخص`. No current time or duration is fabricated, and no playback calculation changed.

## 10. Queue Experience

The current item remains derived from Player state and is highlighted with surface, tag, text, and existing current-item structure. Upcoming items retain runtime-owned play, remove, move-up, move-down, and clear handlers. Disabled edge controls remain native disabled controls. Empty queue and no-upcoming-item copy remain distinct from runtime error/loading states. No reorder algorithm, mutation API, optimistic update, persistence, or queue ordering changed.

## 11. Accessibility

Existing native buttons and accessible names for play, remove, move, clear, queue open/close, retry, and immersive expansion were preserved. Queue dialog semantics and Escape dismissal remain feature-owned. Current and playback states retain visible text and tags rather than relying on color alone. Progress now has an honest indeterminate ARIA contract; known progress retains range semantics. Focus behavior and existing keyboard seeking were preserved and covered by the focused regression test.

## 12. RTL

The application remains Persian-first with `lang="fa"` and `dir="rtl"`. This phase added no physical directional layout rules and did not mirror playback icons. Existing logical flex layout, Persian labels, and semantic previous/next controls remain unchanged.

## 13. Responsive

The existing PlayerBar desktop/mobile progress placement, compact controls, queue panel, immersive entry point, shell composition, and responsive breakpoints were untouched. No duplicate PlayerBar, safe-area handling, bottom spacing, or shell ownership was introduced. Browser validation at 320, 375, 768, 1024, 1280, and 1440px was not available and remains deferred.

## 14. Tokens / Motion

The change uses canonical semantic surface/accent classes and the canonical progress primitive. Determinate progress retains its existing motion rule; indeterminate motion is gated with `motion-safe`, while determinate transition already uses `motion-reduce:transition-none`. No new colors, radii, breakpoints, or decorative animation were introduced.

## 15. Data Provenance

Player bar and queue core are REAL runtime data. Immersive supporting panels such as transcript, discussion, memory, creator, timeline, bookmarks, and related content remain PARTIAL/MOCK as documented by previous Player and DESIGN.3 reports. This phase did not add misleading provenance labels or convert mock data into runtime functionality.

## 16. Files Changed

DESIGN.8 implementation files:

- `apps/web/src/components/design-system/player/progress-indicator.tsx`
- `apps/web/src/features/player/components/PlayerProgress.tsx`
- `apps/web/src/features/player/components/PlayerProgress.test.tsx`

## 17. Files Intentionally Untouched

- `apps/web/src/features/player/runtime/playerRuntime.ts`
- `apps/web/src/features/player/runtime/audioEngine.ts`
- `apps/web/src/features/player/runtime/playerPersistence.ts`
- `apps/web/src/features/player/store/playerStore.ts`
- Player adapters, hooks, queue utilities, API contracts, routing, authentication, shell composition, and immersive supporting data ownership.

## 18. Tests

- Focused `PlayerProgress` regression: **2 tests passed**.
- Web suite: **56 test files, 207 tests passed**.
- Root/API suite: **13 tests passed**.
- Existing Vitest config-loader warning remains non-fatal.

## 19. Typecheck

`pnpm --filter @castaminofen/web exec tsc --noEmit` reports two existing errors outside the changed files:

- `src/features/player/components/PlayerDataIntegration.test.tsx:56`: missing `onMove` and `onClear` props for `QueuePanel`.
- `src/features/player/runtime/__tests__/persistence.test.ts:42`: `read.queue` is possibly undefined.

The changed progress files introduce no typecheck errors. These failures were also documented by previous Player/design phase reports and were not altered by DESIGN.8.

## 20. Lint

`pnpm lint` and the final focused web lint pass. One pre-existing warning remains in `src/features/onboarding/components/WelcomeScreen.test.tsx` for using `<img>`. The temporary unused-import warning in `PlayerProgress` was removed and is no longer present.

## 21. Build

`pnpm build` passes for shared types, web, and API. Next.js generated all 19 routes successfully. The existing Welcome `<img>` warning is emitted during the web build.

## 22. Runtime Validation

Static DOM validation covered indeterminate progress, known-duration range semantics, keyboard seek delegation, full web behavior, API behavior, and production compilation. Browser viewport, real audio, screen-reader, axe, and mixed-script RTL validation were unavailable in this environment and are deferred.

## 23. Pre-existing Issues

- Two web typecheck errors in Player tests described in Section 19.
- Existing Welcome test `<img>` lint/build warning.
- Existing Vitest Vite config-loader warning.
- Browser/API proxy runtime checks require a running API and were not used as evidence for this presentation-only change.

## 24. Deferred Design Debt

- Add browser viewport and keyboard matrix coverage for compact, desktop, immersive, and queue surfaces.
- Add real-browser playback, buffering, unavailable-media, focus, screen-reader, reduced-motion, and mixed-script RTL checks.
- Resolve the pre-existing Player test type errors in a separate runtime/test-contract task.
- Review provenance treatment for immersive Player supporting panels after product copy review.

## 25. Architecture Safety Confirmation

DESIGN.8 remained a presentation and UX-consistency phase. Player runtime ownership, Player store ownership, queue ownership, queue semantics, playback behavior, persistence, API contracts, authentication, routing, and feature business logic remained outside the design system. No second playback owner or queue owner was introduced, no persistence logic moved, no empty state masked an error, and unknown progress was not represented as zero.