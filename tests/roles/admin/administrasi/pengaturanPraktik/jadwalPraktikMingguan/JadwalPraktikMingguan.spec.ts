import { test, expect } from "@playwright/test";

test.describe("Jadwal Praktik Mingguan", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("load");
    await page.reload();
  });

  test("admin can't add schedule weekly without input form", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Mingguan" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Mingguan" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByRole("button", { name: "Jadwal" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Gagal menambahkan Jadwal")).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
  });

  test("admin can add schedule weekly", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Mingguan" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Mingguan" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByLabel("Open").first().click();
    await page.getByRole("option", { name: "​ POLI K I A" }).click();
    await page.getByLabel("Open").nth(1).click();
    await page.getByRole("option", { name: "​ Ario" }).click();
    await page.getByRole("button", { name: "Jadwal" }).click();
    await page
      .getByRole("gridcell", { name: "Open", exact: true })
      .getByLabel("Open")
      .click();
    await page.getByRole("option", { name: "​ Senin" }).click();
    await page
      .getByRole("row", { name: "Senin Open 12:00 AM Open 12:" })
      .getByLabel("Open")
      .nth(1)
      .click();
    await page.locator("li:nth-child(2)").first().click();
    await page.getByRole("button", { name: "Set", exact: true }).click();
    await page.getByLabel("Increase value").click({ clickCount: 5 });
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Data Berhasil Disimpan")).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await expect(
      page.getByRole("gridcell", { name: "POLI K I A" })
    ).toBeVisible();
    await expect(page.getByRole("gridcell", { name: "Ario" })).toBeVisible();
  });

  test("admin can edit schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Mingguan" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Mingguan" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page.getByRole("button", { name: "Ubah" }).nth(4).click();
    await page
      .locator("form div")
      .filter({ hasText: "Dokter Ario" })
      .getByLabel("Open")
      .click();
    await page
      .locator('[id="\\38 34383f7-d340-4fdb-aab7-1189162a2d19"]')
      .click();
    await page.getByRole("option", { name: "â€‹ Selasa" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Data Berhasil Disimpan")).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
    await expect(page.getByRole("gridcell", { name: "Tuesday" })).toBeVisible();
  });

  test("admin can delete schedule", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: "Jadwal Praktik Mingguan" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Jadwal Praktik Mingguan" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page.getByRole("button", { name: "Hapus" }).nth(4).click();
    await expect(
      page.getByText("Apakah Anda ingin menghapus Jadwal Praktik Mingguan")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
    await expect(
      page.getByText("Jadwal Praktik Mingguan berhasil dihapus.")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK", exact: true }).click();
  });
});
