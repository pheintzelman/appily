import { getDefaultValueForType } from './getDefaultValueForType';

describe('getDefaultValueForType', () => {
  test('should handle missing type', async () => {
    const actualDefaultValue = await getDefaultValueForType('test');

    expect(actualDefaultValue).toEqual(null);
  });
});
