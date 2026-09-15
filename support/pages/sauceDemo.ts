import { type Page, type Locator } from "@playwright/test";
import { Headers } from "../components/sauceDemo/sauceDemoComponent";
import { ProductCard } from "../components/sauceDemo/ProductCard";
export class SauceDemo {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly item_4: Locator;
  readonly addToCart_sauceLabs: Locator;
  readonly shopping_cart: Locator;
  readonly removeItemButton: Locator;
  readonly header: Headers;
  readonly products: Locator;
  readonly primaryHeader: Locator;
  readonly inventory_item: Locator;
  readonly inventory_item_names: Locator;
  constructor(page: Page) {
    this.page = page;
    this.header = new Headers(page);

    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.item_4 = page.getByTestId("item-4-title-link");
    this.addToCart_sauceLabs = page.locator("#add-to-cart-sauce-labs-backpack");
    this.shopping_cart = page.getByTestId("shopping-cart-link");
    this.removeItemButton = page.getByText("Remove");
    this.products = page.locator(".title");
    this.primaryHeader = page.getByTestId("header-container");
    this.inventory_item = page.getByTestId("inventory-item");
    this.inventory_item_names = page.getByTestId("inventory-item-name");
  }

  async loginSaucDemo(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async addProductToCart(productName: string) {
    const product = this.inventory_item.filter({
      hasText: productName,
    });
    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async openCart() {
    await this.shopping_cart.click();
  }

  getProductCardByIndex(index: number): ProductCard {
    const cardLocator = this.page.locator('.product-card').nth(index);
    return new ProductCard(cardLocator);
  }
}
