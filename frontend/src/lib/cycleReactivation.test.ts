import { describe, expect, it } from "vitest";
import { plafondsDistincts } from "./cycleReactivation";

describe("plafondsDistincts", () => {
  it("distingue le plafond À réengager (6/an) de celui de Fidèles (2/an)", () => {
    expect(plafondsDistincts("fideles", "reactivation5")).toBe(true);
  });

  it("n'y a pas de différence entre un profil et lui-même", () => {
    expect(plafondsDistincts("reactivation5", "reactivation5")).toBe(false);
  });

  it("distingue le plafond Inactifs (5/an) de celui d'À réengager (6/an)", () => {
    expect(plafondsDistincts("reactivation6", "reactivation5")).toBe(true);
  });
});
