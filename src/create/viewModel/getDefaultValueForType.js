import { Type } from '../../constants/constants';

const defaultValues = {
  [Type.Boolean]: true,
  [Type.String]: ''
};

export function getDefaultValueForType(type) {
  if (defaultValues.hasOwnProperty(type)) {
    return defaultValues[type];
  }

  return null;
}
