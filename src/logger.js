import pino from 'pino';

export const logger = pino({
  prettyPrint: {
    levelFirst: true
  }
});

export const logLevel = logger.levels.values;
