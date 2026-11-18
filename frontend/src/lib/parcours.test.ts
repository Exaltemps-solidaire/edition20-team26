import { describe, expect, it } from "vitest";
import { assignerParcours } from "./parcours";

describe("assignerParcours", () => {
  it("affecte un nouveau donateur irrégulier à faible score au Parcours 1 Silver", () => {
    expect(assignerParcours("irregulier", 0, 10)).toBe(1);
  });

  it("affecte un donateur mensuel actif au Parcours 4 Fidèles, même à score élevé", () => {
    expect(assignerParcours("mensuel", 2, 10)).toBe(4);
  });

  it("fait primer l'inactivité longue sur la fréquence et le score", () => {
    expect(assignerParcours("mensuel", 42, 40)).toBe(6);
    expect(assignerParcours("annuel", 13, 30)).toBe(5);
  });
});
