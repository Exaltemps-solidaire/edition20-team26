"use client";

import { useState } from "react";
import styles from "./RoleSwitcher.module.css";

const ROLES = [
  "Responsable collecte et partenariats",
  "Responsable communication",
] as const;

export default function RoleSwitcher() {
  const [role, setRole] = useState<string>(ROLES[0]);

  return (
    <label className={styles.switcher}>
      <span className={styles.label}>Vous êtes</span>
      <select
        className={styles.select}
        value={role}
        onChange={(event) => setRole(event.target.value)}
      >
        {ROLES.map((nom) => (
          <option key={nom} value={nom}>
            {nom}
          </option>
        ))}
      </select>
    </label>
  );
}
