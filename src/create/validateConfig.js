import { AllowedConfigProperties } from '../constants/constants.js';
import {
  ConfigIsEmpty,
  ConfigPropertyNotSupported,
  TemplateOptionNotSupported,
  TypeNotSupported
} from '../constants/messages.js';
import { logger } from '../logger.js';

function validateModelProperties({ modelName, model, allowedTypes }) {
  Object.entries(model).forEach(([propertyName, property]) => {
    if (!allowedTypes.includes(property)) {
      logger.warn(TypeNotSupported(modelName, propertyName, property));
    }
  });
}

function validateModels(config, manifesto) {
  const { models } = config;
  const { allowedTypes = [] } = manifesto;

  if (!models) {
    return;
  }

  Object.entries(models).forEach(([modelName, model]) => {
    validateModelProperties({ modelName, model, allowedTypes });
  });
}

function validateOptions(config, manifesto) {
  const { options } = manifesto;

  if (!options) {
    return;
  }

  Object.entries(options).forEach(([key, value]) => {
    const { [key]: configValue } = config;

    if (configValue && !value.includes(configValue)) {
      logger.warn(TemplateOptionNotSupported(key, configValue));
    }
  });
}

function validateConfigProperties(config) {
  Object.keys(config).forEach((key) => {
    if (!AllowedConfigProperties.includes(key)) {
      logger.warn(ConfigPropertyNotSupported(key));
    }
  });
}

export function validateConfig(config, manifesto) {
  if (!config) {
    throw Error(ConfigIsEmpty());
  }

  validateConfigProperties(config);
  validateOptions(config, manifesto);
  validateModels(config, manifesto);
}
