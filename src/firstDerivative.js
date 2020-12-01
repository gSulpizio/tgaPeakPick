import SG from 'ml-savitzky-golay-generalized';

/**
 *
 * @param {Array} [x] original x-data
 * @param {Array} [y] original y-data
 * @returns {Array} derivative y-data
 */
export default function firstDerivative(x, y) {
  var ans = SG(y, x);
  return ans;
}
