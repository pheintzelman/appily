import { AllowedConfigProperties } from '../../constants/constants.js';
import {
  ConfigIsEmpty,
  ConfigPropertyNotSupported,
  TemplateOptionNotSupported,
  TypeNotSupported,
  TypeSelfReferenced
} from '../../constants/messages.js';
import { logger } from '../../logger.js';

function validateModelProperties({
  model: { modelName, properties },
  allowedTypes
}) {
  properties.forEach((property) => {
    const { propertyName, model } = property;
    const type = model ? model : property.type;

    if (type === modelName) {
      logger.warn(TypeSelfReferenced(modelName, propertyName));
    }

    if (!allowedTypes.includes(type)) {
      logger.warn(TypeNotSupported(modelName, propertyName, type));
    }
  });
}

function validateModels(config, manifesto) {
  const { models } = config;
  const { allowedTypes = [] } = manifesto;

  if (!models) {
    return;
  }

  const customTypes = models.map((model) => model.modelName);
  models.forEach((model) => {
    validateModelProperties({
      model,
      allowedTypes: [...customTypes, ...allowedTypes]
    });
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
