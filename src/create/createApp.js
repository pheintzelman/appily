import { createDir } from './createDir.js';
import { renderTemplate } from './renderTemplate.js';

export async function createApp(config) {
  const dir = await createDir(config);
  await renderTemplate(config, dir);
}
