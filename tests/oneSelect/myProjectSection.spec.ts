import { expect, test } from "../../support/fixtures/onsFixtures";
import { ProjectPage } from "../../support/pages/oneSelect/ProjectPage";
import { faker } from "@faker-js/faker";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;

test.describe("Verify my project section functionality", () => {
  let projectPage: ProjectPage;
  let token: any;
  test.beforeEach(async ({ loginPage, page }) => {
    projectPage = new ProjectPage(page);
    token = await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
  });

  test("Verify checkboxes of project section", async ({
    page,
    dashboardPage,
  }) => {
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);

    await projectPage.projectSelection.openMyProjectSection();
    const projectCheckBox = page.getByRole("checkbox");
    await expect(projectCheckBox.first()).not.toBeChecked();
    await projectCheckBox.first().check();
    await expect(projectCheckBox.first()).toBeChecked();

    const count: number = await projectCheckBox.count();

    for (let i = 0; i < count; i++) {
      await expect(projectCheckBox.nth(i)).toBeChecked();
    }
  });

  test.only("Verify project creation flow", async ({
    page,
    dashboardPage,
    request,
  }) => {
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);

    await projectPage.projectSelection.openMyProjectSection();
    const projectCheckBox = page.getByRole("checkbox");
    await expect(projectCheckBox.first()).not.toBeChecked();
    await projectCheckBox.first().check();
    await expect(projectCheckBox.first()).toBeChecked();

    const count: number = await projectCheckBox.count();

    for (let i = 0; i < count; i++) {
      await expect(projectCheckBox.nth(i)).toBeChecked();
    }

    console.log(token, ">>token ");

    const project = projectPage.projectSelection.createRandomUser();
    const projectId = await projectPage.projectSelection.createProject(
      project.projectName,
    );
    const createdProject = page
      .locator("span")
      .filter({ hasText: project.projectName });
    await expect(createdProject).toBeVisible();
    await createdProject.click();
    await expect(page.locator(".expanded-header")).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Search configuration" }),
    ).toBeVisible();
    console.log(projectId, ">>>>>>>>projectId");
    //   // delete the create project

    const url =
      "https://api.development.oneselect.global/v1/globals/deleteBulkProjects";

    const response = await request.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: [projectId],
    });

    const responseData = await response.json().catch(() => response.text());
    console.log("Delete Response:", responseData);
    expect(responseData.message).toBe("Projects deleted successfully");
    await page.getByPlaceholder("Search project").fill(project.projectName);
    await expect(page.locator("h6.empty-title")).toContainText(
      "No matching projects found",
    );
  });
});
