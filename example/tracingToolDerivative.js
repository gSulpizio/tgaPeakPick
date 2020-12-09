import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import dataFilter from '../src/dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import firstDerivative from '../src/firstDerivative.js';
import { xyUniqueX } from 'ml-spectra-processing';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');
let rawData = parser(content);
let filteredData = xyUniqueX(rawData, (isSorted = false));
let data = firstDerivative(filteredData.temperature, filteredData.weight);
let smoothedData = SG(data, filteredData.temperature, { windowSize: 300 });
let xy = { x: filteredData.temperature, y: smoothedData };

writeFileSync(
  join(__dirname, 'dataDerivative.json'),
  JSON.stringify(xy),
  'utf8',
);
