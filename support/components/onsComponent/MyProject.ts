import { type Page, expect, Locator } from "@playwright/test";
import { waitForApi } from "../../utils/wait-until";
import { faker } from "@faker-js/faker";
export class MyProject {
  readonly myProjectTab: Locator;
  readonly createProjectButton: Locator;
  readonly projectText: Locator;
  readonly projectNameField: Locator;
  readonly createButton: Locator;
  constructor(readonly page: Page) {
    this.myProjectTab = this.page.getByRole("tab", { name: "My Projects" });
    this.createProjectButton = this.page.getByLabel("Create project");
    this.projectText = this.page
      .locator("div")
      .filter({ hasText: /^Create project$/ });

    this.projectNameField = this.page.getByRole("textbox", {
      name: "Project name",
    });
    this.createButton = this.page.getByRole("button", {
      name: "Create",
      exact: true,
    });
  }

  async openMyProjectSection() {
    const listProject = waitForApi(this.page, "listProject");
    const saveUserConfig = waitForApi(this.page, "saveUserConfig");
    saveUserConfig;
    await expect(this.myProjectTab).toBeVisible({ timeout: 50000 });
    await this.myProjectTab.click({ force: true });
    const [output] = await Promise.all([saveUserConfig, listProject]);
  }

  createRandomUser() {
    return {
      projectName: `${`ons` + faker.internet.username()}`,
    };
  }

  async createProject(projectName: string) {
    const saveProject = waitForApi(this.page, "saveProject");
    let projectId;
    await expect(this.createProjectButton).toBeVisible();
    await this.createProjectButton.click();
    await expect(this.projectText.first()).toContainText("Create project");
    await expect(this.projectNameField).toBeEmpty();
    await this.projectNameField.fill(projectName);
    await expect(this.createButton).toBeVisible();
    await this.createButton.click();
    const saveProjectApiRes = await saveProject;
    await saveProjectApiRes.json().then((res) => {
      console.log(res, ">>>>>>>>>>");
      expect(res.message).toContain("Project saved successfully");
      const projectName = res.data.name;
      expect(projectName).toContain(projectName);

      projectId = res.data.id;

      console.log(projectId,"QQQQQQQQQQQQQ")
    });

    return projectId;
  }
}
