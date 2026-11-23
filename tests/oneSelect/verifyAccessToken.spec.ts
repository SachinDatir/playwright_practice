import { test, expect } from "../../support/fixtures/authFixtures";

test("verify the accessToken", async ({ getAccessToken, request, page }) => {
  const token = await page.evaluate(() =>
    window.localStorage.getItem("access_token"),
  );

  expect(token).toContain(getAccessToken);
  expect(token, "Expected non-empty token in localStorage").toBeTruthy();
  expect(typeof token).toBe("string");
  expect(
    token!.trim().length,
    "Token should not be whitespace or unusually short",
  ).toBeGreaterThanOrEqual(16);
  expect(/\s/.test(token!), "Token should not contain spaces").toBe(false);

  const response = await request.get(
    "https://api.development.oneselect.global/v1/globals/modelSelectionFilters",
    {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        accept: "application/json",
        "content-type": "application/json",
      },
    },
  );

  const body = await response.json();

  expect(response.status()).toBe(200);

  expect(body).toBeDefined()
});
