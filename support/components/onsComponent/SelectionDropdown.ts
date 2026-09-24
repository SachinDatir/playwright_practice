import { expect, type Locator, type Page } from "@playwright/test";

export class SelectionDropdown {
  readonly inputProductLine: Locator;
  readonly inputDischargeType: Locator;
  readonly inputCoolingSystem: Locator;
  readonly inputCompType: Locator;
  readonly inputCircuit: Locator;
  readonly inputCasing: Locator;
  readonly refrigerent: Locator;
  readonly inputPowerSupply: Locator;
  readonly inputModels: Locator;

  constructor(readonly page: Page) {
    this.inputProductLine = this.page.locator("select#inputProductLine");
    this.inputDischargeType = this.page.locator("select#inputDisCharge");
    this.inputCoolingSystem = this.page.locator("select#inputCoolingSys");
    this.inputCompType = this.page.locator("select#inputCompressor");
    this.inputCircuit = this.page.locator("select#inputRefrigerantCircuits");
    this.inputCasing = this.page.locator("select#inputCasingSize");
    this.refrigerent = this.page.locator("select#inputRefrigerant");
    this.inputPowerSupply = this.page.locator("select#inputPowerSupply");
    this.inputModels = this.page.locator("#inputModel");
  }

  async validateProductLineDropdown(expectedProductLine: readonly string[]) {
    const dropdown = this.inputProductLine.locator("option") 
    await expect(dropdown).toHaveText(expectedProductLine);
  }

  async validateDischargeTypes(expectedDischarge: readonly string[]) {
    const dropdown = this.inputDischargeType.locator("option")
    await expect(dropdown).toHaveText(expectedDischarge);
  }

  async validateCoolingSystem(expectedCoolingSystem: readonly string[]) {
    const dropdown = this.inputCoolingSystem.locator("option");
    await expect(dropdown).toHaveText(expectedCoolingSystem);
  }

  async validateCompressorType(expectedCompressorType: readonly string[]) {
    const dropdown = this.inputCompType.locator("option");
    await expect(dropdown).toHaveText(expectedCompressorType);
  }

  async validateCircuits(expectedCircuits: readonly string[]) {
    const dropdown = this.inputCircuit.locator("option");
    await expect(dropdown).toHaveText(expectedCircuits);
  }

  async validateCasingWidth(expectedCasing: readonly string[]) {
    const dropdown = this.inputCasing.locator("option");
    await expect(dropdown).toHaveText(expectedCasing);
  }

  async validateRefrigerent(expectedRefrigerent: readonly string[]) {
    const dropdown = this.refrigerent.locator("option");

    const actualTexts = await dropdown.allInnerTexts();
    const trimmedTexts = actualTexts.map((text) => text.trim());

    expect(trimmedTexts).toEqual(expectedRefrigerent);
  }
  async validatePowerSupply(expectedPowerSupplies: readonly string[]) {
    const dropdown = this.inputPowerSupply.locator("option");
    await expect(dropdown).toHaveText(expectedPowerSupplies);
  }

  async validateModels(expectetModels: readonly string[]) {
    const dropdown = this.inputModels.locator("option");
    await expect(dropdown).toHaveText(expectetModels);
  }
}
