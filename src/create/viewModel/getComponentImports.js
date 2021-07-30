import { mapTypeToComponent } from './mapTypeToComponent.js';

function removeDuplicates(array) {
  const set = new Set(array);
  return [...set];
}

function getTypes(properties) {
  const types = properties.map(({ type }) => type);
  return removeDuplicates(types);
}

export function getComponentImports(properties) {
  const types = getTypes(properties);
  return types.map((type) => ({
    component: mapTypeToComponent(type)
  }));
}
