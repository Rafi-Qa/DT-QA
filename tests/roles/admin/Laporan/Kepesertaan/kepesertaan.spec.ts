import { test, expect } from "@playwright/test";

test.describe("Admin can access and see report Kepesertaan", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("networkidle");
  });

  // !Positive scenarios
  test("Admin can see the entire list of participants' ages.", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("#dv_81001 a").click();
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Lihat" }).click();
    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible();
  });
  //! Positive scenarios
  test("admin wants to see all participants based on their age range", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("#dv_81001 a").click();

    await page.waitForSelector("role=checkbox", {
      state: "visible",
    });

    // TUNGGU SAMPAI INPUT AGE DISABLE KARENA SAAT LOAD PERTAMA KALI INPUT AGE TIDAK DISABLE
    await page.waitForFunction(
      () => {
        const spinbutton = document.querySelector(
          '[role="spinbutton"]:nth-of-type(1)'
        ) as HTMLInputElement;
        return spinbutton && spinbutton.disabled;
      },
      { timeout: 10000 }
    );

    const checkbox = await page.getByRole("checkbox");

    await expect(checkbox).toBeEnabled();
    await checkbox.uncheck();

    await page.getByRole("spinbutton").nth(1).fill("20");
    await page.getByRole("button", { name: "Lihat" }).click();

    // Asserts

    await page.waitForSelector(
      'text="Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin"'
    );
    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible();
    await page.waitForTimeout(3000);
    await expect(page.getByText("Usia: 0 - 20 tahun")).toBeVisible();
  });
  // !Negatif scenarios
  test("Admin Does Not Input Age and the Input Defaults to 0", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("#dv_81001 a").click();

    await page.waitForSelector("role=checkbox", {
      state: "visible",
    });

    // TUNGGU SAMPAI INPUT AGE DISABLE KARENA SAAT LOAD PERTAMA KALI INPUT AGE TIDAK DISABLE
    await page.waitForFunction(
      () => {
        const spinbutton = document.querySelector(
          '[role="spinbutton"]:nth-of-type(1)'
        ) as HTMLInputElement;
        return spinbutton && spinbutton.disabled;
      },
      { timeout: 5000 }
    );
    const checkbox = await page.getByRole("checkbox");

    await expect(checkbox).toBeEnabled();
    await checkbox.uncheck();

    await page.waitForSelector("role=spinbutton", { state: "attached" });
    await page.getByRole("spinbutton").first().fill("");
    await page.getByRole("spinbutton").nth(1).fill("");
    await page.getByRole("button", { name: "Lihat" }).click();

    await expect(page.getByRole("spinbutton").first()).toHaveValue("0");
    await expect(page.getByRole("spinbutton").nth(1)).toHaveValue("0");

    // Asserts
    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible({ visible: true, timeout: 5000 });
    await expect(page.getByText("Usia: 0 - 0 tahun")).toBeVisible({
      timeout: 10000,
    });
  });
});
