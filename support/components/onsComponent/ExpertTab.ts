import { Page, type Locator, expect } from "@playwright/test";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export class ExpertTab {
  readonly printButton: Locator;
  readonly downloadButton: Locator;
  readonly previewDialog: Locator;
  readonly previewFrame: Locator;

  constructor(readonly page: Page) {
    this.printButton = page.getByTitle("Print").first();
    this.downloadButton = page.getByText("Download", { exact: true });
    this.previewDialog = page
      .getByRole("dialog")
      .filter({
        has: page.getByRole("heading", { name: "Preview", exact: true }),
      });
    this.previewFrame = this.previewDialog.locator(
      'iframe[name="previewFrame"]',
    );
  }

  async openPreviewPdf() {
    await expect(this.printButton).toBeVisible({ timeout: 3000 });
    await this.printButton.click();
    await expect(this.previewDialog).toBeVisible({ timeout: 60_000 });
    await expect(this.previewFrame).toBeVisible({ timeout: 60_000 });
    await expect(
      this.previewDialog.getByRole("button", { name: "Download", exact: true }),
    ).toBeVisible();
  }

  async readPreviewPdfLines(): Promise<string[]> {
    const source = await this.previewFrame.getAttribute("src");
    const pdfMatch = source?.match(/^data:application\/pdf;base64,(.+)$/s);
    if (!pdfMatch) {
      throw new Error("The preview iframe does not contain a base64 PDF");
    }

    const loadingTask = getDocument({
      data: new Uint8Array(Buffer.from(pdfMatch[1], "base64")),
      useSystemFonts: true,
    });

    try {
      const pdf = await loadingTask.promise;
      const textLines: string[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const lines = new Map<number, Array<{ x: number; text: string }>>();

        for (const item of content.items) {
          if (!("str" in item) || !item.str.trim()) {
            continue;
          }

          const y = Math.round(item.transform[5] * 10) / 10;
          const line = lines.get(y) ?? [];
          line.push({ x: item.transform[4], text: item.str.trim() });
          lines.set(y, line);
        }

        textLines.push(
          ...Array.from(lines.entries())
            .sort(([firstY], [secondY]) => secondY - firstY)
            .map(([, line]) =>
              line
                .sort((first, second) => first.x - second.x)
                .map((item) => item.text)
                .join(" "),
            ),
        );
      }

      return textLines;
    } finally {
      await loadingTask.destroy();
    }
  }
}
