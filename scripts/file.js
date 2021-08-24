import fsModule from 'fs';
const fs = fsModule.promises;

export async function removeDir(dir) {
  return await fs.rmdir(dir, { recursive: true });
}

export async function writeJsonFile(dest, content) {
  await fs.writeFile(dest, JSON.stringify(content), 'utf8');
}
