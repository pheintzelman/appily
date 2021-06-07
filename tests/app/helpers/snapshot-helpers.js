import fsModule from 'fs';
const fs = fsModule.promises;
import path from 'path';

export async function removeDir(dir) {
  return await fs.rmdir(dir, { recursive: true });
}

export async function getSanpshotTestCases(dir, testCases = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const nextDir = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await getSanpshotTestCases(nextDir, testCases);
    } else {
      const file = await fs.readFile(nextDir, 'utf8');
      const testCase = { name: entry.name, dir: nextDir, snapshot: file };
      testCases.push(testCase);
    }
  }

  return testCases;
}

export function getSanpshotTestCasesSync(dir, testCases = []) {
  const entries = fsModule.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const nextDir = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getSanpshotTestCasesSync(nextDir, testCases);
    } else {
      const file = fsModule.readFileSync(nextDir, 'utf8');
      const testCase = { name: entry.name, dir: nextDir, snapshot: file };
      testCases.push(testCase);
    }
  }

  return testCases;
}
