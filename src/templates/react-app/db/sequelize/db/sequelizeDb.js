import sequelizeModule from 'sequelize';
import { NotFound, IdNotUnique } from '../rest/error.js';
const { UniqueConstraintError } = sequelizeModule;

export async function insert(model, value) {
  try {
    return await model.create(value);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw IdNotUnique('insert', model.name, error.errors[0].path);
    }

    throw error;
  }
}

export async function retrieve(model, id) {
  const record = await model.findByPk(id);

  if (!record) {
    throw NotFound('retrieve', model.name, id);
  }

  return record;
}

export async function retrieveAll(model) {
  return await model.findAll();
}

export async function update(model, value) {
  const [rowsAffected, [record]] = await model.update(value, {
    where: {
      id: value.id
    },
    returning: true
  });

  if (!record) {
    throw NotFound('update', model.name, value.id);
  }

  return record;
}

export async function remove(model, id) {
  const results = await model.destroy({
    where: {
      id
    }
  });

  if (!results) {
    throw NotFound('Remove', model.name, id);
  }

  return true;
}

export function getRepository(model) {
  return {
    insert: (value) => insert(model, value),
    retrieve: (id) => retrieve(model, id),
    update: (value) => update(model, value),
    remove: (id) => remove(model, id),
    retrieveAll: () => retrieveAll(model)
  };
}
