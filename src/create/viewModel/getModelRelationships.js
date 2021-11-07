import { Relationship, Type } from '../../constants/constants.js';
import { logger } from '../../logger.js';

function isPrimary({ relationshipType, models, modelName, relatedModelName }) {
  if (relationshipType === Relationship.ManyToOne) {
    return true;
  }

  if (
    relationshipType === Relationship.ManyToMany ||
    relationshipType === Relationship.OneToMany
  ) {
    return false;
  }

  const modelIndex = models.findIndex((model) => model.modelName === modelName);
  const relatedModelIndex = models.findIndex(
    (model) => model.modelName === relatedModelName
  );

  return modelIndex < relatedModelIndex;
}

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

function findRelationship({
  models,
  model: { modelName },
  property,
  relationships
}) {
  const { propertyName } = property;
  const relatedModel = models.find(
    ({ modelName }) => modelName === property.model
  );

  const relatedProperty = relatedModel.properties.find(
    ({ model }) => model === modelName
  );

  const relationshipType = getRelationshipType(property, relatedProperty);

  const primary = isPrimary({
    relationshipType,
    models,
    modelName,
    relatedModelName: relatedModel.modelName
  });

  return {
    propertyName,
    type: relationshipType,
    source: modelName,
    target: relatedModel.modelName,
    primary
  };
}

export function getModelRelationships(models, model) {
  const properties = model.properties ?? [];
  return properties.reduce((relationships, property) => {
    if (property.type === Type.Model) {
      const relationship = findRelationship({
        models,
        model,
        property,
        relationships
      });
      return [...relationships, relationship];
    }
    return relationships;
  }, []);
}
