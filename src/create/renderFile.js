const fsModule = require('fs');
const fs = fsModule.promises;
const mustache = require('mustache');
const { logger } = require('../logger');
const { TemplateExt } = require('../constants');

function renameDest(dest) {
  return dest.replace(TemplateExt, '');
}

async function renderFile({ src, dest: destIn, viewModel }) {
  const mustacheFile = await fs.readFile(src, 'utf8');
  const file = mustache.render(mustacheFile, viewModel);
  const dest = renameDest(destIn);

  await fs.writeFile(dest, file, 'utf8');
  logger.info(`File rendered: ${dest}`);
}

module.exports = { renderFile };
