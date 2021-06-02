const { createDir } = require('./createDir');

async function createApp(config) {
  await createDir(config);
}

module.exports = { createApp };
