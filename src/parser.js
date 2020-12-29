/**
 *Tool to parse a csv file
 * @param {File} [content] CSV file containing the raw data
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

  let y = data.map((a) => a['Unsubtracted Weight']);
  let x = data.map((a) => a['Sample Temperature']);

  return { x, y };
}
