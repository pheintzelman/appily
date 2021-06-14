import { pascalCase, camelCase } from '../lib/case.js';

function preprocessModel([modelName, model]) {
  return {
    properties: model,
    modelName,
    modelNamePascal: pascalCase(modelName),
    modelNameCamel: camelCase(modelName)
  };
}

function preprocessModels({ config, manifesto, dir }) {
  if (!config.models) {
    return [];
  }

  return Object.entries(config.models).map(preprocessModel);
}

export function getViewModel({ config, manifesto, dir }) {
  return {
    appName: config.name,
    dir,
    templateName: manifesto.name,
    templateVersion: manifesto.version,
    models: preprocessModels({ config, manifesto, dir })
  };
}
