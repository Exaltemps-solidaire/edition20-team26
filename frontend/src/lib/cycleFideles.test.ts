import { describe, expect, it } from "vitest";
import { basculementAutomatique } from "./cycleFideles";

describe("basculementAutomatique", () => {
  it("détecte la bascule automatique d'un ex-Silver qui passe au prélèvement mensuel", () => {
    expect(basculementAutomatique(1, "mensuel")).toBe(true);
  });

  it("ne détecte aucune bascule pour un donateur déjà en Parcours 4", () => {
    expect(basculementAutomatique(4, "mensuel")).toBe(false);
  });

  it("ne détecte aucune bascule tant que le don reste irrégulier", () => {
    expect(basculementAutomatique(1, "irregulier")).toBe(false);
  });
});
