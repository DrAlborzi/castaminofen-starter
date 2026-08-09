# DESIGN.0 — Full Product Design Audit Report

**Audit date:** 2026-08-08  
**Repository:** `PicoRmin/castaminofen-starter`  
**Scope:** Read-only repository-wide product UI, design-system, UX architecture, responsive, RTL, accessibility, state, and documentation audit.  
**Evidence convention:** `Observed` is verified in source or documentation. `Recommendation` is the proposed future contract. Confidence is HIGH when directly verified, MEDIUM when supported by several signals, and LOW when inferred from an incomplete surface.

## 1. Executive Summary

Castaminofen currently presents as a Persian-first, RTL audio product with a dark-first visual language: Vazirmatn typography, violet primary action, green playback/success accent, dark layered surfaces, rounded cards, and a persistent player on most authenticated/application routes. The implementation has a substantial real foundation: Next.js App Router, feature-owned modules, API-backed podcast/episode/library/search/playlist flows, React Query, Zustand player state, audio runtime, persistence, and reusable design-system primitives.

The primary design risk is not absence of visual work; it is divergence. Four overlapping UI surfaces coexist: `components/design-system`, `components/ui`, `components/layout`, and older feature-local Tailwind markup. Desktop navigation is implemented but not mounted by the application shell. Theme tokens include light mode, but root theme application is not clearly centralized. Core media and player behavior is real, while creator, community, admin, much of profile, and immersive player supporting content are explicitly mock-backed. Several route protection boundaries are incomplete or client-only.

**High-confidence system priorities:** establish one canonical primitive layer; make shell/navigation ownership explicit; label real, mock, static, and unsupported states in the contract; consolidate tokens and state patterns; then perform cross-product RTL, responsive, and WCAG validation. This report is the authoritative design contract for subsequent design implementation phases; it does not authorize implementation in this phase.

## 2. Repository & Product Surface Inventory

### Architecture observed

- Web application: `apps/web`, Next.js 14 App Router, React 18, TypeScript, Tailwind, Vitest.
- API application: `apps/api`, separate backend workspace.
- Shared contracts: `packages/*`, including shared types consumed by the web app.
- Root composition: `apps/web/src/app/layout.tsx` -> `AppProviders` -> `AppShell`.
- Data boundary: `apps/web/src/shared/lib/api-client.ts`, re-exported by `src/lib/api.ts`; React Query hooks own server data.
- Auth boundary: `src/lib/auth.ts`, `auth-token.ts`, `stores/authStore.ts`, `features/auth`, `ProtectedRoute`.
- Player boundary: `features/player/runtime`, `features/player/store`, `features/player/components`, with playlist-to-player adapter utilities.
- Design-system entry: `src/components/design-system/index.ts` and `README.md`.
- Tokens: `src/styles/tokens.css`; global application styles: `src/app/globals.css`; Tailwind mapping: `apps/web/tailwind.config.ts`.

### User-facing surface inventory

| Surface | Evidence | Current status |
| --- | --- | --- |
| Welcome/root | `src/app/page.tsx`, `home-page-mode.ts`, `features/home` | LIVE/PARTIAL hybrid; anonymous discovery/onboarding and authenticated redirect to `/library`; `HomePage` is not the root renderer |
| Login/signup | `src/app/login`, `src/app/register`, `features/auth` | LIVE, API-backed auth |
| Session/loading/redirect | `home-page-mode.ts`, `ProtectedRoute`, auth store/query | LIVE/PARTIAL; client hydration and redirect states exist |
| Discovery/home | root route, `features/home`, search/podcast surfaces | PARTIAL; discovery contains placeholder/mock recommendation/category areas |
| Podcasts | `src/app/podcasts`, `features/podcasts`, `lib/podcasts` | LIVE API-backed list |
| Podcast details/create/edit | `src/app/podcasts/[id]`, `new`, `edit` | LIVE/PARTIAL; API-backed, protection and query timing need review |
| Episodes | `src/app/episodes/[id]`, `new`, `features/episodes` | LIVE/PARTIAL; API-backed detail/upload/create |
| Search | `src/app/search`, `features/search/SearchPage.tsx` | LIVE/PARTIAL; podcast and episode search are backed; future sections are placeholders |
| Library/continue listening | `src/app/library`, `features/library` | LIVE API-backed, player-integrated |
| Saved/offline | `src/app/offline-library` | PARTIAL/placeholder; no offline data store is evident |
| Playlists | `src/app/playlists`, feature modules | LIVE/PARTIAL API CRUD, playback/reorder; route-level protection is incomplete |
| Player bar | shell and `features/player/components/PlayerBar.tsx` | LIVE real runtime on application routes |
| Full/immersive player | `features/player` immersive components | PARTIAL; core playback/queue real, supporting transcript/discussion/timeline content mock-backed |
| Queue | player store/runtime and playlist playback utilities | LIVE core queue; suggested queue items may be mock/non-playable |
| Profile | `src/app/profile`, `features/profile` | PARTIAL; identity and continue listening live, stats/content mock-backed |
| Settings | `src/app/settings`, `features/settings` | PARTIAL/local; preferences use local persistence, no backend settings boundary |
| Creator/create | `src/app/create`, `src/app/creator` | MOCK presentation/management surfaces |
| Community/social | `src/app/community`, `features/community`, `features/social` | MOCK; no real social backend boundary is evident |
| Admin | `src/app/admin`, `features/admin` | MOCK; governance dashboard and datasets explicitly mock-backed |
| PWA/install/offline | `public/site.webmanifest`, `pwa`, install banner | PARTIAL; install support exists, offline product behavior does not |

### Product surface risks

- `components/header.tsx` and design-system desktop navigation appear unmounted/legacy.
- `features/social` contains reusable UI without a real route/data owner.
- `AudioPlayer.tsx` and root `stores/playerStore.ts` remain transitional alongside feature-scoped player runtime/store.
- Mock content is visually close to production content in several features; the contract must make that boundary visible.

## 3. Route-to-Design Inventory

| Route | Feature | Owner | Auth state | Shell/player | Primary UX goal | Existing components | Design status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Welcome/discovery | `app/page.tsx`, home | Public or session-hydrating | No global nav/player by shell rule | Orient anonymous users; redirect authenticated users | Discovery/home, states | LIVE/PARTIAL |
| `/login` | Auth | `features/auth` | Public | Centered auth shell, no player | Form primitives, auth view | LIVE |
| `/register` | Auth | `features/auth` | Public | Centered auth shell, no player | Form primitives, auth view | LIVE |
| `/library` | Library | `features/library` | Protected client route | Mobile header, bottom nav, player | Resume and manage listening | Library sections, MediaCard, states | LIVE |
| `/search` | Search | `features/search` | Public/application | Global shell/player | Find podcasts and episodes | Search page, media cards, tags, states | LIVE/PARTIAL |
| `/podcasts` | Podcasts | `features/podcasts` | Application | Global shell/player | Browse catalog | `components/ui`, podcast cards | LIVE |
| `/podcasts/[id]` | Podcast details | Podcasts | Application, management behavior not fully guarded | Global shell/player | Inspect/play podcast | Podcast details, API data | LIVE/PARTIAL |
| `/podcasts/new` | Podcast creation | Podcasts | Protected client route | Global shell/player | Create podcast | Form primitives | LIVE/PARTIAL |
| `/podcasts/[id]/edit` | Podcast editing | Podcasts | Protected client route | Global shell/player | Edit owned podcast | Form primitives | LIVE/PARTIAL |
| `/episodes/[id]` | Episode details/upload | Episodes | Protected behavior, query begins before guard | Global shell/player | Inspect/upload episode | Episode presentation/form | LIVE/PARTIAL |
| `/episodes/new` | Episode creation | Episodes | Protected client route | Global shell/player | Create episode | Episode form | LIVE/PARTIAL |
| `/playlists` | Playlists | Playlists | Application; no route guard evident | Global shell/player | Manage playlists | Playlist components | LIVE/PARTIAL |
| `/playlists/[id]` | Playlist detail | Playlists | Application; no route guard evident | Global shell/player | Reorder and play list | Queue/playback utilities | LIVE/PARTIAL |
| `/profile` | Profile | Profile | Protected client route | Global shell/player | Identity and continuation | Profile sections, library/media components | PARTIAL |
| `/settings` | Preferences | Settings | Protected client route | Global shell/player | Control local preferences | Cards, buttons, range input | PARTIAL/LOCAL |
| `/community` | Community | Community | No route guard evident | Global shell/player | Read/interact with community | Mock community dashboard | MOCK |
| `/create` | Creator studio | Create | Protected client route | Global shell/player | Present creator workflow | Mock creator studio components | MOCK |
| `/creator` | Creator management | Creator | No route guard evident | Global shell/player | Manage creator content | Mock creator components | MOCK |
| `/admin` | Administration | Admin | No route guard evident | Global shell/player | Governance/operations overview | Mock admin dashboard | MOCK |
| `/offline-library` | Offline library | App route | Application | Global shell/player | View offline content | Placeholder search/link | PARTIAL/ORPHAN-LIKE |

**Reachability note:** App Router files are route candidates, but route existence is not proof of product completion. Status above is based on imports, data hooks, guards, and mock datasets. Confidence HIGH for route/file status; MEDIUM for runtime reachability where middleware/server behavior is outside the web route evidence.

## 4. Current Design System

### Documented system

`components/design-system/README.md` describes grouped primitives for layout, navigation, state, media, social, player, identity, and common controls. Phase reports describe a reusable shell, page-state foundation, feature ownership, and player boundary. Documentation generally claims preservation of ownership and API boundaries during UI phases.

### Implemented system

- Tokenized dark/light variables exist in `styles/tokens.css`.
- `globals.css` defines parallel utility classes such as `.button`, `.card`, `.input`, `.loading-state`, and state/focus styles.
- Tailwind consumes aliases and token values.
- Design-system components are exported from a central index.
- `components/ui/*` and `components/layout/*` provide aliases/forwarders and older public import paths.
- Feature components frequently use direct Tailwind classes, including arbitrary radii, spacing, colors, and local control styles.

### Actual product system

The user experiences a dark, rounded, accent-led, card-based RTL interface with Vazirmatn and Lucide icons, but not a single governed system. Newer surfaces favor design-system imports; legacy API pages favor `components/ui`; social/settings/profile and mock dashboards include local styling. The result is recognizable but not reliably consistent in control dimensions, radius, focus treatment, state semantics, density, and desktop shell behavior.

**Conflict:** documentation treats design-system primitives as the shared foundation, while implementation permits multiple equivalent primitive layers. **Recommendation:** designate one canonical import layer and classify all other layers as compatibility/deprecation surfaces before future visual redesign.

## 5. Token Audit

### Colors

**Observed:** primary `#776CFE`, primary hover/active variants, green success/playback `#00EA99` (light theme `#00C77F`), purple accent, olive secondary, warning, danger, info, focus ring, scrim, and multiple semantic surfaces. Dark and `[data-theme='light']` values exist. Aliases such as `--bg-primary`, `--accent`, `--success`, and `--error` coexist with more descriptive tokens.

**Gaps:** direct literals and Tailwind arbitrary colors are widespread; semantic namespaces requested by the future contract (`surface.*`, `text.*`, `border.*`, `action.*`, `status.*`, `playback.*`, `focus.*`) are not the current naming convention. Root layout declares `colorScheme: 'dark'`; a visible centralized theme application boundary is not evident although settings persist a theme preference.

### Typography

**Observed:** `Vazirmatn` is loaded by layout and used for body and headings. Existing sizes include display, h1-h4, body, caption, metadata, label, and code. `globals.css` globally applies heading weights/line heights and a negative `letter-spacing-tight`.

**Gaps:** feature-local arbitrary sizes and tracking occur, including uppercase/expanded metadata styling. The system is Persian-first but has not documented mixed Persian/English, numeric, duration, or code typography rules.

### Spacing

**Observed:** `--space-1` through `--space-12`; page container uses responsive Tailwind padding and player-safe bottom padding. Components commonly use `gap-2/3/4`, `p-3/4/6`, and arbitrary values.

**Gaps:** no documented density scale or page/section/grid contract; arbitrary values bypass the scale.

### Radius

**Observed:** `--radius-2/4/6/8/12/16/20/24`, pill, and circle. Global `.card` uses radius 20 and `.button`/form controls radius 16; feature code often uses `rounded-full`, `rounded-2xl`, and arbitrary `rounded-[...]`.

**Gaps:** no role mapping explains when a surface should be 8, 16, 20, 24, pill, or circle.

### Elevation

**Observed:** xs through xl and glass shadows plus border/surface layering. Player, cards, dialogs, and popovers have named surface tokens.

**Gaps:** elevation is not consistently semantic; many feature cards use `shadow-sm` or local opacity/border combinations. Modal/player z-index and layering rules are not captured as a single contract.

### Motion

**Observed:** 120/180/240ms, one cubic-bezier easing, hover translate on primary buttons, transitions, and scroll behavior. Reduced-motion behavior was not found in the inspected global CSS/evidence.

**Recommendation:** preserve the existing three-step timing scale, prohibit decorative motion, and add a verified reduced-motion contract before motion-heavy redesign.

### Breakpoints

**Observed:** Tailwind defaults are used (`sm`, `md`, `lg`, `xl`) and layout classes use responsive padding/grid changes. No project-specific breakpoint token hierarchy or cross-feature breakpoint table is evident.

**Recommendation:** define named product breakpoints only after measuring current behavior; do not invent new values where Tailwind defaults already represent actual usage.

## 6. Component Inventory

| Component/group | Location | Usage | Canonical status | Variants/states | Accessibility evidence | Recommendation |
| --- | --- | ---: | --- | --- | --- | --- |
| Button | `components/design-system/common/button`, `components/ui/button.tsx`, global `.button` | High | Design-system candidate; duplicate public surfaces | primary/secondary/ghost and disabled/focus; local variants also exist | Native button and aria labels in feature use | Canonicalize design-system Button; retain UI alias temporarily |
| IconButton | design-system common | Medium | Canonical candidate | icon-only | Must require accessible label | Enforce label, target, focus contract |
| Link | Next `Link` plus styled anchors | High | Not centrally governed | inline/action | Semantics vary when Button is nested in Link | Define Link/action-link contract; avoid nested interactive elements |
| Input/Form | `components/ui`, design-system/common, feature-local | High | Duplicate | input/select/textarea/error | Some labels and aria labels; inconsistent error association | Canonicalize field anatomy and error IDs |
| Card | design-system/common, `components/ui/card`, global `.card`, local divs | Very high | Duplicate | card/media/status | Usually structural, not always semantic | One surface/card contract; feature cards compose it |
| MediaCard | layout/design-system and feature-local | High | Canonical candidate | podcast/episode/list/playing | Play labels observed in search/profile | Centralize artwork, metadata, action, playing/queued states |
| Artwork | design-system/media and local images | High | Candidate canonical | ratio/fallback/loading | Alt behavior requires audit | Define semantic/decorative and broken-image contract |
| Avatar | design-system/identity and ui | Medium | Duplicate/alias | user/creator/fallback | Identity alt/label needs audit | One Avatar API |
| Tag/Chip | design-system/common and local pills | Medium | Duplicate | status/filter/sort | Native controls not always used | Separate noninteractive Tag from interactive Chip |
| Badge | `components/ui/badge`, identity badges, local spans | Medium | Duplicate | status/identity/unread | Text status generally visible | Consolidate semantic Badge roles |
| SectionHeader | layout/design-system | High | Canonical candidate | title/description/action | Heading structure useful | Enforce heading level and responsive action placement |
| Header | layout/mobile-header, legacy header, design-system nav | High | Shell duplicate | mobile and legacy | landmark/labels need audit | Shell owns Header; legacy paths deprecated |
| Navigation | BottomNavigation and DesktopNavigation | High | Split; desktop orphaned | active/hover/focus | `aria-current`/labels need verification | One navigation model with responsive renderers |
| PlayerBar | `features/player/components/PlayerBar.tsx` | Global | Feature canonical | loading/playing/paused/error | Controls need keyboard/announcement audit | Player owns playback UI and state |
| Queue | player feature/store and playlist utilities | Medium | Feature canonical | reorder/remove/empty/queued | Drag/keyboard semantics need audit | Queue contract separate from playlist presentation |
| Modal/Sheet/Popover | design-system groups/local | Low/medium | Inconsistent | dialogs/sheets/dropdowns | Dialog focus/escape/label audit needed | Establish overlay primitives before redesign |
| Toast/Alert | design-system/common/local state | Low/medium | Inconsistent | success/error/info | Live-region semantics need audit | Define announcement and persistence rules |
| Skeleton/LoadingState | design-system/state, ui/page-state, local | High | Duplicate | loading/partial | `aria-busy`/announcement not consistent | One state system |
| EmptyState/ErrorState | design-system/state, ui, feature-local | High | Candidate canonical | empty/error/retry | Guidance varies | One state anatomy and action policy |

## 7. Component Consistency Audit

- **Buttons:** global and design-system buttons have tokenized min-height and focus, but feature-local controls use arbitrary heights, radii, padding, and color classes. Primary hover translates vertically, which is not a documented global interaction rule. Loading and destructive variants are not visibly standardized across all routes.
- **Cards:** the global card is `radius-20` with border, surface, and shadow; settings/profile/social/mock features add `rounded-2xl`, `rounded-[1rem]`, `bg-surface-secondary/70`, and nested cards. Playing, selected, active, and queued visuals are not one shared state API.
- **Section headers:** `SectionHeader` exists, but many pages manually assemble heading, description, and CTA wrappers with different alignment and responsive behavior.
- **Forms:** `form.tsx`, `input.tsx`, global classes, and feature-local controls coexist. Some fields use explicit `label`/`htmlFor`; others rely on `aria-label`. Error text and `aria-describedby` are not proven universal.
- **Navigation:** bottom navigation is mounted in the shell; desktop navigation is implemented but not mounted. Active state and responsive behavior therefore differ by viewport in a structural, not merely visual, way.
- **Media:** `MediaCard` and artwork primitives exist, but cards and images are frequently composed locally. Play affordances and image fallback/alt behavior need one contract.

## 8. UX Pattern Audit

| State/pattern | Observed behavior | Contract direction |
| --- | --- | --- |
| First-time/public | Root chooses loading, discovery/onboarding, or redirect based on hydration/session | Keep root as orientation; never imply personalized content before session/data truth exists |
| Returning/authenticated | Authenticated root redirects to library | Library owns continuation; avoid duplicate continue-listening modules elsewhere unless explicitly linked |
| Loading | Shared loading states and React Query loading exist, plus local placeholders | Use one state anatomy with `aria-busy`; preserve layout stability |
| Empty | EmptyState exists; feature-specific empty copy varies | Empty state must explain meaning and next action, not imply missing backend data is user absence |
| Error | ErrorState and local messages exist | One retry/back/navigation policy; expose actionable error semantics |
| Success | Form and preference success states exist | Use consistent confirmation text/visual and live-region policy |
| Partial | Search and several mock/live hybrids show partial data | Label unavailable/coming/preview data; do not make mock content look like user state |
| Disabled | `disabled` and opacity patterns exist; local `aria-disabled` is also used | Native disabled for controls; `aria-disabled` only where interaction semantics require it |
| Offline | PWA/install exists; offline library is placeholder | Treat offline as unsupported/partial until data persistence and failure states exist |
| Playback | Real player has play/pause/queue/repeat/shuffle/persistence | Make playing, paused, loading, failed, queued, and current item visually and audibly distinct everywhere |
| Focus/hover/pressed | Global focus ring exists but local controls often bypass it | Require focus-visible and minimum target contract for every interactive primitive |

## 9. Home / Discovery / Library Relationship

- **Orientation:** Welcome/root owns orientation for anonymous users and session resolution; authenticated users are sent to Library.
- **Discovery:** root discovery, Podcasts, Search, and episode/podcast catalog surfaces own finding content. Search owns query results, not general personalization.
- **Continuation:** Library owns continue listening and recent listening data. Profile currently also exposes continue listening, creating a potential ownership duplication.
- **Personalization:** authenticated root/library patterns suggest Library is the current owner, but personalized discovery is not fully evidenced as API-backed.
- **Catalog browsing:** Podcasts and Search own API-backed catalog browsing; root contains partial/mock discovery content.
- **Playback initiation:** media cards, episode detail, library, playlists, and player own initiation at different points; the action should always dispatch into Player, never duplicate playback state.
- **Listening history:** player persistence/runtime and library hooks are the evidence-backed owners; profile presentation should remain read-only.

**Recommendation:** Welcome orients, Discovery recommends, Podcasts browses, Search finds, Library continues, Player plays, and Profile summarizes identity. Each surface may link to another owner but should not reimplement its state.

## 10. Player Design Audit

**Observed architecture:** `features/player/components/PlayerBar.tsx`, `runtime/playerRuntime.ts`, `runtime/audioEngine.ts`, feature store/persistence, `episodeToPlayable.ts`, and playlist playback utilities form a real playback path. Queue supports append/remove/reorder/clear/next/previous/repeat/shuffle/autoplay/resume. `AudioPlayer.tsx` and root `stores/playerStore.ts` are transitional/legacy evidence.

**Real vs mock:** immersive player playback and queue state use the real runtime; transcript, timeline, discussions, bookmarks, memory, creator panel, related content, and some queue suggestions use `mockPlayerExperience.ts` or mock social data. Some suggested items may lack playable audio URLs.

**Required canonical behavior:** Player is the sole owner of playback lifecycle, current item, queue mutation, progress, volume, repeat, shuffle, and persistence. Episode/Library/Playlist only supply a playable contract or dispatch intent.

**Audit findings:** desktop/mobile player behavior is feature-present but needs viewport verification; player-safe bottom padding is in the page container; z-index/elevation is tokenized only indirectly; keyboard, screen-reader announcements, focus order, progress semantics, touch targets, error recovery, and empty queue behavior require dedicated verification. Queue reorder must support a non-drag keyboard path and announce changes.

## 11. RTL Audit

**Observed:** `html { direction: rtl; }` is global; Persian copy is present; Lucide icons are used; layouts commonly use flex/grid and Tailwind. This establishes RTL by default but does not prove every component is direction-safe.

**Risks requiring validation:** physical `left/right` assumptions in local CSS or icon choices; arrows and chevrons that need semantic mirroring; player timeline/progress direction; queue reorder affordances; breadcrumb and navigation order; mixed Persian/English labels; numeric durations and dates; horizontal carousels; image/action ordering; form adornments; text truncation and overflow. The inspected evidence does not establish a consistent `dir="ltr"` strategy for URLs, code, numeric tokens, or media timelines.

**Contract:** use logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `border-start/end`) and semantic direction. Mirror directional icons only when their meaning is directional. Keep numbers, durations, URLs, and Latin identifiers readable with local direction isolation where needed. Test at least root, search, library, player, queue, forms, navigation, cards, and dialogs in Persian and mixed-script content.

## 12. Responsive Audit

**Observed:** Tailwind `sm/md/lg/xl` utilities drive layout; `page-container` changes padding and bottom safe area; grids use responsive columns; feature controls often use `flex-wrap`, `sm:flex-row`, and `lg:grid-cols-2`.

**Inconsistencies:** no single breakpoint contract or density map; desktop navigation is not mounted; player/full-player and queue behavior require viewport-specific verification; local arbitrary widths/heights can cause control shifts; mobile and desktop shell semantics are currently not equivalent because bottom navigation remains the mounted navigation surface.

**Required matrix:** mobile narrow, mobile wide, tablet, desktop, and large desktop. Verify page padding, max width, section gaps, card columns, overflow, horizontal carousel behavior, modal-to-sheet transformation, player-safe areas, touch targets, heading wrapping, form actions, and queue accessibility. Prefer stable aspect ratios/minimum dimensions for artwork, controls, and grid cards.

## 13. Accessibility Audit

### Critical

No critical issue is conclusively proven from static inspection; runtime testing is required. Confidence LOW because no automated axe/Playwright accessibility report was found in the inspected evidence.

### High

- Desktop navigation is not mounted, so navigation parity and keyboard access differ by viewport (`app-shell.tsx`, `desktop-navigation.tsx`).
- Protected/data routes are inconsistently guarded; unauthenticated flows may begin data queries before guards render. This is primarily a security/UX boundary but affects accessible error/redirect behavior.
- Player controls, progress, queue reorder, and dynamic playback announcements need dedicated keyboard and screen-reader verification.
- Dialog/sheet/popover focus management and escape/return-focus semantics are not established as a universal primitive contract.
- Form error association and loading/error live announcements are not proven across local implementations.

### Medium

- Many icon-only controls use labels inconsistently; some use `aria-label`, others rely on visible context.
- Local buttons/pills may bypass global focus-visible styling.
- Heading hierarchy and landmarks vary by feature page and manual wrappers.
- Native button/link semantics can be compromised when styled buttons are nested in links or local clickable divs.
- Contrast of muted text, green/purple accents, borders, and light-theme combinations needs WCAG AA measurement rather than token-name inference.

### Low

- Motion/reduced-motion contract is not evident in global styles.
- Mixed Persian/Latin direction and numeric formatting need explicit accessible reading-order tests.
- Target-size consistency needs viewport and device testing.

**Do not fix these in DESIGN.0.** Convert each finding into implementation acceptance criteria and verification tests in later phases.

## 14. Visual Hierarchy Audit

The strongest hierarchy is primary violet action, white primary text, muted metadata, and green playback/success state. However, repeated pills, nested rounded surfaces, shadows, and accent labels can make status, metadata, and actions compete with content. Mock dashboards and social/player panels are information-dense and frequently use similar card treatments for distinct semantic weights.

**Observed examples:** settings uses a rounded hero surface plus rounded section cards and rounded item surfaces; social comments use nested rounded containers; feature code often applies accent-colored pills to controls and statuses. **Recommendation:** reserve primary accent for the one most important action/state in a region; use surface, border, and typography contrast before adding another card or shadow; keep metadata subordinate to title/artwork.

## 15. Brand & Visual Identity

**Evidence-based identity:** Persian-first and RTL (`globals.css`); Vazirmatn (`layout.tsx`, tokens); dark-first layered canvas/player/card surfaces (`tokens.css`); violet primary and green playback/success accents (`tokens.css`); rounded shape language (`radius-*`, global card/button); Lucide icon dependency; audio-first persistent player and media cards; editorial/content-led product surfaces.

**Brand personality supported by evidence:** focused, audio-first, Persian-first, modern, and calm in its dark layered treatment. “Premium” is a current documentation/phase-report aspiration rather than a fully consistent implementation fact, so it should be treated as a direction to validate, not a settled claim.

## 16. Design Debt Register

| ID | Area | Issue | Evidence | Impact | Severity | Recommended direction | Phase |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DD-001 | System | Four overlapping primitive/import layers | design-system, `components/ui`, `components/layout`, local Tailwind | Divergent behavior and migration cost | P0 | Declare canonical design-system APIs; compatibility aliases only | D1 |
| DD-002 | Shell | Desktop navigation exists but is not mounted | `desktop-navigation.tsx` vs `app-shell.tsx` | Desktop orientation and accessibility mismatch | P0 | Define responsive shell ownership and mount strategy | D2 |
| DD-003 | Tokens | Semantic and legacy aliases coexist with literals | `tokens.css`, `globals.css`, arbitrary feature classes | Hard to govern visual changes | P1 | Map existing values to semantic contract; deprecate aliases gradually | D1 |
| DD-004 | Theme | Light tokens exist but root application is unclear | `[data-theme='light']`, root `colorScheme: dark`, local settings | Theme preference may not consistently affect UI | P1 | Establish one theme provider/application boundary | D1/D2 |
| DD-005 | Auth UI | Route protection coverage is inconsistent | admin/creator/community/playlists and podcast detail evidence | Wrong shell/data/error experience for users | P1 | Preserve ownership but document and implement explicit route policy later | D2/security follow-up |
| DD-006 | Data boundary | Production-looking mock surfaces | community, creator, admin, profile, immersive player | Users cannot distinguish capability from live product | P1 | Add explicit preview/unsupported state contract and data provenance | D3 |
| DD-007 | Player | Transitional player implementations coexist | `AudioPlayer.tsx`, root store, feature runtime/store | Duplicate playback ownership risk | P1 | Confirm feature player as canonical; retire transitional paths only in architecture-approved phase | D8 |
| DD-008 | States | Loading/empty/error primitives and local variants coexist | design-system state, ui/page-state, feature-local markup | Inconsistent recovery and announcements | P1 | One global state matrix and component API | D1/D3 |
| DD-009 | Responsive | No product breakpoint/density contract | Tailwind defaults plus local responsive choices | Cross-feature layout drift | P1 | Measure current behavior and codify breakpoints/density | D12 |
| DD-010 | RTL | Global RTL exists without complete logical/directional contract | `globals.css`, local flex/icons/player | Reversed actions, unreadable mixed scripts, incorrect player semantics | P1 | RTL test matrix and logical CSS rules | D13 |
| DD-011 | Accessibility | Focus/live-region/dialog/player contract incomplete | static inspection and lack of broad a11y tests | Keyboard and assistive-tech inconsistency | P1 | Add component-level and route-level WCAG acceptance tests | D14 |
| DD-012 | Ownership | Home/Profile both expose continuation patterns | root/library/profile evidence | Duplicate listening-history ownership | P2 | Library owns continuation; profile summarizes or links | D3/D6 |
| DD-013 | Cards | Nested/local rounded cards obscure hierarchy | settings/social/profile/mock surfaces | Density and scanning degradation | P2 | Use surface roles and avoid card-within-card by default | D3-D11 |
| DD-014 | Offline | Offline route is a placeholder | `offline-library/page.tsx` | Unsupported capability looks productized | P2 | Keep explicit unsupported/partial state until storage exists | D3 |
| DD-015 | Motion | Button lift and transitions lack reduced-motion proof | `globals.css`, tokens | Motion may be inconsistent or inaccessible | P2 | Define purposeful motion and reduced-motion behavior | D1/D12 |
| DD-016 | Typography | Negative heading tracking conflicts with Persian-first needs | `letter-spacing-tight: -0.03em` | Legibility risk for Persian/mixed text | P2 | Validate and separate script-sensitive tracking tokens | D1/D13 |
| DD-017 | Iconography | Directional/semantic icon rules are undocumented | Lucide usage across features | Ambiguous meaning in RTL | P2 | Define library, sizes, mirroring and labels | D1/D13 |
| DD-018 | Visual QA | No evidence of full viewport/contrast/a11y audit | tests focus on behavior/rendering | Regressions can pass unit tests | P3 | Add visual and accessibility QA gates | D15 |

## 17. Master Design Principles

1. Content and playback state come before decoration.
2. One owner per interaction, state, and data contract.
3. Reuse canonical primitives before writing local equivalents.
4. Persian-first means RTL, typography, mixed-script handling, and readable numbers are first-class.
5. Real data, mock data, static presentation, and unsupported capability must be distinguishable.
6. The current playback item is always identifiable from every playback entry point.
7. Primary actions remain visually and semantically dominant.
8. Empty states guide the next meaningful action; they do not pretend missing data is a design feature.
9. Motion communicates change, loading, or playback; it is never required for comprehension.
10. Responsive behavior changes composition, not ownership or meaning.
11. Accessibility is part of the component contract, not a final polish pass.
12. Surface hierarchy should reduce cognitive load; do not solve every grouping with a card.
13. Documentation claims must be traceable to implementation or explicitly marked future direction.
14. Design work preserves authentication, routing, API, persistence, player, queue, and feature ownership.
15. Unsupported functionality receives honest affordances and states.

## 18. Master Token Contract

The following contract consolidates existing values rather than inventing a new palette. Token migration should preserve equivalent current values until contrast and usability testing justifies change.

| Contract namespace | Existing evidence/value | Status | Rule |
| --- | --- | --- | --- |
| `surface.canvas/page/sidebar/player/card/elevated/dialog/popover/input/hover/pressed/selected` | `--surface-*` in `tokens.css`; dark and light values | Existing, near-canonical | Use semantic surfaces; do not add local hex values |
| `text.primary/secondary/muted` | `--text-*` | Existing | Add only missing semantic roles after audit |
| `border.default/strong` | `--border`, `--border-strong` | Existing | Use border tokens, not opacity literals |
| `action.primary/primary-hover/primary-active/primary-soft` | `--color-primary*` | Existing | Primary action and brand accent remain separate concepts if evidence requires |
| `status.success/warning/error/info` | `--color-success/warning/danger/info` | Existing | Normalize `danger` vs `error` naming |
| `playback.playing/paused/queued/progress` | green/accent and player surfaces currently scattered | Partial | Map current green/playback semantics without introducing unsupported states |
| `focus.ring` | `--color-focus-ring` | Existing | Every interactive primitive must consume it |
| `font.body/heading/mono` | `--font-*`, Vazirmatn layout font | Existing | Keep Vazirmatn; validate script-sensitive tracking |
| `text.display/h1/h2/h3/h4/body/body-sm/caption/metadata/label/code` | `--text-*` | Existing | Remove arbitrary local sizes when a role fits |
| `line.display/heading/body/caption` | `--line-height-*` | Existing | Add role only with tested need |
| `weight.regular/medium/semibold/bold` | Tailwind/font usage, not fully tokenized | Partial | Define names from actual used weights |
| `space.1..12` | `--space-*` | Existing | Map layout/component gaps to scale |
| `radius.2..24/pill/circle` | `--radius-*` | Existing | Assign semantic roles: control, card, dialog, media, avatar |
| `shadow.xs..xl/glass` | `--shadow-*` | Existing | Assign elevation meanings; avoid arbitrary shadow classes |
| `motion.fast/base/slow/ease` | `--motion-*` | Existing | Add reduced-motion override and state-specific use |
| `breakpoint.mobile/tablet/desktop/wide` | Tailwind `sm/md/lg/xl` usage | Partial | Name existing effective breakpoints after measurement; do not alter blindly |
| `container.app` | `--container-max: 72rem`, `max-w-app` | Existing | One max-width contract |

**Canonical naming recommendation:** future code uses semantic namespaces; legacy aliases (`--bg-*`, `--accent`, `--error`, etc.) remain compatibility aliases during migration and are not new API surface.

## 19. Master Component Contract

| Component | Purpose/ownership | Required variants/states | Responsive/RTL | Accessibility and forbidden usage |
| --- | --- | --- | --- | --- |
| Button | Shared action primitive | primary, secondary, ghost, destructive; default, hover, focus, pressed, disabled, loading | Stable min target; icon order follows RTL semantics | Native button, visible/accessible label; no clickable div or nested link/button |
| Link | Navigation/action navigation | inline, action, muted, external | Directional icons mirror semantically | Native link with destination; do not style navigation as a fake button |
| Input | Text entry | default, focus, error, disabled, read-only, loading | Logical adornment placement; mixed text direction isolated | Label, description, error association; no placeholder-only label |
| Search | Query entry/results entry | idle, typing, loading, results, empty, error | Input and clear/control order RTL-safe | Label, submit/clear labels, live result count policy |
| Card | Surface grouping | default, interactive, selected, playing, queued, disabled | Stable media/content layout | Use for a genuinely framed item; avoid nesting cards for layout |
| MediaCard | Podcast/episode representation | compact, comfortable, featured; loading/error/playing/queued | Artwork and actions reorder by semantic RTL rules | Semantic title/link, artwork alt policy, play label |
| Artwork | Media/brand image | square/portrait/landscape, loading, fallback, broken | Stable aspect ratio | Decorative images empty alt; semantic artwork descriptive alt |
| Avatar | Identity image | user/creator/fallback/loading | Circle and initials remain readable RTL | Alt or hidden decorative behavior determined by context |
| Tag | Noninteractive metadata/status | neutral, status, category | Text remains readable | Never use Tag as a button |
| Badge | Compact status/identity | status, unread, creator, verified | No meaning by color alone | Text/icon semantic and contrast checked |
| SectionHeader | Section hierarchy | title, description, optional action | Action moves below/inline responsively | Correct heading level; one primary section action |
| Navigation | Desktop application navigation | default, active, focus, disabled | Logical order; `aria-current`; desktop shell owner | Landmark and keyboard access; no duplicate competing nav |
| MobileNavigation | Mobile navigation | active, focus, overflow | Safe-area and touch targets | Landmark, labels, current route, no hidden inaccessible items |
| Header | Context and global controls | public, application, mobile | RTL action order and overflow | Banner/header landmark; labeled icon actions |
| PlayerBar | Persistent playback control | idle, loading, playing, paused, error, no item | Desktop/mobile composition; player-safe area | Native controls, progress semantics, labels, announcements |
| Queue | Ordered playback items | empty, populated, current, queued, reorder, error | RTL-safe order; keyboard reorder | Announce reorder/remove; non-drag path required |
| Modal | Blocking decision/content | open/closed, loading, error | Desktop dialog/mobile sheet only when semantics remain | Focus trap/return, label, escape, inert background |
| Sheet | Mobile/secondary surface | open/closed, scroll, destructive confirmation | Safe areas, RTL gesture direction | Dialog semantics when blocking; focus management |
| Toast | Ephemeral confirmation | success/info/warning/error | Placement respects RTL and safe areas | Live region; not sole channel for critical errors |
| Alert | Persistent message | info/success/warning/error | Inline and page-level | Role/status/alert chosen by urgency |
| Skeleton | Layout-preserving loading | text/media/list/page | Stable geometry | `aria-busy` on region; avoid misleading fake content |
| EmptyState | No data/gated capability | first use, no results, unsupported, offline | Action remains visible on mobile | Explains state and next action; no fake production data |
| ErrorState | Recoverable failure | retry, back, offline, permission | Action hierarchy remains stable | Announces error; actionable recovery |
| LoadingState | Async transition | initial, inline, action loading | Preserve layout | Do not trap focus; announce only meaningful delays |

## 20. Master Page Composition Contract

```text
App Shell
 ├── Header / responsive Navigation
 ├── Main landmark
 │    ├── Page header
 │    ├── Sections
 │    └── Content
 ├── Persistent Player (when product route requires it)
 └── Mobile navigation / desktop navigation
```

- `AppShell` owns shell selection, safe areas, and global landmarks; feature pages own content and feature state.
- Use the existing `max-w-app` / `--container-max: 72rem` as the baseline until measured otherwise.
- Page padding follows existing `page-container` behavior; future changes must be tokenized and viewport-tested.
- Section spacing uses the spacing scale and a declared density level, not ad hoc gaps.
- Main content must reserve persistent player and navigation safe areas.
- Grid rules must declare minimum card width/aspect ratio and collapse behavior.
- Desktop and mobile are responsive renderings of the same navigation ownership, not separate products.
- Auth routes may use a centered simplified shell; public welcome may intentionally omit persistent player/navigation, as currently implemented.

## 21. Content Density Contract

| Density | Definition | Surfaces |
| --- | --- | --- |
| Compact | Small gaps, short metadata, high scan rate, stable controls | Player, queue, admin tables/operations, creator management |
| Comfortable | Standard page padding, readable metadata, regular section rhythm | Library, discovery, search, podcasts, playlists |
| Spacious | More breathing room, focused forms, limited competing actions | Welcome, auth, onboarding, creation forms, community reading |

Density is a composition choice, not a reason to invent new tokens. A page may use compact controls inside a comfortable page, but the surrounding rhythm must remain explicit.

## 22. Iconography Contract

- Canonical library: `lucide-react`, already a project dependency and the dominant observed system.
- Use consistent stroke icons; do not mix an unapproved icon set.
- Standard role sizes should map to existing Tailwind usage (`h-4`, `h-5`, `h-6`) and be formalized during D1.
- Icon-only controls require an accessible name, visible focus, stable target, and tooltip only when the meaning is not obvious.
- Use semantic icons for play, pause, queue, search, settings, navigation, status, and alerts; do not use decorative icons as the only status signal.
- Mirror directional icons based on meaning in RTL; do not mirror play/pause, volume, or non-directional identity icons.

## 23. Artwork Contract

- Preserve the actual content ratio required by the media context; cards must declare stable aspect ratio to prevent layout shift.
- Artwork is semantic when it identifies a podcast, episode, creator, or brand; it receives meaningful alternative text or an equivalent adjacent title.
- Artwork is decorative when the adjacent content already identifies the item; use empty alt and do not duplicate announcements.
- Loading uses stable skeleton geometry; broken images use a consistent fallback that does not imply a real cover.
- `object-fit: cover` is allowed for catalog thumbnails only when cropping does not remove essential identity; inspect portrait/landscape content.
- Play overlays are controls or affordances, not decorative overlays; they must expose the episode/podcast name in the accessible label.
- Avoid nested overlays and excessive gradient treatment that obscures title/artwork.

## 24. Global State Contract

| State | Visual treatment | UX meaning | Accessibility | Applicable surfaces |
| --- | --- | --- | --- | --- |
| Default | Base surface/text | Ready for action | Normal semantics | All |
| Hover | Subtle surface/border change | Pointer affordance | Never sole distinction | Interactive controls/cards |
| Focus | Token focus ring, no layout shift | Keyboard/current control | `:focus-visible`, visible | All interactive |
| Pressed | Short-lived stronger surface | Activation | Native pressed semantics where relevant | Buttons/toggles |
| Active | Accent/border/typography | Current route/mode | `aria-current`/selected | Nav/tabs/filters |
| Selected | Persistent selection surface | Chosen item | `aria-selected` where applicable | Cards/tabs/queue |
| Disabled | Reduced emphasis and no action | Unavailable | Native disabled where possible | Controls |
| Loading | Skeleton/spinner with stable geometry | Async work | `aria-busy`, meaningful announcement | Pages/actions/player |
| Empty | Explanation plus next action | No items/results/capability | Clear heading and action | Library/search/queue |
| Error | Alert/error surface plus recovery | Operation failed | Alert semantics and retry | Forms/data/player |
| Success | Confirmation/status | Operation completed | Status/live region as needed | Forms/preferences |
| Playing | Green/accent plus current metadata/control | Current audio | Announce current item changes | Media/player/queue |
| Paused | Current item retained, paused control | Playback stopped intentionally | Control label reflects pause | Player/media |
| Queued | Secondary selected/queue indication | Will play later | Expose queue relationship | Media/queue |
| Offline | Honest offline/last-known state | Network unavailable | Explain limits and retry | App/data/player |
| Partial | Clearly scoped available data | Some content unavailable | Do not announce mock as real | Search/dashboard/player |

## 25. Data/UI Boundary Contract

- **Real API data:** may be presented as actual catalog, account, library, playlist, or playback state; show loading/error/partial behavior from the API boundary.
- **Mock data:** may support layout/prototype validation only; must carry preview/mock/coming-soon context and must not imply a user action persisted to the backend.
- **Static presentation:** may explain capability or show empty/illustrative composition; do not give it production-looking interaction unless the interaction is real.
- **Derived state:** label it according to its source (for example, queue status derived from Player state); do not duplicate ownership in a feature.
- **User-specific state:** must come from auth/session/API/local persistence with explicit scope. Profile, settings, library, queue, and player must not fabricate personal history.
- **Unsupported functionality:** use disabled, unavailable, or planned states with honest copy; do not ship a clickable control that cannot complete its contract.
- **Observed mock boundaries:** community, creator studio, creator management, admin, profile sections, social, and immersive player supporting content have explicit mock files or mock imports.

## 26. Documentation Alignment

| Document/source | Claim | Implementation | Conflict | Resolution |
| --- | --- | --- | --- | --- |
| `components/design-system/README.md` | Shared grouped primitives are the UI foundation | `components/ui`, `components/layout`, and local Tailwind equivalents remain active | Canonical API is ambiguous | Treat design-system as target canonical layer; document aliases as transitional |
| `phase-2.5.3-application-shell-report.md` | Reusable application shell foundation | Shell mounts mobile header/bottom nav; desktop nav is not mounted | Responsive shell is incomplete | Revalidate shell contract before future page redesign |
| `phase-2.5.2-design-system-report.md` | Tokenized reusable system | Tokens exist but direct literals/arbitrary classes are common | Governance is weaker than claim | Add token usage/deprecation rules |
| `phase-2.6.2-page-states-foundation-report.md` | Shared page states | Local loading/empty/error markup still exists | State anatomy diverges | Adopt global state matrix and component contract |
| `phase-2.11-player-feature-skeleton-plan.md` | Player boundary should become feature-owned; `AudioPlayer`/root store transitional | Feature player runtime/store now exists while legacy files remain | Migration is incomplete/dual | Confirm feature player ownership and schedule retirement separately |
| `phase-library-premium-ui-report.md` | Library UI is premium and preserves live integration | Library is live and styled, but global system remains mixed | Local success does not establish product-wide consistency | Use Library as evidence, not universal canonical implementation |
| `phase-4.2.1-Playlist-Frontend-Validation.md` / runtime validation | Playlist UI/runtime preserves ownership | Playlist routes do not show the same explicit route protection as core protected pages | Accessibility/auth state may diverge | Keep playlist ownership, define route policy and state UI |
| PWA/settings reports | Install/playback preferences are MVP/local, preserve boundaries | Offline library remains placeholder; theme persistence is local | Installed/offline capability can be overread | Keep unsupported states explicit |

## 27. Future Design Phase Roadmap

| Phase | Objective and scope | Likely surfaces/files | Dependencies/risk | Acceptance criteria | Forbidden scope |
| --- | --- | --- | --- | --- | --- |
| D1 | Canonical tokens, primitive API, state matrix, icon rules | `tokens.css`, `globals.css`, design-system, ui aliases | Must preserve values/API; high blast radius | Token inventory, component contract, contrast baseline, no uncontrolled literals in touched slice | No page redesign or route changes |
| D2 | App shell/navigation and theme boundary | `app-shell`, headers, nav, layout, theme application | Desktop/mobile ownership; auth shell exceptions | One landmark/navigation model, theme verified, safe areas | No feature content changes |
| D3 | Core states and data provenance | state components, search/library/profile/mock boundaries | Need real/mock taxonomy | Loading/empty/error/partial/unsupported behavior documented/tested | No backend implementation |
| D4 | Core controls and media primitives | Button, Link, Input, Search, Card, Artwork, Avatar, Badge, Tag | Must migrate aliases without duplicate semantics | Keyboard, focus, labels, stable geometry, RTL tests | No new feature behavior |
| D5 | Welcome/discovery/catalog | `/`, podcasts, episodes, search | Depends on D1-D4 and ownership decisions | Orientation/discovery/catalog roles distinct; API/mock labels honest | No recommendation backend |
| D6 | Library/profile continuation | `/library`, `/profile` | Resolve continuation ownership first | One listening-history owner, responsive density, player-safe layout | No new history semantics |
| D7 | Playlists | `/playlists`, `[id]` | Player/queue contract and route policy | Reorder/play/empty/error states accessible and consistent | No queue redesign outside owner |
| D8 | Player and queue | PlayerBar, immersive player, queue, runtime-facing UI | Highest interaction/a11y risk; preserve runtime | Keyboard/touch/announcement/error/empty/RTL/mobile tests | No playback engine rewrite |
| D9 | Creator/admin/community | `/create`, `/creator`, `/community`, `/admin` | Mock/live provenance and auth ownership first | Honest preview states; density appropriate per workflow | No backend/social/governance feature work |
| D10 | Auth/onboarding | `/login`, `/register`, root public states | Must preserve auth/API ownership | Form, error, focus, redirect and mobile behavior verified | No auth policy rewrite |
| D11 | Cross-product visual consistency | all migrated surfaces | Requires completed canonical primitives | No duplicate primitive styling in audited routes | No unrelated architecture refactor |
| D12 | Responsive QA | all major routes | Needs stable component geometry | mobile/tablet/desktop/wide evidence | No new breakpoints without measurement |
| D13 | RTL and mixed-script QA | all major routes/player/forms | Needs representative Persian/Latin data | logical CSS, directional icon, numeric/duration tests | No change to product language scope |
| D14 | Accessibility QA | components/routes/player/dialogs | Needs automated and manual tooling | WCAG AA baseline, keyboard, screen reader/live-region evidence | No visual polish unrelated to findings |
| D15 | Final visual regression | screenshots/visual QA/test results | Depends on D1-D14 | documented baselines and zero P0/P1 design regressions | No new product features |

## 28. CASTAMINOFEN MASTER PRODUCT DESIGN CONTRACT

### Product visual identity

Castaminofen is a Persian-first, RTL, audio-first product with a dark layered canvas, Vazirmatn typography, violet primary action, green playback/success signal, rounded but restrained surfaces, Lucide iconography, and content-led media presentation. Light theme is supported by tokens but must be centrally applied and verified.

### Design principles

Content before decoration; one owner per interaction; reuse before duplication; Persian-first; playback always clear; honest data provenance; primary actions dominant; guided empty states; purposeful motion; responsive meaning preserved; accessibility built in; surface hierarchy over card accumulation; ownership boundaries preserved.

### Typography

Use Vazirmatn body and headings. Use existing display/heading/body/caption/metadata roles. Validate `letter-spacing-tight` for Persian and mixed scripts before retaining it globally. Do not use arbitrary type sizes or tracking when a token role exists.

### Colors

Use existing token values through semantic surface, text, border, action, status, playback, and focus namespaces. Violet is the primary action/brand signal; green is playback/success; status colors require text/icon reinforcement and WCAG measurement. Dark and light themes must use the same semantic roles.

### Spacing, radius, elevation

Use `space-1..12`, semantic radius roles derived from existing `radius-*`, and named shadows/elevation. Cards default to a restrained framed surface; do not nest cards solely for layout. Player, dialog, and navigation layering must have explicit semantic elevation and safe areas.

### Motion

Use existing 120/180/240ms timings and easing for state communication. No decorative motion is required for comprehension. Every motion implementation must define reduced-motion behavior and avoid layout shift.

### Breakpoints and responsive behavior

Use current Tailwind breakpoint evidence until measured product breakpoints are documented. Mobile/tablet/desktop/wide must preserve ownership, semantics, and state. Controls, artwork, cards, player, queue, and navigation require stable dimensions and safe-area handling.

### RTL

RTL is the default. Use logical CSS. Mirror only semantic directional icons. Isolate Latin, numbers, URLs, durations, and code where necessary. Test all major surfaces with Persian and mixed-script content.

### Accessibility

All controls need native semantics, visible focus, accessible names, stable target sizes, and correct disabled/loading/error behavior. Forms require labels and associated help/errors. Dialogs require focus management. Dynamic player, queue, loading, and error changes require meaningful announcements.

### Components and states

Use the canonical components in Section 19 and the global state matrix in Section 24. Feature components compose shared primitives but do not redefine their semantics or visual states.

### Page composition and density

Use the App Shell -> Header/navigation -> Main -> page header -> sections -> content -> persistent player/navigation structure. Choose compact, comfortable, or spacious density by surface role; Library/discovery/search are comfortable, Player/queue/operations compact, Welcome/auth/forms spacious.

### Artwork and iconography

Artwork has a declared semantic/decorative role, stable ratio, fallback, loading, and broken-image behavior. Lucide is canonical; icon-only controls are labeled; directional icons follow RTL meaning.

### Navigation and player

Shell owns responsive navigation and global landmarks. Player feature owns playback lifecycle, current item, queue, progress, volume, persistence, and playback states. Other features dispatch playable contracts and never duplicate runtime state.

### Data/UI boundaries

Real data may look like product content. Mock data must be visibly scoped as preview/illustrative. Static content must not imply persistence. Unsupported features must not receive production-looking successful affordances.

### Implementation boundaries

Future design work may change presentation, composition, tokens, and accessibility treatment only within approved ownership. It must not silently change routes, auth, API contracts, persistence, player runtime, queue semantics, backend behavior, or feature ownership.

## 29. Global DO / DON'T Rules

### DO

1. Import shared primitives from the canonical design-system layer.
2. Use semantic tokens for color, spacing, radius, shadow, motion, and focus.
3. Keep `html` RTL and use logical CSS properties.
4. Preserve Vazirmatn and test mixed Persian/Latin text.
5. Give every icon-only control an accessible name.
6. Use native buttons and links for their actual semantics.
7. Keep focus-visible treatment visible and layout-stable.
8. Announce meaningful loading, error, player, and queue changes.
9. Make empty states explain why they exist and what to do next.
10. Keep mock/preview/unsupported content visibly distinct from live data.
11. Route playback actions through Player ownership.
12. Reserve primary accent for the most important action or current playback state.
13. Keep artwork geometry stable with explicit ratios.
14. Test mobile, tablet, desktop, and wide layouts for every shared component.
15. Test directional icons, progress, queue, forms, and metadata in RTL.
16. Preserve auth, API, persistence, and feature boundaries during visual work.
17. Record observed evidence and confidence when proposing a new contract.

### DON'T

1. Do not add a new button/card/input primitive when a canonical one exists.
2. Do not introduce direct color literals in product UI.
3. Do not use arbitrary radius/spacing values without a documented exception.
4. Do not use a clickable `div` in place of a button or link.
5. Do not nest links and buttons.
6. Do not make color the only indicator of status or playback.
7. Do not mirror every icon automatically in RTL.
8. Do not use physical left/right layout rules where logical properties apply.
9. Do not present mock data as a real user, creator, community, or playback state.
10. Do not ship a clickable unsupported control.
11. Do not duplicate current episode, queue, or playback state in a feature page.
12. Do not add a card inside a card merely to create spacing.
13. Do not hide essential actions on desktop because mobile navigation is mounted.
14. Do not rely on placeholder text as a form label.
15. Do not remove focus styles for visual minimalism.
16. Do not add motion without reduced-motion behavior.
17. Do not redesign a page by changing its route, auth, API, persistence, or ownership contract.

## 30. Implementation Safety Contract

Every future design implementation must preserve authentication ownership, routing ownership, data ownership, state ownership, Player ownership, queue ownership, local/API persistence, API and backend contracts, and existing product semantics. A visual change is out of scope when its implementation requires inventing backend data, changing authorization, moving state between features, changing playback behavior, or making a mock capability appear real. Any required boundary change must be separately planned, reviewed, and named as product/architecture work.

## 31. Acceptance Criteria

DESIGN.0 is complete when:

- The route and product surface inventory distinguishes live, partial, mock, and orphan-like surfaces.
- The canonical design-system target and duplicate/legacy layers are named.
- Existing token categories and bypass patterns are documented.
- Component ownership, variants, state, RTL, responsive, and accessibility contracts are explicit.
- Home/discovery/library/player ownership is unambiguous.
- Real/mock/static/unsupported boundaries are explicit.
- P0-P3 design debt has evidence, impact, direction, and phase.
- Future phases are dependency-aware and forbid feature development during visual work.
- The master contract can be used by another coding agent without relying on this audit conversation.
- No source, route, style, test, package, or configuration file is modified by this phase.
- The only repository addition is this report file.

## 32. Files / Surfaces Requiring Future Design Work

### Global foundation

- `apps/web/src/styles/tokens.css`
- `apps/web/src/app/globals.css`
- `apps/web/tailwind.config.ts`
- `apps/web/src/components/design-system/README.md`
- `apps/web/src/components/design-system/index.ts`
- `apps/web/src/components/ui/*`
- `apps/web/src/components/layout/*`

### Shell/navigation/theme

- `apps/web/src/app/layout.tsx`
- `apps/web/src/components/layout/app-shell.tsx`
- `apps/web/src/components/layout/app-shell-config.ts`
- `apps/web/src/components/layout/mobile-header.tsx`
- `apps/web/src/components/layout/bottom-navigation.tsx`
- `apps/web/src/components/design-system/navigation/desktop-navigation.tsx`
- `apps/web/src/components/header.tsx`

### Core product surfaces

- `apps/web/src/app/page.tsx`
- `apps/web/src/app/search/page.tsx`
- `apps/web/src/app/podcasts/*`
- `apps/web/src/app/episodes/*`
- `apps/web/src/app/library/page.tsx`
- `apps/web/src/app/profile/page.tsx`
- `apps/web/src/app/playlists/*`
- `apps/web/src/app/login/page.tsx`
- `apps/web/src/app/register/page.tsx`
- `apps/web/src/app/settings/page.tsx`

### Player and queue

- `apps/web/src/features/player/components/*`
- `apps/web/src/features/player/runtime/*`
- `apps/web/src/features/player/store/*`
- `apps/web/src/features/player/data/mockPlayerExperience.ts`
- `apps/web/src/components/AudioPlayer.tsx`
- `apps/web/src/stores/playerStore.ts`
- `apps/web/src/features/playlists/utils/playlistPlayback.ts`

### Mock/partial surfaces requiring honest states before visual polish

- `apps/web/src/features/community/*`
- `apps/web/src/features/social/*`
- `apps/web/src/features/create/*`
- `apps/web/src/features/creator/*`
- `apps/web/src/features/admin/*`
- `apps/web/src/features/profile/data/*`
- `apps/web/src/app/offline-library/page.tsx`

### Evidence and verification surfaces

- Existing component/page tests under `apps/web/src/**/*.test.*`
- Phase reports under `docs/phase-*`, `docs/phases/*`, and feature/roadmap reports
- Future Playwright viewport, keyboard, RTL, contrast, reduced-motion, and accessibility evidence

**Final audit status:** Repository source was inspected read-only. This file is the sole intended repository change from DESIGN.0; final worktree verification follows outside the report.
