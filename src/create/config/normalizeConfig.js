import { isObject } from '../../lib/check.js';
import { setDefaults } from './setDefaults.js';
import { ConfigIsEmpty } from './../../constants/messages.js';
import { Type } from '../../constants/constants.js';

function isModelType(models, type) {
  return models.some(([modelName, model]) => modelName === type);
}

function normalizeProperty([propertyName, property], models) {
  const initialType = property.type ?? property;
  const isCollection = Array.isArray(initialType);
  const configType = isCollection ? initialType[0] : initialType;
  const modelType = isModelType(models, configType);
  const type = modelType ? Type.Model : configType;
  const model = modelType ? { model: configType } : {};

  if (isObject(property) && property.type) {
    return { ...property, type, isCollection, propertyName, ...model };
  }

  return { type, isCollection, propertyName, ...model };
}

function normalizeModel([modelName, model]) {
  const properties = model && model.properties ? model.properties : model;
  const normalizedProperties = Object.entries(properties).map((property) =>
    normalizeProperty(property, models)
  );

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
