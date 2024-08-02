import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await expect(page).toHaveURL("/");
  await page.reload();
});

test("admin can access and see report kasir rawat inap", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.getByRole("button", { name: "Rawat Inap" }).click();
  await page.locator("a").filter({ hasText: "Rekap Kasir Rawat Inap" }).click();
  await expect(
    page.getByRole("heading", { name: "Rekap Kasir Rawat Inap" })
  ).toBeVisible();
  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "August" }).click();
  await page.getByText("Jul").click();
  await page.getByLabel("Tuesday, July 30,").getByText("30").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Rekap Kasir Rawat Inap")).toBeVisible();
  await expect(page.getByText("Periode: 30-07-2024")).toBeVisible();

  const rows = ["dr. Susi"];

  for (const row of rows) {
    await expect(page.getByText(row)).toBeVisible();
  }
});
