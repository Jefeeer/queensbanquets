import { getEnvironment } from './config/environment.js';
import { logger } from './lib/logger.js';

const environment = getEnvironment();

logger.info("Queen's Banquet Events backend initialized.", {
  environment: environment.nodeEnv,
  notificationsEnabled: environment.notificationsEnabled,
});
