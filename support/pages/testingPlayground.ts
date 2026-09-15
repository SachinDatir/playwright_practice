import { HerokuApp } from "./herokuApp";
import { type Locator, type Page } from "@playwright/test";

export class TestingPlayground {
  private readonly page: Page;
  readonly clientSideDelayButton: Locator;
  readonly dynamicLink: Locator;
  readonly dynamicId: Locator;
  readonly dynamicIdButtonByText: Locator;
  readonly clientSideDelayBtn: Locator;
  readonly triggerButton: Locator;
  readonly ajaxDelayBtn: Locator;
  readonly ajaxTriggerButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.clientSideDelayButton = page.getByRole("link", { name: "AJAX Data" });
    this.dynamicLink = page.getByRole("link", { name: "Dynamic ID" });
    this.dynamicId = page.getByRole("button", {
      name: "Button with Dynamic ID",
    });
    this.dynamicIdButtonByText = page.getByText("Button with Dynamic ID");
    this.clientSideDelayBtn = page.getByRole("link", {
      name: "Client Side Delay",
    });
    this.triggerButton = page.getByRole("button", {
      name: "Button Triggering Client Side Logic",
    });
    this.ajaxDelayBtn = page.getByRole("link", { name: "AJAX Data" });
    this.ajaxTriggerButton = page.getByRole("button", {
      name: "Button Triggering AJAX Request",
    });
  }
}
