import {
  DefaultAppName,
  DefaultTemplate,
  Type
} from '../../constants/constants.js';
import { setDefaults } from './setDefaults.js';

describe('setDefaults', () => {
  test('should set name to DefaultAppName', () => {
    const config = setDefaults({ models: [], template: 'apple' });
    expect(config.name).toStrictEqual(DefaultAppName);
  });

  test('should set template to DefaultTemplate', () => {
    const config = setDefaults({ models: [], name: 'Life Hero' });
    expect(config.template).toStrictEqual(DefaultTemplate);
  });

  test('should set property to DefaultType', () => {
    const config = setDefaults({
      models: [{ modelName: 'Task', properties: [{}] }],
      template: 'apple',
      name: 'Life Hero'
    });
    const actualType = config.models[0].properties[0].type;

    expect(actualType).toStrictEqual(Type.String);
  });
});
