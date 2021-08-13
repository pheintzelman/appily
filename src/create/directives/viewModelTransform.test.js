import { viewModelTransform } from './viewModelTransform';

describe('viewModelTransform', () => {
  test('should transform view model', async () => {
    const actualViewModel = await viewModelTransform({
      path: './__transform__/viewModelTransformTest.js',
      method: 'viewModelTransformTest',
      viewModel: { test: 'test' }
    });

    expect(actualViewModel).toStrictEqual({
      test: 'test2'
    });
  });
});
