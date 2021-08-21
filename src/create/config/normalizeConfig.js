import { isObject } from '../../lib/check.js';

function normalizeProperty([propertyName, property]) {
  if (isObject(property) && property.type) {
    return { ...property, propertyName };
  }

  return { type: property, propertyName };
}

function objectMap(object, fn) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[key] = fn(value);
    return acc;
  }, {});
}

function normalizeModel([modelName, model]) {
  const properties = model && model.properties ? model.properties : model;
  const normalizedProperties =
    Object.entries(properties).map(normalizeProperty);

  if (model && model.properties) {
    return { ...model, modelName, properties: normalizedProperties };
  }

  return { properties: normalizedProperties, modelName };
}

export function normalizeConfig(config) {
  if (!config) {
    throw Error(ConfigIsEmpty());
  }

  const { models = [] } = config;
  const normalizedModels = Object.entries(models).map(normalizeModel);

  return { ...config, models: normalizedModels };
}
