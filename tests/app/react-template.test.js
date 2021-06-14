import { createApp } from '../../src/create/createApp';
import {
  removeDir,
  getSanpshotTestCasesSync
} from './helpers/snapshot-helpers.js';
import { captureLog } from './helpers/captureLog.js';

const config = {
  dir: 'tests/app',
  name: 'video-game-app',
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

let log = [];
captureLog(log);
await createApp(config);

describe('React template', () => {
  const testCases = getSanpshotTestCasesSync('tests/app/video-game-app');

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
    await removeDir('tests/app/video-game-app');
  });
});
