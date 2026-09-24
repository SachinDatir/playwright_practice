import { type Page, type Locator } from "@playwright/test";

export class HerokuApp {
  private readonly page: Page;
  readonly content: Locator;
  readonly checkBoxes: Locator;
  readonly checkbox_one: Locator;
  readonly inputs: Locator;
  readonly heading: Locator;
  readonly addRemoveElement :Locator
  constructor(page: Page) {
    this.page = page;
    this.content = page.locator("#content");
    this.checkBoxes = page.getByRole("link", { name: "Checkboxes" });
    this.checkbox_one = page.locator('[type="checkbox"]').first();
    this.inputs = page.getByRole("link", { name: "Inputs" });
    this.heading = page.getByRole("heading", {
      name: "Welcome to the-internet",
    });
    this.addRemoveElement = page.getByRole("link", {
      name: "Add/Remove Elements",
    });
  }
  async selectTab(tabName: string) {
    await this.page.getByRole("link", { name: tabName }).click();
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}


