import parser from './parser.js';
export default function tracingTool(fileName) {
  let fs = require('fs');
  let path = require('path');
  let data = parser(fileName);
  console.log(data);

  fs.writeFileSync(
    path.resolve(
      '/home/Giustino/git/Cheminfo/tgaPeakPick/src/chartTracer',
      'data.json',
    ),
    JSON.stringify(data),
  );
  return 0;
}
