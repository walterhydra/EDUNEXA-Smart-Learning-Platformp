import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { healthRouter } from './routes/health';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());

app.use('/api', healthRouter);

app.use(errorHandler);
