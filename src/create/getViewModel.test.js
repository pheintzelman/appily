import { getViewModel } from './getViewModel';

describe('getViewModel', () => {
  test('should handle model with no properties', () => {
    const config = {
      name: 'test-config',
      models: {
        Animal: null
      }
    };

    const expected = {
      appName: 'test-config',
      dir: undefined,
      models: [
        {
          defaultState: '{}',
          modelName: 'Animal',
          modelNameCamel: 'animal',
          modelNamePascal: 'Animal',
          properties: []
        }
      ],
      templateName: 'test',
      templateVersion: '1.2.3'
    };

    const actual = getViewModel({
      config,
      manifesto: { name: 'test', version: '1.2.3' }
    });

    expect(actual).toStrictEqual(expected);
  });
});
