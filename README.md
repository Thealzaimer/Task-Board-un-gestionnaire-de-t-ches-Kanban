# 🎯 Task Board — Kanban en Vanilla JavaScript

Bienvenue dans le projet **Task Board**, une application web complète de gestion des tâches de type Kanban. Ce projet a été développé de manière modulaire et structurée en **JavaScript Vanilla** (sans aucun framework ni bibliothèque tierce).

L'application offre une interface moderne, fluide, et réactive en design sombre, permettant d'organiser vos tâches quotidiennes selon leur priorité et leur avancement.

---

## 📸 Aperçu de l'Interface

![Maquette Task Board](screenshot.png)
*(Note : La capture d'écran de l'application se trouve sous le nom `screenshot.png` à la racine du projet).*

---

## 📂 Structure des Fichiers et Rôles

Le projet est organisé selon une structure modulaire stricte, respectant la séparation des responsabilités :

```text
task-board/
├── index.html         # Structure HTML5 sémantique de l'application
├── screenshot.png     # Capture d'écran illustrative du design
├── README.md          # Guide explicatif du projet (ce fichier)
├── css/
│   └── style.css      # Feuille de style CSS moderne, sombre et responsive
└── js/
    ├── main.js        # Point d'entrée, gestion du cycle de vie et coordination
    ├── dom.js         # Création dynamique des cartes, manipulation du DOM et filtres
    ├── storage.js     # Gestion de la persistance (localStorage & sessionStorage)
    └── api.js         # Service AJAX (requêtes asynchrones avec fetch et try/catch)
```

---

## ⚡ Les 4 Compétences Frontend Couvertes

Le projet démontre la maîtrise des quatre compétences fondamentales exigées pour la validation :

### 1. Manipulation Avancée du DOM
*   **Création dynamique sécurisée** : Les cartes de tâches sont créées intégralement via `document.createElement()`, garantissant la sécurité (prévention des failles XSS).
*   **Mise à jour en temps réel** : Les compteurs de cartes en haut de chaque colonne ("À faire", "En cours", "Terminé") se mettent à jour automatiquement à la moindre modification (ajout, déplacement, suppression).
*   **Validation des formulaires** : Contrôle des saisies utilisateurs avec indications visuelles en cas d'erreur.

### 2. Gestion des Événements JavaScript
*   **Délégation d'événements** : Pour des raisons de performance, un écouteur unique intercepte les clics sur l'ensemble du tableau Kanban pour gérer les boutons "Déplacer (→)" et "Supprimer (✕)".
*   **Recherche dynamique** : Un événement `input` sur la barre de recherche permet de filtrer en temps réel les cartes par mot-clé, sans avoir à recharger la page.
*   **Styles conditionnels** : Application de classes CSS spécifiques selon la priorité choisie (bordure Rouge, Orange ou Vert).

### 3. Requêtes AJAX avec `fetch()`
*   **Initialisation via API** : Au tout premier lancement (si la mémoire locale est vide), le script interroge l'API `https://jsonplaceholder.typicode.com/todos?_limit=6`.
*   **Transformation de données** : Les données récupérées sont formatées pour s'adapter au modèle métier de l'application Kanban.
*   **Gestion des erreurs réseau** : Le bloc `try/catch` sécurise l'appel asynchrone. En cas de panne de connexion, un bandeau d'alerte élégant est injecté dans le DOM (sans utiliser de `alert()` bloquant).

### 4. Utilisation du Web Storage
*   **Persistance locale (localStorage)** : L'état complet du tableau (toutes les tâches et leurs positions respectives) est sauvegardé à chaque action. Au rechargement, la page restaure instantanément l'état exact du board.
*   **Données de session (sessionStorage)** : Un compteur trace le nombre d'actions (ajout, mouvement, suppression) réalisées par l'utilisateur durant la session active et s'affiche dans le pied de page.
*   **Bouton Réinitialiser** : Permet de vider le `localStorage` pour revenir aux données d'origine provenant de l'API.

---

## 🚀 Instructions pour Lancer le Projet

Puisque le projet est développé en JavaScript pur sans processus de *build* complexe, il est très simple à exécuter :

1.  **Méthode recommandée (Serveur local)** :
    *   Si vous utilisez VS Code, installez l'extension **Live Server**.
    *   Faites un clic droit sur le fichier `index.html` et choisissez **Open with Live Server**.
2.  **Méthode directe** :
    *   Le code étant modulaire mais sans imports restrictifs (`type="module"` n'est pas requis avec notre architecture), vous pouvez simplement double-cliquer sur le fichier `index.html` depuis votre explorateur de fichiers.
    *   L'application s'ouvrira dans votre navigateur par défaut et fonctionnera immédiatement.
