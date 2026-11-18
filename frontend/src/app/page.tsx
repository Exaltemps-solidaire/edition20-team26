import Link from "next/link";
import styles from "./page.module.css";
import RoleSwitcher from "@/components/RoleSwitcher";
import { PARCOURS, assignerParcours, type Cycle } from "@/lib/parcours";

// Seuls les Parcours 1 Silver, 4 Fidèles et 5 À réengager ont une fiche donateur pour l'instant.
const FICHES: Record<number, string> = { 1: "/fiche/1", 4: "/fiche/4", 5: "/fiche/5" };

const BADGE_CLASSE: Record<Cycle, string> = {
  accueil: styles.badgeAccueil,
  prelevement: styles.badgePrelevement,
  reactivation: styles.badgeReactivation,
};

const BADGE_LABEL: Record<Cycle, string> = {
  accueil: "Accueil",
  prelevement: "Prélèvement auto",
  reactivation: "Réactivation",
};

export default function Home() {
  // Nouveau donateur d'exemple : don ponctuel, score RFM faible, entré ce jour dans la base.
  const nouveauDonateurParcours = assignerParcours("irregulier", 0, 10);

  return (
    <div className={styles.page}>
      <section className={styles.screen}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>CRM · Imagine for Margo</div>
          <div className={styles.headerSub}>Cycles relationnels différenciés</div>
        </div>

        <RoleSwitcher />

        <div className={styles.sectionLabel}>🛤️ Les 6 parcours (cycles différenciés)</div>
        <div className={styles.parcoursList}>
          {PARCOURS.map((parcours) => {
            const estAssigne = parcours.id === nouveauDonateurParcours;
            const contenu = (
              <>
                <div className={styles.parcoursNum}>{parcours.id}</div>
                <div>
                  <div className={styles.parcoursLabel}>{parcours.label}</div>
                  <div className={styles.parcoursSeuil}>{parcours.seuil}</div>
                  <span className={`${styles.badge} ${BADGE_CLASSE[parcours.cycle]}`}>
                    {BADGE_LABEL[parcours.cycle]}
                  </span>
                </div>
                {estAssigne && (
                  <span className={styles.affecteTag}>✓ Nouveau donateur affecté</span>
                )}
              </>
            );
            const classeItem = `${styles.parcoursItem} ${estAssigne ? styles.assigne : ""}`;
            const fiche = FICHES[parcours.id];
            return fiche ? (
              <Link key={parcours.id} href={fiche} className={classeItem}>
                {contenu}
              </Link>
            ) : (
              <div key={parcours.id} className={classeItem}>
                {contenu}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
