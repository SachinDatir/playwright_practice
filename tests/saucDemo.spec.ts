import { test, expect } from "@playwright/test";

test.describe("sauce labs test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.waitForLoadState("domcontentloaded");
  });
  test("should open the Sauce Labs website and check the title", async ({
    page,
  }) => {
    await expect(page).toHaveTitle("Swag Labs");
    await page.getByText("Swag Labs").isVisible();
  });

  test("should log in to the Sauce Labs website", async ({
    page,
    playwright,
  }) => {
    playwright.selectors.setTestIdAttribute("data-test");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await page.getByRole("heading", { name: "Products" }).isVisible();
    const primaryHeader = await page
      .getByTestId("header-container")
      .textContent();
    expect(primaryHeader).toContain("Swag Labs");
  });

  test("should able to use add to cart model", async ({
    page,
    playwright,
  }) => {
    playwright.selectors.setTestIdAttribute("data-test");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await page.getByRole("heading", { name: "Products" }).isVisible();
    const product = page
      .getByTestId("inventory-item")
      .filter({ hasText: "Sauce Labs Backpack" });
    await product.getByRole("button", { name: "Add to cart" }).click();
    await page.getByTestId("shopping-cart-link").click();
    const addedProduct = await page
      .getByTestId("inventory-item-name")
      .textContent();
    await expect(addedProduct).toContain("Sauce Labs Backpack");
  });
});
