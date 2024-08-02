import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("Admin can access and see report rujukan BPJS", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Rujukan BPJS Kesehatan" }).click();
  await expect(
    page.getByRole("heading", { name: "Rujukan BPJS Kesehatan" })
  ).toBeVisible();
  await page.locator("button:near(.k-input-inner)").nth(1).click();
  await page.getByRole("button", { name: "June" }).click();
  await page.getByRole("button", { name: "2024" }).click();
  await page.getByText("2023", { exact: true }).click();
  await page.getByText("Jan").click();
  await page.getByLabel("Sunday, January 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Rujukan BPJS Kesehatan")).toBeVisible();
  await page.waitForTimeout(3000);
  await expect(
    page.getByText("Periode: 01-01-2023 s/d 30-06-2024")
  ).toBeVisible();

  const headers = [
    "Tanggal Kunjungan",
    "Nama Pasien",
    "Nama Dokter",
    "Diagnosis",
    "Spesialis",
    "Rumah Sakit",
    "Khusus",
    "Nama Khusus",
    "TACC",
    "Alasan TACC",
    "Tanggal Estimasi",
  ];
  for (const header of headers) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${header}$`) })
        .first()
    ).toBeVisible();
  }

  const rows = ["04/06/2024", "agus suproni", "R51-Headache", "Penyakit Dalam"];

  for (const row of rows) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${row}$`) })
        .first()
    ).toBeVisible();
  }
});
