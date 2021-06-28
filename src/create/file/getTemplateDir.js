import path from 'path';
import { fileURLToPath } from 'url';

// Isolating this will help with coverage check errors
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getTemplateDir(config) {
  const { template } = config;
  return path.resolve(__dirname, `../../templates/${template}`);
}
