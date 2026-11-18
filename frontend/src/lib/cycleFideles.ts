// Cycle Fidèles du Parcours 4, repris du prototype retenu
// (passation/prototype/index.html, écran "Fiche donateur · Parcours 4 Fidèles").
// Hypothèse de l'équipe : le changement de cycle (ponctuel → prélèvement) se déclenche
// sans action manuelle de la responsable collecte.

import { assignerParcours, type Frequence } from "./parcours";

export type EnvoiFideles = {
  date: string;
  titre: string;
  description: string;
  type: "envoye" | "planifie";
};

export const DONATEUR_FIDELES = {
  nom: "Thomas Girard",
  porteEntree: "💳 Prélèvement automatique depuis janv. 2026 · 2 € / mois",
  scoreRfm: "40 pts",
  donMensuel: "2 € /m",
  fidelite: "10 mois",
};

export const CYCLE_FIDELES: EnvoiFideles[] = [
  {
    date: "5 janv. 2026",
    titre: "Bienvenue dans le prélèvement",
    description: "Confirmation activation · merci · explication de l'impact mensuel.",
    type: "envoye",
  },
  {
    date: "Avr. 2026 · J+90",
    titre: "Bilan trimestriel : ce que vos dons font",
    description: "Résultats de recherche · ton chaleureux · aucun appel à don.",
    type: "envoye",
  },
  {
    date: "5 janv. 2027 · Anniversaire",
    titre: "Email anniversaire du don · 1 an de fidélité",
    description: "« Il y a un an, vous avez choisi de donner chaque mois. » — automatique, zéro action manuelle.",
    type: "planifie",
  },
];

// Vrai quand un donateur qui n'était pas déjà en Parcours 4 passe au prélèvement mensuel :
// le CRM le bascule seul en Cycle Fidèles, sans action manuelle de la responsable collecte.
export function basculementAutomatique(ancienParcoursId: number, frequenceActuelle: Frequence): boolean {
  return ancienParcoursId !== 4 && assignerParcours(frequenceActuelle, 0, 0) === 4;
}
