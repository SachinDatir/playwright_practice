import { type Page, expect } from "@playwright/test";
import { ProductSelection } from "../../components/onsComponent/ProductSelection";
type CyberAirProductOptions = {
  productLineName: string;
  dischargeType: string;
  coolingSystem: string;
  refrigerantType: string;
  modelName: string;
};
export class DashboardPage {
  readonly productSelection: ProductSelection;

  constructor(page: Page) {
    this.productSelection = new ProductSelection(page);
  }

  async cyberAirProductLine(options: CyberAirProductOptions) {
    await this.productSelection.openRoomCooling();

    const productLine = this.productSelection.deuProductLine;

    await productLine
      .getByRole("heading", {
        name: options.productLineName,
        exact: true,
      })
      .click();

    await this.productSelection.selectDischargeType(options.dischargeType);
    await this.productSelection.selectCoolingSystem(options.coolingSystem);
    await this.productSelection.selectRefrigerantType(options.refrigerantType);
    await this.productSelection.selectModel(options.modelName);
  }

  async validateCyberAirACompType() {
    const compressorTypes = this.productSelection.compressorType.locator("h5");
    await expect(compressorTypes.nth(0)).toContainText("On/Off Scroll");

    await expect(compressorTypes.nth(1)).toContainText("EC Scroll");
    await expect(compressorTypes.nth(2)).toContainText("Digital Scroll");
  }

  async validateCyberAirRefrigerantTypes(expectedRefrigerants: string[]) {
    const refrigerants = this.productSelection.refrigerantType.locator("h5");
    await expect(refrigerants).toHaveText(expectedRefrigerants);
  }
}
