import { test, expect } from "../support/fixtures/testFixtures";
const username: string = "standard_user";
const password: string = "secret_sauce";

test.describe("Verify the add to cart", () => {
  test("add to cart", async ({ page, sauceDemo }) => {
    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "domcontentloaded",
    });
    await sauceDemo.loginSaucDemo(username, password);
    await page.waitForTimeout(2000)
    await sauceDemo.addProductToCart("Sauce Labs Bike Light");
    await expect(sauceDemo.shopping_cart).toBeVisible();
    await sauceDemo.openCart();
    const cartList = page.getByTestId("cart-list");
    await expect(cartList).toBeVisible();
    const addedProduct = sauceDemo.inventory_item_names;
    await expect(addedProduct).toContainText("Sauce Labs Bike Light");
    await expect(sauceDemo.removeItemButton).toBeEnabled();
    await sauceDemo.removeItemButton.click();
    await expect(
      page.getByRole("heading", { name: "Sauce Labs Bike Light" }),
    ).not.toBeVisible();
  });
});
