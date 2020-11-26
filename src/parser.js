import { time } from 'console';

/**
 * Returns a very important number
 * @return {number}
 */
export default function parser(fileName) {
  const Papa = require('papaparse'); //to use papaparse

  const fs = require('fs');
  const file = fs.readFileSync(fileName, 'utf8');

  let data = {};

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function (results) {
      data = results.data;
    },
  });
  let timeCollect = data.map((a) => a.Time);
  let weightCollect = data.map((a) => a['Unsubtracted Weight']);
  let temperatureCollect = data.map((a) => a['Sample Temperature']);

  return [timeCollect, weightCollect, temperatureCollect]; //array of arrays to avoid using objects for a fast processing
}
