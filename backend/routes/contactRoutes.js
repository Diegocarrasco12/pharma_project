import express from 'express';
import { handleContactForm, getAllMessages } from '../controllers/contactController.js';
import verifyToken from '../utils/verifyToken.js';
import isAdmin from '../utils/isAdmin.js';

const router = express.Router();

// Ruta pública: formulario de contacto
router.post('/', handleContactForm);

// Ruta protegida: obtener mensajes (solo admin)
router.get('/', verifyToken, isAdmin, getAllMessages);

export default router;
