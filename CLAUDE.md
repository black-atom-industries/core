# Black Atom Core

Central source of truth for theme definitions and colors. Uses Eta templates + adapter pattern to generate theme files for multiple platforms.

## Architecture Boundary

- **Core** (`src/`) — theme definitions, types, color computation (`culori`), stats
- **Monitor** (`monitor/`) — React + Vite preview app. Display only, no computation.

Core owns all theme definitions and all derived analytics. Monitor imports via `@core/` alias.
