const fsModule = require('fs');
const fs = fsModule.promises;

async function dirExists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}

module.exports = { dirExists };
