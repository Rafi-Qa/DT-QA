import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await expect(page).toHaveURL("/");
  await page.reload();
});

test("admin can access and see report rekap komisi nakes ranap", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.getByRole("button", { name: "Rawat Inap" }).click();
  await page
    .locator("a")
    .filter({ hasText: "Rekap Komisi Nakes Harian Rawat Inap" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Rekap Komisi Nakes Harian" })
  ).toBeVisible();

  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });

  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "Go to the previous period" }).click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await page.waitForTimeout(3000);
  await expect(
    page.getByText("LAPORAN REKAP KOMISI NAKES - RAWAT INAP")
  ).toBeVisible();
  await expect(
    page.getByText("Periode: 01-07-2024 s/d 02-08-2024")
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
  const rows = ["Total", "Rp 480,000", "Rp 14,000", "Rp 494,000"];

  for (const row of rows) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${row}$`) })
        .first()
    ).toBeVisible();
  }
});
