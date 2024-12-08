# 🎨 Portfolio Admin Dashboard

<div align="center">
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green.svg)](https://www.mongodb.com/)
</div>

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Interface d'administration](#-interface-dadministration)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du projet](#-structure-du-projet)
- [API Routes](#-api-routes)
- [État du projet](#-état-du-projet)
- [Améliorations prévues](#-améliorations-prévues)
- [Dépannage](#-dépannage)

## 🎯 À propos

Portfolio Admin est une solution "no-code" pour gérer votre portfolio en ligne. Plus besoin de modifier le code source pour mettre à jour votre site ! Grâce à une interface d'administration intuitive, vous pouvez modifier tout le contenu de votre portfolio en quelques clics.

## ✨ Fonctionnalités

- 🎨 **Gestion No-Code**
  - Modification du contenu sans toucher au code
  - Interface utilisateur intuitive
  - Mise à jour en temps réel
  - Prévisualisation des changements

- 🔐 **Authentification Sécurisée**
  - NextAuth.js pour la gestion des sessions
  - Protection des routes admin
  - Authentification GitHub

- 📊 **Gestion des Projets**
  - Ajout/Modification/Suppression de projets sans coder
  - Upload d'images avec prévisualisation
  - Organisation par drag & drop (à venir)
  - Gestion des catégories

- 📝 **Gestion du Contenu**
  - Éditeur de texte riche intuitif
  - Mise en forme avancée (gras, italique, couleurs...)
  - Modification des sections de la page d'accueil
  - Personnalisation des liens sociaux

## 💻 Interface d'Administration

L'interface d'administration vous permet de :

### 1. Page d'Accueil
- Modifier le titre principal
- Personnaliser le sous-titre
- Éditer la section "À propos"
- Gérer vos liens sociaux (GitHub, LinkedIn, Twitter)

### 2. Projets
- Ajouter de nouveaux projets
- Modifier les projets existants
- Supprimer des projets
- Réorganiser l'ordre d'affichage

### 3. Mise en Forme du Texte
Notre éditeur de texte riche permet de :
- Mettre en gras, italique, souligné
- Changer la couleur du texte
- Créer des listes à puces
- Aligner le texte (gauche, centre, droite)
- Ajouter des titres et sous-titres

### 4. Gestion des Médias
- Upload d'images pour les projets
- Redimensionnement automatique
- Optimisation des images
- Gestion de la galerie

Toutes ces modifications se font directement depuis l'interface d'administration, sans avoir besoin de toucher au code !

## 🛠 Technologies

### Frontend
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Éditeur:** Tiptap
- **State Management:** React Context
- **Animations:** Framer Motion

### Backend
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **File Upload:** Cloudinary
- **API:** Next.js API Routes

### Outils de développement
- **Linting:** ESLint
- **Formatting:** Prettier
- **Version Control:** Git
- **API Testing:** Postman

## 💻 Installation

1. Cloner le projet
```bash
git clone [votre-repo]
cd portfolio-admin
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env.local
```

4. Lancer le serveur de développement
```bash
npm run dev
```

## ⚙️ Configuration

### Variables d'Environnement

```env
# MongoDB
MONGODB_URI=votre_uri_mongodb

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret

# GitHub OAuth
GITHUB_ID=votre_github_id
GITHUB_SECRET=votre_github_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

## 📁 Structure du projet

```
portfolio-admin/
├── public/
├── src/
│   ├── components/         # Composants React
│   │   ├── layouts/       # Layouts réutilisables
│   │   ├── ui/           # Composants d'interface
│   │   └── admin/        # Composants admin
│   ├── lib/              # Utilitaires et configurations
│   ├── models/           # Modèles MongoDB
│   ├── pages/            # Pages Next.js
│   │   ├── api/         # Routes API
│   │   └── admin/       # Pages admin
│   └── styles/           # Styles globaux
├── public/               # Assets statiques
└── types/               # Types TypeScript
```

## 🔄 API Routes

### Projets
- `GET /api/projects` - Liste des projets
- `POST /api/projects` - Créer un projet
- `PUT /api/projects/:id` - Mettre à jour un projet
- `DELETE /api/projects/:id` - Supprimer un projet

### Statistiques
- `POST /api/projects/stats` - Enregistrer une interaction
- `GET /api/projects/stats/:id` - Obtenir les stats d'un projet

### Contenu
- `GET /api/homepage` - Obtenir le contenu de la page d'accueil
- `POST /api/homepage` - Mettre à jour le contenu

## 📊 État du projet

- ✅ Authentification sécurisée
- ✅ Gestion des projets
- ✅ Upload d'images
- ✅ Statistiques de base
- ✅ Éditeur de texte riche
- 🚧 Analytics avancés
- 🚧 Dashboard de statistiques
- 🚧 Optimisation des performances

## 🚧 État Actuel du Projet

### ✅ Fonctionnalités Terminées
- Authentification sécurisée avec GitHub
- Éditeur de texte riche pour la page d'accueil
  - Formatage du texte (gras, italique, souligné)
  - Changement de couleur
  - Alignement du texte
- Gestion du contenu de la page d'accueil
  - Modification du titre et sous-titre
  - Édition de la section "À propos"
  - Gestion des liens sociaux
- Upload d'images basique
- Structure de base de données MongoDB

### 🔄 En Cours de Développement
- Interface d'administration complète
  - Dashboard principal avec statistiques
  - Navigation intuitive entre les sections
  - Thème sombre/clair
- Gestion avancée des projets
  - Interface drag & drop pour réorganiser
  - Catégorisation des projets
  - Tags et filtres
- Système de médias amélioré
  - Galerie d'images
  - Recadrage et redimensionnement
  - Optimisation automatique
- Prévisualisation en temps réel des modifications

### 📝 Fonctionnalités Prévues
- Analytics et statistiques
  - Suivi des visites
  - Temps passé par page
  - Interactions utilisateurs
- Système de sauvegarde et versions
- Export/Import des données
- Mode maintenance
- Optimisation SEO avancée
- Tests automatisés
- Documentation API complète

## ⚠️ Note Importante
Ce projet est actuellement en développement actif. Certaines fonctionnalités peuvent être instables ou incomplètes. Les contributions et retours sont les bienvenus !

## 🚀 Améliorations prévues

### Performance
- [ ] Mise en cache des requêtes API
- [ ] Optimisation des images
- [ ] Server-side rendering amélioré
- [ ] Pagination côté serveur

### Fonctionnalités
- [ ] Export des statistiques
- [ ] Filtres de recherche avancés
- [ ] Système de tags pour les projets
- [ ] Prévisualisation en direct

### UI/UX
- [ ] Mode clair/sombre
- [ ] Interface drag and drop
- [ ] Animations améliorées
- [ ] Responsive design optimisé

## 🔧 Dépannage

### Problèmes courants

1. **Erreur de connexion MongoDB**
```bash
# Vérifier la connexion
npm run check-db

# Nettoyer le cache
npm run clean
```

2. **Problèmes d'upload**
- Vérifier les credentials Cloudinary
- Augmenter la limite de taille des fichiers
- Vérifier les formats supportés

3. **Erreurs d'authentification**
- Vérifier les variables d'environnement
- Nettoyer les cookies
- Vérifier la configuration NextAuth

### Maintenance

```bash
# Vérifier les dépendances
npm audit

# Mettre à jour les packages
npm update

# Lancer les tests
npm test
```

<div align="center">
  <p>Développé par Mehmet Salih Kuscu pour une gestion de portfolio efficace et sans code</p>
</div>
