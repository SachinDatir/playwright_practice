import { expect, Page, test } from "@playwright/test";
import { TestingPlayground } from "../support/pages/testingPlayground";
import { submitAndWaitForResponse } from "../support/wait-until";
test.describe("Verify the the playground", () => {
  let testingUtils: TestingPlayground;
  test.beforeEach(async ({ page }) => {
    testingUtils = new TestingPlayground(page);
    await page.goto("http://www.uitestingplayground.com/");
  });
  test("verify the dynamic Id locator AJAX Load delay", async ({ page }) => {
    const title = page.locator("#title");
    await expect(title).toBeVisible();

    await expect(testingUtils.dynamicLink).toBeVisible();
    await testingUtils.dynamicLink.click();
    const dynamicIdButtonByRole = testingUtils.dynamicId;

    await expect(dynamicIdButtonByRole).toBeVisible();
    await expect(testingUtils.dynamicIdButtonByText).not.toBeDisabled();
  });

  test("Verify the Client-side delay", async ({ page }) => {
    await expect(testingUtils.clientSideDelayBtn).toBeVisible();
    await testingUtils.clientSideDelayBtn.click();

    await expect(testingUtils.triggerButton).toBeVisible();
    await testingUtils.triggerButton.click();
    const success = page.locator(".bg-success");
    await expect(success).toBeVisible({ timeout: 20000 });
  });

  test("Verify the ajax", async ({ page }) => {
    await expect(testingUtils.ajaxDelayBtn).toBeVisible();
    await testingUtils.ajaxDelayBtn.click();

    await expect(testingUtils.ajaxTriggerButton).toBeVisible();

    const respOfAjax = await submitAndWaitForResponse(
      () => testingUtils.ajaxTriggerButton.click(),
      page,
      "ajaxdata",
    );

    await respOfAjax.body().then((res) => {
      console.log(res);
    });

    const success = page.locator(".bg-success");

    await expect(success).toBeVisible({ timeout: 20000 });
  });
});
