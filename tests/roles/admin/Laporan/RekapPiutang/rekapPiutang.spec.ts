import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("admin can access and see report rekap piutang", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page
    .locator("a")
    .filter({ hasText: "Rekap Piutang Asuransi/" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Rekap Piutang Asuransi/" })
  ).toBeVisible();

  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });
  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "August" }).click();
  await page.getByText("Jul").click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.locator("#poli-v-claim-select").getByLabel("Open").click();
  await page.getByRole("button", { name: "Lihat" }).click();

  await expect(
    page.getByText("Laporan Piutang Asuransi/Perusahaan/JKN-KIS")
  ).toBeVisible();
  await expect(
    page.getByText("Periode: 01-07-2024 s/d 01-08-2024")
  ).toBeVisible();

  const headers = [
    "No. Invoice",
    "No. RM",
    "Nama Pasien",
    "Nama Dokter",
    "Nama Kasir",
    "Pembiaya",
    "Total",
    "Jumlah Dibayarkan Pribadi",
    "Jumlah Tertanggung",
  ];

  for (const header of headers) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${header}$`) })
        .first()
    ).toBeVisible();
  }
});
