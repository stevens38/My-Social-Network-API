import { Router } from 'express';
import { courseRouter } from './thoughtsRoutes.js';
import { studentRouter } from './userRoutes.js';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/user', userRouter);

export default router;