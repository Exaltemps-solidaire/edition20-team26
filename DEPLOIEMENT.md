# Déploiement

CRM différencié pour **Imagine for Margo** (cancers pédiatriques) : affiche les cycles relationnels
(parcours donateur) différenciés par profil, pour que la responsable collecte et le responsable
communication coordonnent leurs envois.

## Services

- `frontend/` : Next.js en export statique, servi par nginx sur le port 80 du conteneur (8080 sur
  la VM). **C'est le service exposé.**
- `api/` : Node sans dépendance, port 8081. Pour l'instant, sert seulement `/health` et `/sante` :
  l'itération 1 n'a pas encore de route métier, les données du CRM sont en dur côté frontend.

## Services externes

Aucun à ce stade : pas de base de données, pas d'appel IA, pas d'email. Rien ne casse en cascade si
un service externe tombe, puisqu'aucun n'est encore appelé.

## Fragile / inachevé

- Les 6 parcours et le score RFM sont des données figées (`frontend/src/lib/parcours.ts`), pas une
  base de données : rien ne persiste entre deux visites.
- Le sélecteur de rôle (haut de l'écran) ne porte encore aucune logique de droits : c'est un
  affichage, pas une permission.
- Aucune fiche donateur ni tableau de bord : seul l'écran « CRM · Cycles & scoring » existe.

## Contact

Équipe 26 (hackathon eXaltemps Solidaire). Côté association : voir
`passation/contexte/association.md` (non commité, dans `passation/`).
