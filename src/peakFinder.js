import { gsd, optimizePeaks } from 'ml-gsd';
export default function peakFinder(data, options = {}) {
  let xy = data; //{ x: data.x, y: data.y.map((x) => -x) };
  let peaks = gsd(xy, { shape: options.shape, sgOptions: options.sgOptions });

  let optimized = optimizePeaks(xy, peaks, {
    factorWidth: options.factorWidth,
  });

  return optimized;
}
