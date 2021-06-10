import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Copyright } from '../constants.js';

export const handleArgs = yargs(hideBin(process.argv))
  .scriptName('create-app')
  .usage('$0 <command> [args]')
  .command({
    command: '$0 <config file>',
    description: 'configuration file for creating your app',
    alias: 'configfile'
  })
  .options({
    v: {
      alias: 'verbose',
      demandOption: false,
      describe: 'enable verbose (trace) level logging',
      type: 'boolean'
    },
    h: { alias: ['h', 'help'] }
  })
  .epilog(`${Copyright}`).argv;
