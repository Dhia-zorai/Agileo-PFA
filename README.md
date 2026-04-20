# Agileo

Agileo est une application moderne et légère de gestion de projet, conçue pour faciliter les flux de travail Agiles. Elle dispose d'une API REST performante et d'une interface utilisateur réactive.

## Architecture du Système

*   **Frontend :** React.js
*   **Backend :** Python 3.10+ avec FastAPI
*   **Base de données :** SQLite (Développement)

## Prérequis

Avant d'exécuter l'application, assurez-vous d'avoir installé les éléments suivants :
*   [Python 3.10+](https://www.python.org/downloads/)
*   [Node.js](https://nodejs.org/) (v16 ou supérieur)
*   [npm](https://www.npmjs.com/) (Node Package Manager)

## Démarrage

Pour exécuter l'application localement, vous devrez démarrer le serveur backend ainsi que le serveur de développement frontend.

### 1. Configuration du Backend

Le backend fonctionne sur FastAPI et sert l'API REST.

```bash
cd backend

# Créer et activer un environnement virtuel (Windows)
python -m venv venv
.\venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Démarrer le serveur de développement
uvicorn main:app --reload
```
L'API sera disponible à l'adresse `http://localhost:8000`. Vous pouvez consulter la documentation interactive de l'API à `http://localhost:8000/docs`.

### 2. Configuration du Frontend

Le frontend est une application React qui consomme le backend FastAPI.

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```
L'application s'ouvrira automatiquement dans votre navigateur par défaut à l'adresse `http://localhost:3000`.

## Feuille de route

*   **Migration de la base de données :** Transition des requêtes SQLite brutes vers un ORM (SQLAlchemy/SQLModel).
*   **Restructuration du Backend :** Refactorisation de `main.py` vers une architecture modulaire (routeurs, modèles, schémas).
*   **Extension des opérations CRUD :** Implémentation des fonctionnalités de mise à jour et de suppression pour les entités de projet.
*   **Authentification :** Introduction d'une authentification utilisateur sécurisée et de la gestion des sessions.
*   **Conteneurisation :** Ajout de la prise en charge de Docker pour simplifier le déploiement.
