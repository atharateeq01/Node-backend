import express from 'express';

import * as orderController from '@controllers/orderController';
import { authenticateUser } from '@middleware/authMiddleware';

const orderRoutes = express.Router();

orderRoutes.post('/', authenticateUser, orderController.createOrder);
orderRoutes.get('/', authenticateUser, orderController.getOrders);
orderRoutes.get('/user', authenticateUser, orderController.getOrdersByUser);
orderRoutes.get('/:orderId', authenticateUser, orderController.getOrderById);
orderRoutes.put('/:orderId', authenticateUser, orderController.updateOrder);
orderRoutes.delete('/:orderId', authenticateUser, orderController.deleteOrder);

export default orderRoutes;
