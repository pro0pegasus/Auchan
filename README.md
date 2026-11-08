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

1: À quoi sert le fichier data.json?

- Il contient les données des produits sous format JSON. chaque produit possede plusieurs informations, comme son identifiant, son nom, sa marque, son prix, son image et sa categorie.

2: Qu'est ce que le format JSON?

- JSON signifie JavaScript Object Notation. C'est un format leger utilise pour stocker et echanger des donnees. Il utilise des paires clé-valeur et des tableux pour organiser les informations.

3: Pourquoi utiliser JavaScrript avec des modules ES6?

- Les modules permettent de séprer le code en plusieurs fichiers selon leurs responsabilites. Cela rend le projet plus organise, plus facile a comprendre et a maintenir. On utilise ecport pour partager un fonction et import pour l'utiliser dans un autre fichier.

4: A quoi sert main.js?

- C'est le point d'entree JavaScript du projet. il initialise les fonctionnalites, recupere les elements HTML, ajoute les ecouteur d'evenments et fait le lien entre les different modules.

5: A quoi sert api.js

- Il centralise les operations liees a la recuperation des donnees. Il peur utiliser fetch() pour envoyer une requete HTTP et recuperer des donnees depuis une source JSON ou une API.

6: Qu'est ce que fetch()?

- fetch() est une fonction JavaScript qui permet d'effectuer des requettes HTTP. Elle retourne une Promise, ce qui permet d'utiliser .then() ou async/await pour recuperer les donnees.

7: Qulle est la difference entre async et await?

-  async permet de declarer une fonction asynchrone. await permet d'attendre le resultat d'une Promise avant de continuer l'execution de la fonction.

8: A quoi sert products.js ?

- Il gere les fonctionnalites liees aux produits: recuperation des produits, recherche, filtrage par categorie, affichage et gestion des informations des articles.

9: Comment fonctionne la recherche d'un produit ?

- L'utilisateur saisit un texte dans la barre de recherche. Un evenment input recupere la valeur saisie et permet de filtrer les produits en comparant le texte avec les informations des articles, par example leur nom ou leur marque

10 : Quelle est la différence entre filter() et find() ?
- filter() retourne un nouveau tableau contenant tous les elements qui respectent une condition. find() retourne uniquement le premier element qui respecte cette condition. Si aucun element ne correspond, find() retourne undefined.

11: Comment fonctionne le filtre par categorie?

- un evenment change recupere la categorie selectionnee dans le menu deroulant. Ensuite, les produits sont filtres selon leur categorie. Si la valeur selectionnee est all, tous les produits sont affiches.

12: A quoi sert map() en JavaScript?

- map() permet de parcourir un tableau et de creer un nouveau tableau a partir des resultas d'une transformation appliquee a chaque element. par exemple, il paut etre utilise pour recuperer uniquement les norms des produits.

13: qu'est ce que le DOM?

- DOM signifie Document Object Model. C'est une representation de la page HTML sous forme d'objets. JavaScript peut acceder aux elements, les modifier, en ajouter ou en supprimer.

14: Quelle est la difference entre Grid et List?

- Grid affiche les produits sous forme de grille avec plusieurs colonnes. List affiche les produits les uns sous les autres. Ces deux présentations permettent d'adapter l'affichage selon les préférences de l'utilisateur.

15 : Comment fonctionne le choix de la taille d'un produit ?

- L'utilisateur peut choisir une taille disponible. Le prix est ensuite calculé selon la taille sélectionnée, en appliquant le pourcentage correspondant au prix de base.

16 : Comment fonctionne le calcul du prix selon la taille ?

- Le calcul utilise le prix de base et un coefficient correspondant à la taille choisie :

M : prix de base.

L : prix de base + 10 %.

XL : prix de base + 20 %.

Par exemple, pour un produit à 100 DH :

M = 100 DH.

L = 110 DH.

XL = 120 DH.

17 : À quoi sert cart.js ?

-  Il contient les fonctions liées au panier : ajout d'un produit, modification de la quantité, suppression d'un article, calcul du total et mise à jour des données du panier.

18 : Comment éviter d'ajouter plusieurs lignes pour le même produit ?

- Avant d'ajouter un produit, on utilise find() pour vérifier s'il existe déjà dans le panier avec le même identifiant et la même taille. Si le produit existe, on augmente sa quantité. Sinon, on crée une nouvelle ligne.

19 : Pourquoi vérifier également la taille du produit ?

- Parce qu'un même produit peut avoir plusieurs tailles et donc plusieurs prix. Un produit de taille M et le même produit de taille XL doivent être considérés comme deux lignes différentes dans le panier.

20 : Comment fonctionne la modification de quantité ?

-  On récupère le produit concerné grâce à son identifiant et sa taille. Ensuite, on augmente ou diminue sa quantité. Si la quantité atteint zéro, l'article peut être supprimé du panier.

21 : À quoi sert storage.js ?

- Il regroupe les fonctions qui permettent de sauvegarder et de récupérer les données depuis le LocalStorage du navigateur.

22 : Qu'est-ce que le LocalStorage ?

C'est un mécanisme de stockage intégré au navigateur qui permet de conserver des données même après la fermeture ou le rechargement de la page. Les données sont enregistrées sous forme de chaînes de caractères.

23 : Pourquoi utiliser JSON.stringify() et JSON.parse() avec LocalStorage ?

- JSON.stringify() transforme un objet ou un tableau JavaScript en chaîne de caractères pour pouvoir le sauvegarder. JSON.parse() fait l'opération inverse pour récupérer les données sous forme d'objet ou de tableau.

24 : À quoi sert dragDrop.js ?

- Ce module est prévu pour gérer le glisser-déposer (Drag and Drop) des produits vers le panier. Cette fonctionnalité n'est pas encore implémentée dans la version actuelle du projet.

25 : À quoi sert validation.js ?

Ce module est prévu pour centraliser la validation des formulaires, notamment avec les expressions régulières (Regex). La validation Regex n'est pas encore réalisée.

26 : Qu'est-ce qu'une Regex ?

- Regex signifie Regular Expression. C'est une expression utilisée pour rechercher ou vérifier un format précis dans une chaîne de caractères. Elle peut servir à vérifier un email, un numéro de téléphone ou un nom.

27 : Quel est le rôle de la page Contact ?

- La page Contact est prévue pour permettre aux utilisateurs d'envoyer un message via un formulaire. Elle doit inclure la validation des champs et une interaction avec une API pour récupérer ou envoyer des données. Cette page est encore inachevée.

28 : Qu'est-ce qu'une API ?

- API signifie Application Programming Interface. C'est une interface qui permet à deux applications ou systèmes de communiquer et d'échanger des données.

29 : Qu'est-ce qu'une Fake API ?

- Une Fake API est une API de test qui fournit des données fictives. Elle permet de pratiquer les requêtes HTTP et de développer des fonctionnalités sans avoir besoin d'un véritable serveur ou d'une base de données.

30 : Pourquoi utiliser try...catch avec async/await ?

- try...catch permet de gérer les erreurs qui peuvent survenir pendant l'exécution d'une fonction asynchrone, par exemple lorsqu'une requête API échoue.