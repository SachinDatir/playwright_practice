import { test } from "@playwright/test";
// unable the storage state first to start the test
test.skip("Validate the dahboard", async ({ page }) => {
  await page.goto("https://hrms.stulzindia.co.in/#/app/dashboard");
  // const sideNav = page.locator("app-sidenav>.side-nav")

  // const navElement = await sideNav.locator("a").all()
  // let arr = []
  // for (const link of navElement) {
  //   const href = await link.getAttribute("href");
  //   if (href) {
  //     arr.push(href);
  //   }
  // }

  // console.log(arr)

  // for(let i =0;i<arr.length;i++){
  //     if(arr[i].includes("javascript:void(0);")){
  //     const tabLocator =  sideNav.locator(`a[href='${arr[i]}']`)
  //     await tabLocator.first().click({ force: true });
  //      await page.waitForTimeout(2000);
  //     }
  // }

  const sideNav = page.locator(".side-nav");

  // Select only the 'a' tags that have href="javascript:void(0);"
  const dropdownToggles = sideNav.locator('a[href="javascript:void(0);"]');

  const count = await dropdownToggles.count();
  console.log(`Found ${count} dropdown toggle(s).`);

  for (let i = 0; i < count; i++) {
    const toggle = dropdownToggles.nth(i);

    // Optional: print text or perform action
    const text:any = await toggle.textContent();
    console.log(`Clicking toggle: ${text.trim()}`);

    await toggle.click();
  }
});
