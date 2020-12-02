/**
 * Tool to eliminate all the temperatures that are not inferior to the previous data point.
 * @param {object} [data] object with the raw data containing temperature, time and weight
 * @returns {object} object containing the filtered data
 */
export default function dataFilter(data) {
  let init = Math.round(data.temperature.length * 0.05); //first counted value, values before are ignored
  console.log(init);
  let newData = {
    temperature: [data.temperature[init]],
    time: [data.time[init]],
    weight: [data.weight[init]],
  };

  let counter = 0;

  for (let i = init + 1; i < data.temperature.length; i++) {
    if (
      data.temperature[i] > newData.temperature[counter] &&
      data.weight[i] < newData.weight[counter]
    ) {
      newData.temperature.push(data.temperature[i]);
      newData.time.push(data.time[i]);
      newData.weight.push(data.weight[i]);
      counter++;
    }
  }

  return newData;
}
