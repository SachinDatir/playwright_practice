import { test } from "../../../support/fixtures/onsFixtures";
import { InputPage } from "../../../support/pages/oneSelect/InputPage";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;

test.describe("Validate the Wall Air", () => {
  let inputPage: InputPage;
  test.beforeEach(async ({ loginPage, page, dashboardPage }) => {
    inputPage = new InputPage(page);
    await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
    await page.waitForLoadState("domcontentloaded");
    await dashboardPage.productSelection.openShelterCooling();
  });

  test("Validate the compressor expert tab", async ({
    dashboardPage,
    clickAndWaitForResponse,
    page,
  }) => {
    await dashboardPage.selectShelterCooling({
      productLineName: "WallAir",
      coolingSystem: "A",
      refrigerantType: "R407C",
      modelName: " WXD 60 0 ",
    });

    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );
  });
});
