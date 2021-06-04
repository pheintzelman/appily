const { createDir } = require('./createDir');
const { renderTemplate } = require('./renderTemplate');

async function createApp(config) {
  const dir = await createDir(config);
  await renderTemplate(config, dir);
}

module.exports = { createApp };
