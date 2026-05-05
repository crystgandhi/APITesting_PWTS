import { test, expect } from '@playwright/test';

test('Modify Request', async ({ page }) => {
  await page.route('**/api/verifyLogin', async (route) => {
    const request = route.request();

    console.log('Original body:', request.postData());

    const newPostData = {
      email: 'tester@gmail.com',
      password: 'test@123'
    };

    await route.continue({
      method: 'POST',
      postData: JSON.stringify(newPostData),
      headers: {
        ...request.headers(),
        'content-type': 'application/json'
      }
    });
  });

  const response = await page.goto('https://automationexercise.com/api/verifyLogin');

  expect(response?.status()).toBe(200);
  await page.waitForTimeout(5000);
});