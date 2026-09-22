import { test as base } from "@playwright/test";
import { SauceDemo } from "../pages/sauceDemo";
type Fixtures = {
  sauceDemo: SauceDemo;
  loggedInSauceDemo: SauceDemo;
};

export const test = base.extend<Fixtures>({
  sauceDemo: async ({ page }, use) => {
    const sauceDemo = new SauceDemo(page);
      await page.goto("https://www.saucedemo.com/"!);

    await use(sauceDemo);
  },
  loggedInSauceDemo: async ({ page }, use) => {
    const sauceDemo = new SauceDemo(page);

    await page.goto(process.env.SAUCE_DEMO_URL!);

    await sauceDemo.loginSaucDemo(
      process.env.SAUCE_DEMO_USERNAME!,
      process.env.SAUCE_DEMO_PASSWORD!
    );

    await use(sauceDemo);
  },
});
export { expect } from "@playwright/test";
