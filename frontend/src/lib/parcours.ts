// Règle d'affectation reprise du prototype retenu (passation/prototype/index.html, écran "CRM · Cycles & scoring") :
// la fréquence du don prime (mensuel → Fidèles), l'inactivité prime sur tout, sinon le score RFM décide.

export type Cycle = "accueil" | "prelevement" | "reactivation";

export type Frequence = "mensuel" | "annuel" | "irregulier";

export type Parcours = {
  id: number;
  label: string;
  seuil: string;
  cycle: Cycle;
};

export const PARCOURS: Parcours[] = [
  { id: 1, label: "Parcours 1 · Silver", seuil: "10 points RFM", cycle: "accueil" },
  { id: 2, label: "Parcours 2 · Gold", seuil: "20 points RFM", cycle: "accueil" },
  { id: 3, label: "Parcours 3 · Platine", seuil: "30 points RFM", cycle: "accueil" },
  { id: 4, label: "Parcours 4 · Fidèles", seuil: "Don mensuel (prélèvement auto)", cycle: "prelevement" },
  { id: 5, label: "Parcours 5 · À réengager", seuil: "Variable", cycle: "reactivation" },
  { id: 6, label: "Parcours 6 · Inactifs", seuil: "≥ 13 mois sans don", cycle: "reactivation" },
];

export function assignerParcours(
  frequence: Frequence,
  moisSansDon: number,
  scoreRfm: number,
): number {
  if (moisSansDon >= 42) return 6;
  if (moisSansDon >= 13) return 5;
  if (frequence === "mensuel") return 4;
  if (scoreRfm >= 30) return 3;
  if (scoreRfm >= 20) return 2;
  return 1;
}
