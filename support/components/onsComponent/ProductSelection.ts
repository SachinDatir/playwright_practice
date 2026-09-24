import { expect, type Locator, type Page } from "@playwright/test";

export class ProductSelection {
  readonly roomCoolingCard: Locator;
  readonly chillerCard: Locator;
  readonly proceedButton: Locator;
  readonly cyberAirMiniCard: Locator;
  readonly roomCoolingDeuProductLine: Locator;
  readonly shelterCoolingCard: Locator;
  readonly deuProductLine: Locator;
  readonly splitAirCard: Locator;
  readonly dischargeType: Locator;
  readonly systemCooling: Locator;
  readonly compressorType: Locator;
  readonly cyberAirCard: Locator;
  readonly cciIndoor: Locator;
  readonly cc2Card: Locator;
  readonly cyberLabCard: Locator;
  readonly chnProductLine: Locator;
  readonly espProductLine: Locator;
  readonly usaProductLine: Locator;
  readonly refrigerantType: Locator;
  readonly powerSupply: Locator;
  readonly models: Locator;

  constructor(private readonly page: Page) {
    this.roomCoolingCard = page.getByRole("heading", { name: "Room Cooling" });
    this.chillerCard = page.locator(
      '[src="assets/img/app/app/chiller_units.png"]',
    );
    this.proceedButton = page.locator("#modelSelectionProceed");
    this.cyberAirMiniCard = page.getByRole("heading", {
      name: "CyberAir Mini",
    });
    this.roomCoolingDeuProductLine = page.locator("#DEU");
    this.deuProductLine = page.locator("#DEU");
    this.shelterCoolingCard = page.getByRole("heading", {
      name: "Shelter Cooling",
    });
    this.splitAirCard = page.getByRole("heading", { name: "SplitAir" });
    this.cyberAirCard = page.getByRole("heading", {
      name: "CyberAir",
      exact: true,
    });
    this.systemCooling = page.locator("#systemCooling");
    this.compressorType = page.locator("#compressorType");
    this.dischargeType = page.locator("#dischargeType");
    this.cciIndoor = page.getByRole("heading", {
      name: "CyberCool Indoor",
      exact: true,
    });
    this.cc2Card = page.getByRole("heading", {
      name: "CyberCool 2",
      exact: true,
    });
    this.cyberLabCard = this.deuProductLine.getByRole("heading", {
      name: "CyberLab",
      exact: true,
    });
    this.chnProductLine = page.locator("#CHN");
    this.espProductLine = page.locator("#ESP");
    this.usaProductLine = page.locator("#USA");
    this.refrigerantType = page.locator("#refrigerant");
    this.powerSupply = page.locator("#powerSupply");
    this.models = page.locator("#models");
  }

  getRefrigerant(refrigerantType: string) {
    return this.page.getByRole("heading", {
      name: refrigerantType,
      exact: true,
    });
  }

  modelCard(modelName: string) {
    return this.page.getByRole("heading", { name: modelName, exact: true });
  }

  getPowerSupply(powerSupply: string) {
    return this.page.getByRole("heading", {
      name: powerSupply,
      exact: true,
    });
  }

  getDischargeType(dischargeType: string) {
    return this.dischargeType.locator(
      this.page.getByRole("heading", { name: dischargeType, exact: true }),
    );
  }

  getCompressorType(compressorType: string) {
    return this.compressorType.getByRole("heading", {
      name: compressorType,
      exact: true,
    });
  }

  //async methods
  async openRoomCooling() {
    await expect(this.roomCoolingCard).toBeVisible({ timeout: 50000 });
    await this.roomCoolingCard.click();
  }

  async openChiller() {
    await this.chillerCard.click();
  }

  async openCyberLab() {
    await this.openRoomCooling();
    await expect(this.cyberLabCard).toBeVisible();
    await this.cyberLabCard.click();
  }

  async proceed() {
    await this.proceedButton.click();
  }

  async selectCyberAirMini() {
    await this.roomCoolingDeuProductLine.locator(this.cyberAirMiniCard).click();
  }

  async selectShelterCooling() {
    await expect(this.shelterCoolingCard).toBeVisible();
    await this.shelterCoolingCard.click();
  }

  async selectProductLine(country: Locator, productLine: Locator) {
    await country.locator(productLine).click();
  }

  async selectDischargeType(dischargeType: string) {
    this.getDischargeType(dischargeType).click();
  }

  async selectCoolingSystem(systemName: string) {
    await this.systemCooling
      .getByRole("heading", { name: systemName, exact: true })
      .click();
  }

  async selectCompressorType(compressorType: string) {
    const compressor = this.getCompressorType(compressorType);
    await compressor.scrollIntoViewIfNeeded();
    await compressor.click({ force: true });
  }

  getCoolingSystemType(coolingType: string) {
    return this.page.getByRole("heading", {
      name: coolingType,
      exact: true,
    });
  }

  getCasingSize(casingSize: string) {
    return this.page.getByRole("heading", {
      name: casingSize,
      exact: true,
    });
  }
  async selectCasingSize(casingSize: string) {
    const caseSize = this.getCasingSize(casingSize);
    await caseSize.click({ force: true });
  }

  async selectModel(modelName: string) {
    const model = this.modelCard(modelName);
    await model.scrollIntoViewIfNeeded();
    await expect(model).toBeVisible();
    await model.click();
  }

  getNoiseData(noiseData: string) {
    return this.page.getByRole("heading", {
      name: noiseData,
      exact: true,
    });
  }
  async selectNoiseData(noiseData: string) {
    const noise = this.getNoiseData(noiseData);
    await noise.scrollIntoViewIfNeeded();
    await noise.click({ force: true });
  }

  async selectRefrigerantType(refrigerantType: string) {
    const refrigerant = this.getRefrigerant(refrigerantType);
    await refrigerant.click({ force: true });
  }

  async selectPowerSupply(powerSupply: string) {
    const powerSupplyOption = this.getPowerSupply(powerSupply);
    await expect(powerSupplyOption).toBeVisible();
    await powerSupplyOption.click({ force: true });
  }
}
