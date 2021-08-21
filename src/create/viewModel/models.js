import util from 'util';
import { preprocessProperties, getPrimaryProperty } from './properties.js';
import { getVariations } from '../../lib/case.js';
import { DefaultPluralSuffix } from '../../constants/constants.js';
import { getDefaultValueForType } from './getDefaultValueForType.js';

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

function preprocessModel(model) {
  const { modelName } = model;
  const properties = preprocessProperties(model.properties);
  const pluralName = getPluralModelName(modelName, model);
  const primaryProperty = getPrimaryProperty(model.properties);

  return {
    properties,
    ...getVariations('primaryProperty', primaryProperty),
    defaultState: util.inspect(getDefaultState(properties)),
    ...getVariations('modelName', modelName),
    ...getVariations('pluralModelName', pluralName)
  };
}

export function preprocessModels({ config, manifesto, dir }) {
  if (!config.models) {
    return [];
  }

  return config.models.map(preprocessModel);
}
