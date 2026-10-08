import { test, expect } from "../../../support/fixtures/onsFixtures";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;
test.describe("Validate the deu Config page", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
  });
  test("Validate the deu config page", async ({
    configurationPage,
    dashboardPage,
    page,
    clickAndWaitForResponse,
    cyberAirCalculationResponses,
  }) => {
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);
    const exitPreprodButton = page.getByTitle("Exit Pre-Production Mode");

    if ((await exitPreprodButton.count()) > 0) {
      await exitPreprodButton.click();
    }
    await dashboardPage.cyberAirProductLine({
      productLineName: "CyberAir",
      dischargeType: "Downflow",
      coolingSystem: "A",
      refrigerantType: "R407C",
      modelName: " ASD 211 A ",
    });
    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );

    await cyberAirCalculationResponses;
    await clickAndWaitForResponse(
      () => configurationPage.enterPreProdMode(),

      page,
      "preProdMode",
    );
    await cyberAirCalculationResponses;

    const addOperatingPointButton = page.getByTitle("Add operating point");
    await expect(addOperatingPointButton).toHaveClass(/disabled/);
    

     await clickAndWaitForResponse(
      () => configurationPage.exitPreProdMode(),

      page,
      "preProdMode",
    );
    await cyberAirCalculationResponses;
    await expect(addOperatingPointButton).not.toHaveClass(/disabled/);
  });
});
