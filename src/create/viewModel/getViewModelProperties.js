import util from 'util';
import { Type } from '../../constants/constants.js';
import { getVariations } from '../../lib/case.js';

function typeFlags(type) {
  return { isString: type === 'String', isBoolean: type === 'Boolean', isModel: type === 'Model' };
}

function getViewModelProperty({ type, propertyName, model }, index) {
  const isPrimary = index == 0;
  const hide = index > 4;
  const options = type === Type.Model ? { model } : {};

  return {
    ...getVariations('propertyName', propertyName),
    type,
    ...typeFlags(type),
    options: util.inspect(options),
    isPrimary,
    hide
  };
}

export function getViewModelProperties(properties) {
  if (!properties) {
    return [];
  }

  return properties.map(getViewModelProperty);
}

export function getPrimaryProperty(properties) {
  if (!properties || !properties.length) {
    return '';
  }

  return properties[0].propertyName;
}
