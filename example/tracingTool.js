import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';

const content = readFileSync(join(__dirname, './testFile.csv'), 'utf8');
let data = parser(content);
let xy = { x: data.temperature, y: data.weight };

writeFileSync(join(__dirname, 'data.json'), JSON.stringify(xy), 'utf8');
