import parser from './parser.js';
export default function tracingTool(fileName) {
  let fs = require('fs');
  let path = require('path');
  let data = parser(fileName); //data[0] is time, data[1] is weight, data[2] is sample temperature
  let xy = { x: data[2], y: data[1] };

  fs.writeFileSync(
    path.resolve(
      '/home/Giustino/git/Cheminfo/tgaPeakPick/src/chartTracer',
      'data.json',
    ),
    JSON.stringify(xy),
  );
  return 0;
}
