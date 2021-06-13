import { createRootDir } from './file/createRootDir.js';
import { runDirectives } from './runDirectives.js';

export async function createApp(config) {
  const dir = await createRootDir(config);
  await runDirectives(config, dir);
}
