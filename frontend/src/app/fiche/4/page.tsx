import Link from "next/link";
import styles from "./page.module.css";
import { CYCLE_FIDELES, DONATEUR_FIDELES, basculementAutomatique } from "@/lib/cycleFideles";

const DOT_CLASSE = { envoye: styles.tlDotSent, planifie: styles.tlDotPlanned };
const DOT_ICONE = { envoye: "✓", planifie: "◷" };
const TAG_CLASSE = { envoye: styles.tlTagSent, planifie: styles.tlTagPlanned };
const TAG_LABEL = { envoye: "Envoyé", planifie: "Anniversaire auto" };

export default function FicheDonateurFideles() {
  // Thomas était en Parcours 1 Silver, passé au prélèvement mensuel.
  const basculeAuto = basculementAutomatique(1, "mensuel");

  return (
    <div className={styles.page}>
      <section className={styles.screen}>
        <div className={styles.detailHeader}>
          <Link href="/" className={styles.backBtn}>
            ← Retour aux cycles
          </Link>
          <div className={styles.detailName}>{DONATEUR_FIDELES.nom}</div>
          <div className={styles.detailPorte}>{DONATEUR_FIDELES.porteEntree}</div>
          <div className={styles.scoreRow}>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Score RFM</div>
              <div className={styles.val}>{DONATEUR_FIDELES.scoreRfm}</div>
            </div>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Don mensuel</div>
              <div className={styles.val}>{DONATEUR_FIDELES.donMensuel}</div>
            </div>
            <div className={styles.scorePill}>
              <div className={styles.lbl}>Fidélité</div>
              <div className={styles.val}>{DONATEUR_FIDELES.fidelite}</div>
            </div>
          </div>
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.cycleBadge}>💙 Cycle Fidèles · Prélèvement automatique</span>
          <span className={styles.autoTag}>⚡ Basculement automatique depuis Parcours 1</span>
        </div>
        <div className={styles.note}>
          Pression très légère · 1–2 appels à don max sur 12 mois · priorité au contenu impact
        </div>

        {basculeAuto && (
          <div className={styles.transitionBox}>
            <div className={styles.transitionTitle}>⚡ Transition automatique détectée</div>
            <div className={styles.transitionText}>
              Thomas était en Parcours 1 Silver. Dès activation du prélèvement (5 janv. 2026), le CRM l&apos;a basculé
              en Cycle Fidèles sans aucune action manuelle.{" "}
              <strong>0 intervention de la responsable collecte.</strong>
            </div>
          </div>
        )}

        <div className={styles.timeline}>
          {CYCLE_FIDELES.map((envoi) => (
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
