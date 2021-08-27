import { validateConfig } from './validateConfig';
import { captureLog } from '../../../tests/helpers/log.js';
import {
  ConfigIsEmpty,
  ConfigPropertyNotSupported,
  TemplateOptionNotSupported,
  TypeNotSupported
} from '../../constants/messages';

describe('validateConfig', () => {
  test('should throw error if config is null', () => {
    expect(() => {
      validateConfig(null);
    }).toThrow(ConfigIsEmpty());
  });

  describe('validateConfigProperties', () => {
    test('should log warning for unsupported properties', () => {
      const log = captureLog();
      validateConfig({ cookie: 'chocolate chip' }, {});
      expect(log).toStrictEqual([
        {
          WARN: ConfigPropertyNotSupported('cookie')
        }
      ]);
    });
  });

  describe('validateOptions', () => {
    test('should log warning for unsupported option', () => {
      const log = captureLog();
      validateConfig({ ui: 'chocolate chip' }, { options: { ui: [] } });
      expect(log).toStrictEqual([
        {
          WARN: TemplateOptionNotSupported('ui', 'chocolate chip')
        }
      ]);
    });
  });

  describe('validateModelProperties', () => {
    test('should log warning for unsupported model property type', () => {
      const log = captureLog();
      validateConfig(
        {
          models: [
            {
              modelName: 'Car',
              properties: [{ propertyName: 'Make', type: 'Honda' }]
            }
          ]
        },
        {}
      );
      expect(log).toStrictEqual([
        {
          WARN: TypeNotSupported('Car', 'Make', 'Honda')
        }
      ]);
    });
  });
});
