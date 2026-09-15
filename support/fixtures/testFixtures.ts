import { test as base } from "@playwright/test";
import { SauceDemo } from "../pages/sauceDemo";
type Fixtures = {
  sauceDemo: SauceDemo;
};

export const test = base.extend<Fixtures>({
  sauceDemo: async ({ page }, use) => {
    const sauceDemo = new SauceDemo(page);
    await use(sauceDemo);
  },
});
export { expect } from "@playwright/test";
