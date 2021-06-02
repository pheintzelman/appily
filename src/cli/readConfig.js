const fsModule = require("fs");
const fs = fsModule.promises;

const FileOk = fsModule.constants.F_OK;

async function readJsonFile(path) {
  const data = await fs.readFile(path);
  return JSON.parse(data);
}

async function fileExists(path) {
  await fs.access(path, FileOk);
  return true;
}

async function readConfig(path) {
  await fileExists(path);
  return await readJsonFile(path);
}

module.exports = { readConfig };
