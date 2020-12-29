import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import parser from '../parser';
import mainFunction from '../mainFunction';

describe('test mainFunction', () => {
  it.only('should return 4 peaks from simulated data', () => {
    const content = readFileSync(
      join(__dirname, '../../example/testFile.csv'),
      'utf8',
    );

    const data = parser(content);
    let result = mainFunction(data);

    console.log(result); //showing results

    let pkList = { x: [], y: [] };
    for (let i = 0; i < result.length; i++) {
      pkList.x.push(result[i].left.x);
      pkList.x.push(result[i].right.x);

      pkList.y.push(data.y[result[i].left.index]);
      pkList.y.push(data.y[result[i].right.index]);
    }

    writeFileSync(
      join(__dirname, '../../example/peakList.json'),
      JSON.stringify(pkList),
      'utf8',
    );
  });
});
