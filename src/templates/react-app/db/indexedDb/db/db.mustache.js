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

export async function add(store, value) {
  const db = await connect();
  return db.add(store, value);
}

export async function get(store, key) {
  const db = await connect();
  return db.get(store, key);
}

export async function getAll(store) {
  const db = await connect();
  const keys = await db.getAllKeys(store);

  const promises = keys.map((key) => get(store, key));

  return Promise.all(promises);
}

export async function update(store, key, value) {
  const db = await connect();
  return db.put(store, value, key);
}

export async function remove(store, key) {
  const db = await connect();
  return db.delete(store, key);
}

export function withStore(store) {
  return {
    get: async (key) => await get(store, key),
    getAll: async () => await getAll(store),
    add: async (value) => await add(store, value),
    update: async (key, value) => await update(store, value, key),
    remove: async (key) => await remove(store, key),
  };
}
