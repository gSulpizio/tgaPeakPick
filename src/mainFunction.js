import peakFinder from './peakFinder';
import edgeFilter from './edgeFilter';
import { xPadding, xyUniqueX } from 'ml-spectra-processing';
import { rollingBall } from 'ml-rolling-ball-baseline';
import dataFilter from './dataFilter';
import SG from 'ml-savitzky-golay-generalized';
import deleteGreaterY from './deleteGreaterY';
import deleteSmallerX from './deleteSmallerX';
import writeFiles from '../example/writeFiles';

//npx jest --watch --rootDir=src                    a utiliser

export default function mainFunction(
  data,
  radius = 2,
  options = {
    gsdOptions: {
      sgOptions: { windowSize: 0, polynomial: 3 },
      factorWidth: 4,
      shape: { kind: 'Gaussian', options: {} },
    },
  },
) {
  if (options.gsdOptions.sgOptions.windowSize === 0) {
    options.gsdOptions.sgOptions.windowSize = Math.floor(
      (radius / 100) * data.x.length,
    );
    if (options.gsdOptions.sgOptions.windowSize % 2 === 0) {
      options.gsdOptions.sgOptions.windowSize += 1;
    }
  }
  let filteredData = dataFilter(data);

  let processedData = deleteGreaterY(filteredData);
  processedData = deleteSmallerX(processedData);
  processedData = xyUniqueX(filteredData, { isSorted: false });
  processedData = edgeFilter(processedData);

  //processedData.y = Array.from(xPadding(processedData.y));

  let dY = SG(processedData.y, processedData.x, { derivative: 1 });
  let dYSmooth = Array.from(rollingBall(dY, { windowS: 150 }));
  let toAnalyze = { x: processedData.x, y: dYSmooth.map((x) => -x) };

  let result = peakFinder(toAnalyze, options.gsdOptions);

  getFWHM(data, result, toAnalyze.y);

  //to write the data in a file in ../example/data:
  writeFiles(processedData, toAnalyze, {
    x: processedData.x,
    y: dY.map((x) => -x),
  });
  console.log(result);
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
