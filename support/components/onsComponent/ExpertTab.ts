import { Page, type Locator, expect } from "@playwright/test";
import { waitForApi } from "../../utils/wait-until";

export class ExpertTab {
  readonly printButton: Locator;

  readonly downloadButton: Locator;
  constructor(readonly page: Page) {
    this.printButton = page.getByTitle("Print").first();
    this.downloadButton = page.getByText("Download", { exact: true });
  }

  async openPreviewPdf() {
    await expect(this.printButton).toBeVisible({ timeout: 3000 });
    // const responsePromise = this.page.waitForResponse((res) =>
    //   res.url().includes('"printDoc"'),
    // );
    await this.printButton.click();
   await expect.soft(this.page.frameLocator("#previewFrame").locator('[type="application/pdf"]')).toBeVisible({ timeout: 30_000 });

    // expect(responsePromise).toBeDefined();
  }
}
