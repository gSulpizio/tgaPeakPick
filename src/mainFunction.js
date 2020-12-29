import peakFinder from './peakFinder';
import { join } from 'path';
import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';
import parser from './parser';
import { xyUniqueX } from 'ml-spectra-processing';
import dataFilter from './dataFilter';
import SG from 'ml-savitzky-golay-generalized';

export default function mainFunction(data, radius = 601) {
  let radius2 = Math.floor((radius * 4) / 3);
  if (radius2 % 2 !== 0) {
    radius2 += 1;
  }
  const mean = data.y.reduce((a, b) => a + b) / data.y.length;
  let std = Math.sqrt(
    data.y.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) /
      data.y.length,
  );
  console.log('std:', std);
  //const data = parser(content);
  let filteredData = dataFilter(data);
  let processedData = xyUniqueX(filteredData, { isSorted: false });
  let dY = SG(processedData.y, processedData.x, { derivative: 1 });
  let dYSmooth = SG(dY, processedData.x, { windowSize: radius });
  let toAnalyze = { x: processedData.x, y: dYSmooth.map((x) => -x) };

  let result = peakFinder(toAnalyze, {
    sgOptions: { windowSize: radius2 },
    minMaxRatio: 0.01,
    factorWidth: 4,
  });
  return result;
}

function getSTD(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n,
  );
}
