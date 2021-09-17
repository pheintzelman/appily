#!/usr/bin/env node
import { handleArgs } from './handleArgs.js';
import { readConfig } from './readConfig.js';
import { createApp } from '../create/createApp.js';
import { logger, logLevel } from '../logger.js';

const argv = handleArgs(process.argv);

async function main() {
  if (argv.v) {
    logger.level = logLevel.trace;
  }

  const options = {
    overwrite: argv.w
  };

  const config = await readConfig(argv.configFile);
  logger.trace({ config });
  await createApp(config, options);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
