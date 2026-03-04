import express from 'express';

import authMiddleware from '../middleware/auth.js';
import { confirmPayment, createOrder, deleteOrder, getOrders, getUserOrders, updateOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();
orderRouter.post('/', authMiddleware, createOrder);
orderRouter.get('/confirm', confirmPayment);

orderRouter.get('/', authMiddleware, getUserOrders);
orderRouter.get('/',  getOrders);
orderRouter.get('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;