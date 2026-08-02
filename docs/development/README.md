# Development Documentation

## Quick start

See [quick-start.md](quick-start.md) for local setup and validation steps.

## Current workflow

- Install dependencies with pnpm install.
- Start local services with docker compose up -d.
- Run API tests with pnpm --filter @castaminofen/api test.
- Run web tests with pnpm --filter @castaminofen/web test.
- Validate with pnpm lint and pnpm build.
