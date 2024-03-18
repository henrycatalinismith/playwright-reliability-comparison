const { test, expect, beforeEach } = require("@playwright/test");

beforeEach(async ({ page }) => await page.goto("/"));

test("flaky", async ({ page }) => {
  await page.click("text=one");
  await page.click("text=two");
  await page.click("text=three");
  expect(await page.locator("text=success").isVisible()).toBeTruthy();
});

test("reliable", async ({ page }) => {
  const one = page.locator("text=one");
  const two = page.locator("text=two");
  const three = page.locator("text=three");
  const status = page.locator("#status");

  await one.click();
  await two.click();
  await three.click();

  await status.waitFor({ state: "visible" });
  expect(await status.textContent()).toBe("success");
});
