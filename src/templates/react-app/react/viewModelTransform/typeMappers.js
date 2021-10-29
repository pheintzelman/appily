//@TODO: Find better solution for this import
import { Type } from '../../../../constants/constants.js';

const typeMapper = {
  [Type.Boolean]: {
    component: {
      cell: 'BooleanCell',
      edit: 'BooleanInput',
      view: 'BooleanView'
    },
    flex: 2
  },
  [Type.String]: {
    component: { cell: 'StringCell', edit: 'StringInput', view: 'StringView' },
    flex: 4
  }
};

export function mapTypeToComponent(type) {
  if (typeMapper.hasOwnProperty(type)) {
    return typeMapper[type].component;
  }

  return typeMapper[Type.String].component;
}

export function mapTypeToFlex(type) {
  if (typeMapper.hasOwnProperty(type)) {
    return typeMapper[type].flex;
  }

  return typeMapper[Type.String].flex;
}
