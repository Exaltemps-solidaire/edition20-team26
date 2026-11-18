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

  await test.step("J'ouvre la fiche donateur Silver : aucun appel à don avant J+60", async () => {
    await page.getByText("Parcours 1 · Silver").click();
    await expect(page.getByText("Sophie Renard")).toBeVisible();
    await expect(page.getByText("0 appel à don avant J+60")).toBeVisible();
    await expect(page.getByText("Appel à don · J+61")).toBeVisible();
  });

  await test.step("Je reviens, puis j'ouvre la fiche Fidèles : bascule automatique depuis Silver", async () => {
    await page.getByText("← Retour aux parcours").click();
    await page.getByText("Parcours 4 · Fidèles").click();
    await expect(page.getByText("Thomas Girard")).toBeVisible();
    await expect(page.getByText("0 intervention de la responsable collecte.")).toBeVisible();
  });
});
