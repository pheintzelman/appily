import { getVariations } from '../../lib/case.js';

function typeFlags(type) {
  return { isString: type === 'String', isBoolean: type === 'Boolean' };
}

function preprocessProperty([propertyName, { type }], index) {
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

export function getPrimaryProperty(properties) {
  if (!properties) {
    return '';
  }

  return Object.keys(properties)[0];
}

export function preprocessProperties(properties) {
  if (!properties) {
    return [];
  }

  return Object.entries(properties).map(preprocessProperty);
}
