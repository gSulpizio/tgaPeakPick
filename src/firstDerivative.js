import SG from 'ml-savitzky-golay-generalized';

/**
 *
 * @param {Array} [x] original x-data
 * @param {Array} [y] original y-data
 * @returns {Array} derivative y-data
 */
export default function firstDerivative(x, y) {
  //let y = SG(y, x);
  let ans = SG(y, x, { derivative: 1 });
  return ans;
}
