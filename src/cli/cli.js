#!/usr/bin/env node
const { readConfig } = require('./readConfig');
const { createApp } = require('../create/createApp');
const { logger, logLevel } = require('../logger');

const [, , ...args] = process.argv;

async function main() {
  logger.level = logLevel.trace;
  const config = await readConfig(args[0]);
  await createApp(config);
  logger.trace({ config });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
