import { test, expect } from '@playwright/test';

test('API Mocking', async ({ page }) => {
    // 1. Define the route before navigating
    await page.route('**/api/v1/fruits', async (route) => {
        const mockedResponse = [
            { name: 'Kate', id: 'APY4' },
            { name: 'Candy', id: 'APY3' },
            { name: 'Nick', id: 'APY5' }
        ];

        // 2. Use route.fulfill and provide the json body
        await route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(mockedResponse),
        });
    });

    // 3. Navigate to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // 4. Assert that the mocked data is visible in the UI
    await expect(page.getByText('Nick')).toBeVisible();
});

