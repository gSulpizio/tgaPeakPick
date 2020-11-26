import tracingTool from '../tracingTool';

describe('test Parse', () => {
  it('should return 0, creates a file', () => {
    expect(
      tracingTool('/home/Giustino/git/Cheminfo/tgaPeakPick/src/testFile.csv'),
    ).toStrictEqual(0);
  });
});
