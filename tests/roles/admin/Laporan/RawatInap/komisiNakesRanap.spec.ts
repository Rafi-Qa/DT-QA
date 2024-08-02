import { test, expect } from "@playwright/test";
//! Tambahin Negative Case
test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await expect(page).toHaveURL("/");
  await page.reload();
});

test("admin can access and see report komisi nakes ranap", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.getByRole("button", { name: "Rawat Inap" }).click();
  await page
    .locator("a")
    .filter({ hasText: "Komisi Nakes Rawat Inap" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Komisi Nakes Rawat Inap" })
  ).toBeVisible();

  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });
  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "Go to the previous period" }).click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.getByRole("combobox").nth(2).click();
  await page.getByRole("combobox").nth(2).fill("dr");
  await page.getByRole("option", { name: "dr. Susi" }).click();
  await page.getByPlaceholder("Semua Penanggung Biaya").click();
  await page.getByRole("option", { name: "Pribadi" }).click();
  await page.getByText("JKN-KIS").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("LAPORAN KOMISI NAKES")).toBeVisible();
  await expect(page.getByText("Nama: dr. Susi")).toBeVisible();
  await expect(page.getByText("Periode: 1 Juli 2024 s/d 2024")).toBeVisible();

  const headers = [
    "No",
    "Tgl. Kunjungan",
    "No. RM",
    "Nama Pasien",
    "Penanggung Biaya",
    "Komisi Konsultasi",
    "Komisi Tindakan",
    "Komisi Pmr. Penunjang",
    "Komisi Surat",
    "Komisi Total",
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
    "2",
    "29-Jul-2024",
    "RM-00012358",
    "Rafi",
    "Pribadi",
    "Rp 240.000",
    "Rp 14.000",
    "Rp 254.000",
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
