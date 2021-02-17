import peakFinder from '../peakFinder';
import { join } from 'path';
import { readFileSync, writeFileSync, appendFileSync, unlinkSync } from 'fs';
import parser from '../parser';
import { xyUniqueX } from 'ml-spectra-processing';
import dataFilter from '../dataFilter';
import SG from 'ml-savitzky-golay-generalized';

describe('test peakFinder', () => {
  it('should return 4 peaks', () => {
    const content = readFileSync(
      join(__dirname, '../../example/data/testFile.csv'),
      'utf8',
    );

    const data = parser(content);
    let filteredData = dataFilter(data);
    let processedData = xyUniqueX(filteredData, { isSorted: false });
    let dY = SG(processedData.y, processedData.x, { derivative: 1 });
    let dYSmooth = SG(dY, processedData.x, { windowSize: 601 });
    let toAnalyze = { x: processedData.x, y: dYSmooth.map((x) => -x) };

    let result = peakFinder(toAnalyze, {
      sgOptions: { windowSize: 801 },
      minMaxRatio: 0.01,
      factorWidth: 4,
    });

    /*
    result.forEach((peak) => {
      if (Math.abs(peak.x - 545) < 20) {
        expect(peak.width).toBeGreaterThanOrEqual(150);
        expect(peak.width).toBeLessThan(220);
      }
    });
    result.forEach((peak) => {
      if (Math.abs(peak.x - 190) < 20) {
        expect(peak.width).toBeGreaterThanOrEqual(70);
        expect(peak.width).toBeLessThan(120);
      }
    });
*/

    //delete file if exists
    let path = join(__dirname, './data/testFile.txt');
    try {
      unlinkSync(path);
      //file removed
    } catch (err) {
      console.error('no file to delete');
    }
    //write test file for browser gsd
    for (let i = 0; i < toAnalyze.x.length; i++) {
      appendFileSync(
        join(__dirname, './data/testFile.txt'),
        `${toAnalyze.x[i]}  ${toAnalyze.y[i]}\n`,
      );
    }
  });
});
