import { Page } from "@playwright/test";
import { SelectionDropdown } from "../../components/onsComponent/SelectionDropdown";

export class ConfigurationPage {
  private readonly selectionDropdown: SelectionDropdown;

  constructor(readonly page: Page) {
    this.selectionDropdown = new SelectionDropdown(page);
  }

  async expectProductLineOptions(expectedProductLines: string[]) {
    await this.selectionDropdown.validateProductLineDropdown(
      expectedProductLines,
    );
  }

  async expectDischargeTypeOptions(expectedDischargeTypes: string[]) {
    await this.selectionDropdown.validateDischargeTypes(expectedDischargeTypes);
  }

  async expectCoolingSystemOptions(expectedCoolingSysType: string[]) {
    await this.selectionDropdown.validateCoolingSystem(expectedCoolingSysType);
  }
  async expectCompressorOptions(expectedCompressorType: string[]) {
    await this.selectionDropdown.validateCompressorType(expectedCompressorType);
  }

  async expectCircuitOptions(expectedCircuitType: string[]) {
    await this.selectionDropdown.validateCircuits(expectedCircuitType);
  }

  async expectCasingSize(expectedCasing: string[]) {
    await this.selectionDropdown.validateCasingWidth(expectedCasing);
  }

  async expectRefrigerentOptions(expectedRefrigerent: string[]) {
    await this.selectionDropdown.validateRefrigerent(expectedRefrigerent);
  }

  async expectPowerSupplyOptions(expectedPowerSupply: string[]) {
    await this.selectionDropdown.validatePowerSupply(expectedPowerSupply);
  }

  async expectModelOptions(expectedModelOptions: string[]) {
    await this.selectionDropdown.validateModels(expectedModelOptions);
  }
}
