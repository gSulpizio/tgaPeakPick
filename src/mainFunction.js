import peakFinder from './peakFinder';
import { join } from 'path';
import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';
import parser from './parser';
import { xyUniqueX } from 'ml-spectra-processing';
import dataFilter from './dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import deleteGreaterY from './deleteGreaterY';
import deleteSmallerX from './deleteSmallerX';

export default function mainFunction(data, radius = 601) {
  let radius2 = Math.floor((radius * 4) / 3);
  if (radius2 % 2 === 0) {
    radius2 += 1;
  }

  //const data = parser(content);
  let filteredData = dataFilter(data);

  let processedData = deleteGreaterY(filteredData);
  //processedData = xyUniqueX(filteredData, { isSorted: false });

  writeFileSync(
    join(__dirname, '../example/data1.json'),
    JSON.stringify(processedData),
    'utf8',
  );
  let dY = SG(processedData.y, processedData.x, { derivative: 1 });
  let dYSmooth = SG(dY, processedData.x, { windowSize: radius });
  let toAnalyze = { x: processedData.x, y: dYSmooth.map((x) => -x) };

  let result = peakFinder(toAnalyze, {
    sgOptions: { windowSize: radius2 },
    minMaxRatio: 0.01,
    factorWidth: 4,
  });
  getFWHM(data, result, toAnalyze.y);
  return result;
}

function getFWHM(data, result, dY) {
  let threshold;
  let leftX, rightX;
  for (let i = 0; i < result.length; i++) {
    leftX = result[i].index;
    rightX = result[i].index;
    threshold = dY[result[i].index] / 2;
    while (
      dY[leftX] > threshold &&
      dY[rightX] > threshold &&
      rightX < data.y.length &&
      leftX > 0
    ) {
      leftX--;
      rightX++;
    }
    result[i].fwhm = Math.abs(data.x[leftX] - data.x[rightX]);
  }
  return 0;
}
