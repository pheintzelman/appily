import { compareObjects, Direction } from './compareObjects';

describe('compareObjects', () => {
  test('should return -1 for strings', () => {
    expect(compareObjects('a', 'b')).toBe(1);
  });

  test('should return 1 for strings', () => {
    expect(compareObjects('b', 'a')).toBe(-1);
  });

  test('should return 0 for strings', () => {
    expect(compareObjects('a', 'a')).toBe(0);
  });

  test('should compare first properties of objects', () => {
    expect(compareObjects({ a: 'a' }, { a: 'b' })).toBe(1);
  });

  test('should compare objects with properties in different order', () => {
    expect(
      compareObjects(
        { b: 'b', a: 'a' },
        { a: 'b', b: 'b' },
        Direction.Descending
      )
    ).toBe(1);
  });

  test('should return expected results', () => {
    const results = compareObjects(
      { DEBUG: 'File rendered: tests/app/video-game-app/src/api/publisher.js' },
      {
        DEBUG: 'File rendered: tests/app/video-game-app/src/api/videoGame.js'
      }
    );

    expect(results).toBe(1);
  });
});
