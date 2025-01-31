import express from 'express';

import * as productController from '@controllers/productController';
import { authenticateUser } from '@middleware/authMiddleware';

const productRoutes = express.Router();

productRoutes.post('/', authenticateUser, productController.createProduct);
productRoutes.get('/', authenticateUser, productController.getProducts);
productRoutes.get('/:productId', authenticateUser, productController.getProductById);
productRoutes.get('/category/:categoryId', authenticateUser, productController.getProductByCategoryId);
productRoutes.put('/:productId', authenticateUser, productController.updateProduct);
productRoutes.delete('/:productId', authenticateUser, productController.deleteProduct);

export default productRoutes;

