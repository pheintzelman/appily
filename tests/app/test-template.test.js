import { createApp } from '../../src/create/createApp';
import {
  removeDir,
  getSanpshotTestCasesSync
} from './helpers/snapshot-helpers.js';
import { captureLog } from './helpers/log.js';

const config = {
  dir: 'tests/app',
  name: 'Test App',
  template: 'test'
};

let log = [];
captureLog(log);
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
    expect(log).toMatchSnapshot();
  });

  afterAll(async () => {
    await removeDir('tests/app/test-app');
  });
});
