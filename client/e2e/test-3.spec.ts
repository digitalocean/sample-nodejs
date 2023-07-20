import { test, expect } from '@playwright/test';

test.only('upload', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.locator('[data-test="sign-in-username-input"]').click();
  await page.locator('[data-test="sign-in-username-input"]').fill('test');
  await page.locator('[data-test="sign-in-username-input"]').press('Tab');
  await page.locator('[data-test="sign-in-password-input"]').fill('100secretwords');
  await page.locator('[data-test="sign-in-password-input"]').press('Enter');
  await page.getByRole('link', { name: 'Add Visit' }).click();
  await page.getByLabel('Add Receipt').click();
  await page.getByLabel('Add Receipt').setInputFiles('receipt.jpeg');
  await expect(page.getByRole('heading', { name: 'Success' })).toBeVisible();
  // try
});