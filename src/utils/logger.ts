import winston from 'winston';
import path from 'path';
import { log } from 'console';

const { createLogger, format, transports } = winston;
const { printf } = format;

const logFormat = printf(({ level, message, service, timestamp }) => {
  return `${timestamp} [${service}] ${level}: ${message}`;
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'green',
});

const logger = createLogger({
  format: logFormat,
  defaultMeta: { service: 'cragheads-climbs-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), logFormat),
    }),
  ],
});

export default logger;
