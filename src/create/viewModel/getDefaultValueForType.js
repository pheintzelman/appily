import { Type } from '../../constants/constants.js';

const defaultValues = {
  [Type.Boolean]: false,
  [Type.String]: '',
  [Type.Model]: 1 //TODO: Update once rest of functionality is built out - set to null
};

export function getDefaultValueForType(type) {
  if (defaultValues.hasOwnProperty(type)) {
    return defaultValues[type];
  }

  return null;
}
