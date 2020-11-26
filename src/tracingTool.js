import parser from './parser.js';
export default function tracingTool(fileName) {
  let fs = require('fs');
  let path = require('path');
  let data = parser(fileName); //data[0] is time, data[1] is weight, data[2] is sample temperature
  let xy = { x: data[2], y: data[1] };

  fs.writeFileSync(
    '/home/Giustino/git/Cheminfo/chartTracer/data.json', //this is limited to this computer
    xy,
    (err) => {
      if (err) console.log(err);
      else {
        console.log('File written successfully\n');
        console.log('The written has the following contents:');
        console.log(fs.readFileSync('books.txt', 'utf8'));
      }
    },
  );

  return 0;
}
