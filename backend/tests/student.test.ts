import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';

describe('Real-Time Student Adaptive Learning & Progress API Tests', () => {
  let authToken: string;

  beforeAll(async () => {
    // Authenticate with seeded student account
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'rahul.python@edunexa.edu',
      password: 'Student123!',
    });

    authToken = loginRes.body.data?.accessToken || '';
  }, 15000);

  it(
    'GET /api/student/dashboard - should return logged-in student payload (Profile, Track, Assessment, Skills, Rules, Assignments, Performance)',
    async () => {
      const res = await request(app)
        .get('/api/student/dashboard')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.studentInfo.email).toBe('rahul.python@edunexa.edu');
      expect(res.body.data.studentInfo.name).toBe('Rahul Sharma');
      expect(res.body.data.studentInfo.targetTrack).toBe('Python & Data Science Fundamentals');
      expect(res.body.data.assessment.score).toBe(48);
      expect(res.body.data.skillRequirements.length).toBeGreaterThan(0);
      expect(res.body.data.learningRules.length).toBeGreaterThan(0);
      expect(res.body.data.assignments.length).toBeGreaterThan(0);
      expect(res.body.data.performanceData).toBeDefined();
    },
    15000
  );

  it(
    'GET /api/student/adaptive-recommendation - should evaluate rules based on student score',
    async () => {
      const res = await request(app)
        .get('/api/student/adaptive-recommendation')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.decisionEngineResult.recommendedTrack).toContain('Python');
      expect(res.body.data.decisionEngineResult.decisionReason).toBeDefined();
    },
    15000
  );

  it(
    'GET /api/student/assignments - should return personalized assignments',
    async () => {
      const res = await request(app)
        .get('/api/student/assignments')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.assignments.length).toBeGreaterThan(0);
    },
    15000
  );

  it(
    'GET /api/student/progress - should return student progress stats',
    async () => {
      const res = await request(app)
        .get('/api/student/progress')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.streakDays).toBeDefined();
      expect(res.body.data.xpPoints).toBeDefined();
    },
    15000
  );

  it(
    'POST /api/student/progress/xp - should add XP points',
    async () => {
      const res = await request(app)
        .post('/api/student/progress/xp')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ amount: 60, activity: 'Completed Python Control Flow Lab' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.xpPoints).toBeGreaterThan(1400);
    },
    15000
  );

  it(
    'PATCH /api/student/progress/pace - should update student daily pace',
    async () => {
      const res = await request(app)
        .patch('/api/student/progress/pace')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ pace: '2 hours/day' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.dailyPace).toBe('2 hours/day');
    },
    15000
  );
});
