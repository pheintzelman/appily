export const Direction = { Ascending: 'Ascending', Descending: 'Descending' };
const GreaterThan = { Ascending: -1, Descending: 1 };
const LessThan = { Ascending: 1, Descending: -1 };

function compareValue(value1, value2, direction = Direction.Ascending) {
  if (value1 === value2) {
    return 0;
  }

  return value1 > value2 ? GreaterThan[direction] : LessThan[direction];
}

function isObject(object) {
  return typeof object === 'object' && object !== null;
}

function getCompareValue(value) {
  if (isObject(value)) {
    return JSON.stringify(value);
  }

  return value;
}

export function compareObjects(object1, object2, direction) {
  const value1 = getCompareValue(object1);
  const value2 = getCompareValue(object2);

  return compareValue(value1, value2, direction);
}
