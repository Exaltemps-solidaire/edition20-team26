import { describe, expect, it } from "vitest";
import { detailsConflits, detecterDoublons, ENVOIS_SEMAINE, type EnvoiPlanifie } from "./coordination";

describe("detecterDoublons", () => {
  it("détecte le conflit Communication/Événements sur la même cible (Parcours 1 Accueil)", () => {
    const doublons = detecterDoublons(ENVOIS_SEMAINE);
    expect(doublons.has("e3")).toBe(true);
    expect(doublons.has("e4")).toBe(true);
  });

  it("ne signale pas les envois dont la cible n'est visée que par une seule source", () => {
    const doublons = detecterDoublons(ENVOIS_SEMAINE);
    expect(doublons.has("e1")).toBe(false);
    expect(doublons.has("e2")).toBe(false);
    expect(doublons.has("e5")).toBe(false);
  });

  it("ne signale rien quand deux envois ciblent la même audience depuis la même source", () => {
    const envois: EnvoiPlanifie[] = [
      { id: "a", source: "collecte", cible: "Parcours 1", label: "", date: "", semaine: "S1" },
      { id: "b", source: "collecte", cible: "Parcours 1", label: "", date: "", semaine: "S1" },
    ];
    expect(detecterDoublons(envois).size).toBe(0);
  });

  it("ne signale rien quand la même cible est visée par deux sources mais à des semaines différentes", () => {
    const envois: EnvoiPlanifie[] = [
      { id: "a", source: "collecte", cible: "Parcours 1", label: "", date: "", semaine: "S1" },
      { id: "b", source: "communication", cible: "Parcours 1", label: "", date: "", semaine: "S2" },
    ];
    expect(detecterDoublons(envois).size).toBe(0);
  });
});

describe("detailsConflits", () => {
  it("décrit le conflit réel (cible et sources) plutôt qu'un texte figé", () => {
    const conflits = detailsConflits(ENVOIS_SEMAINE);
    expect(conflits).toEqual([
      { cible: "Parcours 1 · Accueil", sources: ["evenements", "communication"] },
    ]);
  });
});
