import { expect, test } from "@playwright/test";

test("signs in with the configured OneSelect account", async ({ page }) => {
  const email = process.env.ONS_EMAIL;
  const password = process.env.ONS_PASSWORD;
  if (!email || !password) {
    throw new Error("ONS_EMAIL and ONS_PASSWORD must be set to run this test");
  }

  await page.goto("/");
  await page.getByRole("textbox", { name: "E-mail" }).fill(email);
  await page.getByRole("button", { name: "Proceed" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/app\//);
  await expect(page.getByText("Application:")).toBeVisible();
});
