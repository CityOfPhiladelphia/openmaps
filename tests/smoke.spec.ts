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

    // Toggle on Census Tracts - covers the entire city so a click always hits a feature
    const censusCheckbox = page
      .locator("label.layer-checkbox")
      .filter({ hasText: "Census Tracts - 2020" })
      .locator("input[type='checkbox']");
    await censusCheckbox.check();
    await expect(censusCheckbox).toBeChecked();

    // Wait for layer data to load
    await page.waitForTimeout(3_000);

    // Click near the center of the map canvas
    const canvas = page.locator(".maplibregl-canvas");
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    await expect(page.locator(".popup-content")).toBeVisible({
      timeout: 5_000,
    });
  });

  test("mobile viewport shows hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await expect(page.locator(".layerboard-sidebar")).toBeVisible({
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
