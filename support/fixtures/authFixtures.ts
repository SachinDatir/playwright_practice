import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/oneSelect/LoginPage";

type AuthFixtures = {
   getAccessToken: string
};

export const test = base.extend<AuthFixtures>({
  getAccessToken: async ({ page }, use) => {
    const email = process.env.ONS_EMAIL;
    const password = process.env.ONS_PASSWORD;
    if (!email || !password) {
      throw new Error("ONS_EMAIL and ONS_PASSWORD must be configured.");
    }

    const loginPage = new LoginPage(page);
    const token = await loginPage.loginAndValidate(email, password);
    if (!token) {
      throw new Error("Login completed without returning an access token.");
    }

    await use(token);

  },
});
export { expect } from "@playwright/test";