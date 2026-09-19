import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { studentService } from '../services/studentService';
import { adaptiveService } from '../services/adaptiveService';

export const studentController = {
  /**
   * GET /api/student/dashboard
   * Fetch complete student dashboard (Profile, Track, Assessment, Skills, Rules, Assignments, Performance Data)
   */
  async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || 'usr_student_1_rahul';
      const userEmail = req.user?.email || 'rahul.python@edunexa.edu';

      const dashboardData = await adaptiveService.getStudentDashboardData(userId, userEmail);

      res.status(200).json({
        success: true,
        message: `Student data loaded for logged-in user: ${dashboardData.studentInfo.name} (${dashboardData.studentInfo.email})`,
        data: dashboardData,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/student/adaptive-recommendation
   * Evaluate decision rules based on current student assessment and performance
   */
  async getAdaptiveRecommendation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || 'usr_student_1_rahul';
      const userEmail = req.user?.email || 'rahul.python@edunexa.edu';

      const data = await adaptiveService.getStudentDashboardData(userId, userEmail);
      const recommendation = await adaptiveService.evaluateAdaptiveRules(
        data.assessment.score,
        data.studentInfo.targetTrack
      );

      res.status(200).json({
        success: true,
        message: 'Adaptive learning decision generated successfully',
        data: {
          student: data.studentInfo,
          assessmentSummary: data.assessment,
          decisionEngineResult: recommendation,
          appliedRules: data.learningRules,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/student/assignments
   * Fetch student-specific assignments based on learning track
   */
  async getAssignments(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || 'usr_student_1_rahul';
      const userEmail = req.user?.email || 'rahul.python@edunexa.edu';

      const data = await adaptiveService.getStudentDashboardData(userId, userEmail);

      res.status(200).json({
        success: true,
        message: `Assignments retrieved for ${data.studentInfo.name}`,
        data: {
          studentEmail: data.studentInfo.email,
          targetTrack: data.studentInfo.targetTrack,
          assignments: data.assignments,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/student/progress
   * Fetch current real-time stats (Streak, XP, Rank, Daily Pace, Readiness Score)
   */
  async getProgress(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || 'usr_student_1_rahul';
      const userName = req.user?.name || 'Rahul Sharma';

      const progress = await studentService.getProgress(userId, userName);

      res.status(200).json({
        success: true,
        message: 'Student progress metrics retrieved successfully',
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/student/progress/xp
   * Add XP Points when completing study tasks, labs, or assessments
   */
  async addXP(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || 'usr_student_1_rahul';
      const { amount, activity } = req.body;

      const xpAmount = typeof amount === 'number' && amount > 0 ? amount : 50;
      const activityName = typeof activity === 'string' ? activity : 'Completed Task';

      const updatedProgress = await studentService.addXP(userId, xpAmount, activityName);

      res.status(200).json({
        success: true,
        message: `Successfully earned +${xpAmount} XP!`,
        data: updatedProgress,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /api/student/progress/pace
   * Update student daily pace preference
   */
  async updatePace(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id || 'usr_student_1_rahul';
      const { pace } = req.body;

      if (!pace || typeof pace !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Pace string is required (e.g. "1.5 hours/day")',
          code: 'VALIDATION_ERROR',
        });
        return;
      }

      const updatedProgress = await studentService.updateDailyPace(userId, pace);

      res.status(200).json({
        success: true,
        message: 'Daily learning pace updated',
        data: updatedProgress,
      });
    } catch (error) {
      next(error);
    }
  },
};
