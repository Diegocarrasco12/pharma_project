# 💊 Pharma Project

Proyecto de e-commerce orientado a farmacias. Contiene un **backend** desarrollado con Express y PostgreSQL, y un **frontend** en React con Vite.

---

## 🚀 Tecnologías utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (autenticación)
- Nodemailer (envío de correos)
- Multer (carga de imágenes)
- Dotenv

### Frontend
- React
- Vite
- CSS Puro
- Axios

---

## 📁 Estructura del proyecto
pharma-project/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ ├── utils/
│ ├── config/
│ ├── .env.example
│ └── server.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── .env.example
│ └── vite.config.js


Backend
cd backend
npm install
cp .env.example .env
npm run dev

Frontend
cd frontend
npm install
cp .env.example .env
npm run dev

Scripts disponibles
Backend
npm start     # Ejecuta en modo producción
npm run dev   # Ejecuta con nodemon en desarrollo
npm test      # Placeholder por ahora


Frontend
npm run dev      # Ejecuta Vite en desarrollo
npm run build    # Genera los archivos para producción
npm run preview  # Previsualiza el sitio ya compilado


Variables de entorno
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=pharma_db

📬 Contacto
Proyecto desarrollado por Diego Carrasco Ordóñez
📧 diegocarrasco.dev@gmail.com