import express from 'express';
import {
  getAllUsers,
  updateUserRole
} from '../controllers/userController.js';

import verifyToken from '../utils/verifyToken.js';
import isAdmin from '../utils/isAdmin.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAllUsers);
router.put('/:userId/role', verifyToken, isAdmin, updateUserRole);

export default router;
