// Cycle d'accueil du Parcours 1 Silver, repris du prototype retenu
// (passation/prototype/index.html, écran "Fiche donateur · Parcours 1 Silver").
// Hypothèse de l'équipe : aucun appel à don n'est envoyé avant la fin du cycle (J+60).

export type TypeEnvoi = "envoye" | "planifie" | "appel";

export type Envoi = {
  jour: number;
  date: string;
  titre: string;
  description: string;
  type: TypeEnvoi;
};

export const DONATEUR_SILVER = {
  nom: "Sophie Renard",
  porteEntree: "🏃 Porte d'entrée : Course Enfants sans Cancer · don du 14 sept. 2026",
  scoreRfm: "10 pts",
  montant: "10 €",
  frequence: "1 don",
};

export const CYCLE_SILVER: Envoi[] = [
  {
    jour: 0,
    date: "14 sept. 2026 · J+0",
    titre: "Email de bienvenue + reçu fiscal",
    description: "« Merci Sophie, votre don de 10 € va permettre… » · Reçu fiscal joint automatiquement.",
    type: "envoye",
  },
  {
    jour: 14,
    date: "28 sept. 2026 · J+14",
    titre: "Ce que votre don a permis",
    description: "Résultats de recherche Fight Kids Cancer · Transparence financière label IDEAS.",
    type: "envoye",
  },
  {
    jour: 28,
    date: "12 oct. 2026 · J+28",
    titre: "Portrait d'un chercheur financé",
    description: "Contenu éditorial · Pas d'appel à don dans cet email.",
    type: "planifie",
  },
  {
    jour: 61,
    date: "14 nov. 2026 · J+61",
    titre: "Email anniversaire du don · 1er appel à second don",
    description: "« Il y a 2 mois, vous avez agi. Vous pouvez recommencer. » — 1er appel à don autorisé après J+60.",
    type: "appel",
  },
];

export function aucunAppelAvantJ60(envois: Envoi[]): boolean {
  return envois.every((envoi) => envoi.type !== "appel" || envoi.jour >= 60);
}
