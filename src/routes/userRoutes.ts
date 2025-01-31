import express from 'express';

import * as userController from '@controllers/userController';
import { authenticateUser } from '@middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.post('/', userController.createUser);
userRoutes.get('/', authenticateUser, userController.getUsers);
userRoutes.get('/info', authenticateUser, userController.getUserInfo);
userRoutes.get('/:userId', authenticateUser, userController.getUserById);
userRoutes.put('/:id', authenticateUser, userController.updateUser);
userRoutes.delete('/:id', authenticateUser, userController.deleteUser);

export default userRoutes;
