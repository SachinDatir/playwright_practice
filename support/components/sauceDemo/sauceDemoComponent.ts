import { type Locator, type Page } from "@playwright/test";

export class Headers {
  readonly page: Page;
  readonly swaglabsText: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.swaglabsText = page.getByText("Swag Labs");
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
  }
}
