import { type Page, expect, Locator } from "@playwright/test";
import { waitForApi } from "../../utils/wait-until";
export class MyProject {
  readonly myProjectTab: Locator;
  constructor(readonly page: Page) {
    this.myProjectTab = this.page.getByRole("heading", { name: "My Projects" });
  }

  async openMyProjectSection() {
    const listProject = waitForApi(this.page, "listProject");
    const saveUserConfig = waitForApi(this.page, "saveUserConfig");
    saveUserConfig;
    await expect(this.myProjectTab).toBeVisible({ timeout: 50000 });
    await this.myProjectTab.click({force:true});
    const [output] = await Promise.all([saveUserConfig, listProject]);
  }
}
