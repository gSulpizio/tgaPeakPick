import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import dataFilter from '../src/dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import firstDerivative from '../src/firstDerivative.js';
import { xyUniqueX } from 'ml-spectra-processing';
import { gsd } from '../src/globalSpectralDeconvolution';
import { ma } from 'moving-averages';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');
let rawData = parser(content);

let toSort = { x: rawData.temperature, y: rawData.weight };
toSort = dataFilter(toSort, 2);
let filteredData = xyUniqueX(toSort, { algorithm: 'average', isSorted: false });

//let data = firstDerivative(filteredData.x, filteredData.y);
let diffData = SG(filteredData.y, filteredData.x, { derivative: 1 });

let smoothedData = SG(diffData, filteredData.x, { windowSize: 501 });

//smoothedData = ma(smoothedData, 200);  //MOVING AVERAGE SMOOTHING WILL DISPLACE THE DATA
console.log(smoothedData);
let xy = { x: filteredData.x, y: smoothedData.map((x) => -x) };
console.log('xy:', xy);

let peaks = gsd(xy, {});

const filterSoft = (obj) => obj.filter((obj) => obj.soft === false);
console.log('truepeaks', filterSoft(peaks));

writeFileSync(
  join(__dirname, 'dataDerivative.json'),
  JSON.stringify(xy),
  'utf8',
);
