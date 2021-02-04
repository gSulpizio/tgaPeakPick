import deleteGreater from '../deleteGreater';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('test Parse', () => {
  it('should return cleaned Data', () => {
    let content = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: [6, 5, 4, 3, 2, 3, 2, 2, 1],
    };
    expect(deleteGreater(content)).toStrictEqual({
      x: [1, 2, 3, 4, 5, 7, 8, 9],
      y: [6, 5, 4, 3, 2, 2, 2, 1],
    });
  });
  it('should throw error', () => {
    let content = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: [6, 5, 4, 3, 2, 3, 2, 2],
    };
    expect(() => deleteGreater(content)).toThrow(
      "deleteGreater: length of x and y don't match",
    );
  });
});
