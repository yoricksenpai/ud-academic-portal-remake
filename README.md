# Portail Académique - UD Academic Portal

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.2.2-black)
![Prisma](https://img.shields.io/badge/Prisma-6.5.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

Un portail académique moderne permettant la gestion des étudiants, des cours, des inscriptions et des enseignants. Cette application est construite avec Next.js, Prisma ORM et TypeScript.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Structure du projet](#-structure-du-projet)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Base de données](#-base-de-données)
- [Commandes disponibles](#-commandes-disponibles)
- [Développement](#-développement)
- [Déploiement](#-déploiement)
- [Technologies utilisées](#-technologies-utilisées)
- [Contribution](#-contribution)

## 🚀 Fonctionnalités

- **Gestion des étudiants**: Inscription, profils, et suivi académique
- **Gestion des cours**: Création, mise à jour et suppression des cours
- **Inscriptions aux cours**: Système d'inscription avec différents statuts (inscrit, en attente, abandonné)
- **Gestion des enseignants**: Profils des enseignants et attribution des cours
- **Dashboard administratif**: Interface pour gérer l'ensemble du système
- **Système d'actualités**: Publication et gestion des annonces importantes
- **Calendrier académique**: Visualisation des événements importants
- **Bibliothèque numérique**: Accès aux ressources pédagogiques
- **Système de bourses**: Information et gestion des bourses disponibles
- **Authentification**: Sécurisation de l'accès selon les rôles

## 📁 Structure du projet

```
├── app                     # Routes et pages (Next.js App Router)
│   ├── actualites          # Section actualités
│   ├── api                 # API routes
│   ├── associations        # Gestion des associations étudiantes
│   ├── bibliotheque        # Bibliothèque numérique
│   ├── bourses             # Système de bourses
│   ├── calendrier          # Calendrier académique
│   ├── concours            # Information sur les concours
│   ├── contact             # Formulaire de contact
│   ├── dashboard           # Interface d'administration
│   └── preinscription      # Système de préinscription
├── components              # Composants React réutilisables
│   ├── ui                  # Composants d'interface utilisateur
│   └── [feature]           # Composants spécifiques aux fonctionnalités
├── hooks                   # Hooks React personnalisés
├── lib                     # Bibliothèques et utilitaires
├── prisma                  # Configuration Prisma ORM
│   ├── migrations          # Migrations de base de données
│   ├── schema.prisma       # Schéma de base de données
│   └── seed.ts             # Script de génération de données de test
├── public                  # Fichiers statiques
├── src                     # Code source principal
│   ├── prisma.ts           # Client Prisma
│   └── services            # Services métier
├── styles                  # Styles globaux
└── [config files]          # Fichiers de configuration
```

## 📋 Prérequis

- Node.js (v18 ou plus récent recommandé)
- npm, yarn ou pnpm
- Base de données PostgreSQL (ou autre compatible avec Prisma)

## 🔧 Installation

1. **Cloner le dépôt**

```bash
git clone [url-du-repo]
cd ud-academic-portal-2
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```
DATABASE_URL="postgresql://utilisateur:mot_de_passe@localhost:5432/nom_bd"
NEXTAUTH_SECRET="votre_secret_pour_nextauth"
NEXTAUTH_URL="http://localhost:3000"
```

## ⚙️ Configuration

### Base de données

L'application utilise Prisma ORM pour interagir avec la base de données. Le schéma de base de données est défini dans `prisma/schema.prisma`.

1. **Appliquer les migrations initiales**

```bash
npx prisma migrate dev --name init
```

2. **Générer des données de test (optionnel)**

```bash
npm run prisma:seed
```

3. **Explorer les données avec Prisma Studio**

```bash
npx prisma studio
```

### Configuration Next.js

Le fichier `next.config.mjs` contient la configuration de Next.js. Vous pouvez personnaliser ce fichier pour ajuster les paramètres selon vos besoins.

## 💾 Base de données

Le schéma de base de données comprend les modèles suivants :

- **Student**: Informations sur les étudiants (nom, prénom, email, date de naissance, etc.)
- **Instructor**: Informations sur les enseignants (nom, prénom, département, etc.)
- **Course**: Détails des cours (code, titre, description, crédits, etc.)
- **Enrollment**: Inscriptions des étudiants aux cours avec différents statuts

Vous pouvez visualiser ces modèles et leurs relations dans le fichier `prisma/schema.prisma`.

## 📝 Commandes disponibles

- `npm run dev`: Démarre le serveur de développement
- `npm run dev:with-prisma`: Démarre le serveur de développement et Prisma Studio
- `npm run dev:full`: Régénère le client Prisma, puis démarre le serveur et Prisma Studio
- `npm run build`: Compile l'application pour la production
- `npm run start`: Démarre l'application en mode production
- `npm run lint`: Vérifie le code avec ESLint
- `npm run prisma:seed`: Exécute le script de génération de données de test
- `npm run db:reset`: Réinitialise la base de données et applique les migrations
- `npm run db:setup`: Configure la base de données depuis zéro (génère, migre, et ensemence)

## 💻 Développement

Pour commencer le développement :

```bash
# Démarrer le serveur de développement 
npm run dev

# Démarrer le serveur avec Prisma Studio 
npm run dev:with-prisma

# Configuration complète (régénération client, migrations et serveur) 
npm run dev:full
```

## 🚢 Déploiement

Pour déployer l'application en production :

1. **Compiler l'application**

```bash
npm run build
```

2. **Démarrer en mode production**

```bash
npm run start
```

## 🛠️ Technologies utilisées

- **Frontend**:
  - Next.js 15.2.2
  - React 18
  - TypeScript
  - Tailwind CSS
  - Radix UI (composants accessibles)
  - Framer Motion (animations)

- **Backend**:
  - Next.js API Routes
  - Prisma ORM 6.5.0
  - PostgreSQL (base de données)

- **Authentification**:
  - NextAuth.js

## 🤝 Contribution

Pour contribuer au projet :

1. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
2. Committez vos changements (`git commit -m 'feat: add some amazing feature'`)
3. Poussez vers la branche (`git push origin feature/amazing-feature`)
4. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence [insérer type de licence].

---

Développé avec ❤️ pour la gestion académique moderne.