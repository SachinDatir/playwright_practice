import { test, expect } from "@playwright/test";
import { HerokuApp } from "../support/pages/HerokuAppPage";
// filter()
// hasText
// has
// first()
// last()
// nth()
test.describe("Day 2 — Advanced locator filtering", () => {
  let heroKuUtils: HerokuApp;
  test.beforeEach(async ({ page }) => {
    heroKuUtils = new HerokuApp(page);
    await heroKuUtils.navigateTo("https://the-internet.herokuapp.com/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("Verify the filter method in playwright", async ({ page }) => {
    const pageHeader = heroKuUtils.content.filter({ has: heroKuUtils.heading });
    await expect(pageHeader).toBeVisible();
    await expect(pageHeader).not.toBeHidden();

    //hasText
    const pageHeader2 = heroKuUtils.content.filter({
      hasText: "Available Examples",
    });
    await expect(pageHeader2).toBeVisible();

    //has

    const addRemoveElement = heroKuUtils.addRemoveElement
    await expect(addRemoveElement).toBeVisible();
    console.log(await addRemoveElement.textContent());

    await addRemoveElement.click();
    await page.goBack();

    const firstEl = page.locator("ul>li").first();
    const lastEl = page.locator("ul>li").last();
    await expect(firstEl).toBeVisible();
    await expect(lastEl).toBeVisible();
    const nthElement = page.locator("ul>li").nth(3);
    await expect(nthElement).toBeVisible();
    await expect(nthElement).toHaveText("Broken Images");
  });
});
