import { jest } from '@jest/globals';
import { mockDependencies, loopDirective } from './loopDirective';

describe('loopDirective', () => {
  let mockCopyDir;

  beforeEach(() => {
    mockCopyDir = jest.fn();
    mockDependencies({ mockCopy: mockCopyDir });
  });
  afterEach(() => {
    mockDependencies();
  });

  test('should handle property is not array', async () => {
    mockCopyDir.mockReturnValue('foo');
    await loopDirective({
      property: 'test',
      src: 'src',
      dest: 'dest',
      viewModel: { test: 'test' }
    });

    expect(mockCopyDir).not.toHaveBeenCalled();
  });
});
