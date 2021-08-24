import { removeDir, writeJsonFile } from './file.js';
import { cleanLog, sortLog } from './log.js';
import { runCommand } from './runCommand.js';
import { runCommandFork } from './runCommandFork.js';

async function setupApp({ configPath, dir }) {
  let log = [];
  await removeDir(dir);
  await runCommand(`appily ${configPath} -v`, log);
  await writeJsonFile(`${dir}-log.json`, sortLog(cleanLog(log)));
}

await setupApp({
  dir: 'tests/app/video-game-app-indexeddb',
  configPath: 'tests/app/config/react-indexedDb.json'
});

const update = process.argv.includes('-u');
const args = update ? ['--coverage', '-u'] : ['--coverage'];

const code = await runCommandFork('node_modules/jest/bin/jest.js', args, {
  execArgv: ['--experimental-vm-modules']
});

process.exit(code);
