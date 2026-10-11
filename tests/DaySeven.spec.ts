import { test, expect } from "@playwright/test";
import { HerokuApp } from "../support/pages/HerokuAppPage";
test.describe("Verify the mechanism of floating menu", () => {
  let herokuUtils: HerokuApp;
  test("Verify the Auto-waiting feature in playwright", async ({ page }) => {
    herokuUtils = new HerokuApp(page);

    await page.goto("https://the-internet.herokuapp.com/", {
      waitUntil: "domcontentloaded",
    });
    await herokuUtils.herokuComp.openFloatingMenu();
    await page.waitForTimeout(2000);

    await expect(herokuUtils.herokuComp.floatingMenuTitle).toBeVisible({
      timeout: 20000,
    });
  });

  test("floating menu remains visible", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/floating_menu", {
      waitUntil: "domcontentloaded",
    });

    const menu = page.locator("#menu");

    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "About" })).toBeVisible();
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });

    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "About" })).toBeVisible();

    await menu.getByRole("link", { name: "About" }).click();
    expect(page.url()).toContain("about");
  });

  test("floating menu stays at the top while scrolling", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/floating_menu");

    const menu = page.locator("#menu");

    const beforeScroll = await menu.boundingBox();

    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });

    const afterScroll = await menu.boundingBox();

    console.log("Before scroll:", beforeScroll);
    console.log("After scroll:", afterScroll);

    expect(beforeScroll).not.toBeNull();
    expect(afterScroll).not.toBeNull();

    expect(afterScroll!.y).toBeCloseTo(beforeScroll!.y, 0);
  });
});
