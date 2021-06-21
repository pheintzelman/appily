import { merge } from './merge';

describe('merge', () => {
  test('should return first value if second value is undefined', () => {
    const actual = merge(1, undefined);
    expect(actual).toStrictEqual(1);
  });

  test('should return second value if first value is undefined', () => {
    const actual = merge(undefined, 1);
    expect(actual).toStrictEqual(1);
  });

  test('should overide first value', () => {
    const actual = merge(1, 'test');
    expect(actual).toStrictEqual('test');
  });

  test('should merge arrays', () => {
    const actual = merge([1, 2, 3], [1, 2, 3]);
    expect(actual).toStrictEqual([1, 2, 3, 1, 2, 3]);
  });

  test('should merge objects (simple)', () => {
    const actual = merge({ apples: 1 }, { cars: 2 });
    expect(actual).toStrictEqual({ apples: 1, cars: 2 });
  });

  test('should merge objects', () => {
    const actual = merge(
      { apples: 1, animals: { cats: 3, monkeys: 1 } },
      { cars: 2, animals: { cats: 4, tutles: 4 } }
    );

    expect(actual).toStrictEqual({
      apples: 1,
      cars: 2,
      animals: { cats: 4, tutles: 4, monkeys: 1 }
    });
  });

  test('should allow changing deep property', () => {
    const actual = merge(
      { apples: 1, animals: { cats: { marcus: { weight: 34 } }, monkeys: 1 } },
      { animals: { cats: { marcus: { weight: 40 } } } }
    );

    expect(actual).toStrictEqual({
      apples: 1,
      animals: { cats: { marcus: { weight: 40 } }, monkeys: 1 }
    });
  });

  test('should merge deep array', () => {
    const actual = merge(
      {
        apples: 1,
        animals: { cats: { marcus: { toys: ['sqeaky cheese'] } }, monkeys: 1 }
      },
      { animals: { cats: { marcus: { toys: ['mouse'] } } } }
    );

    expect(actual).toStrictEqual({
      apples: 1,
      animals: {
        cats: { marcus: { toys: ['sqeaky cheese', 'mouse'] } },
        monkeys: 1
      }
    });
  });
});
