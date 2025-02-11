import express from 'express';

import * as cartController from '@controllers/cartController';
import { authenticateUser } from '@middleware/authMiddleware';

const cartRoutes = express.Router();

cartRoutes.post('/', authenticateUser, cartController.createCart);
cartRoutes.get('/', authenticateUser, cartController.getCarts);
cartRoutes.get('/user', authenticateUser, cartController.getCartsOfUser);
cartRoutes.get('/:cartId', authenticateUser, cartController.getCartById);
cartRoutes.get('/product/:productId', authenticateUser, cartController.getCartByProductId);
cartRoutes.put('/:cartId', authenticateUser, cartController.updateCart);
cartRoutes.delete('/:cartId', authenticateUser, cartController.deleteCart);

export default cartRoutes;

