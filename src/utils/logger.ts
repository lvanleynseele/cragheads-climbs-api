import winston from 'winston';
import path from 'path';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, service, timestamp }) => {
  return `${timestamp} [${service}] ${level}: ${message}`;
});
const logFolder = path.resolve(__dirname, '../../logs');

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'green',
});

const logger = createLogger({
  format: combine(errors({ stack: true }), timestamp(), logFormat),
  defaultMeta: { service: 'cragheads' },
  exceptionHandlers: [
    new transports.File({ filename: `${logFolder}/exceptions.log` }),
    new transports.Console({
      format: combine(colorize({ all: true }), timestamp(), logFormat),
    }),
  ],
});

// Skip logging on test runs
if (process.env.NODE_ENV !== 'test') {
  logger.add(
    new transports.File({
      filename: `${logFolder}/error.log`,
      level: 'error',
    }),
  );
  logger.add(
    new transports.Console({
      format: combine(colorize({ all: true }), timestamp(), logFormat),
      level: process.env.LOGGING_LEVEL ?? 'info',
    }),
  );
  // Only log to files in development
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.File({
        filename: `${logFolder}/combined.log`,
        level: 'info',
      }),
    );
  }
}

export default logger;
