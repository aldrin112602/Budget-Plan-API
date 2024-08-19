import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();


/***
 * 
 * Register Body: 
 * email     String
 * password  String
 * name      String?        optional
 * profile   Profile?       optional 
 * budgetPlans BudgetPlan[] optional at the moment
 * 
 */
router.post('/register', register);
router.post('/login', login);

export default router;
