import SG from 'ml-savitzky-golay-generalized';

/**
 *
 * @param {Array} [x] original x-data
 * @param {Array} [y] original y-data
 * @returns {Array} derivative y-data
 */
export default function firstDerivative(x, y) {
  var noiseLevel = 0.1;
  var data = new Array(20);
  for (var i = 0; i < data.length; i++)
    data[i] =
      Math.sin((i * Math.PI * 2) / data.length) +
      (Math.random() - 0.5) * noiseLevel;
  var ans = SG(y, x); //, options);
  console.log(ans);
  return ans;
}
