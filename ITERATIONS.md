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

**Début de l'itération 2** : ~30 minutes restantes annoncées (2026-11-18).

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
- **Bilan** :
  - Durée de codage réelle : 3 minutes, pas de dépassement.
  - Les 3 critères d'acceptation sont satisfaits tels quels : clic sur la carte Parcours 1 → fiche Silver, aucun envoi « appel » daté avant J+60 (règle testée), retour vers l'écran principal (lien `/`).
  - Harnais : contrat de déployabilité sans borne, `npm test` passant (7 tests), revue du sous-agent `reviewer` sans correction nécessaire. Démo Playwright étendue et passante contre le conteneur déployé (`localhost:8080`). Aucun blocage sur le signal PM Lab.
  - Déploiement : plateforme déjà démarrée (itération 1) — seul le frontend a été reconstruit/republié/redéployé, cycle complet en quelques secondes. `/health` et `/sante` toujours 200 sur 8080.
  - Reporté : rien.
  - **Modifications** (fichier par fichier) :
    - `frontend/src/lib/cycleSilver.ts`, `cycleSilver.test.ts` (nouveaux) : données du cycle Silver (4 envois) + règle `aucunAppelAvantJ60`, testée — sert le critère 2.
    - `frontend/src/app/fiche/1/page.tsx`, `page.module.css` (nouveaux) : fiche donateur Silver (en-tête, score RFM, timeline des envois) — sert les critères 1 et 2.
    - `frontend/src/app/page.tsx` (modifié) : la carte Parcours 1 devient un lien `next/link` vers `/fiche/1` — sert le critère 1.
    - `e2e/demo.spec.ts` (modifié) : étape de démo sur l'ouverture de la fiche Silver et l'absence d'appel avant J+60.

---

## Itération 3 : La fiche donateur Fidèles montre la bascule automatique depuis Silver

**Plan validé tel quel.** Début de l'itération 3 : ~20 minutes restantes annoncées (2026-11-18).

- **Dans le périmètre** : depuis une carte « Parcours 4 · Fidèles » de l'écran principal (lien à ajouter, comme pour Silver), ouvrir une fiche reproduisant `screen-1-detail-p4` : badge « Cycle Fidèles · Prélèvement automatique », encart « Transition automatique détectée » (donateur Thomas Girard, ex-Parcours 1 Silver, basculé le 5 janv. 2026 sans action manuelle), timeline du cycle 12 mois.
- **Hors périmètre** : les autres fiches restantes (Gold, Platine, réactivation), le tableau de bord, toute logique de détection réelle du changement de fréquence de don (texte en dur, comme pour la fiche Silver).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran principal, quand on clique sur la carte Parcours 4 Fidèles, alors la fiche donateur Fidèles s'affiche avec son cycle actif.
  - Étant donné la fiche Fidèles, quand on lit l'encart de transition, alors il indique explicitement que le basculement depuis le Parcours 1 Silver s'est fait sans action manuelle de la responsable collecte.
  - Étant donné la fiche Fidèles, quand on revient en arrière, alors on retrouve l'écran principal.
- **Hypothèse de l'équipe couverte** : « Actions manuelles nécessaires au changement de cycle » — cible 0.
- **Codage estimé** : 6 minutes (même structure que la fiche Silver, à dupliquer et adapter)
- **Fichiers prévus** : `frontend/src/lib/cycleFideles.ts` (+ test), `frontend/src/app/fiche/4/page.tsx` (+ css), lien depuis la carte Fidèles dans `page.tsx` (~4 fichiers)
- **Tests unitaires prévus** : 1 à 2, sur la détection de la transition (ex. « un donateur ex-Silver passé en mensuel est marqué basculé automatiquement »)
- **Étapes ajoutées à la démo** : retour à l'écran principal, clic sur Fidèles, vérifier la mention de bascule automatique
- **Bilan** :
  - Durée de codage réelle : 1 minute, pas de dépassement (structure dupliquée depuis la fiche Silver de l'itération 2).
  - Les 3 critères d'acceptation sont satisfaits tels quels.
  - Harnais : contrat de déployabilité sans borne, `npm test` passant (8 tests), revue du sous-agent `reviewer` : 1 correction (code mort dans `fiche/4/page.tsx` — la branche `"— vérification requise"` n'était jamais atteinte car `basculementAutomatique(1, "mensuel")` est appelée en dur ; corrigé en conditionnant l'affichage de l'encart de transition à `basculeAuto` plutôt qu'en ramifiant le texte). Aucun blocage sur le signal PM Lab.
  - Déploiement : frontend reconstruit/republié/redéployé deux fois (une avant la revue, une après la correction), plateforme déjà en place. `/health` et `/sante` toujours 200 sur 8080.
  - Reporté : rien.
  - **Modifications** (fichier par fichier) :
    - `frontend/src/lib/cycleFideles.ts`, `cycleFideles.test.ts` (nouveaux) : données du cycle Fidèles (3 envois) + `basculementAutomatique`, qui réutilise `assignerParcours` — sert les critères 1 et 2.
    - `frontend/src/app/fiche/4/page.tsx`, `page.module.css` (nouveaux) : fiche donateur Fidèles (en-tête rose, encart de transition conditionnel, timeline du cycle 12 mois) — sert les critères 1 et 2.
    - `frontend/src/app/page.tsx` (modifié) : la carte Parcours 4 devient un lien vers `/fiche/4` — sert le critère 1.
    - `e2e/demo.spec.ts` (modifié) : étape de démo sur le retour à l'écran principal puis l'ouverture de la fiche Fidèles.

## Itérations 4 à 6 — planifiées le 2026-11-18, ~45+ minutes restantes annoncées

Capacité estimée : 4 + 4 + 9 = 17 minutes de codage, plus publication (rapide désormais, la plateforme tourne déjà) et un tour de test par itération. Si l'équipe teste après chaque publication (3 tours de 10 minutes), le total avoisine 45-55 minutes : tendu avec « plus de 45 minutes ». Si le temps est plus proche de 45 que de 60, ⚠️ regrouper les tours de test des itérations 4 et 5 (deux fiches très proches) est une option à discuter avec les cadreurs plutôt que de les réduire.

## Itération 4 : La fiche donateur À réengager montre un plafond d'envois distinct de Fidèles

- **Dans le périmètre** : depuis une carte « Parcours 5 · À réengager » de l'écran principal (lien à ajouter), ouvrir une fiche reproduisant `screen-1-detail-p5` : donatrice Nathalie Dupont (14 mois d'inactivité), badge « Cycle Réactivation · Parcours 5 », encart « Basculement auto à 13 mois », note « 5 à 6 envois sur 12 mois · jamais 9 emails en 6 semaines », timeline (3 envois dont 1 appel à don doux).
- **Hors périmètre** : la fiche Parcours 6, le tableau de bord, les fiches Gold/Platine, tout calcul réel d'ancienneté (donnée en dur, comme pour Silver et Fidèles).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran principal, quand on clique sur la carte Parcours 5, alors la fiche À réengager s'affiche avec son cycle de réactivation.
  - Étant donné la fiche, quand on lit son plafond d'envois, alors il diffère explicitement de celui de Fidèles (une règle testée compare les deux plafonds).
  - Étant donné la fiche, quand on revient en arrière, alors on retrouve l'écran principal.
- **Hypothèse de l'équipe couverte** : « Nombre d'envois par profil sur 12 mois » — un 3ᵉ niveau de pression distinct (Silver : règle J+60 ; Fidèles : ≤ 2 appels/an ; À réengager : 5-6 envois/an).
- **Codage estimé** : 4 minutes (même gabarit que les fiches Silver/Fidèles)
- **Fichiers prévus** : `frontend/src/lib/cycleReactivation.ts` (+ test), `frontend/src/app/fiche/5/page.tsx` (+ css), `frontend/src/app/page.tsx` (lien) — 4 fichiers hors tests
- **Tests unitaires prévus** : 1 à 2, sur la règle de plafond (ex. « À réengager autorise jusqu'à 6 envois/an, Fidèles jusqu'à 2 »)
- **Étapes ajoutées à la démo** : retour à l'écran principal, clic sur Parcours 5, vérifier le plafond affiché
- **Bilan** : _à remplir en fin d'itération_

## Itération 5 : La fiche donateur Inactifs confirme une pression minimale automatique

- **Dans le périmètre** : depuis une carte « Parcours 6 · Inactifs » de l'écran principal, ouvrir une fiche reproduisant `screen-1-detail-p6` : donateur Jean-Paul Mercier (3 ans et demi d'inactivité), badge « Cycle Réactivation · Parcours 6 », encart « Pression minimale automatique », note « Maximum 5 envois sur 12 mois · 1 appel à don annuel », timeline (newsletter + 1 appel plafonné pendant la campagne de fin d'année + anniversaire auto).
- **Hors périmètre** : le tableau de bord, les fiches Gold/Platine, la suppression de base à 5 ans d'inactivité (explicitement hors périmètre de la passation).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran principal, quand on clique sur la carte Parcours 6, alors la fiche Inactifs s'affiche avec son cycle de réactivation.
  - Étant donné la fiche, quand on compare son plafond (5 envois/an, 1 appel max pendant la CFA) à celui de Parcours 5 (5-6 envois/an), alors les deux restent cohérents avec la règle testée en itération 4.
  - Étant donné la fiche, quand on revient en arrière, alors on retrouve l'écran principal.
- **Hypothèse de l'équipe couverte** : « Nombre d'envois par profil sur 12 mois » (suite de l'itération 4).
- **Codage estimé** : 4 minutes
- **Fichiers prévus** : `frontend/src/app/fiche/6/page.tsx` (+ css), `frontend/src/app/page.tsx` (lien), extension de `cycleReactivation.ts` si besoin — 3 à 4 fichiers hors tests
- **Tests unitaires prévus** : 1, sur le plafond de Parcours 6 (ex. « 1 seul appel à don autorisé pendant la CFA pour les inactifs »)
- **Étapes ajoutées à la démo** : retour à l'écran principal, clic sur Parcours 6, vérifier la pression minimale
- **Bilan** : _à remplir en fin d'itération_

## Itération 6 : Le tableau de bord coordination détecte un envoi en doublon entre équipes

- **Dans le périmètre** : nouvel écran « Tableau de bord · Coordination », accessible depuis un bouton de l'écran principal, reproduisant `screen-1-dashboard` : bannière d'alerte (« 3 donateurs du cycle Accueil ciblés par un envoi Collecte ET Communication »), liste des envois prévus de la semaine avec leur source (Collecte/Communication/Événements) et le marqueur « ⚠️ Doublon » sur l'envoi en conflit.
- **Hors périmètre** : les KPI (taux d'ouverture, de clic, etc. — décoratifs, à ajouter seulement si le temps le permet, données en dur), la modification réelle du planning d'envoi.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran principal, quand on ouvre le tableau de bord, alors la liste des envois prévus de la semaine s'affiche avec leur source.
  - Étant donné la liste, quand deux envois ciblent le même cycle depuis deux sources différentes la même semaine, alors une règle testée les signale comme doublon et l'écran l'affiche.
  - Étant donné le tableau de bord, quand on revient en arrière, alors on retrouve l'écran principal.
- **Hypothèse de l'équipe couverte** : « Envois non coordonnés détectés en test » — cible 0 doublon manqué.
- **Codage estimé** : 9 minutes (nouvel écran plus dense que les fiches précédentes)
- **Fichiers prévus** : `frontend/src/lib/coordination.ts` (+ test), `frontend/src/app/tableau-de-bord/page.tsx` (+ css), `frontend/src/app/page.tsx` (lien) — 5 fichiers hors tests
- **Tests unitaires prévus** : 2, sur la détection de doublon (un cas en conflit, un cas sans conflit)
- **Étapes ajoutées à la démo** : ouvrir le tableau de bord, vérifier la bannière d'alerte et le marqueur doublon
- **Bilan** : _à remplir en fin d'itération_

## À venir (objectifs ordonnés, détaillés au fil de l'eau)

1. Fiches donateur Gold et Platine (Parcours 2, 3) : complètent la vue d'ensemble, même gabarit que Silver.
2. Sélecteur de persona complet avec droits différenciés par rôle, si le sélecteur léger de l'itération 1 est jugé insuffisant.
