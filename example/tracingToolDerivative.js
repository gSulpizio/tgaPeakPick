import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import dataFilter from '../src/dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import { xyUniqueX, xRollingAverage } from 'ml-spectra-processing';
import { gsd } from 'ml-gsd';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');
let rawData = parser(content);

let toSort = rawData;
toSort = dataFilter(toSort, 2);
let filteredData = xyUniqueX(toSort, { algorithm: 'average', isSorted: false });

let diffData = SG(filteredData.y, filteredData.x, { derivative: 1 });

let smoothedData = SG(diffData, filteredData.x, { windowSize: 601 });

let xy = { x: filteredData.x, y: smoothedData.map((x) => -x) };
//xy.x = xRollingAverage(xy.x, () => 1, { window: 2 });

let peaks = gsd(xy, { minMaxRatio: 0.01 });

const filterSoft = (obj) => obj.filter((obj) => obj.soft === false);
//console.log('peak number', filterSoft(peaks).length);
//console.log('peaks:', peaks);

writeFileSync(
  join(__dirname, 'dataDerivative.json'),
  JSON.stringify(xy),
  'utf8',
);

//2nd derivative for the chart
let dataDerivative2 = SG(xy.y, xy.x, { derivative: 1 });

let smoothedData2 = SG(dataDerivative2, filteredData.x, { windowSize: 601 });
let xy2 = { x: filteredData.x, y: smoothedData2 };

writeFileSync(
  join(__dirname, 'dataDerivative2.json'),
  JSON.stringify(xy2),
  'utf8',
);

//delete file if exists
let path = join(__dirname, 'testFile.txt');
try {
  unlinkSync(path);
  //file removed
} catch (err) {
  console.error('no file to delete');
}
//write test file for browser gsd
for (let i = 0; i < xy.x.length; i++) {
  appendFileSync(join(__dirname, 'testFile.txt'), `${xy.x[i]}  ${xy.y[i]}\n`);
}
