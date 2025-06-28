import { RequestHandler } from 'express';
import * as lessonService from './lessons.service';


export const getLessonById: RequestHandler = async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id, 10);
    const lesson = await lessonService.findLessonById(lessonId);

    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving lesson', error: error.message });
  }
};

// จัดการการดึงบทเรียนทั้งหมด
export const getAllLessons: RequestHandler = async (req , res) => {
  try {
    const lessons = await lessonService.findAllLessons();
    res.status(200).json(lessons);
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving lessons', error: error.message });
  }
};

// จัดการการสร้างบทเรียนใหม่
export const createLesson: RequestHandler = async (req, res) => {
  try {
    const { title, description, content_data, display_order } = req.body;
    const author_id = req.user?.userId; // ดึง userId ของ Admin ที่ login อยู่

    if (!title || !display_order || !author_id) {
        res.status(400).json({ message: 'Missing required fields: title, display_order, author_id' });
      return ;
    }

    await lessonService.createLessons({ title, description, content_data, display_order, author_id });
    res.status(201).json({ message: 'Lesson created successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating lesson', error: error.message });
  }
};

export const updateLesson: RequestHandler = async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id, 10);
    const lessonData = req.body;

    const result = await lessonService.updateLesson(lessonId, lessonData);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    res.status(200).json({ message: 'Lesson updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating lesson', error: error.message });
  }
};

// จัดการการลบบทเรียน
export const deleteLesson: RequestHandler = async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id, 10);
    const result = await lessonService.deleteLesson(lessonId);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting lesson', error: error.message });
  }
};