import { test, expect } from "@playwright/test";
// filter()
// hasText
// has
// first()
// last()
// nth()
test.describe("Day 2 — Advanced locator filtering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("Verify the filter method in playwright", async ({ page }) => {
    const pageHeader = page.locator("#content").filter({has: page.getByRole("heading", {"name": "Welcome to the-internet"})});
    await expect(pageHeader).toBeVisible();
    await expect(pageHeader).not.toBeHidden()

    //hasText
    const pageHeader2 = page.locator("#content").filter({hasText:"Available Examples"});
    await expect(pageHeader2).toBeVisible();


    //has

    const pageOption = page.getByText('Add/Remove Elements', { exact: true })
    await expect(pageOption).toBeVisible()
     console.log(await pageOption.textContent())
  
    await pageOption.click()
    await page.goBack()

    const firstEl =  page.locator("ul>li").first()
    const lastEl =  page.locator("ul>li").last()
    await expect(firstEl).toBeVisible()
    await expect(lastEl).toBeVisible()
    const nthElement =  page.locator("ul>li").nth(3)
    await expect(nthElement).toBeVisible()
    await expect(nthElement).toHaveText("Broken Images")
  });
});


