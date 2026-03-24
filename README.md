# OpenMaps

The City of Philadelphia's public map viewer. Lets users browse, toggle, and query over 100 GIS layers published by the city.

**Production:** https://openmaps.phila.gov
**Dev:** https://openmaps-dev.phila.gov

## Architecture

OpenMaps is a thin Vue 3 app that wraps [@phila/layerboard](https://github.com/CityOfPhiladelphia/vue3-layerboard). All map rendering, layer management, search, popups, and sidebar UI come from layerboard. OpenMaps provides:

- The ArcGIS webmap ID that defines available layers
- A help modal
- Footer links (Help, Feedback)

## Setup

```bash
pnpm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Vite, port 5173) |
| `pnpm build` | Type-check and build for production |
| `pnpm lint` | Run ESLint |
| `pnpm format:check` | Check Prettier formatting |
| `pnpm test:e2e` | Run Playwright smoke tests |

## Deployment

Pushes to `vue3` deploy to **openmaps-dev.phila.gov** via GitHub Actions. The workflow builds, deploys to S3, invalidates CloudFront, then runs Playwright smoke tests against the live site.

Production deploys use the same process targeting **openmaps.phila.gov**.

## Tech Stack

- Vue 3 + TypeScript + Vite
- MapLibre GL JS (via layerboard)
- Pinia for state
- Playwright for e2e tests
