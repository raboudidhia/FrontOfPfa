# 🐶 VetAI - Intelligent Rabies Detection for Dogs

**VetAI** is a web-based application designed to assist dog owners and veterinarians in detecting signs of **rabies** in dogs using **image analysis powered by Machine Learning**. The application provides additional features such as detailed disease information, care tips, and product recommendations to promote animal health and awareness.

## 📖 Documentation Technique Complète

**🇫🇷 Pour une documentation technique détaillée en français couvrant tous les aspects du projet, consultez :**
**[TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)**

Cette documentation complète comprend :
- Architecture globale du système (microservices)
- Stack technologique détaillée (React, Spring Boot, FastAPI, YOLOv8)
- Flux de données et communication entre les services
- Système d'authentification et sécurité (JWT, BCrypt)
- Configuration et déploiement
- Patterns de conception et bonnes pratiques

---

## 🚀 Features

- 🧠 **AI-Powered Detection**  
  Upload an image of a dog and let the system detect potential signs of rabies using a fine-tuned deep learning model (CNN).

- 📚 **Disease Knowledge Base**  
  Access a categorized list of common dog diseases with symptoms, treatments, and prevention tips.

- 🛒 **Product Suggestions**  
  Browse recommended care products related to specific diseases.

- 💡 **Care Tips Section**  
  Get regular advice and tips to keep your dog healthy and protected.

- 🛠️ **Admin Dashboard**  
  Manage disease entries, articles, and products (CRUD functionality).

---

## 🛠️ Tech Stack

### Frontend
- React.js (with TailwindCSS)
- React Router
- Axios

### Backend
- Spring Boot (Java 21)
- MongoDB (v8)
- Spring Data + REST API

### Machine Learning
- YOLOv8 / CNN (trained on Google Colab)
- Python (training phase)


---

## 🧪 AI Model

The rabies detection model is trained using annotated images of dogs with and without rabies symptoms. The model is then exported and served through an API for real-time inference.

- Frameworks: PyTorch / TensorFlow
- Hosted on: Azure Container Instances (or Flask API)
- Model type: CNN / YOLOv8 (for object-based classification)

---

## 📂 Project Structure

