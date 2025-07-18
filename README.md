# 🧪 Qubit Web GUI

This project is a full-stack application that includes:
- 📤 A React + Vite frontend for user interaction and data entry
- 🧠 A FastAPI backend for physics-related computation
- 🐳 Dockerized environment for easy deployment and reproducibility

---

## ⚙️ Prerequisites

Before running the project, make sure the following tools are installed:

### 🐳 Docker & Docker Compose
- Install Docker Desktop from: https://www.docker.com/products/docker-desktop
- Docker Compose is included with Docker Desktop
- After installation, verify:

docker --version
docker-compose --version

### 🟢 Node.js & npm (for local frontend-only development)
- Install Node.js from: https://nodejs.org (LTS version recommended)
- npm is included automatically

Verify installation:
node -v
npm -v

## 🚀 Getting Started
1. Clone the Repository
https://github.com/shiau109/scqweb

2. Build and Start the App (Dockerized)
bash
### Development:
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

### Production:
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
## Debug
### Backend api check
http://localhost:8000/docs