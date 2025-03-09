import express from 'express';
import { createProject, getMyProjects } from '../controllers/codeController.js';

const router = express.Router();

router.post('/create', createProject);
router.get('/my-projects', getMyProjects);

export default router;