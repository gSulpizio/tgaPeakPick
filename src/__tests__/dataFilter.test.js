import dataFilter from '../dataFilter';
import { join } from 'path';
import { readFileSync } from 'fs';
import { xySortX } from 'ml-spectra-processing';

describe('test data filter', () => {
  it('should return an array without any double or temperature loss', () => {
    const content = {
      x: [222, 111, 222, 333, 222, 333, 222, 333, 171717, 151515],
      y: [555, 666, 666, 555, 121212, 191919, 161616, 676, 81498, 684],
    };
    expect(dataFilter(content, 3)).toStrictEqual({
      x: [222, 111, 222, 333, 222, 333, 222],
      y: [555, 666, 666, 555, 121212, 191919, 161616],
    });
  });
});
