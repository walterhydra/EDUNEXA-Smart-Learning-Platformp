import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';

const prisma = new PrismaClient();

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
  createdAt: string;
}

// In-memory fallback dataset for 3 students if database is unreachable during dev
const userStore = new Map<string, UserRecord>();

let isDbAvailable = true;

// Initialize standard 3 student accounts + 1 admin account in fallback store
(async () => {
  const salt = await bcrypt.genSalt(10);
  const commonPassword = await bcrypt.hash('Student123!', salt);
  const adminPass = await bcrypt.hash('AdminPass123!', salt);

  const student1: UserRecord = {
    id: 'usr_student_1_rahul',
    email: 'rahul.python@edunexa.edu',
    passwordHash: commonPassword,
    name: 'Rahul Sharma',
    role: 'STUDENT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const student2: UserRecord = {
    id: 'usr_student_2_priya',
    email: 'priya.fullstack@edunexa.edu',
    passwordHash: commonPassword,
    name: 'Priya Patel',
    role: 'STUDENT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const student3: UserRecord = {
    id: 'usr_student_3_arjun',
    email: 'arjun.ai@edunexa.edu',
    passwordHash: commonPassword,
    name: 'Arjun Verma',
    role: 'STUDENT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const adminUser: UserRecord = {
    id: 'usr_admin_sarah',
    email: 'admin@edunexa.ai',
    passwordHash: adminPass,
    name: 'Dr. Sarah Vance',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  userStore.set(student1.email.toLowerCase(), student1);
  userStore.set(student2.email.toLowerCase(), student2);
  userStore.set(student3.email.toLowerCase(), student3);
  userStore.set(adminUser.email.toLowerCase(), adminUser);
})();

export const userService = {
  async findByEmail(email: string): Promise<UserRecord | null> {
    const key = email.trim().toLowerCase();
    if (isDbAvailable) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: key },
          include: { profile: true },
        });
        if (user) {
          return {
            id: user.id,
            email: user.email,
            passwordHash: user.passwordHash,
            name: user.profile?.name || 'Student User',
            role: user.role,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          };
        }
      } catch (err) {
        isDbAvailable = false;
      }
    }
    return userStore.get(key) || null;
  },

  async findById(id: string): Promise<UserRecord | null> {
    if (isDbAvailable) {
      try {
        const user = await prisma.user.findUnique({
          where: { id },
          include: { profile: true },
        });
        if (user) {
          return {
            id: user.id,
            email: user.email,
            passwordHash: user.passwordHash,
            name: user.profile?.name || 'Student User',
            role: user.role,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          };
        }
      } catch (err) {
        isDbAvailable = false;
      }
    }
    for (const user of userStore.values()) {
      if (user.id === id) return user;
    }
    return null;
  },

  async isEmailTaken(email: string): Promise<boolean> {
    const key = email.trim().toLowerCase();
    if (isDbAvailable) {
      try {
        const count = await prisma.user.count({ where: { email: key } });
        return count > 0;
      } catch (err) {
        isDbAvailable = false;
      }
    }
    return userStore.has(key);
  },

  async createUser(data: {
    email: string;
    password: string;
    name: string;
    role?: 'STUDENT' | 'ADMIN';
  }): Promise<UserRecord> {
    const key = data.email.trim().toLowerCase();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    if (isDbAvailable) {
      try {
        const created = await prisma.user.create({
          data: {
            email: key,
            passwordHash,
            role: data.role || 'STUDENT',
            profile: {
              create: {
                name: data.name.trim(),
                targetTrack: 'General Software Engineering & Skill Diagnostic Track',
                streakDays: 0,
                xpPoints: 0,
                rank: 'Novice Learner (Level 1)',
                dailyPace: '1 hour/day',
                readinessScore: 0,
                education: 'Self-Learner (New Account)',
                institution: 'EduNexa Student Portal',
              },
            },
            assessments: {
              create: {
                title: 'Initial Diagnostic Skill Assessment',
                subject: 'General Foundations',
                score: 0,
                totalMarks: 100,
                level: 'Unassessed',
                weakAreas: ['Diagnostic Test Pending - Complete assessment to identify skill gaps'],
                strongAreas: ['New Account Registered - Ready to start learning!'],
              },
            },
            skillRequirements: {
              create: [
                { skillName: 'Programming Fundamentals', category: 'Foundation', currentProficiency: 0, requiredProficiency: 80, status: 'NOT_STARTED' },
                { skillName: 'Logic & Problem Solving', category: 'Core Competency', currentProficiency: 0, requiredProficiency: 80, status: 'NOT_STARTED' },
                { skillName: 'Web & System Basics', category: 'Target Skill', currentProficiency: 0, requiredProficiency: 75, status: 'NOT_STARTED' },
              ],
            },
            learningRules: {
              create: [
                {
                  condition: 'New Account (Score: 0%)',
                  recommendation: 'Complete Diagnostic Assessment to Generate AI Learning Path',
                  actionItem: 'Take initial diagnostic skill assessment in Skill Assessments tab',
                  appliedStatus: 'PENDING_ASSESSMENT',
                },
              ],
            },
            assignments: {
              create: [
                {
                  title: 'Welcome Lab: Complete Diagnostic Assessment',
                  subject: 'Onboarding',
                  description: 'Take your first skill diagnostic test to help NexaAI understand your strengths and customize your learning path.',
                  difficulty: 'Easy',
                  dueDate: new Date(Date.now() + 86400000),
                  status: 'PENDING',
                  xpReward: 100,
                },
              ],
            },
            performanceData: {
              create: {
                overallAccuracy: 0.0,
                completedLabs: 0,
                totalLabsAssigned: 1,
                recommendedTrack: 'Diagnostic Assessment Recommended',
                decisionReason: 'New account registered. Take your initial diagnostic test to unlock customized assignments.',
              },
            },
          },
          include: { profile: true },
        });
        return {
          id: created.id,
          email: created.email,
          passwordHash: created.passwordHash,
          name: created.profile?.name || data.name,
          role: created.role,
          createdAt: created.createdAt.toISOString(),
          updatedAt: created.updatedAt.toISOString(),
        };
      } catch (err) {
        isDbAvailable = false;
      }
    }

    const newUser: UserRecord = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: key,
      passwordHash,
      name: data.name.trim(),
      role: data.role || 'STUDENT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userStore.set(key, newUser);
    return newUser;
  },

  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  },

  generateTokens(user: { id: string; email: string; role: 'STUDENT' | 'ADMIN'; name: string }) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, config.jwtAccessSecret, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ sub: user.id }, config.jwtRefreshSecret, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  },

  verifyAccessToken(token: string) {
    return jwt.verify(token, config.jwtAccessSecret) as {
      sub: string;
      email: string;
      role: 'STUDENT' | 'ADMIN';
      name: string;
    };
  },

  verifyRefreshToken(token: string) {
    return jwt.verify(token, config.jwtRefreshSecret) as { sub: string };
  },

  sanitizeUser(user: UserRecord): UserProfile {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  },
};
