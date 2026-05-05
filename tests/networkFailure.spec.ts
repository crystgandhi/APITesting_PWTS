import { test, expect } from '@playwright/test';

test('Network Failure', async ({ page }) => {
  await page.route('**/api/productsList', async (route) => {
    await route.abort();
  });

  try {
    await page.goto('https://automationexercise.com/api/productsList');
  } catch (error) {
    expect(String(error)).toContain('net::ERR_FAILED');
  }

  await page.waitForTimeout(3000);
});