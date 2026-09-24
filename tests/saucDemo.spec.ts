import { test, expect } from "../support/fixtures/testFixtures";
import { SauceDemo } from "../support/pages/SauceDemoPage";

const url: string = process.env.SAUCE_DEMO_URL;
const username: string = "standard_user";
const password: string = "secret_sauce";
test.describe("sauce labs test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
  });
  test("should open the Sauce Labs website and check the title", async ({
    page,
    sauceDemo,
  }) => {
    await expect(page).toHaveTitle("Swag Labs");
    await expect(sauceDemo.header.swaglabsText).toBeVisible();
  });

  test("should log in to the Sauce Labs website", async ({ sauceDemo }) => {
    await sauceDemo.loginSaucDemo(username, password);
    await expect(sauceDemo.products).toBeVisible();
    const primaryHeader = sauceDemo.primaryHeader;
    await expect(primaryHeader).toContainText("Swag Labs");
  });

  test("should able to use add to cart model", async ({ sauceDemo }) => {
    await sauceDemo.loginSaucDemo(username, password);
    await expect(sauceDemo.products).toBeVisible({ timeout: 5000 });

    await sauceDemo.addProductToCart("Sauce Labs Backpack");
    await sauceDemo.openCart();
    const addedProduct = sauceDemo.item_4;
    await expect(addedProduct).toContainText("Sauce Labs Backpack");
  });

  test("should add product", async ({ loggedInSauceDemo }) => {
    await loggedInSauceDemo.addProductToCart("Sauce Labs Backpack");

    await loggedInSauceDemo.openCart();

    await expect(loggedInSauceDemo.item_4).toContainText("Sauce Labs Backpack");
  });
});
