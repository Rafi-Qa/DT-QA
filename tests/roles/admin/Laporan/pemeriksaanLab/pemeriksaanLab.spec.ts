import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("admin can access and see report pemeriksaan lab", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Pemeriksaan Lab" }).click();
  await expect(
    page.getByRole("heading", { name: "Pemeriksaan Lab" })
  ).toBeVisible();

  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });
  await expect(page.locator("button:near(.k-input-inner)")).toBeVisible({});
  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "August" }).click();
  await page.getByText("Jul").click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Pemeriksaan Lab")).toBeVisible();
  await page.getByText("Periode: 01-07-2024 s/d 02-08-2024").click();
});
