import { jest } from '@jest/globals';
import { mockDependencies, createRootDir } from './createRootDir.js';

describe('createRootDir', () => {
  let mockDirExists;
  let mockMkdir;

  beforeEach(() => {
    mockDirExists = jest.fn();
    mockMkdir = jest.fn();
    mockDependencies({
      file: { dirExists: mockDirExists },
      fs: { mkdir: mockMkdir }
    });
  });
  afterEach(() => {
    mockDependencies();
  });

  test('should not create dir if it already exists (overwrite)', async () => {
    mockDirExists.mockReturnValue(Promise.resolve(true));
    const dir = await createRootDir({}, { overwrite: true });
    expect(mockMkdir).not.toHaveBeenCalled();
  });
});
