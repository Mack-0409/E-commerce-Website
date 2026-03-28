import express from 'express';

import authMiddleware from '../middleware/auth.js';
import { confirmPayment, createOrder, deleteOrder, getOrders, getUserOrders, updateOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();
orderRouter.post('/', createOrder);
orderRouter.get('/confirm', confirmPayment);

orderRouter.get('/my', authMiddleware, getUserOrders);
orderRouter.get('/', getOrders);
orderRouter.put('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;