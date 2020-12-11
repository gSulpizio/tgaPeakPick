import { IsotopicDistribution } from 'mf-global';
import { gsd } from '../src/globalSpectralDeconvolution';

// generate a sample spectrum of the form {x:[], y:[]}
const data = new IsotopicDistribution('C').getGaussian();

let peaks = gsd(data, {
  noiseLevel: 0,
  minMaxRatio: 0.00025, // Threshold to determine if a given peak should be considered as a noise
  realTopDetection: true,
  maxCriteria: true, // inverted:false
  smoothY: false,
  sgOptions: { windowSize: 7, polynomial: 3 },
});
console.log(peaks); // array of peaks {x,y,width}, width = distance between inflection points
// GSD
