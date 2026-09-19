import { Router } from 'express';
import { studentController } from '../controllers/studentController';
import { authenticateToken } from '../middleware/auth';

export const studentRouter = Router();

// Complete student dashboard (Profile, Track, Assessment, Skills, Rules, Assignments, Performance)
studentRouter.get('/dashboard', authenticateToken, studentController.getDashboard);

// Adaptive Decision Engine recommendation output
studentRouter.get('/adaptive-recommendation', authenticateToken, studentController.getAdaptiveRecommendation);

// Student-specific adaptive assignments
studentRouter.get('/assignments', authenticateToken, studentController.getAssignments);

// Retrieve real-time progress stats (Streak, XP, Rank, Daily Pace)
studentRouter.get('/progress', authenticateToken, studentController.getProgress);

// Add XP points upon completing tasks/labs
studentRouter.post('/progress/xp', authenticateToken, studentController.addXP);

// Update daily learning pace
studentRouter.patch('/progress/pace', authenticateToken, studentController.updatePace);
