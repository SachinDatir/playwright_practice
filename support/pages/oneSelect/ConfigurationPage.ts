import { Page } from "@playwright/test";
import { SelectionDropdown } from "../../components/onsComponent/SelectionDropdown";
import { waitForApi } from "../../utils/wait-until";

export class ConfigurationPage {
  private readonly selectionDropdown: SelectionDropdown;

  constructor(readonly page: Page) {
    this.selectionDropdown = new SelectionDropdown(page);
  }

  async expectProductLineOptions(expectedProductLines: readonly string[]) {
    await this.selectionDropdown.validateProductLineDropdown(
      expectedProductLines,
    );
  }

  async expectDischargeTypeOptions(expectedDischargeTypes: readonly string[]) {
    await this.selectionDropdown.validateDischargeTypes(expectedDischargeTypes);
  }

  async expectCoolingSystemOptions(expectedCoolingSysType: readonly string[]) {
    await this.selectionDropdown.validateCoolingSystem(expectedCoolingSysType);
  }
  async expectCompressorOptions(expectedCompressorType: readonly string[]) {
    await this.selectionDropdown.validateCompressorType(expectedCompressorType);
  }

  async expectCircuitOptions(expectedCircuitType: readonly string[]) {
    await this.selectionDropdown.validateCircuits(expectedCircuitType);
  }

  async expectCasingSize(expectedCasing: readonly string[]) {
    await this.selectionDropdown.validateCasingWidth(expectedCasing);
  }

  async expectRefrigerentOptions(expectedRefrigerent: readonly string[]) {
    await this.selectionDropdown.validateRefrigerent(expectedRefrigerent);
  }

  async expectPowerSupplyOptions(expectedPowerSupply: readonly string[]) {
    await this.selectionDropdown.validatePowerSupply(expectedPowerSupply);
  }

  async expectModelOptions(expectedModelOptions: readonly string[]) {
    await this.selectionDropdown.validateModels(expectedModelOptions);
  }

  async waitForCalculationApis( apis: string[]) {
    return Promise.all(apis.map((api) => waitForApi(this.page, api)));
  }
}
