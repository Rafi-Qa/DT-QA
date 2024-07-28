import { test, expect } from "@playwright/test";

test.describe.serial("Jadwal Praktik Harian", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("load");
    await page.reload();
  });

  test("admin can search schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();

    await page.locator("button:near(.k-input-inner)").nth(0).click();
    await page.getByText("Jul").click();
    await page.getByText("28").click();
    await page.getByRole("button", { name: "Cari" }).click();
    await expect(
      page.getByRole("gridcell", { name: "POLI UMUM" })
    ).toBeVisible();
  });

  test("admin can add schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Tambah" }).click();
    await page.locator("#rooms-select").getByLabel("Open").click();
    await page.getByRole("option", { name: "​ POLI GIGI" }).click();
    await page.getByLabel("Ya", { exact: true }).check();
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(
      page.getByText("Jadwal Praktik Harian berhasil ditambahkan.")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
    await expect(
      page.getByRole("gridcell", { name: "POLI GIGI" })
    ).toBeVisible();
  });

  test("admin can't add schedule without input form", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Ruangan should not be empty")).toBeVisible();
  });

  test("admin can edit schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Ubah" }).nth(3).click();
    await page.locator("#rooms-select").getByLabel("Open").click();
    await page.getByRole("option", { name: "​ POLI K I A" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(
      page.getByText("Jadwal Praktik Harian berhasil diperbarui.")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
    await expect(
      page.getByRole("gridcell", { name: "POLI K I A" })
    ).toBeVisible();
  });

  test("admin can non active schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Non-Aktifkan" }).nth(3).click();
  });
  test("admin can active schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Aktifkan" }).nth(3).click();
  });

  test("admin can finish schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Selesai", exact: true })
      .nth(3)
      .click();
    await expect(
      page.getByText("Apakah praktik dokter sudah selesai")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
    await expect(
      page.getByText("Praktik dokter berhasil diselesaikan")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
  });
  test("admin can finish schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Harian" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Harian" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Batal Selesai" }).first().click();
    await expect(page.getByText("Dokter kembali praktik?")).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
    await expect(
      page.getByText("Praktik dokter berhasil dibatalkan")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
  });
});
