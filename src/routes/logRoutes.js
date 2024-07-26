import express from 'express';
import getLogs from '../controllers/logController.js';

const router = express.Router();

router.get('/users/:userId/logs', getLogs);

export default router;

