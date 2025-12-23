# 🎯 Guide de Préparation pour Entretien Technique - VetAI

## Résumé Exécutif
VetAI est une application web full-stack de détection de la rage chez les chiens, utilisant une architecture microservices avec intégration d'IA (YOLOv8).

---

## 🏗️ Questions Architecturales

### Q: Décris l'architecture globale du projet
**Réponse :**
- **Architecture microservices** avec 3 composants :
  1. Frontend React (SPA) - port 5173
  2. Backend Spring Boot (API REST) - port 8080
  3. Service ML FastAPI (inférence) - port 8000
- Base de données MongoDB NoSQL
- Communication via HTTP/REST
- Séparation claire des responsabilités

### Q: Pourquoi avoir choisi une architecture microservices ?
**Réponse :**
- **Scaling indépendant** : Le service ML peut scaler séparément selon la charge
- **Technologies adaptées** : Python pour ML, Java pour business logic
- **Maintenance simplifiée** : Équipes peuvent travailler indépendamment
- **Isolation des erreurs** : Une panne n'affecte pas tout le système

### Q: Comment les services communiquent entre eux ?
**Réponse :**
1. Frontend → FastAPI : POST /detect-rabies (multipart/form-data)
2. FastAPI → Frontend : JSON {confidence, symptom, message, status}
3. Frontend → Spring Boot : POST /api/upload (image + résultat + JWT token)
4. Spring Boot ↔ MongoDB : Spring Data MongoDB

---

## 💻 Questions Frontend

### Q: Quelle est la stack frontend et pourquoi ces choix ?
**Réponse :**
- **React 18.3** : Composants réutilisables, hooks modernes, grande communauté
- **Vite 5.1** : Build ultra-rapide, HMR instantané, meilleur DX que Webpack
- **TailwindCSS 3.4** : Utility-first, pas de CSS custom, purge automatique
- **React Router 7.1** : Navigation client-side, protected routes
- **Axios** : Client HTTP plus riche que fetch, interceptors
- **Framer Motion** : Animations fluides et déclaratives

### Q: Comment gères-tu l'authentification côté frontend ?
**Réponse :**
1. Login → POST /auth/login → Reçoit JWT token
2. Stockage dans localStorage
3. Toutes les requêtes : Header `Authorization: Bearer <token>`
4. Protected routes vérifient isLoggedIn
5. Expiration (401) → Clear token + redirect login
6. Role-based routing (ADMIN vs USER)

### Q: Explique le flow de la page Upload
**Réponse :**
```javascript
1. User sélectionne image
   ↓ Validation (type, taille < 5MB)
2. Preview avec animation Framer Motion
3. Click "Upload"
   ↓ setLoading(true)
4. POST FastAPI /detect-rabies → {confidence, symptom}
5. POST Spring Boot /api/upload (image + result + token)
   ↓ Authentification JWT
6. Sauvegarde MongoDB
7. Toast notification + Display result
   ↓ setLoading(false)
```

### Q: Comment gères-tu le state management ?
**Réponse :**
- **useState** pour state local (loading, result, preview)
- **useEffect** pour data fetching (diseases, care tips)
- **localStorage** pour persistance du token
- **Custom hooks** (useBookmarks) pour logique réutilisable
- **Lifting state up** : isLoggedIn au niveau App.jsx
- Pas de Redux car application simple

---

## 🔧 Questions Backend Spring Boot

### Q: Décris l'architecture du backend Spring Boot
**Réponse :**
```
Controllers (REST endpoints)
    ↓
Services (Business logic)
    ↓
Repositories (Data access - Spring Data MongoDB)
    ↓
MongoDB
```

**Patterns utilisés :**
- Repository Pattern
- Service Layer Pattern
- DTO Pattern
- Dependency Injection

### Q: Comment fonctionne l'authentification JWT ?
**Réponse :**
1. **Register** : Hash password (BCrypt) → Save user MongoDB
2. **Login** : 
   - Validate credentials
   - Generate JWT (Header + Payload + Signature)
   - Payload: {sub: email, roles: [USER/ADMIN], exp: 24h}
   - Return token au client
3. **Requêtes protégées** :
   - JwtAuthenticationFilter intercepte
   - Parse et validate token
   - Extract user info
   - Allow/Deny based on roles

### Q: Pourquoi BCrypt pour les passwords ?
**Réponse :**
- **Hash one-way** : Impossible à décrypter
- **Salt automatique** : Unique pour chaque password
- **Coût adjustable** : Protection contre brute force
- **Industry standard** : Prouvé et sécurisé

### Q: Comment gères-tu les CORS ?
**Réponse :**
```java
@CrossOrigin(origins = "http://localhost:5173")
// Dev: localhost:5173
// Prod: domaine réel + HTTPS
```

---

## 🤖 Questions Machine Learning

### Q: Décris le modèle de détection
**Réponse :**
- **Modèle** : YOLOv8 (You Only Look Once v8)
- **Type** : Object Detection
- **Fichier** : best.pt (6.25 MB)
- **Classes** : 6 symptômes de rage
  - Incoordination
  - Barking
  - Bone in throat syndrome
  - Digging
  - Dropped jaw/tongue
  - Hyper-salivation
- **Framework** : Ultralytics + PyTorch

### Q: Explique le pipeline de détection
**Réponse :**
```python
1. Réception image (multipart/form-data)
   ↓
2. Preprocessing
   - Convert RGB (3 channels)
   - Resize 640x640 (YOLO standard)
   - LANCZOS resampling (qualité)
   ↓
3. Inférence YOLOv8
   - model.predict(image, conf=0.5)
   - Détection des bounding boxes
   ↓
4. Post-processing
   - Extract boxes [x1, y1, x2, y2, confidence, class_id]
   - Sélection du symptôme avec max confidence
   - Logique de décision :
     * confidence >= 0.3 → WARNING
     * confidence < 0.3 → INFO
   ↓
5. Return JSON response
```

### Q: Pourquoi FastAPI plutôt que Flask ?
**Réponse :**
- **Performance** : 2-3x plus rapide (Starlette + ASGI)
- **Async/await** native
- **Type hints** Python → Validation automatique
- **Documentation auto** : Swagger UI intégré
- **Moderne** : Meilleures pratiques Python 3.6+

### Q: Comment optimiserais-tu le modèle pour production ?
**Réponse :**
1. **Quantization** : FP32 → FP16 ou INT8 (-75% taille)
2. **Export ONNX** : Cross-platform, optimisé
3. **TensorRT** : Inference GPU ultra-rapide
4. **Model pruning** : Supprime neurons inutiles
5. **Batch processing** : Multiple images simultanément
6. **Caching** : Redis pour résultats similaires

---

## 🗄️ Questions Base de Données

### Q: Pourquoi MongoDB plutôt qu'une DB relationnelle ?
**Réponse :**
- **Schema flexible** : Évolution facile (diseases, tips, products)
- **JSON-like documents** : Match avec React state et API responses
- **Performance read-heavy** : Indexation efficace
- **Horizontal scaling** : Sharding facile
- **No migrations** : Pas de ALTER TABLE complexes
- **Embedded documents** : detectionResult dans Detection

### Q: Quelles sont les collections MongoDB ?
**Réponse :**
1. **users** : {_id, username, email, password(BCrypt), roles[]}
2. **detections** : {_id, userId, imageUrl, detectionResult{}, timestamp}
3. **diseases** : {_id, name, category, symptoms[], treatment, imageUrl}
4. **careTips** : {_id, title, content, category, imageUrl}
5. **products** : {_id, name, price, relatedDiseases[]}

### Q: Comment gères-tu les relations ?
**Réponse :**
- **One-to-Many** : userId dans detections (reference)
- **Many-to-Many** : relatedDiseases[] dans products (array of IDs)
- **Embedded** : detectionResult dans detection (document imbriqué)

---

## 🔒 Questions Sécurité

### Q: Quelles mesures de sécurité as-tu implémentées ?
**Réponse :**
1. **Authentification** : JWT avec expiration 24h
2. **Passwords** : BCrypt hashing (salt + cost factor)
3. **Authorization** : Role-based (USER/ADMIN)
4. **CORS** : Configuration stricte des origins
5. **Input validation** : 
   - Frontend : email regex, file type/size
   - Backend : @Valid annotations
6. **Protected routes** : Vérification JWT
7. **HTTPS** en production (prévu)

### Q: Quelles vulnérabilités potentielles ?
**Réponse :**
1. **XSS** : localStorage vulnérable → Mitigation : CSP
2. **Token theft** : → HttpOnly cookies meilleurs
3. **File upload** : → Validation stricte type MIME
4. **SQL Injection** : N/A (MongoDB + ORM)
5. **Rate limiting** : À implémenter pour /upload

---

## 🚀 Questions Performance

### Q: Comment optimises-tu les performances ?
**Réponse :**

**Frontend :**
- Vite build : Tree shaking, code splitting, minification
- Lazy loading composants (React.lazy)
- Image optimization avant upload (resize)
- localStorage caching (token)
- Tailwind purge en production

**Backend :**
- MongoDB indexes (email unique, userId+timestamp)
- Connection pooling
- Async processing FastAPI
- Model loading au startup (pas à chaque requête)

**Temps typiques :**
- Upload + détection : ~0.5-1s
- CRUD operations : ~50-200ms

---

## 🔄 Questions DevOps

### Q: Comment déploierais-tu en production ?
**Réponse :**

**Frontend :**
- Build : `npm run build` → /dist
- Déploiement : Vercel/Netlify (CDN global)
- Env vars : VITE_API_BASE_URL

**Backend Spring Boot :**
- Build : `mvn clean package` → JAR
- Déploiement : Heroku/AWS/Azure
- DB : MongoDB Atlas (cloud)

**FastAPI ML :**
- Dockerfile
- Azure Container Instances / AWS ECS
- GPU instance pour performance

### Q: Quelle stratégie CI/CD ?
**Réponse :**
```yaml
GitHub Actions:
1. On push → master
2. Run tests (unit + integration)
3. Build frontend → Deploy Vercel
4. Build backend → Deploy Heroku
5. Build Docker image ML → Push registry
6. Health checks
```

---

## 💡 Questions Avancées

### Q: Comment gérerais-tu 1000 uploads simultanés ?
**Réponse :**
1. **Load balancer** devant FastAPI (Nginx/HAProxy)
2. **Multiple instances** FastAPI (Kubernetes)
3. **Queue system** : RabbitMQ/Redis pour requêtes async
4. **Background workers** : Celery pour processing
5. **Caching** : Redis pour résultats similaires
6. **CDN** pour images statiques
7. **Database sharding** : MongoDB réplicas

### Q: Comment améliorer le modèle ML ?
**Réponse :**
1. **Plus de données** : Data augmentation
2. **Fine-tuning** : Transfer learning YOLOv8
3. **Ensemble models** : Combiner plusieurs modèles
4. **Active learning** : Réentraîner avec prédictions corrigées
5. **Multi-class confidence** : Détecter plusieurs symptômes
6. **A/B testing** : Comparer versions modèles

### Q: Comment tester l'application ?
**Réponse :**

**Frontend :**
```javascript
// Jest + React Testing Library
- Unit tests : Composants isolés
- Integration tests : API calls mockés
- E2E : Cypress/Playwright
```

**Backend :**
```java
// JUnit + Mockito
- Unit tests : Services avec mocks
- Integration tests : API endpoints
- Database tests : Embedded MongoDB
```

**ML :**
```python
# Pytest
- Model accuracy tests
- Inference time tests
- Edge cases tests
```

---

## 📊 Métriques et KPIs

**Performance :**
- Temps de détection : < 1s
- Uptime : 99.9%
- API response time : < 200ms

**Qualité Code :**
- Test coverage : > 80%
- ESLint : 0 errors
- Security vulnerabilities : 0

**Business :**
- User registrations
- Successful detections
- Admin CRUD operations

---

## 🎓 Points Forts à Mentionner

1. **Architecture moderne** : Microservices, séparation des concerns
2. **Stack actuelle** : React 18, Spring Boot, FastAPI, YOLOv8
3. **Sécurité robuste** : JWT, BCrypt, RBAC
4. **UX soignée** : Animations, toast notifications, responsive
5. **Scalabilité** : Architecture prête pour production
6. **Best practices** : Patterns de conception, clean code

---

## ⚠️ Points d'Amélioration (à mentionner si demandé)

1. Tests automatisés à ajouter
2. CI/CD pipeline à mettre en place
3. Monitoring/logging centralisé
4. Rate limiting sur endpoints
5. HttpOnly cookies pour tokens
6. Multi-language support (i18n)

---

**Bonne chance pour ton entretien ! 🚀**
