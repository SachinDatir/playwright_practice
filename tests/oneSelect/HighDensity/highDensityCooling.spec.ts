import { test, expect } from "../../../support/fixtures/onsFixtures";
import { InputPage } from "../../../support/pages/oneSelect/InputPage";

import { waitForApi } from "../../../support/utils/wait-until";
import {
  highDensityData,
  roomCoolingData,
} from "../../../support/test-data/roomCooling";
import { calculationApis } from "../../../support/utils/calculationApis";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;

test.describe("Validate the dashboard page", () => {
  let inputPage: InputPage;
  test.beforeEach(async ({ loginPage, page, dashboardPage }) => {
    inputPage = new InputPage(page);
    await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
    await page.waitForLoadState("domcontentloaded");
    await dashboardPage.productSelection.openHighDenityCooling();
  });

  test("Validate the High density cooling product line", async ({
    dashboardPage,
  }) => {
    await dashboardPage.productSelection.validateDeuProductLine(
      highDensityData.deuProductLine,
    );
    await dashboardPage.productSelection.validateChnProductLine(
      highDensityData.chnProductLine,
    );
    await dashboardPage.productSelection.validateUsaProductLine(
      highDensityData.usaProductLine,
    );
  });

  test("Validate the High density cooling cyberRow product line", async ({
    dashboardPage,
    configurationPage,
    page,
  }) => {
    await dashboardPage.productSelection.validateDeuProductLine(
      highDensityData.deuProductLine,
    );
    await dashboardPage.productSelection.selectProductLine(
      dashboardPage.productSelection.deuProductLine,
      dashboardPage.productSelection.cyberRowCard,
    );
    const [A, CW, GE, G, CW2] = roomCoolingData.coolingSystemType;
    const cyberRowCoolingSys = [A, CW, GE, G, CW2] as const;

    const [on_off, ec_scroll] = roomCoolingData.compressorType;
    const cyberRowComp = [on_off, ec_scroll] as const;
    console.log(cyberRowCoolingSys, ".....");

    await dashboardPage.validateCoolingSystem(cyberRowCoolingSys);
    await dashboardPage.validateCyberAirACompType(cyberRowComp);
    await dashboardPage.validateCyberAirRefrigerantTypes(
      highDensityData.refrigerent,
    );
  });

  test.only("Validate the print functionality of HDC", async ({
    dashboardPage,
    configurationPage,
    clickAndWaitForResponse,
    cyberAirCalculationResponses,
    page,
  }) => {
    const coolingSystem = "A";

    await dashboardPage.selectHighDensityCooling({
      productLineName: "CyberRow",
      coolingSystem: "A",
      refrigerantType: "R134a",
      modelName: " CRS 101 A  ",
    });

    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );

    const apis = [
      "thestEvaporatorExpertCalculation",
      "compressorExpertCalculation",
    ];

    const responses = configurationPage.waitForCalculationApis(apis);

    await responses.then(async (res) => {
      const resp = await Promise.all(res.map((el) => el.body()));
      expect(resp).toBeDefined();
    });

    await inputPage.expertTab.openPreviewPdf();
    await expect(inputPage.expertTab.downloadButton).toBeVisible()
    await inputPage.expertTab.downloadButton.click()

    await page.pause();

  });
});
