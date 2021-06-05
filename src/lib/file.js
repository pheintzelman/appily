import fsModule from 'fs';
const fs = fsModule.promises;

export async function dirExists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}
