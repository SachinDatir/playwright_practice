import { test, expect } from "../../../support/fixtures/onsFixtures";
import { InputPage } from "../../../support/pages/oneSelect/InputPage";
import {ExpertTab} from "../../../support/components/onsComponent/ExpertTab"
import { waitForApi } from "../../../support/utils/wait-until";
import {
  highDensityData,
  roomCoolingData,
} from "../../../support/test-data/roomCooling";
import { calculationApis } from "../../../support/utils/calculationApis";
const email = process.env.ONS_EMAIL;
const password = process.env.ONS_PASSWORD;

type HdcUnitOutput = {
  unitType: string;
  coolingCapacity: number;
  sensibleCoolingCapacity: number;
  condensingTemp: number;
  netTotalCoolingCapacity: number;
  netSensibleCoolingCapacity: number;
  eer: number;
  aer: number;
  totalPowerConsumption: number;
  noOfRefrigerants: number;
  noOfCompressors: number;
  soundPowerLevel: number;
  distanceFreeField: number;
  lpaFreeField: number;
  airFlow: number;
  airVelocity: number;
  returnAirTemp: number;
  relativeHumidity: number;
  supplyAirTemp: number;
  height: number;
  width: number;
  depth: number;
  weight: number;
  altitude: number;
  refrigerant: string;
  powerSupply: string;
};

type HdcFanOutput = {
  fanType: string;
  number: number;
  maxRevolution: number;
  nominalPower: number;
  revolutions: number;
  powerConsumption: number;
  externalStaticPressure: number;
  totalPressureDrop: number;
  controlVoltage: number;
  supplyAirDirection: string;
};

type HdcCompressorOutput = {
  electricalPowerConsp: number;
  cop: number;
  evapTempActual: number;
  heatRejection: number;
  number: number;
};

type HdcCalculationResponse = {
  status?: string;
  data?: {
    outputData?: {
      unitOutput?: HdcUnitOutput;
      fan?: HdcFanOutput;
      compressor?: {
        circuit1?: HdcCompressorOutput;
      };
    };
  };
};

function pdfNumber(line: string, label: string): number {
  const valueText = line.slice(line.indexOf(label) + label.length);
  const nextFieldIndex = valueText.indexOf(":");
  const fieldValue =
    nextFieldIndex < 0 ? valueText : valueText.slice(0, nextFieldIndex);
  const value = fieldValue
    .split(/\s+/)
    .filter((token) => /^-?[\d,]+(?:\.\d+)?$/.test(token))
    .at(-1)
    ?.replaceAll(",", "");
  if (!value) {
    throw new Error(`PDF field "${label}" does not contain a numeric value`);
  }
  return Number(value);
}

test.describe("Validate the dashboard page", () => {
  let inputPage: InputPage;
  let expertTab : ExpertTab
  test.beforeEach(async ({ loginPage, page, dashboardPage }) => {
    inputPage = new InputPage(page);
    await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
    await page.waitForLoadState("domcontentloaded");
    await dashboardPage.productSelection.openHighDenityCooling();
  });

  test.skip("Validate the High density cooling product line", async ({
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
    test.setTimeout(90_000);
    const coolingSystem = "A";
    expertTab = new ExpertTab(page)
    await dashboardPage.selectHighDensityCooling({
      productLineName: "CyberRow",
      coolingSystem: "A",
      refrigerantType: "R134a",
      modelName: " CRS 101 A  ",
    });

    

    const calculationResponse = await clickAndWaitForResponse(
      () => dashboardPage.productSelection.proceed(),
      page,
      "performAllCalculations",
    );
    const calculationBody =
      (await calculationResponse.json()) as HdcCalculationResponse;
    const outputData = calculationBody.data?.outputData;
    const { unitOutput, fan, compressor } = outputData ?? {};
    const compressorOutput = compressor?.circuit1;
    if (
      calculationBody.status !== "success" ||
      !unitOutput ||
      !fan ||
      !compressorOutput
    ) {
      throw new Error(
        "HDC calculation response did not contain successful unit, fan, and compressor output",
      );
    }

    const apis = [
      "thestEvaporatorExpertCalculation",
      "compressorExpertCalculation",
    ];

    const responses = configurationPage.waitForCalculationApis(apis);

    await responses.then(async (res) => {
      const resp = await Promise.all(res.map((el) => el.body()));
      expect(resp).toBeDefined();
    });

    await expertTab.openPreviewPdf();
    const pdfTextLines = await expertTab.readPreviewPdfLines();

    console.log(pdfTextLines,">>>>>>>")
    const textFields: Array<[label: string, value: string]> = [
      ["Model type:", unitOutput.unitType],
      ["Refrigerant:", unitOutput.refrigerant],
      ["Power supply:", unitOutput.powerSupply],
      ["Supply air direction:", fan.supplyAirDirection],
      ["Fan type:", fan.fanType],
    ];
    const numericFields: Array<{
      label: string;
      value: number;
      fractionDigits?: number;
      occurrence?: number;
    }> = [
      {
        label: "Cooling capacity (total):",
        value: unitOutput.coolingCapacity,
        fractionDigits: 1,
      },
      {
        label: "Cooling capacity (sensible):",
        value: unitOutput.sensibleCoolingCapacity,
        fractionDigits: 1,
      },
      { label: "Condensing temperature:", value: unitOutput.condensingTemp },
      {
        label: "Net total cooling capacity:",
        value: unitOutput.netTotalCoolingCapacity,
        fractionDigits: 1,
      },
      {
        label: "Net sensible cooling capacity:",
        value: unitOutput.netSensibleCoolingCapacity,
        fractionDigits: 1,
      },
      { label: "EER:", value: unitOutput.eer, fractionDigits: 2 },
      { label: "AER:", value: unitOutput.aer, fractionDigits: 2 },
      {
        label: "Total power consumption:",
        value: unitOutput.totalPowerConsumption,
        fractionDigits: 1,
      },
      {
        label: "Number of refrigerant circuits:",
        value: unitOutput.noOfRefrigerants,
      },
      {
        label: "Number of compressors:",
        value: unitOutput.noOfCompressors,
      },
      {
        label: "Sound power level:",
        value: unitOutput.soundPowerLevel,
        fractionDigits: 1,
      },
      {
        label: "Distance free field [Lpa]:",
        value: unitOutput.distanceFreeField,
      },
      {
        label: "Sound pressure level:",
        value: unitOutput.lpaFreeField,
        fractionDigits: 1,
      },
      { label: "Air flow:", value: unitOutput.airFlow },
      { label: "Air velocity:", value: unitOutput.airVelocity, fractionDigits: 1 },
      { label: "Return air temperature:", value: unitOutput.returnAirTemp },
      { label: "Relative humidity:", value: unitOutput.relativeHumidity },
      { label: "Supply air temperature:", value: unitOutput.supplyAirTemp },
      { label: "Height:", value: unitOutput.height },
      { label: "Width:", value: unitOutput.width },
      { label: "Depth:", value: unitOutput.depth },
      { label: "Weight:", value: unitOutput.weight },
      { label: "Altitude above sea level:", value: unitOutput.altitude },
      { label: "Number:", value: fan.number, occurrence: 0 },
      { label: "Max. revolution:", value: fan.maxRevolution },
      {
        label: "Nominal power:",
        value: fan.nominalPower,
        fractionDigits: 1,
      },
      { label: "Revolutions:", value: fan.revolutions },
      {
        label: "Power consumption:",
        value: fan.powerConsumption,
        fractionDigits: 1,
      },
      {
        label: "External static pressure:",
        value: fan.externalStaticPressure,
      },
      { label: "Total pressure drop:", value: fan.totalPressureDrop },
      {
        label: "Control voltage:",
        value: fan.controlVoltage,
        fractionDigits: 1,
      },
      {
        label: "Electrical power consumption:",
        value: compressorOutput.electricalPowerConsp,
        fractionDigits: 1,
      },
      { label: "COP:", value: compressorOutput.cop, fractionDigits: 2 },
      {
        label: "Evaporating temperature:",
        value: compressorOutput.evapTempActual,
        fractionDigits: 1,
      },
      {
        label: "Heat rejection:",
        value: compressorOutput.heatRejection,
        fractionDigits: 1,
      },
      { label: "Number:", value: compressorOutput.number, occurrence: 1 },
    ];

    for (const [label, expectedValue] of textFields) {
      const line = pdfTextLines.find((text) => text.includes(label));
      expect(line, `PDF is missing the "${label}" field`).toBeDefined();
      expect(
        line,
        `PDF value for "${label}" does not match model output`,
      ).toContain(expectedValue);
    }

    for (const {
      label,
      value: expectedValue,
      fractionDigits = 0,
      occurrence = 0,
    } of numericFields) {
      const matchingLines = pdfTextLines.filter((text) => text.includes(label));
      const line = matchingLines[occurrence];
      expect(line, `PDF is missing the "${label}" field`).toBeDefined();
      const actualValue = pdfNumber(line ?? "", label);
      const roundingTolerance = 0.5 * 10 ** -fractionDigits + 1e-8;
      expect(
        Math.abs(actualValue - expectedValue),
        `PDF value for "${label}" differs from model output`,
      ).toBeLessThanOrEqual(roundingTolerance);
    }
  });
});
