import { test, expect } from "../../support/fixtures/onsFixtures";

function requiredCredential(name: "ONS_EMAIL" | "ONS_PASSWORD"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
test.describe("Validate the login functionality of oneselect", () => {
  test("Verify the login with valid user", async ({ loginPage, page }) => {
console.log(requiredCredential("ONS_EMAIL"))

    await loginPage.loginAndValidate(
      requiredCredential("ONS_EMAIL"),
      requiredCredential("ONS_PASSWORD"),
    );
    await loginPage.expectAppOpened();
  });

  test("Verify the login with invalid user", async ({ loginPage }) => {
    let thrownError: Error | null = null;

    try {
      await loginPage.loginAndValidate(
        requiredCredential("ONS_EMAIL"),
        "invalid-test-password",
      );
    } catch (error) {
      thrownError = error as Error;
    }

    expect(thrownError).not.toBeNull();

    expect(thrownError?.message).toMatch(
      "Login failed! Your credentials may be incorrect, your account may be 'in-Active', or you may have exceeded the maximum number of incorrect login attempts.",
    );
  });
});
