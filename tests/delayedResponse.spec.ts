import{test} from '@playwright/test';

test('Simulate 500 error', async ({ page }) => {
    await page.route('**/api/productsList', async (route) => {
        await new Promise(resolve=> setTimeout(resolve,5000))
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Delayed response'
      })
    });
  });

  await page.goto('https://automationexercise.com/api/productsList');
  await page.waitForTimeout(3000);
});