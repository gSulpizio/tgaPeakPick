/**
 * Tool to eliminate all the temperatures that have a fluctuation that is too big compared to the other data points.
 * @param {DataXY} [data] object with the raw data containing temperature, time and weight
 * @returns {object} object containing the filtered data
 */
export default function dataFilter(data) {
  const t1 = Math.floor(data.x.length / 3);
  const t2 = Math.floor((2 * data.x.length) / 3);
  let sum = 0;
  for (let i = t1; i < t2; i++) {
    sum += Math.abs(data.x[i] - data.x[i + 1]);
  }
  const threshold = (2 * sum) / (t2 - t1);

  let newData = { x, y };
  let step;
  for (let i = 0; i < data.x.length - 1; i++) {
    step = Math.abs(data.x[i] - data.x[i + 1]);
    if (step < threshold) {
      newData.x.push(data.x[i + 1]);
    }
  }
  return newData;
}
