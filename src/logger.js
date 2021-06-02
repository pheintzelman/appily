const pino = require('pino');
const logger = pino({
  prettyPrint: {
    levelFirst: true
  }
});

module.exports = { logger, logLevel: logger.levels.values };
