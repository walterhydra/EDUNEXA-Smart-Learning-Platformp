import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/check-email', authController.checkEmail);
authRouter.get('/me', authenticateToken, authController.me);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
