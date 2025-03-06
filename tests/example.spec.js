// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/newest');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hacker/);
  await page.getByRole('link', { name: 'new', exact: true }).click();
  // Get minutes locator
  await page.getByRole('link', { name: 'minute ago' })
  //Expect page to have 100 articles from newest to oldests
   

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
