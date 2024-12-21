import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  addAssignment,
  removeAssignment,
} from '../../controllers/userController.js';

// /api/students
router.route('/').get(getAllUsers).post(createUser);

// /api/students/:studentId
router.route('/:studentId').get(getUserById).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/assignments/:assignmentId').delete(removeAssignment);

export { router as userRouter} ;
