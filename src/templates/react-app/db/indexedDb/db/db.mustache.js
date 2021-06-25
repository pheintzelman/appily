import { openDB } from "idb";

export async function connect() {
  return openDB("db", 1, {
    upgrade(db) {
      {{#models}}
      db.createObjectStore("{{modelNamePascal}}", {
        keyPath: "id",
        autoIncrement: true,
      });

      {{/models}}
    },
  });
}

export async function get(store, key) {
  const db = await connect();
  return db.get(store, key);
}

export async function add(store, value) {
  const db = await connect();
  return db.add(store, value);
}

export async function set(store, key, value) {
  const db = await connect();
  return db.put(store, value, key);
}

export async function deleteRecord(store, key) {
  const db = await connect();
  return db.delete(store, key);
}

export async function getAll(store) {
  const db = await connect();
  const keys = db.getAllKeys(store);

  const promises = keys.map((key) => get(key));

  return Promise.all(promises);
}

export function withStore(store) {
  return {
    get: async (key) => await get(store, key),
    add: async (value) => await add(store, value),
    set: async (key, value) => await set(store, value, key),
    deleteRecord: async (key) => await deleteRecord(store, key),
    getAll: async () => await getAll(store),
  };
}
