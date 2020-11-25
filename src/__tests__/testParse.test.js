import Parser from '../Parser';

describe('test testParse', () => {
  it('should return parsed numbers', () => {
    expect(
      Parser('/home/Giustino/git/Cheminfo/tgaPeakPick/src/testFileShort.csv'),
    ).toStrictEqual([
      [111, 888, 151515],
      [222, 999, 161616],
      [555, 121212, 191919],
    ]);
  });
});
