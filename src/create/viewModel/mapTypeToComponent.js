import { Type } from '../../constants/constants.js';

const typeComponentMapper = {
  [Type.Boolean]: { edit: 'BooleanEdit', view: 'BooleanView' },
  [Type.String]: { edit: 'StringEdit', view: 'StringView' }
};

export function mapTypeToComponent(type) {
  if (typeComponentMapper.hasOwnProperty(type)) {
    return typeComponentMapper[type];
  }

  return typeComponentMapper[Type.String];
}
