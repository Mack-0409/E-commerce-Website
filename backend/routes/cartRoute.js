import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addToCart, clearUserCart, getCart, removeCartItem, updateCartItem } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add', verifyToken, addToCart);
cartRouter.get('/', verifyToken, getCart);
cartRouter.put('/update', verifyToken, updateCartItem);
cartRouter.delete('/remove/:productId', verifyToken, removeCartItem);
cartRouter.delete('/clear', verifyToken, clearUserCart);

export default cartRouter;