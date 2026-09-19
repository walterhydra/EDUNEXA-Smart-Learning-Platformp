import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Flag to track whether PostgreSQL DB is reachable
let isDbAvailable = true;

export interface StudentProgress {
  userId: string;
  name: string;
  streakDays: number;
  xpPoints: number;
  rank: string;
  dailyPace: string;
  readinessScore: number;
  lastActiveDate: string;
  updatedAt: string;
}

// In-memory store fallback for development & demo sessions
const progressStore = new Map<string, StudentProgress>();

// Helper to calculate student rank based on total XP
export function calculateRank(xp: number): string {
  if (xp >= 10000) return 'Master Innovator';
  if (xp >= 5000) return 'Gold Scholar';
  if (xp >= 3000) return 'Bronze Scholar';
  if (xp >= 1000) return 'Silver Apprentice';
  return 'Novice Explorer';
}

export const studentService = {
  /**
   * Get student progress stats (Streak, XP, Rank, Daily Pace, Readiness Score)
   */
  async getProgress(userId: string, userName: string = 'Alex'): Promise<StudentProgress> {
    if (isDbAvailable) {
      try {
        const profile = await prisma.profile.findUnique({
          where: { userId },
        });

        if (profile) {
          const calculatedRank = calculateRank(profile.xpPoints);
          return {
            userId,
            name: profile.name || userName,
            streakDays: profile.streakDays,
            xpPoints: profile.xpPoints,
            rank: calculatedRank,
            dailyPace: profile.dailyPace,
            readinessScore: profile.readinessScore,
            lastActiveDate: profile.lastActiveDate.toISOString(),
            updatedAt: profile.updatedAt.toISOString(),
          };
        }
      } catch (err) {
        // Disable DB attempts if database credentials or server are offline
        isDbAvailable = false;
      }
    }

    // Resilient fallback to in-memory progress store
    if (!progressStore.has(userId)) {
      const initialProgress: StudentProgress = {
        userId,
        name: userName,
        streakDays: 7,
        xpPoints: 3440,
        rank: calculateRank(3440),
        dailyPace: '1 hour/day',
        readinessScore: 64,
        lastActiveDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      progressStore.set(userId, initialProgress);
    }

    return progressStore.get(userId)!;
  },

  /**
   * Add XP Points to student progress, update streak and recalculate rank dynamically
   */
  async addXP(
    userId: string,
    xpAmount: number,
    activityName: string = 'Activity Completed'
  ): Promise<StudentProgress> {
    const current = await this.getProgress(userId);
    const newXP = current.xpPoints + xpAmount;
    const newRank = calculateRank(newXP);
    const now = new Date();

    // Check last active date to update streak if new day
    let streakDays = current.streakDays;
    const lastActive = new Date(current.lastActiveDate);
    const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      streakDays += 1;
    } else if (diffDays > 1) {
      // Reset streak if missed more than 1 day
      streakDays = 1;
    }

    const updatedProgress: StudentProgress = {
      ...current,
      xpPoints: newXP,
      rank: newRank,
      streakDays,
      lastActiveDate: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    if (isDbAvailable) {
      try {
        await prisma.profile.update({
          where: { userId },
          data: {
            xpPoints: newXP,
            rank: newRank,
            streakDays,
            lastActiveDate: now,
          },
        });
      } catch (err) {
        isDbAvailable = false;
      }
    }

    progressStore.set(userId, updatedProgress);
    return updatedProgress;
  },

  /**
   * Update student daily learning pace (e.g., '1 hour/day', '2 hours/day')
   */
  async updateDailyPace(userId: string, pace: string): Promise<StudentProgress> {
    const current = await this.getProgress(userId);
    const updated: StudentProgress = {
      ...current,
      dailyPace: pace,
      updatedAt: new Date().toISOString(),
    };

    if (isDbAvailable) {
      try {
        await prisma.profile.update({
          where: { userId },
          data: { dailyPace: pace },
        });
      } catch (err) {
        isDbAvailable = false;
      }
    }

    progressStore.set(userId, updated);
    return updated;
  },
};
