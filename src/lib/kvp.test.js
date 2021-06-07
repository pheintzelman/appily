import { kvp } from './kvp';

describe('kvp', () => {
  test('should convert array', () => {
    const expected = { entry: ['Volume', 50], key: 'Volume', value: 50 };
    const input = ['Volume', 50];
    const actual = kvp(input);

    expect(actual).toStrictEqual(expected);
  });

  test('should convert object', () => {
    const expected = { entry: ['Volume', 50], key: 'Volume', value: 50 };
    const input = { Volume: 50 };
    const actual = kvp(input);

    expect(actual).toStrictEqual(expected);
  });
});
