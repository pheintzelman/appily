import { createApp } from '../../src/create/createApp';
import {
  removeDir,
  getSanpshotTestCasesSync
} from './helpers/snapshot-helpers.js';
import { captureLog, sortLog } from '../helpers/log.js';

const config = {
  dir: 'tests/app',
  name: 'Video Game App IndexedDB',
  template: 'react-app',
  api: 'indexedDB',
  db: 'indexedDB',
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
await createApp(config);

describe('React template', () => {
  const testCases = getSanpshotTestCasesSync(
    'tests/app/video-game-app-indexedDB'
  );

  test.each(testCases)(
    '$dir should match snapshot',
    ({ name, dir, snapshot }) => {
      expect(snapshot).toMatchSnapshot();
    }
  );

  test('should match logs', () => {
    expect(sortLog(log)).toMatchSnapshot();
  });

  afterAll(async () => {
    await removeDir('tests/app/video-game-app-indexedDB');
  });
});
