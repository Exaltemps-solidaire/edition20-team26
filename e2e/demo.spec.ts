import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois les 6 parcours du CRM, et le nouveau donateur affecté", async () => {
    await expect(page.getByText("Parcours 1 · Silver")).toBeVisible();
    await expect(page.getByText("Parcours 6 · Inactifs")).toBeVisible();
    await expect(page.getByText("✓ Nouveau donateur affecté")).toBeVisible();
  });
});
