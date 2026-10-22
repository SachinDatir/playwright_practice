import { test } from "../../support/fixtures/onsFixtures";
import { ProjectPage } from "../../support/pages/oneSelect/ProjectPage";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;

test.describe("Verify my project section functionality", () => {
  let projectPage: ProjectPage;
  test.beforeEach(async ({ loginPage, page }) => {
    projectPage = new ProjectPage(page);
    await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
  });

  test("Verify the new flow of project section", async ({page}) => {
    await page.waitForLoadState("domcontentloaded")
    await projectPage.projectSelection.openMyProjectSection()
    await page.pause()
  });
});
