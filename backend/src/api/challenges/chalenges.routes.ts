import { Router } from 'express';
import * as challengesController from './challenges.controller';
import { authenticateToken, checkAdmin } from '@/middleware/auth.middleware';

// mergeParams: true คือหัวใจสำคัญที่ทำให้เราเข้าถึง :lessonId จากไฟล์ routes อื่นได้
const router = Router({ mergeParams: true });

const singleChallengeRouter = Router();

router.route('/')
  .get(authenticateToken, challengesController.getChallengesForLesson)
  .post(authenticateToken, checkAdmin, challengesController.createChallenge);

singleChallengeRouter.route('/:challengeId')
    .get(authenticateToken, challengesController.getChallengeById)
    .put(authenticateToken, checkAdmin, challengesController.updateChallenge)
    .delete(authenticateToken, checkAdmin, challengesController.deleteChallenge);

export { router as challengesInLessonRouter, singleChallengeRouter };