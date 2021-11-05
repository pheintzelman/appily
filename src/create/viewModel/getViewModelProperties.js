import util from 'util';
import { Type } from '../../constants/constants.js';
import { getVariations } from '../../lib/case.js';

function typeFlags(type) {
  return {
    isString: type === 'String',
    isBoolean: type === 'Boolean',
    isModel: type === 'Model'
  };
}

function getViewModelProperty({
  property: { type, propertyName, model },
  index,
  relationship
}) {
  const isPrimary = index == 0;
  const hide = index > 4;
  const options =
    type === Type.Model ? { model, primary: relationship.primary } : {};

  return {
    ...getVariations('propertyName', propertyName),
    type,
    ...typeFlags(type),
    options: util.inspect(options),
    relationship,
    isPrimary,
    hide
  };
}

export function getViewModelProperties(properties, relationships) {
  if (!properties) {
    return [];
  }

  return properties.map((property, index) => {
    const relationship = relationships.find(
      (relationship) => relationship.propertyName === property.propertyName
    );
    return getViewModelProperty({ property, index, relationship });
  });
}

export function getPrimaryProperty(properties) {
  if (!properties || !properties.length) {
    return '';
  }

  return properties[0].propertyName;
}
