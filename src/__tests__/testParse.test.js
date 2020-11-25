import testParser from '../testParser';

describe('test testParse', () => {
  it('should return 42', () => {
    expect(testParser('./testFile.csv')).toEqual(42);
  });
});
