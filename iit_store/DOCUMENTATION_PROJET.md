# Documentation du projet iit_store

## 1. Objectif du projet
Ce projet Django sert de base pour une application e-commerce avec trois grandes zones fonctionnelles :
- Store : commandes, paniers, modes de paiement
- Customer : clients, avis, favoris, paiements, adresses
- Vendeur : produits, catégories, étiquettes

---

## 2. Structure principale du projet

### Dossier racine
- manage.py : point d’entrée Django
- .env : variables d’environnement (secret key, base de données, etc.)
- iit_store/ : configuration Django principale
- store/ : logique boutique / commandes
- customer/ : logique client
- vendeur/ : logique vendeur
- base/ : utilitaires partagés
- api/ : point d’entrée API

---

## 3. Applications principales

### 3.1 Application store
Responsable de la gestion des commandes et des paiements liés à la boutique.

Fichiers clés :
- store/models/commande.py : commande client
- store/models/panier.py : panier d’achat
- store/models/mode_paiement.py : types de paiement disponibles
- store/serializers/commande_sz.py : sérialisation des commandes
- store/viewsets/commande_viewset.py : API commandes
- store/urls.py : routes de l’API store
- store/admin.py et store/admin/admin.py : enregistrement dans l’admin

### 3.2 Application customer
Responsable de la gestion du profil client, paiements, adresses et avis.

Fichiers clés :
- customer/models/adresse.py
- customer/models/avis.py
- customer/models/favoris.py
- customer/models/moyen_paiement.py
- customer/models/paiement.py
- customer/serializers/*.py
- customer/viewsets/*.py
- customer/urls.py
- customer/admin.py et customer/admin/admin.py

### 3.3 Application vendeur
Responsable de la gestion des produits, catégories et étiquettes.

Fichiers clés :
- vendeur/models/produit.py
- vendeur/models/categorie.py
- vendeur/models/etiquette.py
- vendeur/serializers/produit_sz.py
- vendeur/viewsets/produit_viewset.py
- vendeur/urls.py
- vendeur/admin.py et vendeur/admin/admin.py

---

## 4. Modèles importants

### Store
- CommandeModel
- PanierModel
- ModePaiementModel

### Customer
- AdresseModel
- AvisModel
- FavorisModel
- MoyenPaiementModel
- PaiementModel

### Vendeur
- ProduitModel
- Categorie
- Etiquette

---

## 5. Corrections et améliorations déjà faites

### 5.1 Structure Django corrigée
- ajout des dossiers admin/ dans chaque app
- ajout des fichiers admin.py dans les bons packages
- correction des imports cassés
- suppression des conflits liés aux anciens fichiers admin mal placés

### 5.2 API et routes
- ajout des routes DRF pour les apps store, customer et vendeur
- vérification que les endpoints sont visibles via les URL de base

### 5.3 Modèles de paiement
- ajout de la configuration des modes de paiement
- ajout du modèle MoyenPaiementModel avec choix de type de paiement
- ajout de la constante MP_CHOICES pour les types mobile, visa, wave, paypal

### 5.4 Produit
- ajout du champ image sur ProduitModel
- ajout de l’image dans la sérialisation produit

### 5.5 Configuration Django
- ajout de DRF dans INSTALLED_APPS
- correction de la gestion de la clé secrète
- configuration de la base de données via .env
- ajout de MEDIA_ROOT / MEDIA_URL pour les images

---

## 6. Base de données
Le projet est configuré pour utiliser les variables de l’environnement dans .env.

Important :
- pour le projet réel, on utilise PostgreSQL

---

## 7. Commandes utiles


### Migrations
python manage.py makemigrations
python manage.py migrate

### Lancer le serveur
python manage.py runserver

---

## 8. Points de vigilance
- toujours vérifier les imports après ajout de nouveaux fichiers
- ne pas laisser de doublons dans admin.py / admin/admin.py
- garder les modèles alignés avec les serializers et viewsets
- vérifier que les apps sont bien enregistrées dans INSTALLED_APPS

---

## 9. Résumé rapide
Le projet est maintenant structuré avec :
- 3 applications principales
- modèles métiers cohérents
- API DRF fonctionnelle
- admin Django visible
- support image produit
- support paiement et modes de paiement

---

## 10. À retenir pour la suite
Quand tu veux continuer le projet, pense toujours à vérifier dans cet ordre :
1. modèles
2. serializers
3. views/viewsets
4. urls
5. admin
6. tests
7. migration
