# Feature Inventory

## Core product areas

- Authentication — implemented in the web auth flow and NestJS auth module.
- Podcasts — list/detail/create/edit/delete APIs and web routes are implemented.
- Episodes — episode APIs, upload integration, and episode detail views are implemented.
- Library — favorites and listening history are implemented in the API and web app.
- Playlists — playlist CRUD and integration with the player runtime are implemented.
- Search — search UI and API integration are present.
- Player — player runtime, queue handling, repeat/shuffle, persistence, and player UI are implemented.
- RSS ingestion — fetch, parse, normalize, match, synchronize, and internal feed-source APIs are implemented.
- Community / Creator / Admin — these are present as feature-owned UI surfaces and mock-backed experiences, but they remain largely UI-layer and not full product backends.

## Feature ownership notes

- The web app uses feature folders under apps/web/src/features for most product areas.
- The API uses feature-oriented folders under apps/api/src rather than a deeper modules/ hierarchy.
- The player runtime owns playback and queue state; episode views remain focused on metadata and playback entry points.
