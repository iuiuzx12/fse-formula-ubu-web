import { Router } from 'express';
import * as lessonsController from './lessons.controller';
import { authenticateToken, checkAdmin } from '../../middleware/auth.middleware';
import {challengesInLessonRouter} from '../challenges/chalenges.routes';

const router = Router();

// GET /api/v1/lessons
router.get('/', authenticateToken, lessonsController.getAllLessons);

// POST /api/v1/lessons
router.post('/', authenticateToken, checkAdmin, lessonsController.createLesson);

// PUT /api/v1/lessons/:id  <-- เพิ่ม
router.put('/:id', authenticateToken, checkAdmin, lessonsController.updateLesson);

// DELETE /api/v1/lessons/:id <-- เพิ่ม
router.delete('/:id', authenticateToken, checkAdmin, lessonsController.deleteLesson);

router.use('/:lessonId/challenges', challengesInLessonRouter);

export default router;