export default function dataFilter(data) {
  let newData = {
    temperature: [data.temperature[0]],
    time: [data.time[0]],
    weight: [data.weight[0]],
  };
  let counter = 0;

  for (let i = 1; i < data.temperature.length; i++) {
    if (data.temperature[i] > newData.temperature[counter]) {
      newData.temperature.push(data.temperature[i]);
      newData.time.push(data.time[i]);
      newData.weight.push(data.weight[i]);
      counter++;
    }
  }

  return newData;
}
