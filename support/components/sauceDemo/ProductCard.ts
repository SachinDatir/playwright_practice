import { Locator } from '@playwright/test';

export class ProductCard {
  readonly rootLocator: Locator;
  readonly title: Locator;
  readonly addToCartButton: Locator;

  // Accept a root Locator to scoping to a specific card on the page
  constructor(rootLocator: Locator) {
    this.rootLocator = rootLocator;
    this.title = rootLocator.locator('.product-title');
    this.addToCartButton = rootLocator.getByRole("button", { name: "Add to cart" })
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}