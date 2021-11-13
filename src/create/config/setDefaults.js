import {
  DefaultAppName,
  DefaultPluralSuffix,
  DefaultTemplate,
  Type
} from '../../constants/constants.js';

function getPropertyWithDefaults(property) {
  const type = property.type ?? Type.String;
  if (type === Type.Boolean) {
    return { defaultValue: false, ...property, type };
  }

  return { ...property, type };
}

function getModelWithDefaults(model) {
  const { properties, modelName } = model;
  const propertiesWithDefaults = properties.map(getPropertyWithDefaults);
  const pluralName = model.pluralName ?? `${modelName} ${DefaultPluralSuffix}`;

  return { ...model, pluralName, properties: propertiesWithDefaults };
}

export function setDefaults(config) {
  const { models } = config;
  const name = config.name ?? DefaultAppName;
  const template = config.template ?? DefaultTemplate;

  const modelsWithDefaults = models.map(getModelWithDefaults);

  return { ...config, name, template, models: modelsWithDefaults };
}
