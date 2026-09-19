import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { studentRouter } from './routes/student';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);

app.use(errorHandler);

