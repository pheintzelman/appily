import { getVariations } from '../../lib/case.js';

function typeFlags(type) {
  return { isString: type === 'String', isBoolean: type === 'Boolean' };
}

function getViewModelProperty({ type, propertyName }, index) {
  const isPrimary = index == 0;
  const hide = index > 4;

  return {
    ...getVariations('propertyName', propertyName),
    type,
    ...typeFlags(type),
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
