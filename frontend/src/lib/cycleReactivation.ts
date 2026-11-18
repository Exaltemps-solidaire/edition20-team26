// Cycles de réactivation (Parcours 5 et 6), repris du prototype retenu
// (passation/prototype/index.html, écrans "Fiche donateur · Parcours 5/6").
// Hypothèse de l'équipe : chaque profil reçoit un nombre d'envois distinct sur 12 mois.

export type ProfilPression = "fideles" | "reactivation5" | "reactivation6";

export const PLAFOND_ENVOIS_PAR_AN: Record<ProfilPression, number> = {
  fideles: 2,
  reactivation5: 6,
  reactivation6: 5,
};

export function plafondsDistincts(a: ProfilPression, b: ProfilPression): boolean {
  return PLAFOND_ENVOIS_PAR_AN[a] !== PLAFOND_ENVOIS_PAR_AN[b];
}

export type EnvoiReactivation = {
  date: string;
  titre: string;
  description: string;
  type: "envoye" | "appel";
};

export const DONATEUR_P5 = {
  nom: "Nathalie Dupont",
  porteEntree: "📅 Dernier don : févr. 2025 · 14 mois d'inactivité",
  recence: "14 m",
  frequence: "4 dons",
  montant: "340 €",
};

export const CYCLE_P5: EnvoiReactivation[] = [
  {
    date: "Févr. 2026 · 12 mois après",
    titre: "Email anniversaire du dernier don",
    description: "« Il y a un an, vous avez soutenu la recherche. » — ton chaleureux, sans pression.",
    type: "envoye",
  },
  {
    date: "Avr. 2026 · 14 mois",
    titre: "Ce que la recherche a accompli grâce à vous",
    description: "Résultats Fight Kids Cancer · newsletter éditoriale sans appel à don.",
    type: "envoye",
  },
  {
    date: "Juin 2026",
    titre: "1er appel à réactivation",
    description: "« Vous avez déjà choisi la recherche. Prêt·e à recommencer ? » — ton doux, 1 seul envoi ce semestre.",
    type: "appel",
  },
];
