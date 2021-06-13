import { pascalCase, camelCase } from './case';

describe('pascalCase', () => {
  test('should change case to pascal (all lowercase)', () => {
    const expected = 'HelloWorld';
    const actual = pascalCase('hello world');

    expect(actual).toStrictEqual(expected);
  });

  test('should change case to pascal (mixed case)', () => {
    const expected = 'HelloWorld';
    const actual = pascalCase('hello World');

    expect(actual).toStrictEqual(expected);
  });

  test('should change case to pascal (all uppercase)', () => {
    const expected = 'HelloWorld';
    const actual = pascalCase('HELLO WORLD');

    expect(actual).toStrictEqual(expected);
  });
});

describe('camelCase', () => {
  test('should change case to pascal (all lowercase)', () => {
    const expected = 'helloWorld';
    const actual = camelCase('hello world');

    expect(actual).toStrictEqual(expected);
  });

  test('should change case to pascal (mixed case)', () => {
    const expected = 'helloWorld';
    const actual = camelCase('hello World');

    expect(actual).toStrictEqual(expected);
  });

  test('should change case to pascal (all uppercase)', () => {
    const expected = 'helloWorld';
    const actual = camelCase('HELLO WORLD');

    expect(actual).toStrictEqual(expected);
  });
});
