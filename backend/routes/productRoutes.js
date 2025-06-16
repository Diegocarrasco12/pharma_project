import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductImage
} from '../controllers/productController.js';

import upload from '../utils/multerConfig.js';
import verifyToken from '../utils/verifyToken.js';
import isAdmin from '../utils/isAdmin.js';

const router = express.Router();

// Rutas públicas
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Rutas protegidas (solo admin)
router.post('/', verifyToken, isAdmin, upload.single('image'), createProduct); // ✅ Corregido
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);
router.post('/:id/image', verifyToken, isAdmin, upload.single('image'), updateProductImage);

export default router;
