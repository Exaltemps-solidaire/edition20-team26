import Link from "next/link";
import styles from "./page.module.css";
import { CYCLE_SILVER, DONATEUR_SILVER, aucunAppelAvantJ60, type TypeEnvoi } from "@/lib/cycleSilver";

const DOT_CLASSE: Record<TypeEnvoi, string> = {
  envoye: styles.tlDotSent,
  planifie: styles.tlDotPlanned,
  appel: styles.tlDotPlanned,
};

const DOT_ICONE: Record<TypeEnvoi, string> = {
  envoye: "✓",
  planifie: "◷",
  appel: "◷",
};

const TAG_CLASSE: Record<TypeEnvoi, string> = {
  envoye: styles.tlTagSent,
  planifie: styles.tlTagPlanned,
  appel: styles.tlTagAppel,
};

export default function FicheDonateurSilver() {
  const cycleRespecte = aucunAppelAvantJ60(CYCLE_SILVER);

  return (
    <div className={styles.page}>
      <section className={styles.screen}>
        <div className={styles.detailHeader}>
          <Link href="/" className={styles.backBtn}>
            ← Retour aux cycles
          </Link>
          <div className={styles.detailName}>{DONATEUR_SILVER.nom}</div>
          <div className={styles.detailPorte}>{DONATEUR_SILVER.porteEntree}</div>
          <div className={styles.scoreRow}>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Score RFM</div>
              <div className={styles.val}>{DONATEUR_SILVER.scoreRfm}</div>
            </div>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Montant</div>
              <div className={styles.val}>{DONATEUR_SILVER.montant}</div>
            </div>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Fréquence</div>
              <div className={styles.val}>{DONATEUR_SILVER.frequence}</div>
            </div>
          </div>
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.cycleBadge}>🌱 Cycle Accueil · Parcours 1 Silver</span>
          <span className={styles.autoTag}>⚡ Affecté automatiquement</span>
        </div>
        <div className={styles.note}>
          Pression légère · {cycleRespecte ? "0 appel à don avant J+60" : "⚠ appel à don avant J+60"} · 2–3 mois
          d&apos;accueil
        </div>

        <div className={styles.timeline}>
          {CYCLE_SILVER.map((envoi) => (
            <div className={styles.tlItem} key={envoi.date}>
              <div className={`${styles.tlDot} ${DOT_CLASSE[envoi.type]}`}>{DOT_ICONE[envoi.type]}</div>
              <div className={styles.tlBody}>
                <div className={styles.tlDate}>{envoi.date}</div>
                <div className={styles.tlTitle}>{envoi.titre}</div>
                <div className={styles.tlDesc}>{envoi.description}</div>
                <span className={`${styles.tlTag} ${TAG_CLASSE[envoi.type]}`}>
                  {envoi.type === "envoye" && "Envoyé"}
                  {envoi.type === "planifie" && "Planifié"}
                  {envoi.type === "appel" && `Appel à don · J+${envoi.jour}`}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link href="/" className={styles.btnSecondary}>
          ← Retour aux parcours
        </Link>
      </section>
    </div>
  );
}
