import { getVariations } from '../../lib/case.js';
import { getSelectedOptions } from '../manifesto/processManifesto.js';
import { getViewModelModels } from './getViewModelModels.js';

function addOffset(string, offset) {
  const words = string.split('\n');
  return words
    .map((word) => {
      return word.padStart(offset, ' ');
    })
    .join('\n');
}

function getFlags(config, manifesto) {
  const optionFlags = getSelectedOptions(manifesto, config).reduce(
    (optionFlags, option) => {
      const parts = option.split(':');
      const flag = parts[1];
      optionFlags[flag] = true;
      return optionFlags;
    },
    {}
  );

  return { ...optionFlags, sequelize: Boolean(optionFlags.postgres) };
}

export function getViewModel({ config, manifesto, dir }) {
  return {
    ...getVariations('appName', config.name),
    dir,
    templateName: manifesto.name,
    templateVersion: manifesto.version,
    models: getViewModelModels({ config, manifesto, dir }),
    configString: addOffset(JSON.stringify(config, null, 2), 2),
    flags: getFlags(config, manifesto)
  };
}
