import util from 'util';
import { getVariations } from '../lib/case.js';
import { getDefaultValueForType } from './viewModel/getDefaultValueForType.js';

function getDefaultState(properties) {
  return properties.reduce((acc, { propertyNameCamel, type }) => {
    return { ...acc, [propertyNameCamel]: getDefaultValueForType(type) };
  }, {});
}

function typeFlags(type) {
  return { isString: type === 'String', isBoolean: type === 'Boolean' };
}

function preprocessProperty([propertyName, property]) {
  return {
    ...getVariations('propertyName', propertyName),
    type: property,
    ...typeFlags(property)
  };
}

function preprocessProperties(properties) {
  if (!properties) {
    return [];
  }

  return Object.entries(properties).map(preprocessProperty);
}

function preprocessModel([modelName, model]) {
  const properties = preprocessProperties(model);

  return {
    properties,
    defaultState: util.inspect(getDefaultState(properties)),
    ...getVariations('modelName', modelName)
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
    ...getVariations('appName', config.name),
    dir,
    templateName: manifesto.name,
    templateVersion: manifesto.version,
    models: preprocessModels({ config, manifesto, dir }),
    configString: JSON.stringify(config, null, 2)
  };
}
