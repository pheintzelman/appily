import { createApp } from '../../src/create/createApp';
import {
  removeDir,
  getSanpshotTestCasesSync
} from './helpers/snapshot-helpers.js';
import { captureLog, sortLog } from '../helpers/log.js';

const config = {
  dir: 'tests/app',
  name: 'Test App',
  template: 'test'
};

const log = captureLog();
await removeDir('tests/app/test-app');
await createApp(config);

describe('Test template', () => {
  const testCases = getSanpshotTestCasesSync('tests/app/test-app');

  test.each(testCases)(
    '$dir should match snapshot',
    ({ name, dir, snapshot }) => {
      expect(snapshot).toMatchSnapshot();
    }
  );

  test('should match logs', () => {
    expect(sortLog(log)).toMatchSnapshot();
  });
});
