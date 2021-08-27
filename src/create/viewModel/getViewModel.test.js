import { getViewModel } from './getViewModel.js';

const configString = ` {
  "name": "Test Config",
  "models": [
    {
      "modelName": "Animal",
      "pluralName": "Animal Collection",
      "properties": null
    }
  ]
 }`;

describe('getViewModel', () => {
  test('should handle model with no properties', () => {
    const config = {
      name: 'Test Config',
      models: [
        {
          modelName: 'Animal',
          pluralName: 'Animal Collection',
          properties: null
        }
      ]
    };

    const expected = {
      appName: 'Test Config',
      appNameCamel: 'testConfig',
      appNamePascal: 'TestConfig',
      appNameSentenceCase: 'test config',
      appNameSnake: 'test-config',
      configString,
      dir: undefined,
      models: [
        {
          defaultState: '{}',
          modelName: 'Animal',
          modelNameCamel: 'animal',
          modelNamePascal: 'Animal',
          modelNameSentenceCase: 'animal',
          modelNameSnake: 'animal',
          pluralModelName: 'Animal Collection',
          pluralModelNameCamel: 'animalCollection',
          pluralModelNamePascal: 'AnimalCollection',
          pluralModelNameSentenceCase: 'animal collection',
          pluralModelNameSnake: 'animal-collection',
          primaryProperty: '',
          primaryPropertyCamel: '',
          primaryPropertyPascal: '',
          primaryPropertySentenceCase: '',
          primaryPropertySnake: '',
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
