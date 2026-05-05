import{test} from '@playwright/test';

test('Simulate 500 error', async ({ page }) => {
    await page.route('**/api/productsList', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Internal Server Error'
      })
    });
  });

  await page.goto('https://automationexercise.com/api/productsList');
  await page.waitForTimeout(3000);
});