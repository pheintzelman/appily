import { getVariations } from '../lib/case.js';
import { preprocessModels } from './viewModel/models.js';

export function getViewModel({ config, manifesto, dir }) {
  return {
    ...getVariations('appName', config.name),
    dir,
    templateName: manifesto.name,
    templateVersion: manifesto.version,
    models: preprocessModels({ config, manifesto, dir }),
    configString: JSON.stringify(config, null, 2)
  };
}
