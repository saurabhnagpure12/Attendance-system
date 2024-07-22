import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/students.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute, createStudent);
router.get('/', protectRoute, getAllStudents);
router.get('/:id', protectRoute, getStudentById);
router.put('/:id', protectRoute, updateStudent);
router.delete('/:id', protectRoute, deleteStudent);

export default router;
