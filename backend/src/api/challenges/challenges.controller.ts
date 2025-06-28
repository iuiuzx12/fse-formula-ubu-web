import { RequestHandler } from 'express';
import * as challengeService from './challenges.service';

// ดึงโจทย์ทั้งหมดของบทเรียน
export const getChallengesForLesson: RequestHandler = async (req, res) => {
  try {
    const lessonId = parseInt(req.params.lessonId, 10);
    const challenges = await challengeService.findChallengesByLessonId(lessonId);
    res.status(200).json(challenges);
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving challenges', error: error.message });
  }
};

// สร้างโจทย์ใหม่
export const createChallenge: RequestHandler = async (req, res) => {
  try {
    const lesson_id = parseInt(req.params.lessonId, 10);
    const { title, description, initial_simulator_state, success_conditions } = req.body;

    if (!title) {
        res.status(400).json({ message: 'Title is required' });
        return;
    }

    await challengeService.createChallenge({ lesson_id, title, description, initial_simulator_state, success_conditions });
    res.status(201).json({ message: 'Challenge created successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
};

// อัปเดตโจทย์
export const updateChallenge: RequestHandler = async (req, res) => {
    try {
        const challengeId = parseInt(req.params.challengeId, 10);
        const result = await challengeService.updateChallenge(challengeId, req.body);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Challenge not found' });
            return ;
        }
        res.status(200).json({ message: 'Challenge updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating challenge', error: error.message });
    }
};

// ลบโจทย์
export const deleteChallenge: RequestHandler = async (req, res) => {
    try {
        const challengeId = parseInt(req.params.challengeId, 10);
        const result = await challengeService.deleteChallenge(challengeId);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Challenge not found' });
            return;
        }
        res.status(200).json({ message: 'Challenge deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting challenge', error: error.message });
    }
};