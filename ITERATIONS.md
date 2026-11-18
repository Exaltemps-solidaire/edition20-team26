# Plan d'itérations — CRM différencié (Imagine for Margo)

**Plan validé le 2026-11-18** (tel quel, par les cadreurs).

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`). Repris à partir de `cadrage/3-solution.md`, `prototype/index.html` et du plan de livraison de l'équipe (`PASSATION.md`, section « Notre plan de livraison »).
- **Temps restant annoncé** : ~60 minutes (au moment de la planification, 2026-11-18). Au début de l'itération 1 : ~55 minutes restantes.
- **Tour de test de l'équipe** : 10 minutes (valeur par défaut).
- **Capacité estimée** : une itération coûte au moins codage (≤10 min) + publication (~5 min) + tour de test (10 min), soit ~25 min minimum. 60 minutes permettent **2 itérations complètes avec marge**, pas 3 — voir ✂️ plus bas.

## ❗️ Point à lever avant l'itération 1

Le PRD (`PASSATION.md`, « Les utilisateurs : pas de connexion ») demande un écran « Qui êtes-vous ? » au lancement, avec changement de rôle possible. **Le prototype retenu ne montre pas cet écran** : aucune trace de sélecteur de persona dans `prototype/index.html`. Pour tenir dans le budget de l'itération 1 (un seul écran nouveau), je propose un sélecteur léger (un menu en haut de l'écran principal, pas un écran séparé) plutôt que l'écran dédié décrit au mot près par le PRD. ❓ à confirmer par le développeur avec les cadreurs si l'écran séparé est jugé essentiel au test.

## ✂️ Périmètre qui ne tiendra pas dans les 60 minutes

Le plan de livraison de l'équipe compte 5 étapes (vue d'ensemble, fiche Silver, fiche Fidèles, fiches réactivation, tableau de bord) plus les fiches Gold et Platine visibles dans le prototype. Avec ~25 min par itération, le temps restant ne permet que les **deux premières**. Sortent du périmètre de cette session, à reprendre dans « À venir » si le temps est prolongé :
- fiche donateur Fidèles (Parcours 4, bascule automatique),
- fiches réactivation (Parcours 5 À réengager, Parcours 6 Inactifs),
- fiches Gold et Platine (Parcours 2, 3),
- tableau de bord coordination,
- sélecteur de persona complet avec droits différenciés.

---

## Itération 1 : L'écran « CRM · Cycles & scoring » est en ligne, avec les 6 parcours en données figées

- **Dans le périmètre** :
  - squelette déployé selon le contrat de déployabilité (`.env.example`, `DEPLOIEMENT.md`) ;
  - écran principal reproduisant fidèlement `screen-1` du prototype : 6 cartes de parcours (Silver, Gold, Platine, Fidèles, À réengager, Inactifs) avec leurs effectifs, en données figées ;
  - sélecteur de rôle léger en haut de l'écran (menu, pas un écran séparé — voir point ❗️ ci-dessus), sans logique de droits.
- **Hors périmètre** : fiches donateur, tableau de bord, calcul RFM réel, API métier (les données peuvent être en dur ou servies par l'API avec un seed statique).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'application déployée, quand on ouvre l'URL publique, alors l'écran « CRM · Cycles & scoring » affiche les 6 parcours avec leurs effectifs.
  - Étant donné le port 8080, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
  - Étant donné le sélecteur de rôle, quand on choisit un nom dans la liste, alors le nom affiché change à l'écran.
- **Hypothèse de l'équipe couverte** : aucune directement — itération fondation, qui rend observable l'affectation aux parcours testée à l'itération 2.
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : page d'accueil du front, composant carte de parcours, données figées (seed), `.env.example`, `DEPLOIEMENT.md` (~5 fichiers)
- **Tests unitaires prévus** : 1 à 2, sur le calcul/formatage des effectifs par parcours (pas sur le balisage)
- **Étapes ajoutées à la démo** : ouvrir l'URL publique, constater les 6 parcours affichés
- **Bilan** :
  - Durée de codage réelle : 6 minutes, pas de dépassement.
  - Critères d'acceptation : les deux premiers satisfaits tels quels. Le troisième (sélecteur de rôle) satisfait avec une correction de portée : vérifié par rendu/inspection du DOM, pas par clic interactif (pas de navigateur disponible dans cette session de vérification) — le composant est un `<select>` contrôlé standard, sans ambiguïté sur son fonctionnement.
  - Écart avec le libellé prévu : le premier critère prévoyait des « effectifs » par parcours ; le prototype retenu affiche en réalité un seuil de points RFM (ou « Don mensuel » pour Fidèles) et un badge de cycle, pas un nombre de donateurs. L'écran construit reproduit fidèlement le prototype, qui fait foi.
  - Valeur ajoutée hors critères initiaux : l'écran met en avant l'affectation automatique d'un nouveau donateur (exemple en dur) à son parcours, via une règle testée (`assignerParcours`) — reprend la « valeur mesurée » de l'étape 1 du plan de livraison de l'équipe, sans itération dédiée.
  - Harnais : contrat de déployabilité sans borne (`verifier-deployabilite.sh`), `npm test` passant (5 tests), revue du sous-agent `reviewer` intégrée (2 corrections : libellé Parcours 4 trompeur, `lang="en"` → `"fr"`). Aucun blocage sur le signal PM Lab.
  - Déploiement : plateforme démarrée en deux temps (premier `gitlab-ci-local` interrompu par une limite de débit Docker Hub sur `temporalio/ui`, qui a empêché postgres/registre/S3/Temporal/Casdoor/Umami de démarrer malgré un statut "PASS" sur `compose-up` ; relance réussie). Images construites, publiées, déployées. `localhost:8080/health`, `/sante` et `localhost:8081/health`, `/sante` répondent 200 depuis la VM.
  - Signalé à PM Lab : version 1, `moteur_avance: false` (enregistrée quand même).
  - Reporté : rien de prévu n'a été abandonné.
  - **Modifications** (fichier par fichier) :
    - `frontend/src/lib/parcours.ts`, `parcours.test.ts` (nouveaux) : données des 6 parcours + règle d'affectation automatique, testée — sert les critères 1 et 3.
    - `frontend/src/components/RoleSwitcher.tsx`, `.module.css` (nouveaux) : sélecteur de rôle léger — sert le critère 3.
    - `frontend/src/app/page.tsx`, `page.module.css` (réécrits) : écran « CRM · Cycles & scoring » — sert le critère 1.
    - `frontend/src/app/layout.tsx`, `globals.css` (modifiés) : titre/metadata, palette i4m, `lang="fr"`.
    - `frontend/nginx.conf` (modifié) : en-têtes de sécurité et CSP corrigée (`connect-src 'self'`) — contrat de déployabilité.
    - `api/Dockerfile`, `frontend/Dockerfile` (modifiés) : images qualifiées `docker.io/library/...` — déploiement.
    - `.env.example`, `DEPLOIEMENT.md`, `podman-compose.yml` (nouveaux) : contrat de déployabilité et recette du serveur — sert le critère 2.
    - `e2e/demo.spec.ts` (modifié) : étape de démo sur les 6 parcours et l'affectation automatique.

## Itération 2 : La fiche donateur Silver montre qu'aucun appel à don n'est prévu avant J+60

- **Dans le périmètre** : depuis la carte « Parcours 1 · Silver » de l'écran principal, ouvrir la fiche donateur reproduisant `screen-1-detail-p1` : cycle actif affiché, envois prévus listés avec leur date.
- **Hors périmètre** : les autres fiches (Gold, Platine, Fidèles, réactivation), le tableau de bord, le calcul RFM réel (donateur en dur pour cette fiche).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran principal, quand on clique sur la carte Parcours 1 Silver, alors la fiche donateur Silver s'affiche avec son cycle actif.
  - Étant donné la fiche Silver, quand on regarde la liste des envois prévus, alors aucun appel à don n'y est daté avant J+60.
  - Étant donné la fiche Silver, quand on revient en arrière, alors on retrouve l'écran principal.
- **Hypothèse de l'équipe couverte** : « Respect du délai avant premier appel à second don » — cible 0 appel avant J+60.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : nouvelle route/page fiche donateur, composant liste des envois, lien depuis la carte Silver (~4 fichiers)
- **Tests unitaires prévus** : 1 à 2, sur la règle « aucun envoi d'appel à don daté avant J+60 »
- **Étapes ajoutées à la démo** : cliquer sur la carte Silver, vérifier l'absence d'appel à don avant J+60
- **Bilan** : _à remplir en fin d'itération (durée de codage réelle, dépassement éventuel, fait, reporté, modifications fichier par fichier)_

---

## À venir (objectifs ordonnés, détaillés au fil de l'eau)

1. Fiche donateur Fidèles (Parcours 4) : bascule automatique depuis Silver après passage au prélèvement — hypothèse « 0 action manuelle au changement de cycle ».
2. Fiches donateur réactivation (Parcours 5 À réengager, Parcours 6 Inactifs) : pression limitée à 5-6 envois — hypothèse « 3 niveaux de pression distincts ».
3. Fiches donateur Gold et Platine (Parcours 2, 3) : complètent la vue d'ensemble.
4. Tableau de bord coordination : alerte sur envoi en doublon entre équipes — hypothèse « 0 envoi non coordonné détecté en test ».
5. Sélecteur de persona complet avec droits différenciés par rôle, si le sélecteur léger de l'itération 1 est jugé insuffisant.
