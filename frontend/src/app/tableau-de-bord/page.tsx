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
