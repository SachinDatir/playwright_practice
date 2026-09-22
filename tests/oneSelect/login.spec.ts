import { test, expect } from "../../support/fixtures/onsFixtures";
const email = "datirsachin61@gmail.com";
const password = "Sachin@123!";
const wrongPass = "Sachin123";
test.describe("Validate the login functionality of oneselect", () => {
  test("Verify the login with valid user", async ({ loginPage, page }) => {
    await loginPage.loginAndValidate(email, password);
    await loginPage.expectAppOpened();
  });

  test("Verify the login with invalid user", async ({ loginPage }) => {
    let thrownError: Error | null = null;

    try {
      await loginPage.loginAndValidate(email, wrongPass);
    } catch (error) {
      thrownError = error as Error;
    }

    expect(thrownError).not.toBeNull();

    expect(thrownError?.message).toMatch(
      "Login failed! Your credentials may be incorrect, your account may be 'in-Active', or you may have exceeded the maximum number of incorrect login attempts.",
    );
  });
});
