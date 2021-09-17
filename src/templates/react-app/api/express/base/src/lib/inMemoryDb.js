import { IdNotUnique, NotFound } from '../rest/error.js';
import { useNamespace } from './cache.js';
const InMemoryKey = Symbol('InMemory');
const { get, set } = useNamespace(InMemoryKey);

export function useInMemoryDb(request) {
  const inMemory = request.header('In-Memory');
  return inMemory && inMemory.toLowerCase() === 'true';
}

function exists(records, value) {
  const { id } = value;
  return records[id] !== undefined;
}

function getId(records, value) {
  const { id } = value;
  return id ?? records.nextId;
}

export async function insert(name, value) {
  const records = get(name) ?? { nextId: 0 };
  if (exists(records, value)) {
    throw IdNotUnique('insert', name, value.id);
  }

  const id = getId(records, value);
  const record = { ...value, id };
  const nextId = Math.max(records.nextId + 1, id + 1);
  const newRecords = { ...records, [id]: record, nextId };
  console.log(newRecords);
  set(name, newRecords);

  return record;
}

export async function retrieve(name, id) {
  const records = get(name) ?? {};
  const record = records[id];

  if (!record) {
    throw NotFound('retrieve', name, id);
  }

  return record;
}

export async function retrieveAll(name) {
  const records = get(name) ?? {};
  const { nextId, ...rest } = records;
  return Object.values(rest);
}

export async function update(name, value) {
  const records = get(name) ?? {};
  const { id } = value;
  const record = records[id];

  if (!record) {
    throw NotFound('update', name, id);
  }

  const newRecords = { ...records, [id]: value };
  console.log(newRecords);
  set(name, newRecords);
  return value;
}

export async function remove(name, id) {
  const records = get(name) ?? {};
  const record = records[id];

  if (!record) {
    throw NotFound('remove', name, id);
  }

  const newRecords = { ...records };
  delete newRecords[id];
  console.log(newRecords);
  set(name, newRecords);
  return true;
}

export function getRepository(name) {
  return {
    insert: (value) => insert(name, value),
    retrieve: (id) => retrieve(name, id),
    update: (value) => update(name, value),
    remove: (id) => remove(name, id),
    retrieveAll: () => retrieveAll(name)
  };
}
