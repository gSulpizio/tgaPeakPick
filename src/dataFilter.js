/**
 * Tool to eliminate all the temperatures that have a fluctuation that is too big compared to the other data points, eliminates the last value.
 * @param {DataXY} [data] object with the raw data containing temperature, time and weight
 * @param {number} [tolerance=2] factor of how many times the average temperature step is accepted. If we have a spacing of 2 between every temperature a factor of 2 means that if a temperature is spaced by more than 4 it will be eliminated
 * @returns {object} object containing the filtered data
 */

export default function dataFilter(data, tolerance = 2) {
  let newData = { x: [], y: [] };

  const t1 = Math.floor(data.x.length / 3);
  const t2 = Math.floor((2 * data.x.length) / 3);
  let sum = 0;
  for (let i = t1; i < t2; i++) {
    sum += Math.abs(data.x[i] - data.x[i + 1]);
  }
  const threshold = (tolerance * sum) / (t2 - t1);

  let step;

  for (let i = 0; i < data.x.length - 2; i++) {
    step = Math.abs(data.x[i] - data.x[i + 1]);
    if (step <= threshold) {
      newData.x.push(data.x[i]);

      newData.y.push(data.y[i]);
    }
  }

  return newData;
}
