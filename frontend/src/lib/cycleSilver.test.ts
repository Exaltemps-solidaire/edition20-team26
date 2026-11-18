import { describe, expect, it } from "vitest";
import { aucunAppelAvantJ60, CYCLE_SILVER, type Envoi } from "./cycleSilver";

describe("aucunAppelAvantJ60", () => {
  it("est vrai pour le cycle Silver du prototype (appel à don à J+61)", () => {
    expect(aucunAppelAvantJ60(CYCLE_SILVER)).toBe(true);
  });

  it("est faux dès qu'un appel à don est daté avant J+60", () => {
    const envois: Envoi[] = [
      { jour: 0, date: "J+0", titre: "Bienvenue", description: "", type: "envoye" },
      { jour: 45, date: "J+45", titre: "Appel prématuré", description: "", type: "appel" },
    ];
    expect(aucunAppelAvantJ60(envois)).toBe(false);
  });
});
