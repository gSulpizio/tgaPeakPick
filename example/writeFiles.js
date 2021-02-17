import { writeFileSync } from 'fs';
import { join } from 'path';
/**
 * this function writes files to plot in
 */

export default function writeFiles(
  processedData,
  toAnalyze,
  optionalFile = false,
) {
  //write spectrum
  writeFileSync(
    join(__dirname, './data/data.json'),
    JSON.stringify(processedData),
    'utf8',
  );
  //write derivative
  writeFileSync(
    join(__dirname, './data/dataDerivative.json'),
    JSON.stringify(toAnalyze),
    'utf8',
  );
  //write text file
  let textData;
  for (let i = 0; i < toAnalyze.x.length; i++) {
    textData += `${toAnalyze.x[i]}  ${toAnalyze.y[i]}\n`;
  }
  writeFileSync(join(__dirname, './data/data.txt'), textData, 'utf8');

  if (optionalFile) {
    writeFileSync(
      join(__dirname, './data/optionalFile.json'),
      JSON.stringify(optionalFile),
      'utf8',
    );
  }
}
