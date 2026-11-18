// Tableau de bord coordination, repris du prototype retenu
// (passation/prototype/index.html, écran "Tableau de bord · Coordination").
// Hypothèse de l'équipe : un donateur ne doit pas recevoir d'envois de deux sources
// différentes la même semaine sans que les équipes s'en rendent compte.

export type Source = "collecte" | "communication" | "evenements";

export type EnvoiPlanifie = {
  id: string;
  label: string;
  source: Source;
  cible: string;
  date: string;
  semaine: string;
};

const SEMAINE_DU_10_NOV = "2026-S46";

export const ENVOIS_SEMAINE: EnvoiPlanifie[] = [
  {
    id: "e1",
    source: "collecte",
    cible: "Parcours 2 · Gold",
    label: "Email anniversaire don · Parcours 2 Gold · 1 240 dest.",
    date: "Lun. 10",
    semaine: SEMAINE_DU_10_NOV,
  },
  {
    id: "e2",
    source: "communication",
    cible: "Parcours 6 · Inactifs",
    label: "Newsletter Septembre en or · suite · 12 000 dest.",
    date: "Mar. 11",
    semaine: SEMAINE_DU_10_NOV,
  },
  {
    id: "e3",
    source: "evenements",
    cible: "Parcours 1 · Accueil",
    label: "Résultats course ESCC · coureurs + donateurs",
    date: "Mer. 12",
    semaine: SEMAINE_DU_10_NOV,
  },
  {
    id: "e4",
    source: "communication",
    cible: "Parcours 1 · Accueil",
    label: "« Ce que votre don permet » · nouveaux donateurs course · 1 240 dest.",
    date: "Mer. 12",
    semaine: SEMAINE_DU_10_NOV,
  },
  {
    id: "e5",
    source: "collecte",
    cible: "Parcours 5 · Réactivation",
    label: "CFA · Cycle Réactivation P5 · 3 500 dest.",
    date: "Ven. 14",
    semaine: SEMAINE_DU_10_NOV,
  },
];

function cleGroupe(envoi: EnvoiPlanifie): string {
  return `${envoi.cible}::${envoi.semaine}`;
}

function grouperParCibleEtSemaine(envois: EnvoiPlanifie[]): Map<string, EnvoiPlanifie[]> {
  const groupes = new Map<string, EnvoiPlanifie[]>();
  for (const envoi of envois) {
    const cle = cleGroupe(envoi);
    const groupe = groupes.get(cle) ?? [];
    groupe.push(envoi);
    groupes.set(cle, groupe);
  }
  return groupes;
}

// Un envoi est en doublon si une autre équipe cible le même profil la même semaine,
// depuis une source différente — qu'il bloque, le CRM l'alerte aux deux équipes.
export function detecterDoublons(envois: EnvoiPlanifie[]): Set<string> {
  const doublons = new Set<string>();
  for (const groupe of grouperParCibleEtSemaine(envois).values()) {
    const sources = new Set(groupe.map((envoi) => envoi.source));
    if (sources.size > 1) {
      groupe.forEach((envoi) => doublons.add(envoi.id));
    }
  }
  return doublons;
}

export type ConflitCoordination = { cible: string; sources: Source[] };

// Détail des conflits, pour construire un message d'alerte qui reflète les données réelles
// plutôt qu'un texte figé.
export function detailsConflits(envois: EnvoiPlanifie[]): ConflitCoordination[] {
  const conflits: ConflitCoordination[] = [];
  for (const groupe of grouperParCibleEtSemaine(envois).values()) {
    const sources = [...new Set(groupe.map((envoi) => envoi.source))];
    if (sources.length > 1) {
      conflits.push({ cible: groupe[0].cible, sources });
    }
  }
  return conflits;
}
