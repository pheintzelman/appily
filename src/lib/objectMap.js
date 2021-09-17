export function objectMap(object, fn) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[key] = fn(value);
    return acc;
  }, {});
}
