import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import dataFilter from '../src/dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import firstDerivative from '../src/firstDerivative.js';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');
let rawData = parser(content);
let filteredData = dataFilter(rawData);
let data = firstDerivative(filteredData.temperature, filteredData.weight);
let smoothedData = SG(data, filteredData.temperature, { polynomial: 5 });
let xy = { x: filteredData.temperature, y: smoothedData };

writeFileSync(
  join(__dirname, 'dataDerivative.json'),
  JSON.stringify(xy),
  'utf8',
);
