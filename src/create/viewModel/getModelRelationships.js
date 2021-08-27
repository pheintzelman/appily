import { logger } from '../../logger.js';
import { Relationship } from '../../constants/constants.js';

function findRelationship(models, { modelName }, type) {
  const { modelName: relatedModelName } = models.find(
    ({ modelName }) => modelName === type
  );

  return {
    type: Relationship.OneToOne,
    source: modelName,
    target: relatedModelName
  };
}

function isCustomType(models, type) {
  return models.some((model) => model.modelName === type);
}

export function getModelRelationships(models, model) {
  const { properties } = model;
  return properties.reduce((relationships, property) => {
    const { type } = property;
    if (isCustomType(models, type)) {
      relationships.push(findRelationship(models, model, type));
    }
    return relationships;
  }, []);
}
