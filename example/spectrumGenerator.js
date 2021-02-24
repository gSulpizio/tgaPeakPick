import { generateSpectrum } from 'spectrum-generator';
import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import parser from '../src/parser.js';
import dataFilter from '../src/dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import { xyUniqueX, xyRolling } from 'ml-spectra-processing';
import { gsd, optimizePeaks } from 'ml-gsd';
import { SpectrumGenerator } from 'spectrum-generator';
import { ifError } from 'assert';

/*
const generator = new SpectrumGenerator({ from: 0, to: 700, nbPoints: 10000 });


generator.addPeak(
  { x: 75, y: 0.0025 },
  {
    // customize peaks shape
    width: 90, // width of peak is FWHM
    shape: {
      kind: 'gaussian',
    },
  },
);

generator.addPeak(
  { x: 190, y: 0.002 },
  {
    // customize peaks shape
    width: 70, // width of peak is FWHM
    shape: {
      kind: 'gaussian',
    },
  },
);

generator.addPeak(
  { x: 530, y: 0.03 },
  {
    // customize peaks shape
    width: 120, // width of peak is FWHM
    shape: {
      kind: 'gaussian',
    },
  },
);

generator.addPeak(
  { x: 430, y: 0.0025 },
  {
    // customize peaks shape
    width: 30, // width of peak is FWHM
    shape: {
      kind: 'gaussian',
    },
  },
);


const spectrum = generator.getSpectrum();

*/
const content = readFileSync(join(__dirname, './data/peakList.json'), 'utf8');
let peakList = [];
let parsedContent = JSON.parse(content);
for (let i = 0; i < parsedContent.length; i++) {
  peakList.push([
    parsedContent[i].x,
    parsedContent[i].y,
    parsedContent[i].width,
  ]);
}

const spectrum = generateSpectrum(peakList);

let spectrumRendered = {
  x: Array.from(spectrum.x),
  y: Array.from(spectrum.y),
};

writeFileSync(
  join(__dirname, './data/dataSim.json'),
  JSON.stringify(spectrumRendered),
  'utf8',
);

//cutting
let toAnalyze = spectrumRendered; //cutting(spectrumRendered, 0, 5000);

//let peaks = gsd(toAnalyze); //, { shape: 'gaussian' });

function cut(data, n, m) {
  let x = [];
  let y = [];
  for (let i = n; i < m; i++) {
    y.push(data.y[i]);
    x.push(data.x[i]);
  }

  return { x, y };
}

//toAnalyze = cut(toAnalyze, 0, Math.floor(toAnalyze.x.length / 2));

//delete file if exists
let path = join(__dirname, 'testFile.txt');
try {
  unlinkSync(path);
  //file removed
} catch (err) {
  console.error('no file to delete');
}
//write test file for browser gsd
for (let i = 0; i < toAnalyze.x.length; i++) {
  appendFileSync(
    join(__dirname, 'testFile.txt'),
    `${toAnalyze.x[i]}  ${toAnalyze.y[i]}\n`,
  );
}

//for generating a testCase File

appendFileSync(
  join(__dirname, 'testFile2.csv'),
  `Unsubtracted Weight, Sample Temperature\n`,
);
for (let i = 0; i < toAnalyze.x.length; i++) {
  appendFileSync(
    join(__dirname, 'testFile2.csv'),
    `${toAnalyze.x[i]},${toAnalyze.y[i]},\n`,
  );
}
