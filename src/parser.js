/**
 * Returns a very important number
 * @return {number}
 */
export default function parser(content) {
  const Papa = require('papaparse'); //to use papaparse

  let data = {};

  Papa.parse(content, {
    header: true,
    dynamicTyping: true,
    complete: function (results) {
      data = results.data;
    },
  });

  let time = data.map((a) => a.Time);
  let weight = data.map((a) => a['Unsubtracted Weight']);
  let temperature = data.map((a) => a['Sample Temperature']);

  return { time, weight, temperature }; //array of arrays to avoid using objects for a fast processing
}
