function kvpArray(array) {
  const key = array[0];
  const value = array[1];
  return { key, value, entry: [key, value] };
}

export function kvp(object) {
  if (Array.isArray(object)) {
    return kvpArray(object);
  }

  const key = Object.keys(object)[0];
  const value = Object.values(object)[0];
  return { key, value, entry: [key, value] };
}
