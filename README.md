# Memory

Jeu de memory

Fonctionnalités

● Au commencement du jeu, des cartes sont disposées face cachée à l'écran.

● Le joueur doit cliquer sur deux cartes. Si celles-ci sont identiques, la paire est
validée. Sinon, les cartes sont retournées face cachée, et le joueur doit sélectionner
une nouvelle paire de cartes.

● Une compteur de temps, avec une barre de progression, s’affiche en dessous du
plateau.

● Le joueur gagne s'il arrive à découvrir toutes les paires avant la fin du temps imparti.

● Chaque temps de partie effectuée doit être sauvegardée en base de données.
Avant le début du jeu, les meilleurs temps s’affichent à l’écran.

## Stack Technique

La stack technique utilisée pour la partie backend : Symfony / Doctrine

La stack technique utilisée pour la partie FrontEnd : ReactJS/Typescript


## Installation

Dupliquer le fichier .env et le nommer .env.local à la racine, renseigner la variable DATABSE_URL avec l'accès à la base de données souhaitée

Lancer les commandes à la racine du projet


``composer install`` déploiement des dépdendances PHP

``yarn install`` ou ``npm install`` Déploiement des dépendances Javascript
 
``yarn dev`` ou ``npm run dev`` Construction des assets (js, css)

``php bin/console doctrine:database:create`` création de la base de données

``php bin/console doctrine:migrations:migrate`` création du schéma de base

``php bin/console doctrine:schema:validate`` vérification du schéma de base

``php bin/console cache:clear`` vidage du cache
