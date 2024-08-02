import { test, expect } from "@playwright/test";
//! Belum selesai
test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
  await page.getByRole("button", { name: "Laporan" }).click();
  await page
    .locator("a")
    .filter({ hasText: /^Komisi Nakes$/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Komisi Nakes" })
  ).toBeVisible();
});

test("admin can't see report wihout choosing personel & bearer of cost or one of them", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Gagal menampilkan Report")).toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
});

test("admin can see report komisi nakes", async ({ page }) => {
  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });
  const button = await page.locator("button:near(.k-input-inner)").nth(0);
  await expect(button).toBeVisible();
  await button.click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await page.getByRole("combobox").nth(2).fill("dr");
  await page.getByRole("option", { name: "dr. Susi" }).click();

  await page.getByPlaceholder("Semua Penanggung Biaya").click();
  await page.getByRole("option", { name: "Pribadi" }).click();
  await page.getByRole("option", { name: "JKN-KIS" }).click();

  //Assert
  await expect(page.getByText("LAPORAN KOMISI NAKES")).toBeVisible();
  await expect(page.getByText("Nama: dr. Susi")).toBeVisible();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(
    page.getByText("Periode: 1 Juli 2024 s/d 1 Agustus 2024")
  ).toBeVisible();

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
    await expect(page.getByText(header)).toBeVisible();
  }

  const rows = [
    "12",
    "25-Jul-2024",
    "RM-00012172",
    "Septu",
    "Pribadi",
    "Rp 180.000",
    "Rp 20.000",
    "Rp 14.000",
    "Rp 234.000",
  ];

  for (const row of rows) {
    await expect(page.getByText(row)).toBeVisible();
  }
});
