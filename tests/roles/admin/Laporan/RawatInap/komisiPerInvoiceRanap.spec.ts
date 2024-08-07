import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await expect(page).toHaveURL("/");
  await page.reload();
});

test("admin can access and see report komisi per invoice ranap", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.getByRole("button", { name: "Rawat Inap" }).click();
  await page
    .locator("a")
    .filter({ hasText: "Komisi per Invoice Rawat Inap" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Komisi per Invoice Rawat Inap" })
  ).toBeVisible();
  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });

  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "Go to the previous period" }).click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Invoice Rawat Inap")).toBeVisible();
  await expect(
    page.getByText("Periode: 01-07-2024 s/d 02-08-2024")
  ).toBeVisible();
});
