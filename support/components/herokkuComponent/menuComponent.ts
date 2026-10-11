import { type Page, type Locator, expect } from "@playwright/test";

export class HerokuComp {
  readonly floatingMenu: Locator;
 readonly floatingMenuTitle :Locator

  constructor(readonly page: Page) {
    this.floatingMenu = page.getByRole("link", { name: "Floating Menu" });
    this.floatingMenuTitle = page.getByRole('heading', { name: 'Floating Menu' })
  }

  async openFloatingMenu() {
    await expect(this.floatingMenu).toBeVisible({timeout:5000})
    await this.floatingMenu.click({force:true})
  }
}
