import { createApp } from '../../src/create/createApp';
import {
  removeDir,
  getSanpshotTestCasesSync
} from './helpers/snapshot-helpers.js';
import { captureLog, sortLog, removeProjectDir } from '../helpers/log.js';

const config = {
  dir: 'tests/app/testApps',
  name: 'Video Game App IndexedDB',
  template: 'react-app',
  api: 'indexedDB',
  db: 'indexedDB',
  models: {
    'Video Game': {
      plural: 'Video Games',
      properties: {
        Title: 'String',
        'Year Published': 'String'
      }
    },
    Publisher: {
      Name: 'String'
    }
  }
};

const log = captureLog();
await removeDir('tests/app/testApps/video-game-app-indexedDB');
await createApp(config, { overwrite: true });

describe('React template', () => {
  const testCases = getSanpshotTestCasesSync(
    'tests/app/testApps/video-game-app-indexedDB'
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
