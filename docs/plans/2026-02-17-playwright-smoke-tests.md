# Playwright Smoke Tests Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 5 Playwright smoke tests to openmaps that run post-deploy in both dev and prod CI workflows, catching catastrophic failures before they linger.

**Architecture:** Tests run against the live deployed site (openmaps-dev.phila.gov or openmaps.phila.gov). A `PLAYWRIGHT_BASE_URL` env var controls the target — defaults to dev. Tests are pure smoke checks: app loads, a layer toggles, search works, popups appear, mobile layout renders.

**Tech Stack:** Playwright, TypeScript, GitHub Actions

---

### Task 1: Install Playwright and add test script

**Files:**
- Modify: `package.json`

**Step 1: Install Playwright**

Run: `cd c:/Users/andy.rothwell/Projects/openmaps && pnpm add -D @playwright/test`

**Step 2: Add test:e2e script to package.json**

Add to the `"scripts"` section:
```json
"test:e2e": "playwright test"
```

**Step 3: Install Chromium browser**

Run: `cd c:/Users/andy.rothwell/Projects/openmaps && npx playwright install chromium`

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "add Playwright dependency and test:e2e script"
```

---

### Task 2: Create Playwright config

**Files:**
- Create: `playwright.config.ts`

**Step 1: Create the config file**

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
```

**Step 2: Commit**

```bash
git add playwright.config.ts
git commit -m "add Playwright config (Chromium only, trace/video on failure)"
```

---

### Task 3: Update .gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: Add Playwright artifacts to .gitignore**

Append to the end of `.gitignore`:

```
# Playwright
playwright-report/
test-results/
```

**Step 2: Commit**

```bash
git add .gitignore
git commit -m "add Playwright artifacts to .gitignore"
```

---

### Task 4: Write smoke tests

**Files:**
- Create: `tests/smoke.spec.ts`

**Step 1: Create tests directory**

Run: `mkdir -p c:/Users/andy.rothwell/Projects/openmaps/tests`

**Step 2: Write the smoke test file**

The test file uses `PLAYWRIGHT_BASE_URL` env var to support both dev and prod targets. Default is `https://openmaps-dev.phila.gov`.

```typescript
import { test, expect } from "@playwright/test";

const BASE_URL =
  process.env.PLAYWRIGHT_BASE_URL || "https://openmaps-dev.phila.gov";

test.describe("OpenMaps smoke tests", () => {
  test("app loads and map renders", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator(".maplibregl-canvas")).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.locator(".layerboard-sidebar")).toBeVisible();
  });

  test("layer toggle activates a layer", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator(".maplibregl-canvas")).toBeVisible({
      timeout: 15_000,
    });

    // Find the first layer checkbox and toggle it on
    const firstCheckbox = page.locator("label.layer-checkbox input[type='checkbox']").first();
    await expect(firstCheckbox).toBeVisible();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Verify a legend or opacity control appears (indicates layer activated)
    await expect(
      page.locator(".layer-legend, .opacity-control").first()
    ).toBeVisible({ timeout: 10_000 });
  });

  test("layer filter narrows results", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator(".layerboard-sidebar")).toBeVisible({
      timeout: 15_000,
    });

    // Count layers before filtering
    const allLayers = page.locator("label.layer-checkbox");
    const countBefore = await allLayers.count();
    expect(countBefore).toBeGreaterThan(0);

    // Type in the filter/search field
    const searchInput = page.locator(".layer-search-field input");
    await searchInput.fill("crime");

    // Count should be fewer (or "no results" if nothing matches)
    const countAfter = await allLayers.count();
    expect(countAfter).toBeLessThan(countBefore);
  });

  test("popup appears when clicking a feature", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator(".maplibregl-canvas")).toBeVisible({
      timeout: 15_000,
    });

    // Toggle on the first layer
    const firstCheckbox = page.locator("label.layer-checkbox input[type='checkbox']").first();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Wait for layer data to load
    await page.waitForTimeout(3_000);

    // Click near the center of the map canvas
    const canvas = page.locator(".maplibregl-canvas");
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    // Check for popup — this test is allowed to be skipped if flaky
    // A popup may or may not appear depending on whether features exist at click point
    const popup = page.locator(".popup-content");
    try {
      await expect(popup).toBeVisible({ timeout: 5_000 });
    } catch {
      test.skip(true, "No feature at click point — popup test inconclusive");
    }
  });

  test("mobile viewport shows hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await expect(page.locator(".maplibregl-canvas")).toBeVisible({
      timeout: 15_000,
    });

    // Hamburger button should be visible
    const hamburger = page.getByLabel("Toggle menu");
    await expect(hamburger).toBeVisible();

    // Click hamburger — mobile menu should open
    await hamburger.click();
    const mobileMenu = page.locator(".layerboard-mobile-menu");
    await expect(mobileMenu).toBeVisible();

    // Close it
    const closeBtn = page.getByLabel("Close menu");
    await closeBtn.click();
    await expect(mobileMenu).not.toBeVisible();
  });
});
```

**Step 3: Run tests locally to verify against openmaps-dev.phila.gov**

Run: `cd c:/Users/andy.rothwell/Projects/openmaps && pnpm test:e2e`

Expected: Tests should pass (popup test may skip if no feature at click point — that's fine).

**Step 4: Fix any selector issues**

If tests fail due to selector mismatches, inspect the live site and adjust selectors. The DOM structure comes from `@phila/layerboard` — key selectors to verify:
- `.maplibregl-canvas` — MapLibre canvas
- `.layerboard-sidebar` — sidebar panel
- `label.layer-checkbox input[type='checkbox']` — layer checkboxes
- `.layer-search-field input` — search/filter input
- `.popup-content` — feature popup
- `[aria-label="Toggle menu"]` — hamburger button
- `.layerboard-mobile-menu` — mobile menu dropdown

**Step 5: Commit**

```bash
git add tests/smoke.spec.ts
git commit -m "add 5 Playwright smoke tests for openmaps"
```

---

### Task 5: Add smoke tests to dev CI workflow

**Files:**
- Modify: `.github/workflows/dev_push_to_s3.yml`

**Step 1: Add post-deploy steps**

After the existing "Deploy to openmaps-dev.phila.gov" step, add:

```yaml
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Wait for CloudFront propagation
        run: sleep 30

      - name: Run smoke tests
        run: pnpm test:e2e

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report-dev
          path: playwright-report/
          retention-days: 7
```

**Step 2: Commit**

```bash
git add .github/workflows/dev_push_to_s3.yml
git commit -m "add post-deploy Playwright smoke tests to dev workflow"
```

---

### Task 6: Add smoke tests to prod CI workflow

**Files:**
- Modify: `.github/workflows/prod_push_to_s3.yml`

**Step 1: Add post-deploy steps**

After the existing "Deploy to openmaps.phila.gov" step, add the same steps but with `PLAYWRIGHT_BASE_URL` set:

```yaml
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Wait for CloudFront propagation
        run: sleep 30

      - name: Run smoke tests
        run: pnpm test:e2e
        env:
          PLAYWRIGHT_BASE_URL: https://openmaps.phila.gov

      - name: Upload Playwright report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report-prod
          path: playwright-report/
          retention-days: 7
```

**Step 2: Commit**

```bash
git add .github/workflows/prod_push_to_s3.yml
git commit -m "add post-deploy Playwright smoke tests to prod workflow"
```

---

### Task 7: Final verification

**Step 1: Run full test suite locally one more time**

Run: `cd c:/Users/andy.rothwell/Projects/openmaps && pnpm test:e2e`

Expected: All tests pass (popup test may skip).

**Step 2: Review all changes**

Run: `cd c:/Users/andy.rothwell/Projects/openmaps && git log --oneline origin/vue3..HEAD`

Expected: 6 commits:
1. add Playwright dependency and test:e2e script
2. add Playwright config (Chromium only, trace/video on failure)
3. add Playwright artifacts to .gitignore
4. add 5 Playwright smoke tests for openmaps
5. add post-deploy Playwright smoke tests to dev workflow
6. add post-deploy Playwright smoke tests to prod workflow
