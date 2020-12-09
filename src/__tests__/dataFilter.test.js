import dataFilter from '../dataFilter';
import { join } from 'path';
import { readFileSync } from 'fs';
import { xySortX } from 'ml-spectra-processing';

describe('test data filter', () => {
  it('should return an array without any double or temperature loss', () => {
    const content = {
      time: [111, 222, 222, 111, 888, 151515],
      weight: [222, 333, 333, 222, 999, 161616],
      temperature: [555, 666, 666, 555, 121212, 191919],
    };
    expect(dataFilter(content)).toStrictEqual({
      time: [111, 222, 888, 151515],
      weight: [222, 333, 999, 161616],
      temperature: [555, 666, 121212, 191919],
    });
  });
  it.only('testing xysortx', () => {
    const content = {
      time: [111, 222, 222, 111, 888, 151515],
      weight: [222, 3, 9, 222, 999, 161616],
      temperature: [555, 666, 666, 555, 121212, 191919],
    };
    expect(xySortX(content, { isSorted: false })).toStrictEqual({
      time: [111, 222, 888, 151515],
      weight: [222, 6, 999, 161616],
      temperature: [555, 666, 121212, 191919],
    });
  });
});
