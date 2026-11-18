import Link from "next/link";
import styles from "./page.module.css";
import { CYCLE_P5, DONATEUR_P5, PLAFOND_ENVOIS_PAR_AN, plafondsDistincts } from "@/lib/cycleReactivation";

const DOT_CLASSE = { envoye: styles.tlDotSent, appel: styles.tlDotPlanned };
const DOT_ICONE = { envoye: "✓", appel: "◷" };
const TAG_CLASSE = { envoye: styles.tlTagSent, appel: styles.tlTagAppel };
const TAG_LABEL = { envoye: "Envoyé", appel: "Appel à don doux" };

export default function FicheDonateurReengager() {
  const distinctDeFideles = plafondsDistincts("reactivation5", "fideles");

  return (
    <div className={styles.page}>
      <section className={styles.screen}>
        <div className={styles.detailHeader}>
          <Link href="/" className={styles.backBtn}>
            ← Retour aux cycles
          </Link>
          <div className={styles.detailName}>{DONATEUR_P5.nom}</div>
          <div className={styles.detailPorte}>{DONATEUR_P5.porteEntree}</div>
          <div className={styles.scoreRow}>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Récence</div>
              <div className={styles.val}>{DONATEUR_P5.recence}</div>
            </div>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Fréquence</div>
              <div className={styles.val}>{DONATEUR_P5.frequence}</div>
            </div>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Montant</div>
              <div className={styles.val}>{DONATEUR_P5.montant}</div>
            </div>
          </div>
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.cycleBadge}>🔄 Cycle Réactivation · Parcours 5</span>
          <span className={styles.autoTag}>⚡ Basculement auto à 13 mois</span>
        </div>
        <div className={styles.note}>
          5 à 6 envois sur 12 mois · ton de retour, pas de pression · jamais 9 emails en 6 semaines
        </div>

        {distinctDeFideles && (
          <div className={styles.plafond}>
            Plafond : {PLAFOND_ENVOIS_PAR_AN.reactivation5} envois/an — distinct de Fidèles (
            {PLAFOND_ENVOIS_PAR_AN.fideles} envois/an)
          </div>
        )}

        <div className={styles.timeline}>
          {CYCLE_P5.map((envoi) => (
            <div className={styles.tlItem} key={envoi.date}>
              <div className={`${styles.tlDot} ${DOT_CLASSE[envoi.type]}`}>{DOT_ICONE[envoi.type]}</div>
              <div className={styles.tlBody}>
                <div className={styles.tlDate}>{envoi.date}</div>
                <div className={styles.tlTitle}>{envoi.titre}</div>
                <div className={styles.tlDesc}>{envoi.description}</div>
                <span className={`${styles.tlTag} ${TAG_CLASSE[envoi.type]}`}>{TAG_LABEL[envoi.type]}</span>
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
