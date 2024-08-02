import { test, expect } from "@playwright/test";
import {
  adminEmail,
  nurseEmail,
  doctorEmail,
  labEmail,
  apotekerEmail,
  kasirEmail,
  password,
} from "../helper/auth";

test.describe("Auth", () => {
  test.use({ storageState: "initialSetup.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/Login");
  });

  test("Login admin with valid credentials", async ({ page }) => {
    await page.waitForSelector("input", { state: "visible" });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(adminEmail);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByText("Dashboard Fasilitas Kesehatan").click();

    // Verifikasi bahwa halaman dashboard muncul
    await expect(page).toHaveURL("/MedicalFacilityDashboard");
    await expect(page.getByText("Dashboard Fasilitas Kesehatan")).toBeVisible();

    // Save state
    await page.context().storageState({ path: "tests/auth/roles/admin.json" });
  });

  test("Login nurse with valid credentials", async ({ page }) => {
    // test.setTimeout(120000);
    await page.waitForSelector("input", { state: "visible" });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(nurseEmail);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByText("Dashboard Fasilitas Kesehatan").click();

    await expect(page.getByText("Dashboard Fasilitas Kesehatan")).toBeVisible();

    await page.context().storageState({ path: "tests/auth/roles/nurse.json" });
  });

  test("Login doctor with valid credentials", async ({ page }) => {
    // test.setTimeout(120000);
    await page.waitForSelector("input", { state: "visible" });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(doctorEmail);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Dashboard Pemilik/Penanggung")).toBeVisible();

    await page.context().storageState({ path: "tests/auth/roles/doctor.json" });
  });

  test("Login lab with valid credentials", async ({ page }) => {
    // test.setTimeout(120000);
    await page.waitForSelector("input", { state: "visible" });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(labEmail);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Laboratorium")).toBeVisible();

    await page.context().storageState({ path: "tests/auth/roles/lab.json" });
  });

  test("Login apoteker with valid credentials", async ({ page }) => {
    // test.setTimeout(120000);
    await page.waitForSelector("input", { state: "visible" });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(apotekerEmail);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Apoteker Klinik")).toBeVisible();

    await page
      .context()
      .storageState({ path: "tests/auth/roles/apoteker.json" });
  });

  test("Login cashier with valid credentials", async ({ page }) => {
    // test.setTimeout(120000);
    await page.waitForSelector("input", { state: "visible" });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(kasirEmail);
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Kasir Test")).toBeVisible();

    await page
      .context()
      .storageState({ path: "tests/auth/roles/cashier.json" });
  });
});
