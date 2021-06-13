import path from 'path';
import { fileURLToPath } from 'url';
import { Directive, ManifestoFileName } from '../constants.js';
import { logger } from '../logger.js';
import { kvp } from '../lib/kvp.js';
import { readJsonFile } from '../lib/file.js';
import { copyDirective } from './directives/copyDirective.js';
import { loopDirective } from './directives/loopDirective.js';
import { getViewModel } from './getViewModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDirectives(manifesto, selectedOptions) {
  const { directives } = manifesto;
  return directives
    .map(kvp)
    .filter((directive) => selectedOptions.includes(directive.key))
    .map((directive) => directive.value);
}

function getSelectedOptions(manifesto, config) {
  const { options } = manifesto;

  return Object.entries(options)
    .filter(([key, value]) => value.length >= 1)
    .map(([key, value]) => {
      if (value.includes(config[key])) {
        return `${key}:${config[key]}`;
      }

      //include the first option by default
      if (value.length >= 1) {
        return `${key}:${value[0]}`;
      }
    });
}

async function readManifesto(templateDir) {
  const manifestoPath = path.join(templateDir, ManifestoFileName);
  return await readJsonFile(manifestoPath);
}

export async function runDirectives(config, dir) {
  const { template } = config;
  const templateDir = path.resolve(__dirname, `../templates/${template}`);
  const manifesto = await readManifesto(templateDir);
  const viewModel = getViewModel({ config, manifesto, dir });
  const selectedOptions = getSelectedOptions(manifesto, config);
  const directives = getDirectives(manifesto, selectedOptions).map(kvp);

  logger.trace({ viewModel });

  for (const directive of directives) {
    if (directive.key === Directive.Copy) {
      const src = path.join(templateDir, directive.value.src);
      const dest = path.join(dir, directive.value.dest);
      await copyDirective({ src, dest, viewModel });
    }

    if (directive.key === Directive.Loop) {
      const src = path.join(templateDir, directive.value.src);
      const dest = path.join(dir, directive.value.dest);
      const { property } = directive.value;

      await loopDirective({ property, src, dest, viewModel });
    }
  }
}
