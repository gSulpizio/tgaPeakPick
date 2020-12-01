import SG from 'ml-savitzky-golay-generalized';

/**
 *deprecated: tool to compute first derivative
 * @param {Array} [x] original x-data
 * @param {Array} [y] original y-data
 * @returns {Array} derivative y-data
 */
export default function firstDerivative(x, y) {
<<<<<<< HEAD
  //let y = SG(y, x);
  let ans = SG(y, x, { derivative: 1 });
=======

  var ans = SG(y, x); //, options);
>>>>>>> eada27fbbbf9f07a3fb3178c9f817119af0fc876
  return ans;
}
