
# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.
Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Non Publié]

### Ajouté
- Système d'authentification avec Supabase
- Gestion des profils utilisateurs
- Gestion des clients
  - Ajout, modification et suppression de clients
  - Informations détaillées sur chaque client
  - Historique des séances

### Fonctionnalités Principales
- Gestion des groupes
  - Création et modification de groupes
  - Attribution de membres aux groupes
  - Ajout de photos pour les groupes
  - Gestion des localisations
  - Vue détaillée des groupes
  - Import/Export des données de groupes

### Corrections
- [2024-02-26] Correction du plantage lors de l'ajout de membres dans un groupe
  - Amélioration de la gestion des requêtes clients
  - Optimisation du composant MultiSelect pour éviter les références nulles
  - Suppression de toutes les références à Firebase qui causaient des erreurs
  - Mise en place d'un état de chargement pour les clients
  - Gestion plus sécurisée des options dans le sélecteur multiple

## [0.1.0] - 2024-02-26

### Fonctionnalités Initiales
- Interface de base avec React et Tailwind CSS
- Intégration de Supabase pour la base de données
- Structure initiale du projet
- Mise en place des composants UI de base

### Base de Données
- Tables principales créées :
  - `session_groups`
  - `session_group_members`
  - `clients`
  - `profiles`

### UX/UI
- Design responsive
- Thème cohérent avec shadcn/ui
- Composants réutilisables
