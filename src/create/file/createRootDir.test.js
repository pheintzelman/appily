import { jest } from '@jest/globals';
import { mockDependencies, createRootDir } from './createRootDir.js';

describe('createRootDir', () => {
  let mockDirExists;

  beforeEach(() => {
    mockDirExists = jest.fn();
    mockDependencies({ file: { dirExists: mockDirExists } });
  });
  afterEach(() => {
    mockDependencies();
  });

  test('should not create dir if it already exists (overwrite)', async () => {
    mockDirExists.returns(Promise.resolve(true));
    const dir = await createRootDir({}, { overwrite: true });
    expect(dir).toEqual('');
  });
});
