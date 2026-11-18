import styles from "./EcranMobile.module.css";

export default function EcranMobile({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <section className={styles.screen}>{children}</section>
    </div>
  );
}
