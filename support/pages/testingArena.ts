import { HerokuApp } from "./herokuApp";
import { type Locator, type Page } from "@playwright/test";
export class TestingArena extends HerokuApp {
  readonly toggleButton: Locator;
  readonly toggleMsg: Locator;
  constructor(page: Page) {
    super(page);
    this.toggleButton = page.getByRole("button", { name: "Toggle" });
    this.toggleMsg = page.getByRole("heading", {
      name: "You have displayed the hidden text!",
    });
  }
}
