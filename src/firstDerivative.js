import SG from 'ml-savitzky-golay-generalized';
import { sma } from 'moving-averages';

/**
 *deprecated: tool to compute first derivative
 * @param {Array} [r] moving average
 * @param {Array} [x] original x-data
 * @param {Array} [y] original y-data
 * @returns {Array} derivative y-data
 */
export default function firstDerivative(x, y, r) {
  let diffData = SG(y, x, { derivative: 1 });
  //Smoothing:

  let smoothDiffData = sma(diffData, 50, 1);

  smoothDiffData = Array.from(smoothDiffData, (item) => item || diffData[r]); //replaces empty items with a value
  return smoothDiffData;
}
