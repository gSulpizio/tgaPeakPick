import { gsd, optimizePeaks } from 'ml-gsd';
export default function (data, options = {}) {
  let xy = data; //{ x: data.x, y: data.y.map((x) => -x) };
  let peaks = gsd(xy, options);

  let optimized = optimizePeaks(xy, peaks, options);

  return optimized;
}
