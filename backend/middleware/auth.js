import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = 'your_jwt_secret_here';

export async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const playload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(playload.id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }    

        req.user = user;
        next();
    } 
    
    catch (error) {
        console.error('JWT verification failed', error);
        return res.status(401).json({
            success: false,
            message: "Token invalid or expired"
        });        
    }
}



