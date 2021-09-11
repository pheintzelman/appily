import { jest } from '@jest/globals';
import { mockDependencies, createRootDir } from './createRootDir.js';

describe.only('createRootDir', () => {
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

  test('should create dir if it does not exists (overwrite)', async () => {
    mockDirExists.mockReturnValue(Promise.resolve(false));
    const dir = await createRootDir(
      { name: 'Cloud Beast' },
      { overwrite: true }
    );
    expect(mockMkdir).toBeCalledWith('cloud-beast');
  });

  test('should increse count if dir already exists (overwrite)', async () => {
    mockDirExists
      .mockReturnValueOnce(Promise.resolve(true))
      .mockReturnValue(Promise.resolve(false));
    const dir = await createRootDir({}, {});
    expect(mockMkdir).toBeCalledWith('app1');
  });
});
