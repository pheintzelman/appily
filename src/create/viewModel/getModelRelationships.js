import { Relationship } from '../../constants/constants.js';
import { logger } from '../../logger.js';

function getRelationshipType(property, relatedProperty) {
  if (property.isCollection && relatedProperty.isCollection) {
    return Relationship.ManyToMany;
  }

  if (property.isCollection) {
    return Relationship.ManyToOne;
  }

  if (relatedProperty.isCollection) {
    return Relationship.OneToMany;
  }

  return Relationship.OneToOne;
}

function findRelationship(models, { modelName }, property) {
  const relatedModel = models.find(
    ({ modelName }) => modelName === property.type
  );

  const relatedProperty = relatedModel.properties.find(
    ({ type }) => type === modelName
  );

  return {
    type: getRelationshipType(property, relatedProperty),
    source: modelName,
    target: relatedModel.modelName
  };
}

function isCustomType(models, type) {
  return models.some((model) => model.modelName === type);
}

export function getModelRelationships(models, model) {
  const { properties } = model;
  return properties.reduce((relationships, property) => {
    if (isCustomType(models, property.type)) {
      relationships.push(findRelationship(models, model, property));
    }
    return relationships;
  }, []);
}
