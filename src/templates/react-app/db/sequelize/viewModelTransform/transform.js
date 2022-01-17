import { getSequelizeType } from './getSequelizeType.js';

function transformProperties(properties) {
  return properties.map((property) => {
    const { type } = property;
    return {
      ...property,
      sequelizeType: getSequelizeType(type)
    };
  });
}

function transformModels(models) {
  return models.map((model) => {
    const { properties } = model;
    return {
      ...model,
      properties: transformProperties(properties)
    };
  });
}

export function transform(viewModel, logger) {
  const { models } = viewModel;
  return { ...viewModel, models: transformModels(models) };
}
