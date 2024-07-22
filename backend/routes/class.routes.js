import express from 'express';
import {
  createClass,
  getClassById,
  getAllClasses,
  updateClass,
  deleteClass,
  createClassSchedule,
  getClassSchedules,
  addStudentsToClass
} from '../controllers/class.controller.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/', protectRoute, createClass);
router.get('/:id', protectRoute, getClassById);
router.get('/', protectRoute, getAllClasses);
router.put('/:id', protectRoute, updateClass);
router.delete('/:id', protectRoute, deleteClass);
router.patch('/:id/students', protectRoute, addStudentsToClass);


router.post('/schedule', protectRoute, createClassSchedule);
router.get('/schedule', protectRoute, getClassSchedules);

export default router;
