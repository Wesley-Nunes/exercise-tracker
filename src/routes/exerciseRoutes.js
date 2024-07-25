import express from 'express';
import {
	postExercises
} from '../controllers/exercisesController.js';

const router = express.Router();

router.post('/users/:userId/exercises', postExercises);

export default router;

