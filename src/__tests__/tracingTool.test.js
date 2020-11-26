import tracingTool from '../tracingTool';

describe('test Parse', () => {
  it('should return 0, creates a file', () => {
    let path = '/home/Giustino/git/Cheminfo/tgaPeakPick/src/testFile.csv';
    expect(tracingTool(path)).toStrictEqual(0);
  });
});
