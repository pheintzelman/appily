import { mapTypeToComponent, mapTypeToFlex } from './typeMappers.js';
import { getComponentImports } from './getComponentImports.js';

function transformProperties(properties) {
  return properties.map((property) => {
    const { type } = property;
    return {
      ...property,
      component: mapTypeToComponent(type),
      flex: mapTypeToFlex(type)
    };
  });
}

function transformModels(models) {
  return models.map((model) => {
    const { properties } = model;
    return {
      ...model,
      properties: transformProperties(properties),
      componentImports: getComponentImports(properties)
    };
  });
}

export function addComponents(viewModel, logger) {
  const { models } = viewModel;
  return { ...viewModel, models: transformModels(models) };
}
