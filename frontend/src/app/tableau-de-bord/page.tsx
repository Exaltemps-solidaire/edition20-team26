import Link from "next/link";
import styles from "./page.module.css";
import EcranMobile from "@/components/EcranMobile";
import { detailsConflits, detecterDoublons, ENVOIS_SEMAINE, type Source } from "@/lib/coordination";

const DOT_CLASSE: Record<Source, string> = {
  collecte: styles.dotCollecte,
  communication: styles.dotCommunication,
  evenements: styles.dotEvenements,
};

const LEGEND_LABEL: Record<Source, string> = {
  collecte: "Collecte",
  communication: "Communication",
  evenements: "Événements",
};

type Kpi = { valeur: string; label: string; sousTitre: string; accent?: boolean };

const KPIS: Kpi[] = [
  { valeur: "38 %", label: "Taux d'ouverture moyen", sousTitre: "Cycle Accueil · J+14" },
  { valeur: "12 %", label: "Taux de clic", sousTitre: "Email « impact don »" },
  { valeur: "1,4 %", label: "Taux de désabonnement", sousTitre: "Cycle Réactivation P6", accent: true },
  { valeur: "24 K€", label: "Collecté · CFA prévisionnelle", sousTitre: "Campagne déc. 2026" },
];

export default function TableauDeBord() {
  const doublons = detecterDoublons(ENVOIS_SEMAINE);
  const conflits = detailsConflits(ENVOIS_SEMAINE);

  return (
    <EcranMobile>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Tableau de bord · Coordination</div>
        <div className={styles.headerSub}>Semaine du 10 nov. 2026 · Temps réel</div>
      </div>

      {conflits.map((conflit) => (
        <div className={styles.alerte} key={conflit.cible}>
          <div className={styles.alerteTitle}>⚠️ Conflit détecté cette semaine</div>
          <div className={styles.alerteText}>
            Des donateurs du cycle {conflit.cible} sont ciblés simultanément par un envoi{" "}
            {conflit.sources.map((source) => LEGEND_LABEL[source]).join(" ET un envoi ")}. Le CRM
            bloque l&apos;envoi en doublon et alerte les équipes concernées.
          </div>
        </div>
      ))}

      <div className={styles.sectionLabel}>📊 Indicateurs clés – Nov. 2026</div>
      <div className={styles.kpiGrid}>
        {KPIS.map((kpi) => (
          <div className={styles.kpiCard} key={kpi.label}>
            <div className={`${styles.kpiVal} ${kpi.accent ? styles.kpiValAccent : ""}`}>
              {kpi.valeur}
            </div>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiSub}>{kpi.sousTitre}</div>
          </div>
        ))}
      </div>

      <div className={styles.sectionLabel}>🛡️ Plafond de pression – Semaine en cours</div>
      <div className={styles.pression}>
        <div className={styles.pressionRegle}>
          Règle : max 1 email par donateur par semaine, toutes sources confondues
        </div>
        <div className={styles.pressionStats}>
          <div className={styles.pressionStat}>
            <div className={styles.pressionValeur}>47 642</div>
            <div className={styles.pressionLabel}>Donateurs actifs</div>
          </div>
          <div className={styles.pressionStat}>
            <div className={`${styles.pressionValeur} ${styles.pressionValeurAlerte}`}>
              {conflits.length}
            </div>
            <div className={styles.pressionLabel}>
              Conflit{conflits.length > 1 ? "s" : ""} bloqué{conflits.length > 1 ? "s" : ""} cette semaine
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionLabel}>📅 Envois prévus · Semaine du 10 nov.</div>

      <div className={styles.legend}>
        {(Object.keys(LEGEND_LABEL) as Source[]).map((source) => (
          <div className={styles.legendItem} key={source}>
            <div className={`${styles.legendDot} ${DOT_CLASSE[source]}`} />
            {LEGEND_LABEL[source]}
          </div>
        ))}
      </div>

      {ENVOIS_SEMAINE.map((envoi) => {
        const enConflit = doublons.has(envoi.id);
        return (
          <div
            key={envoi.id}
            className={`${styles.envoiRow} ${enConflit ? styles.envoiRowConflit : ""}`}
          >
            <div className={`${styles.legendDot} ${DOT_CLASSE[envoi.source]}`} />
            <div className={styles.envoiLabel}>{envoi.label}</div>
            <div className={styles.envoiDate}>{envoi.date}</div>
            {enConflit && <div className={styles.envoiConflit}>⚠️ Doublon</div>}
          </div>
        );
      })}

      <Link href="/" className={styles.btnPrimary}>
        ← Retour aux cycles
      </Link>
    </EcranMobile>
  );
}
