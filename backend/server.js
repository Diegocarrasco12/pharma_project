import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// Configurar variables de entorno
dotenv.config();

// Crear la app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir carpeta de imágenes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: '¡API de Pharma Project funcionando correctamente!' });
});

// Probar conexión
pool.connect()
  .then(() => console.log('🟢 Conexión a PostgreSQL exitosa'))
  .catch((err) => console.error('🔴 Error al conectar a PostgreSQL:', err));

// Rutas principales (orden antes de iniciar el servidor)
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
