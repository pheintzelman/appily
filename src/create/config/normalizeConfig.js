import { isObject } from '../../lib/check.js';
import { setDefaults } from './setDefaults.js';
import { ConfigIsEmpty } from './../../constants/messages.js';

function isRequired(propertyName) {
  if (propertyName.trim()[propertyName.length - 1] === '*') {
    return {
      propertyName: propertyName.trim().slice(0, propertyName.length - 1),
      required: true
    };
  }

  return { propertyName, required: false };
}

function normalizeProperty([propertyNameInit, property]) {
  const { propertyName, required } = isRequired(propertyNameInit);

  if (isObject(property) && property.type) {
    return {
      ...property,
      propertyName,
      required: required || property.required
    };
  }

  return { type: property, propertyName, required };
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
