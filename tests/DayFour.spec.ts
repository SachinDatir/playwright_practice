import { test, expect } from "@playwright/test";
test.describe("Verify the the auto waiting mechanism of playwright", () => {
  test("Verify the Auto-waiting feature in playwright", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
    await page.getByRole("button", { name: "Start" }).click();
    await expect(page.locator("#finish")).toBeVisible({timeout:6000});
    const heading = page.getByRole("heading", { name: "Hello World!" });
    await heading.waitFor({ state: "visible" });
    await expect(heading).toBeVisible();
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");
    await page.getByRole("button", { name: "Start" }).click();
    await heading.waitFor({ state: "visible" ,timeout:6000});
    await expect(heading).toBeVisible();
  });

  test("Verify auto waiting mechanism in ons", async ({ page }) => {
    await page.goto("https://development.oneselect.global")
    const loginButton =  page.locator(".login-btn")
    await expect(loginButton).not.toBeDisabled()
  });
});
