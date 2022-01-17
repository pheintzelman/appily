import util from 'util';
import {
  getViewModelProperties,
  getPrimaryProperty
} from './getViewModelProperties.js';
import { getVariations } from '../../lib/case.js';
import { getDefaultValueForType } from './getDefaultValueForType.js';
import { getModelRelationships } from './getModelRelationships.js';
import { logger } from '../../logger.js';

function getDefaultState(properties) {
  return properties.reduce((acc, { propertyNameCamel, type }) => {
    return { ...acc, [propertyNameCamel]: getDefaultValueForType(type) };
  }, {});
}

function getViewModelModel(model, _, models) {
  const { modelName, pluralName } = model;
  const relationships = getModelRelationships(models, model);
  const properties = getViewModelProperties(model.properties, relationships);
  const primaryProperty = getPrimaryProperty(model.properties);
  const relationships = getModelRelationships(models, model);
  logger.info({ modelName, relationships });
  return {
    properties,
    relationships,
    ...getVariations('primaryProperty', primaryProperty),
    defaultState: util.inspect(getDefaultState(properties)),
    ...getVariations('modelName', modelName),
    ...getVariations('pluralModelName', pluralName)
  };
}

export function getViewModelModels({ config, manifesto, dir }) {
  if (!config.models) {
    return [];
  }

  return config.models.map(getViewModelModel);
}
