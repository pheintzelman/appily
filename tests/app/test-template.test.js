import { createApp } from '../../src/create/createApp';
import {
  removeDir,
  getSanpshotTestCasesSync
} from './helpers/snapshot-helpers.js';
import { captureLog, removeProjectDir, sortLog } from '../helpers/log.js';

const config = {
  dir: 'tests/app/testApps',
  name: 'Test App',
  template: 'test'
};

const log = captureLog();
await removeDir('tests/app/testApps/test-app');
await createApp(config);

describe('Test template', () => {
  const testCases = getSanpshotTestCasesSync('tests/app/testApps/test-app');

  test.each(testCases)(
    '$dir should match snapshot',
    ({ name, dir, snapshot }) => {
      expect(snapshot).toMatchSnapshot();
    }
  );

  test('should match logs', () => {
    const cleanedLog = removeProjectDir(log);
    expect(sortLog(cleanedLog)).toMatchSnapshot();
  });
});
