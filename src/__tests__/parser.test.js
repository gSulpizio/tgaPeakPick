import parser from '../parser';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('test Parse', () => {
  it('should return parsed numbers', () => {
    const content = readFileSync(
      join(__dirname, './data/testFileShort.csv'),
      'utf8',
    );

    expect(parser(content)).toStrictEqual({
      time: [111, 222, 222, 111, 888, 151515],
      weight: [222, 333, 333, 222, 999, 161616],
      temperature: [555, 666, 666, 555, 121212, 191919],
    });
  });
});
