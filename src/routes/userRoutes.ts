import { Router } from 'express';
import { getUserProfile, setUserProfile } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();


/***
 * GET Request Headers: 
 * Authorization: Bearer <Token>
 * Content-Type: application/json
 */
router.get('/profile', authMiddleware, getUserProfile);
router.post('/profile', authMiddleware, setUserProfile);

export default router;
