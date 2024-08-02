import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("admin can access and see report rekap komisi nakes harian", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page
    .locator("a")
    .filter({ hasText: /^Rekap Komisi Nakes Harian$/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Rekap Komisi Nakes Harian" })
  ).toBeVisible();

  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "August" }).click();
  await page.getByText("Jul").click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();

  await expect(page.getByText("LAPORAN REKAP KOMISI NAKES")).toBeVisible();
  await expect(
    page.getByText("Periode: 01-07-2024 s/d 01-08-2024")
  ).toBeVisible();

  const headers = [
    "Tgl Kunjungan",
    "Nama Nakes",
    "Konsultasi",
    "Tindakan",
    "Pmr. Penunjang",
    "Surat",
    "Total",
  ];

  for (const header of headers) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${header}$`) })
        .first()
    ).toBeVisible();
  }

  const rows = [
    "30 Juli 2024",
    "DR ASEP RIYANSYAH",
    "Rp 60,000",
    "Rp 30,000",
    "Rp 20,000",
    "Rp 14,000",
    "Rp 94,000",
  ];

  for (const row of rows) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${row}$`) })
        .first()
    ).toBeVisible();
  }
});
