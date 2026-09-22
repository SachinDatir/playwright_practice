import { test, expect } from "../../support/fixtures/onsFixtures";
import { DashboardPage } from "../../support/pages/oneSelect/DashboardPage";
import { ConfigurationPage } from "../../support/pages/oneSelect/ConfigurationPage";
import { copyFile } from "node:fs";
import { waitForApi } from "../../support/wait-until";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;
test.describe("Validate the dashboard page", () => {
  let dashboardPage: DashboardPage;
  let configurationPage: ConfigurationPage;

  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
    dashboardPage = new DashboardPage(page);
    configurationPage = new ConfigurationPage(page);
  });

  test("Validate the applications", async ({
    page,
    clickAndWaitForResponse,
    cyberAirCalculationResponses,
  }) => {
    await dashboardPage.productSelection.openRoomCooling();
    await dashboardPage.productSelection.selectProductLine(
      dashboardPage.productSelection.deuProductLine,
      dashboardPage.productSelection.cyberAirCard,
    );
    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );
    await cyberAirCalculationResponses;
  });

  test.only("Validate the cyberAir selection dropdown", async ({
    page,
    clickAndWaitForResponse,
    cyberAirCalculationResponses,
  }) => {
    const preProd = waitForApi(page, "preProdMode");

    await dashboardPage.cyberAirProductLine({
      productLineName: "CyberAir",
      dischargeType: "Downflow",
      coolingSystem: "A",
      refrigerantType: "R407C",
      modelName: "ASD 211 A",
    });

    await dashboardPage.validateCyberAirRefrigerantTypes([
      "R407C",
      "R410A",
      "R134a",
      "R513A",
    ]);
    await dashboardPage.validateCyberAirACompType();
    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );
    const powerSupplies: string[] = [];
    const refrigerent: string[] = [];
    const resOfPreProd = await preProd;
    await resOfPreProd.json().then((res) => {
      res.data.PowerSupplies.find((element:any) => {
        powerSupplies.push(element.description);
      });

      res.data.DeuRefrigerants.find((element:any) => {
        refrigerent.push(element.displayName);
      });

      console.log(refrigerent, "refrigerent");
    });
    await cyberAirCalculationResponses;

    await configurationPage.expectProductLineOptions([
      "CyberAir",
      "CyberLab",
      "CyberAir Mini",
    ]);

    await configurationPage.expectDischargeTypeOptions([
      "Downflow",
      "Upflow",
      "Raised Floor",
      "High",
      "Big",
    ]);

    await configurationPage.expectCoolingSystemOptions([
      "A ",
      " CW ",
      " GE ",
      " G ",
      " CW2 ",
      " ACW ",
      " GCW ",
    ]);

    await configurationPage.expectCompressorOptions([
      " On/Off Scroll ",
      " EC Scroll ",
      " Digital Scroll ",
    ]);

    await configurationPage.expectCircuitOptions([" All", "1 ", "2 "]);
    await configurationPage.expectCasingSize([
      "All ",
      " 950 ",
      " 1,400 ",
      " 1,750 ",
      " 2,200 ",
      " 2,550 ",
    ]);

    await configurationPage.expectRefrigerentOptions(refrigerent);

    await configurationPage.expectPowerSupplyOptions(powerSupplies);
  });
});
