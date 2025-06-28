import { Router } from 'express';
import * as authController from './auth.controller';
import { authenticateToken } from '../../middleware/auth.middleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);


router.get('/profile', authenticateToken, authController.getProfile);

export default router;