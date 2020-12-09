import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import { xyUniqueX } from 'ml-spectra-processing';
import dataFilter from '../src/dataFilter.js';
import SG from 'ml-savitzky-golay-generalized';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');

let data = parser(content);
let toSort = (({ temperature, weight }) => ({ temperature, weight }))(data);
toSort = renameKey(toSort, 'temperature', 'x');
toSort = renameKey(toSort, 'weight', 'y');
console.log(toSort);
let filteredData = xyUniqueX(toSort, { algorithm: 'average', isSorted: false });
//let filteredData = dataFilter(data);
//let xy = { x: filteredData.x, y: filteredData.y };

writeFileSync(join(__dirname, 'data.json'), JSON.stringify(toSort), 'utf8');

function renameKey(object, key, newKey) {
  const clone = (obj) => Object.assign({}, obj);
  const clonedObj = clone(object);

  const targetKey = clonedObj[key];

  delete clonedObj[key];

  clonedObj[newKey] = targetKey;

  return clonedObj;
}
