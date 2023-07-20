import { test, expect } from '@playwright/test';

test('login fail', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.keyboard.press('Tab');

  await page.locator('[data-test="sign-in-username-input"]').fill('test');
  await page.locator('[data-test="sign-in-username-input"]').press('Tab');
  await page.locator('[data-test="sign-in-password-input"]').fill('fail');
  await page.getByText('Sign In', { exact: true }).click();
  await expect(page.getByText('Incorrect username or password.')).toBeVisible();
});