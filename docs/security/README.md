# Security Notes

## Current state

- Passwords are hashed with bcrypt.
- Refresh tokens are stored in a hashed form on the server side.
- Auth uses JWT and Passport guards.
- Environment variables are used for secrets rather than hard-coded values.

## Watch items

- Production deployment secrets and token rotation need a documented process.
- Authorization boundaries for the UI-heavy future features should be reviewed before public release.
