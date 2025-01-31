import express from 'express';

import * as categoryController from '@controllers/categoryController';
import { authenticateUser } from '@middleware/authMiddleware';

const categoryRoutes = express.Router();

categoryRoutes.post('/', authenticateUser, categoryController.createCategory);
categoryRoutes.get('/', authenticateUser, categoryController.getCategorys);
categoryRoutes.get('/:categoryId', authenticateUser, categoryController.getCategoryById);
categoryRoutes.get('/user/:userId', authenticateUser, categoryController.getCategoryByUserId);
categoryRoutes.put('/:categoryId', authenticateUser, categoryController.updateCategory);
categoryRoutes.delete('/:categoryId', authenticateUser, categoryController.deleteCategory);

export default categoryRoutes;

