import { join } from 'path';
import { readFileSync } from 'fs';
import parser from '../parser';
import mainFunction from '../mainFunction';

describe('test mainFunction', () => {
  it.only('should return 2 peaks from simulated data', () => {
    const content = readFileSync(
      join(__dirname, '../../example/testFile.csv'),
      'utf8',
    );

    const data = parser(content);
    let result = mainFunction(data);
  });
});
