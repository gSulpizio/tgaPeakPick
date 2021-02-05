import deleteSmallerX from '../deleteSmallerX';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('test Parse', () => {
  it('should return cleaned Data', () => {
    let content = {
      x: [1, 2, 3, 4, 5, 6, 5, 6, 9],
      y: [6, 5, 4, 3, 2, 3, 2, 2, 1],
    };
    expect(deleteSmallerX(content)).toStrictEqual({
      x: [1, 2, 3, 4, 5, 6, 6, 9],
      y: [6, 5, 4, 3, 2, 3, 2, 1],
    });
  });
  it('should throw error', () => {
    let content = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: [6, 5, 4, 3, 2, 3, 2, 2],
    };
    expect(() => deleteSmallerX(content)).toThrow(
      "deleteGreater: length of x and y don't match",
    );
  });
});
