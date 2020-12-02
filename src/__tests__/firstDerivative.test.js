import firstDerivative from '../firstDerivative';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('test firstDerivative', () => {
  it('should return the first derivative', () => {
    const data = {
      weight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      temperature: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
      ],
    };

    expect(firstDerivative(data.temperature, data.weight, 200)).toStrictEqual(
      data.temperature,
      data.weight,
    );
  });
});
