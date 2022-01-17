import { getViewModelModels } from './getViewModelModels';

describe('getDefaultValueForType', () => {
  test('should handle missing models', async () => {
    const results = getViewModelModels({ config: {} });
    expect(results).toEqual([]);
  });
});
