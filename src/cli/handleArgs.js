import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export function handleArgs(args) {
  return yargs(hideBin(args))
    .scriptName('appily')
    .usage('$0 <command> [args]')
    .command({
      command: '$0 <configFile>',
      description: 'configuration file for creating your app'
    })
    .options({
      v: {
        alias: 'verbose',
        demandOption: false,
        describe: 'enable verbose (trace) level logging',
        type: 'boolean'
      },
      h: { alias: ['h', 'help'] }
    }).argv;
}
