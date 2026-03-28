import express from 'express';

import { verifyToken } from '../middleware/auth.js';
import { confirmPayment, createOrder, deleteOrder, getOrders, getUserOrders, updateOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();
orderRouter.post('/', createOrder);
orderRouter.get('/confirm', confirmPayment);

orderRouter.get('/my', verifyToken, getUserOrders);
orderRouter.get('/', getOrders);
orderRouter.put('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;