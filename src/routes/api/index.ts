import { Router } from 'express';
import { thoughtsRouter } from './thoughtRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/user', userRouter);

export default router;