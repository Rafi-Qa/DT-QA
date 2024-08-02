import { test, expect } from "@playwright/test";
// ! diperbaiki lagi
test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("admin can access and see report rekap kasir", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page
    .locator("a")
    .filter({ hasText: /^Rekap Kasir$/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Rekap Kasir" })
  ).toBeVisible();
  await page.locator("button:near(.k-input-inner)").nth(0).click();

  await page.getByLabel("Tuesday, July 30,").getByText("30").click();
  await page.getByRole("button", { name: "Lihat" }).click();

  await expect(page.getByText("Laporan Rekap Kasir")).toBeVisible();
  await expect(
    page.getByText("Periode: 30-07-2024 s/d 31-07-2024")
  ).toBeVisible();

  const headers = [
    "Nama Kasir",
    "Total Nilai Invoice",
    "Jenis Pembayaran",
    "JKN KIS",
    "TUNAI",
    "Kelebihan Hutang",
    "Total Pembayaran",
    "Hutang Pasien",
  ];

  for (const header of headers) {
    await expect(page.getByText(header)).toBeVisible();
  }

  const rows = ["Kasir Test"];

  for (const row of rows) {
    await expect(page.getByText(row)).toBeVisible();
  }
});
