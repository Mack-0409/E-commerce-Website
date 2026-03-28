import express from 'express';
import { login, register, checkAdmin } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/check-admin', verifyToken, checkAdmin);

export default userRouter;