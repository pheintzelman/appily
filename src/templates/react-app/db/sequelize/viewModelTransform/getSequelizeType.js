//@TODO: Find better solution for this import
import { Type } from '../../../../../constants/constants.js';

const typeMapper = {
  [Type.Boolean]: 'BOOLEAN',
  [Type.String]: 'STRING'
};

export function getSequelizeType(type) {
  if (typeMapper.hasOwnProperty(type)) {
    return typeMapper[type];
  }

  return typeMapper[Type.String];
}
