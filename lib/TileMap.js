// Randomness
import Mersenne from './util/mersenne.js';

export default class TileMap {
  constructor({ x = 0, y = 0, width, height, depth, tileWidth, tileHeight, is3D = false } = {}) {
    this.x = x;
    this.y = y;
    // this.z = 0;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.is3D = is3D;
    this.mersenneTwister = new Mersenne()
    this.data = this.initializeDataArray({ width, height, is3D });

    // ASCII representations for tiles 0-10
    // TODO: Is there a better default set of ASCII characters we can use?
    this.defaultRogueLike = [ '-', '#', '+', '0', '<', '>', '$', '#', '@', '&', '?'];

  }

  initializeDataArray() {
    // Create a single-dimensional array
    let data;
    if (this.is3D) {
      data = init3DArray(this.width, this.height, this.depth);
    } else {
      data = init2DArray(this.width, this.height);
    }
    return data;
  }

  fill(value) {
    if (this.is3D) {
      for (let z = 0; z < this.depth; z++) {
        //  this.fill2D(value, z);
      }
    } else {
      this.fill2D(value);
    }
  }

  fill2D(value) {
    for (let i = 0; i < this.height * this.width; i++) {
      this.data[i] = value;
    }
  }

  random(max) {
    return this.mersenneTwister.rand(max);
  }

  seed(value) {
    this.mersenneTwister.seed(value);
    // this.mersenneTwister.seed_array([value]); // also can seed from arrays
  }

  use(subMap, offsetX, offsetY) {
    // TODO: add support for if(this.is3D) support
    for (let y = 0; y < subMap.height; y++) {
      for (let x = 0; x < subMap.width; x++) {
        const targetX = x + offsetX;
        const targetY = y + offsetY;
        if (targetX < this.width && targetY < this.height) {
          this.data[targetY * this.width + targetX] = subMap.data[y * subMap.width + x];
        }
      }
    }
  }

  scaleToTileRange(tileSetRange) {
    const heightMap = this.data;
    const max = Math.max(...heightMap);
    const min = Math.min(...heightMap);
    const range = tileSetRange - 1; // Adjust for zero index

    for (let i = 0; i < heightMap.length; i++) {
      const normalizedHeight = (heightMap[i] - min) / (max - min);
      this.data[i] = Math.round(normalizedHeight * range) + 1; // +1 to adjust range
    }
  }

  mask(format) {
    let asciiLookup = format || this.defaultRogueLike;
    let asciiMap = '';
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.data[y * this.width + x];
        asciiMap += asciiLookup[tile % asciiLookup.length]; // Use modulo to wrap around if tile index exceeds lookup table
      }
      asciiMap += '\n'; // New line at the end of each row
    }
    return asciiMap;
  }

  toJSON() {
    return JSON.stringify({
      width: this.width,
      height: this.height,
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
      is3D: this.is3D,
      data: this.data
    }, null, 2);
  }
}

function init2DArray(width, height) {
  // Create a single-dimensional array
  return new Array(width * height).fill(0); // Fill with default tile type, e.g., 0
}

function init3DArray(width, height, depth) {
  let arr = [];
  for (let z = 0; z < depth; z++) {
    arr.push(init2DArray(width, height));
  }
  return arr;
}