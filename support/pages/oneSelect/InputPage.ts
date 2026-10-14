import { Page, type Locator, expect } from "@playwright/test";
import { waitForApi } from "../../utils/wait-until";
import { ExpertTab } from "../../components/onsComponent/ExpertTab";

export class InputPage {
  readonly printButton: Locator;
  readonly expertTab: ExpertTab;

  constructor(readonly page: Page) {
    this.printButton = page.getByTitle("Print").first();
    this.expertTab = new ExpertTab(this.page);
  }


}
