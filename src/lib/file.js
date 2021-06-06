import fsModule from 'fs';
const fs = fsModule.promises;

export async function readJsonFile(path) {
  const file = await fs.readFile(path, 'utf8');
  return JSON.parse(file);
}

export async function dirExists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}
