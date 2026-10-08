import { expect, test } from "@playwright/test";

test("loads the WealthWise application", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "WealthWise" })).toBeVisible();
});
