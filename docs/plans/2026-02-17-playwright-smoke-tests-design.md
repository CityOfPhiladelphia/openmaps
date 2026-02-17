# Playwright Smoke Tests for OpenMaps

_2026-02-17_

## Goal

Add Playwright e2e smoke tests that run post-deploy in CI. These catch catastrophic failures (app won't load, layers broken, search dead) — not comprehensive coverage.

## Test Target

Tests run against the live deployed site:
- **Dev workflow**: `https://openmaps-dev.phila.gov`
- **Prod workflow**: `https://openmaps.phila.gov`

The test file defaults to `openmaps-dev.phila.gov`. The prod CI workflow overrides via `PLAYWRIGHT_BASE_URL` environment variable.

## Smoke Tests (5)

1. **App loads** — navigate to site, verify map canvas (`.maplibregl-canvas`) is visible
2. **Layer toggle** — check a layer on, verify a network request to ArcGIS fires or a layer-related DOM element appears
3. **Search** — type an address, submit, verify the map responds
4. **Popup** — with a layer active, click the map, verify a popup appears. Skip candidate if flaky.
5. **Mobile viewport** — set 375px width, verify hamburger menu appears and toggles the layer panel

## Files

| File | Action |
|------|--------|
| `playwright.config.ts` | Create |
| `tests/smoke.spec.ts` | Create |
| `package.json` | Add `@playwright/test` devDep, `test:e2e` script |
| `.gitignore` | Add `playwright-report/`, `test-results/` |
| `.github/workflows/dev_push_to_s3.yml` | Add post-deploy test steps |
| `.github/workflows/prod_push_to_s3.yml` | Add post-deploy test steps |

## Playwright Config

- `playwright.config.ts` in project root
- Browsers: Chromium only (CI speed)
- Trace: on first retry
- Video: retain on failure
- Reporter: HTML
- Retries: 2 in CI, 0 locally
- Workers: 1 in CI

## CI Integration

Added as post-deploy steps in both `dev_push_to_s3.yml` and `prod_push_to_s3.yml`:

1. Install Playwright Chromium (`npx playwright install --with-deps chromium`)
2. Wait 30s for CloudFront invalidation to propagate
3. Run `pnpm test:e2e`
4. Upload `playwright-report/` as artifact on failure

The prod workflow sets `PLAYWRIGHT_BASE_URL=https://openmaps.phila.gov` so the same test file works for both environments.

## Precedent

Follows patterns from vue3-atlas Playwright setup: role-based selectors, absolute URLs, HTML reporter, trace/video on failure.
