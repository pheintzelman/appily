import { createApp } from '../../src/create/createApp';
import {
  removeDir,
  getSanpshotTestCasesSync
} from './helpers/snapshot-helpers.js';
import { captureLog, removeProjectDir, sortLog } from '../helpers/log.js';

const config = {
  dir: 'tests/app/testApps',
  name: 'Video Game App',
  template: 'react-app',
  models: {
    'Video Game': {
      Title: 'String',
      'Year Published': 'String'
    },
    Publisher: {
      Name: 'String'
    }
  }
};

const log = captureLog();
await removeDir('tests/app/testApps/video-game-app');
await createApp(config);

describe('React template', () => {
  const testCases = getSanpshotTestCasesSync(
    'tests/app/testApps/video-game-app'
  );

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
