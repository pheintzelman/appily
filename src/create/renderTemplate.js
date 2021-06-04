const fsModule = require('fs');
const fs = fsModule.promises;
const path = require('path');
const { logger } = require('../logger');
const { dirExists } = require('../lib/file');
const { renderFile } = require('./renderFile');
const { TemplateExt } = require('../constants');

async function copyFile({ src, dest, viewModel }) {
  const isTemplateFile = src.includes(TemplateExt);
  if (isTemplateFile) {
    return await renderFile({ src, dest, viewModel });
  }

  await fs.copyFile(src, dest);
  logger.debug(`File copied: ${dest}`);
}

async function copyTemplate({ src, dest, viewModel }) {
  logger.trace({ msg: 'copyDir', src, dest });

  const entries = await fs.readdir(src, { withFileTypes: true });

  if (!(await dirExists(dest))) {
    await fs.mkdir(dest);
  }

  for (entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile({ src: srcPath, dest: destPath, viewModel });
    }
  }
}

async function renderTemplate(config, dest) {
  const { template } = config;
  const templateDir = path.resolve(__dirname, `../templates/${template}`);
  const src = path.join(templateDir, 'app');
  const viewModel = { appName: config.name };

  await copyTemplate({ src, dest, viewModel });
}

module.exports = { renderTemplate };
