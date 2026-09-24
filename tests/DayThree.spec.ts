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
import { HerokuApp } from "../support/pages/HerokuAppPage";
import { TestingArena } from "../support/pages/TestingArenaPage";
const url = process.env.HEROKUAPP_URL;
let herokuUtils: HerokuApp;
let testingArena: TestingArena;

test.describe("Day 3 — Assertions", () => {
  test.beforeEach(({ page }) => {
    herokuUtils = new HerokuApp(page);
    testingArena = new TestingArena(page);
  });
  test("Verify the assertions in playwright", async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle("The Internet");
    const A_B_Testing = herokuUtils.content.filter({
      has: page.getByRole("link", { name: "A/B Testing" }),
    });
    await expect(A_B_Testing).toBeVisible();
    // toHaveURL()
    // toHaveTitle()
    await herokuUtils.selectTab("A/B Testing");
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/abtest");

    // toBeHidden()
    // toHaveText()
  });

  test("verify the hidden element", async ({ page }) => {
    await testingArena.navigateTo(
      "https://www.automationtesting.co.uk/hiddenElements.html",
    );
    await expect(testingArena.toggleButton).toBeVisible();
    await testingArena.toggleButton.click();
    await expect(testingArena.toggleMsg).toBeVisible()
    await expect(testingArena.toggleMsg).toContainText(
      "You have displayed the hidden text!",
    );
    await expect(testingArena.toggleButton).toHaveText("Toggle");

    await expect(testingArena.toggleMsg).not.toBeHidden();
    await testingArena.toggleButton.click();
    await expect(testingArena.toggleMsg).toBeHidden();
  });

  test("Verify the checked assertion", async ({ page }) => {
    const newNum = 10;
    await page.goto("https://the-internet.herokuapp.com");
    await expect(page.locator("ul>li")).toHaveCount(44);
    await expect(herokuUtils.heading).toHaveAttribute("class", "heading");

    await herokuUtils.checkBoxes.click();
    const checkbox1 = herokuUtils.checkbox_one;
    await expect(checkbox1).not.toBeChecked();
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
    await page.goBack();

    await herokuUtils.inputs.click();
    const inputField = page.locator('[type="number"]');
    await expect(inputField).toHaveValue("");
    await inputField.fill(String(newNum));
    await expect(inputField).toHaveValue(String(newNum));
  });
});
