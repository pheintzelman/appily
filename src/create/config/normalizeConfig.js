import { isObject } from '../../lib/check.js';
import { setDefaults } from './setDefaults.js';
import { ConfigIsEmpty } from './../../constants/messages.js';

function normalizeProperty([propertyName, property]) {
  const initialType = property.type ?? property;
  const isCollection = Array.isArray(initialType);
  const type = isCollection ? initialType[0] : initialType;

  if (isObject(property) && property.type) {
    return { ...property, type, isCollection, propertyName };
  }

  return { type, isCollection, propertyName };
}

function normalizeModel([modelName, model]) {
  const properties = model && model.properties ? model.properties : model;
  const normalizedProperties =
    Object.entries(properties).map(normalizeProperty);

  if (model && model.properties) {
    const { plural, ...cleanModel } = model;

    return {
      ...cleanModel,
      pluralName: plural,
      modelName,
      properties: normalizedProperties
    };
  }

  return { properties: normalizedProperties, modelName };
}

export function normalizeConfig(config) {
  if (!config) {
    throw Error(ConfigIsEmpty());
  }

  const { models = [] } = config;
  const normalizedModels = Object.entries(models).map(normalizeModel);
  const normalizedConfig = { ...config, models: normalizedModels };
  return setDefaults(normalizedConfig);
}
