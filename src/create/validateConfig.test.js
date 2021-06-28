import { validateConfig } from './validateConfig';
import { captureLog } from '../../tests/helpers/captureLog.js';

describe('validateConfig', () => {
  test('should throw error if config is null', () => {
    expect(() => {
      validateConfig(null);
    }).toThrow('Config is empty or undefined');
  });

  describe('validateConfigProperties', () => {
    test('should log warning for unsupported properties', () => {
      const log = captureLog();
      validateConfig({ cookie: 'chocolate chip' }, {});
      expect(log).toStrictEqual([
        {
          WARN: '"cookie" is not a supported config property'
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
          WARN: '"ui:chocolate chip" is not a supported template option'
        }
      ]);
    });
  });

  describe('validateModelProperties', () => {
    test('should log warning for unsupported model property type', () => {
      const log = captureLog();
      validateConfig({ models: { Car: { Make: 'Honda' } } }, {});
      expect(log).toStrictEqual([
        {
          WARN: '"Car" : "Make" is not a supported type (Honda)'
        }
      ]);
    });
  });
});
