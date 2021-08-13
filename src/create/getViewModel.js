import { getVariations } from '../lib/case.js';
import { preprocessModels } from './viewModel/models.js';

function addOffset(string, offset) {
  const words = string.split('\n');
  return words
    .map((word) => {
      return word.padStart(offset, ' ');
    })
    .join('\n');
}

export function getViewModel({ config, manifesto, dir }) {
  return {
    ...getVariations('appName', config.name),
    dir,
    templateName: manifesto.name,
    templateVersion: manifesto.version,
    models: preprocessModels({ config, manifesto, dir }),
    configString: addOffset(JSON.stringify(config, null, 2), 2)
  };
}
