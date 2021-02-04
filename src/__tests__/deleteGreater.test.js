import deleteGreater from '../deleteGreater';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('test Parse', () => {
  it('should return cleaned Data', () => {
    let content = {
      x: [1, 2, 3, 4, 6, 7, 8, 9, 10],
      y: [6, 5, 4, 3, 2, 3, 2, 2, 1],
    };
    expect(deleteGreater(content)).toStrictEqual({
      y: [1, 2, 3, 4, 6, 7, 8, 9, 10],
      x: [6, 5, 4, 3, 2, 2, 2, 1],
    });
  });
});
