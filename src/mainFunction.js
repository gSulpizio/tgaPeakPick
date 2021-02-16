import peakFinder from './peakFinder';
import { join } from 'path';
import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';
import { xPadding, xyUniqueX } from 'ml-spectra-processing';
import { rollingBall } from 'ml-rolling-ball-baseline';
import dataFilter from './dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import deleteGreaterY from './deleteGreaterY';
import deleteSmallerX from './deleteSmallerX';
//npx jest --watch --rootDir=src                    a utiliser

export default function mainFunction(data, radius = 1) {
  radius = (radius / 100) * Math.abs(data.x[data.x.length - 1] - data.x[0]);
  console.log('radius', radius);

  let filteredData = dataFilter(data);

  let processedData = deleteGreaterY(filteredData);
  processedData = deleteSmallerX(processedData);
  processedData = xyUniqueX(filteredData, { isSorted: false });
  //processedData.y = Array.from(xPadding(processedData.y));

  let dY = SG(processedData.y, processedData.x, { derivative: 1 });
  let dYSmooth = Array.from(rollingBall(dY, radius));
  let toAnalyze = { x: processedData.x, y: dYSmooth.map((x) => -x) };
  //write spectrum
  writeFileSync(
    join(__dirname, '../example/data.json'),
    JSON.stringify(processedData),
    'utf8',
  );
  //write derivative
  writeFileSync(
    join(__dirname, '../example/dataDerivative.json'),
    JSON.stringify(toAnalyze),
    'utf8',
  );
  //write text file
  let textData;
  for (let i = 0; i < toAnalyze.x.length; i++) {
    textData += `${toAnalyze.x[i]}  ${toAnalyze.y[i]}\n`;
  }
  console.log(textData);
  writeFileSync(join(__dirname, '../example/data.txt'), textData, 'utf8');

  let result = peakFinder(toAnalyze, {
    sgOptions: {},
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
