import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import { xyUniqueX } from 'ml-spectra-processing';
import dataFilter from '../src/dataFilter.js';
import { gsd } from 'ml-gsd';
import SG from 'ml-savitzky-golay-generalized';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');

let data = parser(content);

let toSort = data;
toSort = dataFilter(toSort);
let filteredData = xyUniqueX(toSort, { algorithm: 'average', isSorted: false });
//let peaks = gsd(filteredData, { derivativeThreshold: 1 });
//console.log(peaks);

writeFileSync(
  join(__dirname, 'data.json'),
  JSON.stringify(filteredData),
  'utf8',
);
