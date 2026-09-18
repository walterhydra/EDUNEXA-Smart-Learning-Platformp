import { app } from './app';
import { config } from './config/env';
import { logger } from './middleware/logger';

app.listen(config.port, () => {
  logger.info(`SkillSense AI Backend running on port ${config.port} in ${config.nodeEnv} mode`);
});
