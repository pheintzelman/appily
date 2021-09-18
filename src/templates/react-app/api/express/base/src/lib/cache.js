const cacheStore = {};
const defaultNamespace = Symbol('defaultNamespace');

function expired(expiresAt) {
  return expiresAt && expiresAt < Date.now();
}

function getNamedCache(namespace) {
  if (!cacheStore[namespace]) {
    cacheStore[namespace] = new Map();
  }

  return cacheStore[namespace];
}

export function useNamespace(namespace) {
  const namedCache = getNamedCache(namespace);

  function get(key) {
    const { value, expiresAt } = namedCache.get(key) || {};

    if (expired(expiresAt)) {
      remove(key);
      return undefined;
    }

    return value;
  }

  function set(key, value, timeout) {
    const expiresAt = timeout ? Date.now() + timeout : null;
    namedCache.set(key, { value, expiresAt });
  }

  function timeTillExpires(key) {
    const { expiresAt } = namedCache.get(key) || {};

    if (!expiresAt) {
      return null;
    }

    if (expired(expiresAt)) {
      return 0;
    }

    return expiresAt - Date.now();
  }

  function remove(key) {
    namedCache.delete(key);
  }

  function removeAll() {
    namedCache.clear();
  }

  return { get, set, timeTillExpires, remove, removeAll };
}

export const { get, set, timeTillExpires, remove } =
  useNamespace(defaultNamespace);
