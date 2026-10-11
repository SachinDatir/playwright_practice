import { test, expect } from "../../../support/fixtures/onsFixtures";
import { DashboardPage } from "../../../support/pages/oneSelect/DashboardPage";
import { ConfigurationPage } from "../../../support/pages/oneSelect/ConfigurationPage";
import { waitForApi } from "../../../support/utils/wait-until";
import {
  highDensityData,
  roomCoolingData,
} from "../../../support/test-data/roomCooling";
import { calculationApis } from "../../../support/utils/calculationApis";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;

test.describe("Validate the dashboard page", () => {
  test.beforeEach(async ({ loginPage, page, dashboardPage }) => {
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
});
