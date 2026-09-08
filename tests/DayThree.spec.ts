// toBeVisible()
// toBeHidden()
// toHaveText()
// toContainText()
// toHaveValue()
// toBeChecked()
// toHaveAttribute()
// toHaveCount()
// toHaveURL()
// toHaveTitle()

import { test, expect } from "@playwright/test";
test.describe("Day 3 — Assertions", () => {
  test("Verify the assertions in playwright", async ({ page }) => {
    // toBeVisible()

    await page.goto("https://the-internet.herokuapp.com/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveTitle("The Internet");
    const A_B_Testing = page
      .locator("#content")
      .filter({ has: page.getByRole("link", { name: "A/B Testing" }) });
    await expect(A_B_Testing).toBeVisible();
    // toHaveURL()
    // toHaveTitle()
    await page.getByRole("link", { name: "A/B Testing" }).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/abtest");

    // toBeHidden()
    // toHaveText()
  });

  test("verify the hidden element", async ({ page }) => {
    await page.goto("https://www.automationtesting.co.uk/hiddenElements.html");
    await page.getByRole("button", { name: "Toggle" }).click();
    await expect(page.locator("#myDIV")).toContainText(
      "You have displayed the hidden text!",
    );
    await expect(page.getByRole("button", { name: "Toggle" })).toHaveText(
      "Toggle",
    );

    await expect(page.locator("#myDIV")).not.toBeHidden();
    await page.getByRole("button", { name: "Toggle" }).click();
    await expect(page.locator("#myDIV")).toBeHidden();
  });

  test("Verify the checked assertion", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com");
    await expect(page.locator("ul>li")).toHaveCount(44);
    await expect(page.locator(".heading")).toHaveAttribute("class", "heading");

    await page.getByRole("link", { name: "Checkboxes" }).click();
    const checkbox1 = page.locator('[type="checkbox"]').first();
    await expect(checkbox1).not.toBeChecked();
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
    await page.goBack();

    await page.getByRole("link", { name: "Inputs" }).click();
    const inputField = page.locator('[type="number"]');
    await expect(inputField).toHaveValue("");
    await inputField.fill("10");
    await expect(inputField).toHaveValue("10");
  });

  test("Verify the Auto-waiting feature in playwright", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
    await page.getByRole("button", { name: "Start" }).click();
    await expect(page.locator("#finish")).toBeVisible();
    const heading = page.getByRole("heading", { name: "Hello World!" });
    await heading.waitFor({ state: "visible" });
    await expect(heading).toBeVisible();
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");
    await page.getByRole("button", { name: "Start" }).click();
    await heading.waitFor({ state: "visible" });
    await expect(heading).toBeVisible();
    
  });
});
