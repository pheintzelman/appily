import { isObject } from '../../lib/check.js';

function normalizeProperty(property) {
  if (isObject(property) && property.type) {
    return property;
  }

  return { type: property };
}

function objectMap(object, fn) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[key] = fn(value);
    return acc;
  }, {});
}

function normalizeModel(model) {
  const properties = model && model.properties ? model.properties : model;
  const normalizedProperties = objectMap(properties, normalizeProperty);

  if (model && model.properties) {
    return { ...model, properties: normalizedProperties };
  }

  return { properties: normalizedProperties };
}

export function normalizeConfig(config) {
  if (!config) {
    throw Error(ConfigIsEmpty());
  }

  const { models = [] } = config;
  const normalizedModels = objectMap(models, normalizeModel);

  return { ...config, models: normalizedModels };
}
