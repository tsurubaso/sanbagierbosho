# Résumé du Plan — Création d’un Site E-commerce (Next.js)

## 1. Stack Technique
- **Next.js (App Router)** pour frontend + backend  
- **Better-SQLite (dev)** → **Postgres** 
- Aucun service externe obligatoire → photos hébergées en local dans `/public`, ou éventuellement GitHub (repo) pour un stockage léger  
- **Auth.js (NextAuth)** avec Google ou GitHub pour un login admin simple  
- **TailwindCSS + shadcn/ui** pour aller vite  
- **Déploiement** : Vercel ou propre VPS 

---

## 2. Fonctionnalités du MVP

### Pages publiques
- Page d’accueil : liste des 20 produits max  
- Page produit (image, description, prix)  
- Bouton **“Commander”** → paiement hors site (email / formulaire simple)  

### Admin minimal
- Login admin par Google/GitHub  
- CRUD produits :
  - nom  
  - prix  
  - description  
  - image (hébergée localement ou sur GitHub repo)  
- Upload image → stockée dans `/public/uploads` ( pas de dépendances externes)  

---

## 3. Modèle de Base de Données 

### Product
- `id`  
- `name`  
- `slug`  
- `price`  
- `description`  
- `imageUrl`  
- `createdAt`   

### User
- `id`  
- `email`  
- `provider` (Google/GitHub)  
- `role = "admin"`  

---

## 4. Gestion des Images (sans dépendances externes)
- L’admin upload une photo  
- Next.js sauvegarde l’image localement dans `/public/uploads`  
- L’URL publique devient `/uploads/nom.jpg`  
- Sqlite stocke cette URL  
- *(Option alternative : dépôt GitHub)*  

---

## 5. Paiement (MVP)
Pas de Stripe.  
Bouton **“Commander”** peut rediriger vers :
- `mailto:tonemail@...`  
- un simple formulaire interne “envoyer demande”  
- Google Form  

---

## 6. Roadmap (simple et rapide)
- **Jour 1** : Setup Next.js + Better-SQLite, pages produits  
- **Jour 2** : Auth.js + sauvegarde locale des images  
- **Jour 3** : CRUD Admin complet  
- **Jour 4** : UI minimal propre (Tailwind + shadcn)  
- **Jour 5** : Fonction “Commander” + déploiement  
