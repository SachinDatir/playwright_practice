import { type Page, expect } from "@playwright/test";
import { ProductSelection } from "../../components/onsComponent/ProductSelection";
import { waitForApi } from "../../utils/wait-until";
type CyberAirProductOptions = {
  productLineName: string;
  dischargeType: string;
  coolingSystem: string;
  refrigerantType?: string;
  modelName: string;
};
export class DashboardPage {
  readonly productSelection: ProductSelection;

  constructor(readonly page: Page) {
    this.productSelection = new ProductSelection(page);
  }

  async cyberAirProductLine(options: CyberAirProductOptions) {
    await this.productSelection.openRoomCooling();
    const listFilterModels = waitForApi(this.page, "listFilteredModels");
    const productLine = this.productSelection.deuProductLine;

    await productLine
      .getByRole("heading", {
        name: options.productLineName,
        exact: true,
      })
      .click();
    await listFilterModels;
    await this.productSelection.selectDischargeType(options.dischargeType);
    await this.page.waitForTimeout(500);
    await this.productSelection.selectCoolingSystem(options.coolingSystem);
    if (options.refrigerantType) {
      await this.productSelection.selectRefrigerantType(
        options.refrigerantType,
      );
    }

    await this.productSelection.selectModel(options.modelName);
  }

  async validateCyberAirACompType(expectedCompType: readonly string[]) {
    const compressorTypes = this.productSelection.compressorType.locator("h5");
    await expect(compressorTypes).toHaveText(expectedCompType);
  }

  async validateCoolingSystem(expectedCoolingSystem: readonly string[]) {
    const coolingSystems = this.productSelection.systemCooling.locator("h5");
    await expect(coolingSystems).toContainText(expectedCoolingSystem);
  }

  async validateDischargeType(expectedDischargeType: readonly string[]) {
    const disChargeType = this.productSelection.dischargeType.locator("h5");
    await expect(disChargeType).toHaveText(expectedDischargeType);
  }
  async validateCyberAirRefrigerantTypes(
    expectedRefrigerants: readonly string[],
  ) {
    const refrigerants = this.productSelection.refrigerantType.locator("h5");
    await expect(refrigerants).toHaveText(expectedRefrigerants);
  }
}
