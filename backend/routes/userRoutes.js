import express from 'express';
import {
  getAllUsers,
  updateUserRole,
  uploadProfileImage,
  getUserProfile,
  updateUserProfile // ✅ Agregamos esto
} from '../controllers/userController.js';

import verifyToken from '../utils/verifyToken.js';
import isAdmin from '../utils/isAdmin.js';

const router = express.Router();

// ✅ Obtener todos los usuarios (solo admins)
router.get('/', verifyToken, isAdmin, getAllUsers);

// ✅ Cambiar rol de usuario (solo admins)
router.put('/:userId/role', verifyToken, isAdmin, updateUserRole);

// ✅ Actualizar imagen de perfil (usuario logueado)
router.put('/profile-image', verifyToken, uploadProfileImage);

// ✅ Obtener perfil del usuario logueado
router.get('/profile', verifyToken, getUserProfile);

// ✅ Actualizar nombre, edad e imagen (usuario logueado)
router.put('/profile', verifyToken, updateUserProfile); // 🔥 Esta línea faltaba

export default router;


