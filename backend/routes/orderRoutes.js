import express from 'express';
import { createOrder, createFullOrder, getOrdersByUser } from '../controllers/orderController.js';
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createFullOrder); // 🆕 ahora usa la versión con múltiples productos
router.post('/unitario', verifyToken, createOrder); // 🧩 versión anterior (unitaria)
router.get('/:userId', getOrdersByUser);

export default router;
