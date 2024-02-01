// var Gen = require('../vendor/mersenne').MersenneTwister19937;

import Gen from './MersenneTwister19937.js';

function Mersenne() {
  var gen = new Gen();
  let seed = (new Date).getTime() % 1000000000;
  this.currentSeed = seed;
  gen.init_genrand(seed);

  this.rand = function (max, min) {
    if (typeof max === 'undefined') {
      return gen.genrand_real2(); // Returns a floating-point number between 0 and 1
    }

    if (typeof min === 'undefined') {
      min = 0;
    }

    return Math.floor(gen.genrand_real2() * (max - min) + min);
  }

  this.seed = function (S) {

    // check incoming value of seed and coherce to number
    // try to convert seed to number, if not number, consider as string
    let _seed = Number(S);
    if (isNaN(_seed)) {
      // convert into hash
      _seed = this.stringToSeed(S);
    }
    if (typeof (_seed) != 'number') {
      throw new Error("seed(S) must take numeric argument; is " + typeof (S));
    }
    this.currentSeed = _seed;

    gen.init_genrand(_seed);
  }
  this.seed_array = function (A) {
    if (typeof (A) != 'object') {
      throw new Error("seed_array(A) must take array of numbers; is " + typeof (A));
    }
    this.currentSeed = A;
    gen.init_by_array(A, A.length);
  }

  this.stringToSeed = function (str) {
    // Simple hash function to convert a string to a number
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

}

export default Mersenne;