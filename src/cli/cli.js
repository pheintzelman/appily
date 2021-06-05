#!/usr/bin/env node
import { readConfig } from './readConfig.js';
import { createApp } from '../create/createApp.js';
import { logger, logLevel } from '../logger.js';

const [, , ...args] = process.argv;

async function main() {
  logger.level = logLevel.trace;
  const config = await readConfig(args[0]);
  logger.trace({ config });
  await createApp(config);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
