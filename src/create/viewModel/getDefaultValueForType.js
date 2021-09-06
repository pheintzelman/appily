import { Type } from '../../constants/constants.js';

const defaultValues = {
  [Type.Boolean]: false,
  [Type.String]: ''
};

export function getDefaultValueForType(type) {
  if (defaultValues.hasOwnProperty(type)) {
    return defaultValues[type];
  }

  return null;
}
