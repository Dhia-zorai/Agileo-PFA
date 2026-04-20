# 🎓 Agileo - Mon Projet de Fin d'Année (PFA)

Salut ! Bienvenue sur le repo de mon projet **Agileo**. 🚀

C'est mon Projet de Fin d'Année (PFA). L'idée principale est de créer un petit outil de gestion de projets (façon Agile/Scrum). C'est encore au stade de prototype, mais la dernière mise à jour a apporté une interface "Néo-brutaliste" super cool avec des couleurs pastel ! 😎

## 🛠️ Stack Technique

Pour construire ça, j'utilise :
*   **Frontend :** React (avec un design Néo-brutaliste entièrement customisé en CSS).
*   **Backend :** Python avec le framework FastAPI (c'est super rapide et facile pour faire des API).
*   **Base de données :** SQLite (pour le moment, ça évite de se prendre la tête avec l'installation d'une grosse BDD).

## 🚀 Comment tester mon projet sur votre machine ?

C'est tout simple, mais il faut lancer les deux parties (le serveur et l'interface client) :

### 1. Lancer l'API Backend
Ouvrez un terminal et tapez ces commandes :
```bash
cd backend

# Activer l'environnement virtuel (sous Windows)
.\venv\Scripts\activate

# Lancer le serveur local
uvicorn main:app --reload
```
L'API devrait maintenant tourner sur `http://localhost:8000`.

### 2. Lancer l'Interface Frontend
Ouvrez un autre terminal et lancez ceci :
```bash
cd frontend

# Installer les dépendances (juste la première fois)
npm install

# Lancer le site
npm start
```
Votre navigateur devrait s'ouvrir tout seul sur `http://localhost:3000`. Profitez du design ! ✨

## 📝 Ce qu'il reste à faire (Prochaines étapes)
*   Remplacer les requêtes SQL brutes par un véritable ORM (comme SQLAlchemy ou SQLModel).
*   Structurer le backend proprement (séparer les routes, les modèles, etc.).
*   Terminer toutes les opérations CRUD (Modification et Suppression).
*   Avoir une super bonne note au PFA ! 💯

Merci d'avoir jeté un coup d'œil à mon projet et à très vite pour les prochaines updates !
