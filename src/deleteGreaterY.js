/**
 *
 *  Tool to delete the points where the i-th Y-coordinate is bigger than the (i-1)-th Y-coordinate
 *  @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 *  @returns {object} object containing the cleaned data
 */

export default function deleteGreaterY(data) {
  if (data.x.length !== data.y.length) {
    throw new Error("deleteGreater: length of x and y don't match");
  }

  let counter = 0;
  let cleanedData = { x: [], y: [] };
  cleanedData.x.push(data.x[0]);
  cleanedData.y.push(data.y[0]);
  for (let i = 1; i < data.x.length; i++) {
    if (cleanedData.y[counter] >= data.y[i]) {
      cleanedData.x.push(data.x[i]);
      cleanedData.y.push(data.y[i]);
      counter++;
    }
  }
  return cleanedData;
}
