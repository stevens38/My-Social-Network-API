import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
} from '../../controllers/thoughtController.js';

// /api/courses
router.route('/').get(getAllThoughts).post(createThoughts);

// /api/courses/:courseId
router
  .route('/:thoughtsId')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

export { router as thoughtsRouter };
