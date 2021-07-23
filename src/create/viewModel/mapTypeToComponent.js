import { Type } from '../../constants/constants.js';

const typeComponentMapper = {
  [Type.Boolean]: 'BooleanEdit',
  [Type.String]: 'StringEdit'
};

export function mapTypeToComponent(type) {
  if (typeComponentMapper.hasOwnProperty(type)) {
    return typeComponentMapper[type];
  }

  return 'StringEdit';
}
