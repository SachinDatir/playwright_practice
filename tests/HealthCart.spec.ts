import { test, expect } from "@playwright/test";

test("HealthCart", async ({ page }) => {
  const logo = page.getByRole("link", { name: "HK Home Logo" });
  await page.goto("https://healthcart.com/");
  await page.waitForLoadState("domcontentloaded");
  await expect(logo).toBeVisible();

  let parent = page.locator(".variant-info");
  let children = parent.locator(".variant-name");

  const count = await children.count();
  for (let i = 0; i < count; i++) {
    let child = children.nth(i);
    let text = await child.textContent();
    const trimmedText = text ? text.replace(/\s+/g, " ").trim() : "";
    console.log(trimmedText.split("₹")[0]);
    if (
      trimmedText === "MuscleBlaze Biozyme Performance Whey, 4.4 lb Rich Chocolate"
    ) {
      await parent.getByText("Add to Cart").nth(i).click();
      break;
    }
  }
 
});

