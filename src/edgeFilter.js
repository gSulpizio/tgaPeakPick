export default function edgeFilter(
  data,
  percentile = 95,
  maxSlicePercentage = 2,
  left = true,
  right = true,
) {
  let newData = { x: data.x, y: data.y };
  let tolerance = getPercentile(data.y, percentile);

  let startLeft = Math.ceil((maxSlicePercentage * (data.y.length - 1)) / 100);
  let startRight = Math.ceil(
    ((100 - maxSlicePercentage) * (data.y.length - 1)) / 100,
  );

  let step;
  console.log(tolerance);
  if (left) {
    for (let i = startLeft; i > 0; i--) {
      step = Math.abs(data.x[i] - data.x[i - 1]);
      if (step >= tolerance) {
        newData.x.splice(0, i + 1);
        newData.y.splice(0, i + 1);
        break;
      }
    }
  }

  if (right) {
    for (let i = startRight; i < data.x.length - 1; i++) {
      step = Math.abs(data.x[i] - data.x[i + 1]);
      if (step >= tolerance) {
        newData.x.splice(i);
        newData.y.splice(i);
        break;
      }
    }
  }
  return newData;
}
function getPercentile(array, percentile) {
  if (array.length === 0) {
    throw 'edgeFilter - getPercentile: input array length is 0, please enter non-empty array';
  }

  let stepArray = [];
  for (let i = 1; i < array.length; i++) {
    stepArray.push(Math.abs(array[i] - array[i - 1]));
  }
  stepArray.sort((a, b) => a - b);

  let n1_value = Math.floor((percentile / 100) * (stepArray.length - 1));
  let n2_value = Math.ceil((percentile / 100) * (stepArray.length - 1));

  let value = (stepArray[n1_value] + stepArray[n2_value]) / 2;
  return value;
}
