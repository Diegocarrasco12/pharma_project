import express from 'express';
import { createOrder, getOrdersByUser } from '../controllers/orderController.js';
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/:userId', getOrdersByUser); // Historial por usuario

export default router;
