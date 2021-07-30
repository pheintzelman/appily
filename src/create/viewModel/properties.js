import { getVariations } from '../../lib/case.js';
import { getDefaultValueForType } from './getDefaultValueForType.js';
import { mapTypeToComponent } from './mapTypeToComponent.js';
import { getComponentImports } from './getComponentImports.js';

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
    hide,
    component: mapTypeToComponent(property)
  };
}

export function preprocessProperties(properties) {
  if (!properties) {
    return [];
  }

  return Object.entries(properties).map(preprocessProperty);
}
