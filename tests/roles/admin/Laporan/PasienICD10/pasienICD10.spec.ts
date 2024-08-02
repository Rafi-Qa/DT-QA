import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await expect(page).toHaveURL("/");
  await page.reload();

  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Pasien ICD10" }).click();
  await expect(
    page.getByRole("heading", { name: "Pasien ICD-10" })
  ).toBeVisible();
});

test("admin can access and see report pasien ICD10", async ({ page }) => {
  await page.waitForSelector("button:near(.k-input-inner):nth(0)", {
    state: "attached",
  });

  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "July" }).click();
  await page.getByText("Jan").click();
  await page.getByLabel("Monday, January 1,").getByText("1").click();
  await page.getByRole("combobox").nth(2).click();
  await page.getByRole("combobox").nth(2).fill("sa");
  await page.getByText("G44.2 - Tension-type headache").click();

  await expect(page.getByText("LAPORAN ICD-")).toBeVisible();
  await expect(
    page.getByText("Periode 1 Januari 2024 s/d 31 Juli 2024")
  ).toBeVisible();
  await expect(page.getByText("Kode Diagnosis: G44.2")).toBeVisible();

  const headers = [
    "No. RM",
    "Nik",
    "No. BPJS",
    "Nama Pasien",
    "Tgl. Lahir",
    "Alamat Domisili",
    "Tgl. Kunjungan",
    "Kode ICD-10",
    "Nama Diagnosis ICD-10",
    "Obat",
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
    "RM-0010711",
    "10711AKARSANATAM",
    "0002571408484",
    "AKARSANA TAMPUBOLON",
    "03-Apr-1969",
    "KOMPLEKS PERCOBAAN BLOK C/10711",
    "03-Jul-2024",
  ];
});

test("admin can't see report pasien ICD10 without select ICD-10", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Pasien ICD10" }).click();
  await expect(
    page.getByRole("heading", { name: "Pasien ICD-10" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("ICD-10 harus diisi")).toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
});
