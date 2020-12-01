import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import dataFilter from '../src/dataFilter';
import SG from 'ml-savitzky-golay-generalized';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');

let data = parser(content);
let filteredData = dataFilter(data);

let xy = { x: filteredData.temperature, y: filteredData.weight };

writeFileSync(join(__dirname, 'data.json'), JSON.stringify(xy), 'utf8');
