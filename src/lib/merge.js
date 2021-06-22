function isObject(object) {
  return object instanceof Object;
}

function oneIsArray(object1, object2) {
  return (
    (Array.isArray(object1) && !Array.isArray(object2)) ||
    (Array.isArray(object2) && !Array.isArray(object1))
  );
}

export function merge(object1, object2) {
  if (object2 === undefined) {
    return object1;
  }

  if (
    !isObject(object1) ||
    !isObject(object2) ||
    oneIsArray(object1, object2)
  ) {
    return object2;
  }

  if (Array.isArray(object1) && Array.isArray(object2)) {
    return [...object1, ...object2];
  }

  return Object.keys(object2).reduce(
    (acc, key) => {
      return {
        ...acc,
        [key]: merge(object1[key], object2[key])
      };
    },
    { ...object1 }
  );
}
