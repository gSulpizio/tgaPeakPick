import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import parser from '../parser';
import mainFunction from '../mainFunction';

describe('test mainFunction', () => {
  it.only('should return 4 peaks from simulated data', () => {
    const content = readFileSync(
      join(__dirname, '../../example/data/testFile.csv'),
      'utf8',
    );

    const data = parser(content);
    let result = mainFunction(data);

    let peakList = { x: [], y: [] };
    for (let i = 0; i < result.length; i++) {
      peakList.x.push(result[i].left.x);
      peakList.x.push(result[i].right.x);

      peakList.y.push(data.y[result[i].left.index]);
      peakList.y.push(data.y[result[i].right.index]);
    }

    writeFileSync(
      join(__dirname, '../../example/data/peakList.json'),
      JSON.stringify(peakList),
      'utf8',
    );
  });
});
