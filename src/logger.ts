import pino from 'pino';
import dotenvSafe from 'dotenv-safe';
import pinoExpressLogger from 'express-pino-logger';

dotenvSafe.config();

export const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

export const httpLogger = pinoExpressLogger();

export default logger;
