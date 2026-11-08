# Nom du projet : EcoArt

Application front-end de démonstration inspirée d'un site e-commerce.
Le projet utilise **HTML, Tailwind CSS, JavaScript moderne (ES Modules), Vite et LocalStorage**. Il co;prend un catalogue, un panier, un back-office et une page de conctact connectée a une Fake API.

Projet pédagogique: d'un site similaire comme Auchan.

## 🛠️ Stack technologique

* **HTML5 :** Structure des pages et formulaire.
* **Tailwind CSS :** Mise en page et responsive design.
* **JavaScript ES6+ :** Modules, functions, événments, api.
* **LocalStorage :** Presistance locale du catalogue et du panier.
* **Déploiement :** Vercel.

## 🗺️ Fonctionnalités

### Catalogue (`/`)
* Chargement des 60 produits depuis `public/data/data.json`.
* Recherche par nom et filtre par catégorie.
* Affichage en grille ou en liste.
* Pagination et choix du nombre de produits par page.
* Choix d'une taille S, M, L ou XL avec majoration de 0 %, 5 %, 10 % ou 20 %.
* Ajout au panier. Un même produit avec la même taille augmente la quantité au lieu de créer une nouvelle ligne.
* Panier latéral : augmenter/diminuer la quantité, supprimer un article ou vider le panier.
* Sauvegarde du catalogue et du panier dans LocalStorage.


## 🚀 Lancement en local

1. Clonez ce dépôt ou téléchargez l'archive ZIP.
2. Ouvrez le dossier du projet dans un éditeur de texte tel que [VS Code](https://visualstudio.com).
3. Ouvrez `index.html` directement dans un navigateur web, ou utilisez l'extension Live Server dans VS Code pour visualiser les mises à jour en temps réel.

## 🔗 Resources & liens
* **Website liens :** [AUCHAN](https://auchan-pi.vercel.app/)

## 3. Installation et lancement

Prérequis : Node.js et npm installés.

```bash
npm install
npm run dev
```

Ouvrir l'URL locale indiquée par Vite (généralement `http://localhost:5173`). Les pages sont accessibles depuis la navigation :
- Catalogue : `/`
- Back-office : `/admin.html`
- Contact : `/contact.html`

Pour vérifier la compilation de production :

```bash
npm run build
npm run preview
```

## 🏗️ Structure du projet

```text
auchan-project/
├── public/
│   └── data/
│       └── data.json          # Catalogue initial (JSON)
├── src/
│   ├── assets/                # Images et ressources
│   ├── css/
│   │   ├── style.css          # Tailwind + styles personnalisés
│   │   └── output.css         # Feuille compilée si utilisée
│   └── js/
│       ├── api.js             # Appels fetch vers les API
│       ├── admin.js           # Logique du back-office CRUD
│       ├── cart.js             # Logique métier du panier
│       ├── contact.js          # Formulaire et Fake API
│       ├── dragDrop.js         # Emplacement prévu pour glisser-déposer
│       ├── main.js             # Point d'entrée du catalogue
│       ├── products.js         # Recherche, filtres, pagination, prix
│       ├── storage.js          # Fonctions LocalStorage
│       ├── ui.js               # Affichage du catalogue et du panier
│       └── validation.js       # Regex et validation du formulaire
├── admin.html                 # Back-office
├── contact.html               # Page Contact
├── index.html                 # Catalogue
├── package.json
└── vite.config.js
```
 
## Q & A