import { normalizeConfig } from './normalizeConfig.js';
import { ConfigIsEmpty } from './../../constants/messages';

describe('normalizeConfig', () => {
  test('should handle property object form', () => {
    const config = normalizeConfig({
      models: { Pizza: { pepperoni: { type: 'Boolean' } } }
    });

    expect(config).toStrictEqual({
      name: 'app',
      template: 'react-app',
      models: [
        {
          modelName: 'Pizza',
          pluralName: 'Pizza Collection',
          properties: [
            {
              propertyName: 'pepperoni',
              required: false,
              type: 'Boolean'
            }
          ]
        }
      ]
    });
  });

  test('should throw error if config is missing', () => {
    expect(normalizeConfig).toThrow(ConfigIsEmpty());
  });
});
