import { test, expect } from "../../../support/fixtures/onsFixtures";
import { DashboardPage } from "../../../support/pages/oneSelect/DashboardPage";
import { ConfigurationPage } from "../../../support/pages/oneSelect/ConfigurationPage";
import { waitForApi } from "../../../support/utils/wait-until";
import { roomCoolingData } from "../../../support/test-data/roomCooling";
import { calculationApis } from "../../../support/utils/calculationApis";
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
    await dashboardPage.validateDischargeType(roomCoolingData.dischargeType);

    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );
    await cyberAirCalculationResponses;
  });

  test("Validate the cyberAir selection dropdown", async ({
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
      modelName: " ASD 211 A ",
    });

    await dashboardPage.validateCyberAirRefrigerantTypes(
      roomCoolingData.refrigerantType,
    );
    await dashboardPage.validateCyberAirACompType(
      roomCoolingData.compressorType,
    );
    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );
    const powerSupplies: string[] = [];
    const refrigerent: string[] = [];
    const resOfPreProd = await preProd;
    await resOfPreProd.json().then((res) => {
      res.data.PowerSupplies.find((element: any) => {
        powerSupplies.push(element.description);
      });

      res.data.DeuRefrigerants.find((element: any) => {
        refrigerent.push(element.displayName);
      });

      console.log(refrigerent, "refrigerent");
    });
    await cyberAirCalculationResponses;

    await configurationPage.expectProductLineOptions(
      roomCoolingData.productLine,
    );

    await configurationPage.expectDischargeTypeOptions(
      roomCoolingData.dischargeType,
    );

    await configurationPage.expectCoolingSystemOptions(
      roomCoolingData.coolingSystemType,
    );

    await configurationPage.expectCompressorOptions(
      roomCoolingData.compressorType,
    );

    await configurationPage.expectCircuitOptions(roomCoolingData.circuitType);
    await configurationPage.expectCasingSize(roomCoolingData.casingSize);

    await configurationPage.expectRefrigerentOptions(refrigerent);

    await configurationPage.expectPowerSupplyOptions(powerSupplies);
  });

  test("Validate the cyberAirMini productLine", async ({
    page,
    clickAndWaitForResponse,
  }) => {
    const coolingSystem = "CW";
    await dashboardPage.cyberAirProductLine({
      productLineName: "CyberAir Mini",
      dischargeType: "Upflow",
      coolingSystem: "CW",
      modelName: " CCU 180 CW ",
    });

    const [downflow, upflow] = roomCoolingData.dischargeType;
    const cyberAirMiniDischargeType = [downflow, upflow] as const;

    await dashboardPage.validateDischargeType(cyberAirMiniDischargeType);

    await dashboardPage.validateCoolingSystem(
      roomCoolingData.cyberAirMiniCoolingSystemType,
    );
    await page.pause();
    const apis =
      coolingSystem === "CW" ? calculationApis.CW : calculationApis.A;
    const responses = configurationPage.waitForCalculationApis(apis);

    await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );

    await responses.then(async (res) => {
      const resp = await Promise.all(res.map((el) => el.body()));
      expect(resp).toBeDefined();
    });
  });
});
