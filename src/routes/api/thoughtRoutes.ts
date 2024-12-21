import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController.js';

// /api/courses
router.route('/').get(getAllThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/:thoughtsId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

export { router as thoughtsRouter };
