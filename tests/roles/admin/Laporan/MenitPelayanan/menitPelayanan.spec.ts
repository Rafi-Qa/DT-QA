import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await expect(page).toHaveURL("/");
  await page.reload();
});

test("admin can access and see report menit pelayanan", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Menit Pelayanan" }).click();
  await expect(
    page.getByRole("heading", { name: "Menit Pelayanan" })
  ).toBeVisible();

  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });
  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "August" }).click();
  await page.getByText("Jan").click();
  await page.getByLabel("Monday, January 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Menit Pelayanan")).toBeVisible();
  await page.getByText("Periode: 01-01-2024 s/d 02-08-2024").click();

  const headers = [
    "Tanggal Kunjungan",
    "Nama Pasien",
    "Nama Dokter",
    "Nama Poli",
    "Lama Waktu Tunggu Layanan (Menit)",
    "Lama Pelayanan Poli (Menit)",
    "Lama Waktu Tunggu Obat (Menit)",
    "Assesmen Awal",
  ];

  for (const header of headers) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${header}$`) })
        .first()
    ).toBeVisible();
  }

  const rows = ["10/01/2024", "ADE YULIANTI", "Susi", "Gigi"];

  for (const row of rows) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${row}$`) })
        .first()
    ).toBeVisible();
  }
});
