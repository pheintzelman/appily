import util from 'util';
import { preprocessProperties } from './properties.js';
import { getVariations } from '../../lib/case.js';
import { DefaultPluralSuffix } from '../../constants/constants.js';
import { getDefaultValueForType } from './getDefaultValueForType.js';
import { getComponentImports } from './getComponentImports.js';

function getDefaultState(properties) {
  return properties.reduce((acc, { propertyNameCamel, type }) => {
    return { ...acc, [propertyNameCamel]: getDefaultValueForType(type) };
  }, {});
}

function getPluralModelName(modelName, model) {
  if (model && model.properties && model.plural) {
    return model.plural;
  }

  return `${modelName} ${DefaultPluralSuffix}`;
}

function preprocessModel([modelName, model]) {
  const properties = preprocessProperties(model.properties);
  const pluralName = getPluralModelName(modelName, model);

  return {
    properties,
    defaultState: util.inspect(getDefaultState(properties)),
    ...getVariations('modelName', modelName),
    ...getVariations('pluralModelName', pluralName),
    componentImports: getComponentImports(properties)
  };
}

export function preprocessModels({ config, manifesto, dir }) {
  if (!config.models) {
    return [];
  }

  return Object.entries(config.models).map(preprocessModel);
}
