import express from 'express';
import {
	deleteUsers,
	getUsers,
	postUsers
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', postUsers);
router.delete('/users', deleteUsers);

export default router;

