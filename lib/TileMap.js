import generateTiledJSON from './util/generateTiledJSON.js'; // Exports to Tiled Editor JSON format
import Mersenne from './util/mersenne.js'; // Randomness
import noise from './util/noise.js'; // Perlin Noise

export default class TileMap {
  constructor({ x = 0, y = 0, width = 16, height = 16, depth = 1, tileWidth = 16, tileHeight = 16, is3D = false } = {}) {
    this.x = x;
    this.y = y;
    // this.z = 0;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.mersenneTwister = new Mersenne()
    this.Noise = new noise();
    this.noise = this.Noise.noise;
    this.seedNoise = this.Noise.noiseSeed;
    this.data = this.initializeDataArray();
    // ASCII representations for tiles 0-10
    // TODO: Is there a better default set of ASCII characters we can use?
    this.defaultRogueLike = ['-', '#', '+', '0', '<', '>', '$', '#', '@', '&', '?'];
    this.seedRandom();
  }

  initializeDataArray() {
    // Create a single-dimensional array
    let data;
    if (this.depth > 1) {
      data = init3DArray(this.width, this.height, this.depth);
    } else {
      data = init2DArray(this.width, this.height);
    }
    return data;
  }

  fill(value) {
    if (this.depth > 1) {
      for (let z = 0; z < this.depth; z++) {
        this.fill3D(value, z);
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

  fill3D(value, z) {
    for (let i = 0; i < this.height * this.width; i++) {
      this.data[z][i] = value;
    }
  }

  random(max) {
    return this.mersenneTwister.rand(max);
  }

  seed(value) {
    if (typeof value === 'undefined') {
      value = this.random(6400000000);
    }
    this.mersenneTwister.seed(value);
    this.seedNoise(value);
    // this.mersenneTwister.seed_array([value]); // also can seed from arrays
  }

  seedRandom() {
    this.seed(this.random(6400000000));
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
    let asciiMasks = []; // Initialize an array to hold ASCII masks for each layer

    if (this.depth > 1) {
      let asciiLookup = format || this.defaultRogueLike;

      // Iterate through each layer of depth
      for (let z = 0; z < this.depth; z++) {
        let asciiMap = ``;

        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const tile = this.data[z][y * this.width + x]; // Access the correct layer in the 3D array
            asciiMap += asciiLookup[tile % asciiLookup.length]; // Use modulo to wrap around if tile index exceeds lookup table
          }
          asciiMap += '\n'; // New line at the end of each row
        }

        asciiMasks.push(asciiMap); // Add the ASCII map of the current layer to the array
      }

      return asciiMasks; // Return the array of ASCII masks
    } else {
      // Handle the 2D case as before
      let asciiMap = '';
      let asciiLookup = format || this.defaultRogueLike;
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const tile = this.data[y * this.width + x];
          asciiMap += asciiLookup[tile % asciiLookup.length];
        }
        asciiMap += '\n';
      }
      // For consistency, wrap the 2D mask in an array as well
      return [asciiMap];
    }
  }

  applyBiome(biome) {
    let tileMap = this;
    const noiseValues = tileMap.data; // Array of noise values
    const weights = biome.distribution; // Object with tile names as keys and weights as values
    const tileNames = Object.keys(weights); // Array of tile names
    const totalWeight = tileNames.reduce((total, name) => total + weights[name], 0);
    const weightedRanges = tileNames.map((name, index) => ({
      name,
      end: tileNames.slice(0, index + 1).reduce((sum, name) => sum + weights[name], 0) / totalWeight
    }));

    for (let i = 0; i < noiseValues.length; i++) {
      const noiseValue = noiseValues[i];
      const selectedTileName = weightedRanges.find(range => noiseValue <= range.end).name;
      const tileId = biome.tileset.getTileByName(selectedTileName).id;
      tileMap.data[i] = tileId;
    }
  }

  getTileAt(x, y, z) {
    if (this.is3D) {
      return this.data[z][y * this.width + x];
    } else {
      return this.data[y * this.width + x];
    }
  }

  toJSON() {
    return JSON.stringify({
      width: this.width,
      height: this.height,
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
      data: this.data
    }, null, 2);
  }

  toTiledJSON() {
    return generateTiledJSON(this);
  }

  query({ x, y, width, height, z, tileName } = {}) {
    let results = [];

    if (x !== undefined && y !== undefined && width !== undefined && height !== undefined) {
      for (let offsetY = 0; offsetY < height; offsetY++) {
        for (let offsetX = 0; offsetX < width; offsetX++) {
          const queryX = x + offsetX;
          const queryY = y + offsetY;

          if (queryX >= this.width || queryY >= this.height) {
            results.push(undefined); // Add undefined for out-of-bounds indices
          } else {
            const index = queryY * this.width + queryX; // Calculate the correct index in the 1D array
            if (this.is3D) {
              if (z !== undefined && this.data[z] && this.data[z][index] !== undefined) {
                results.push(this.data[z][index]);
              } else {
                results.push(undefined);
              }
            } else {
              if (this.data[index] !== undefined) {
                results.push(this.data[index]);
              } else {
                results.push(undefined);
              }
            }
          }
        }
      }
    }

    // create a new TileMap instance from the results
    let subsection = new TileMap({
      width,
      height,
      is3D: this.is3D
    });

    subsection.data = results;

    return subsection;
  };


  // query3D is WIP - not fully implemented yet, see: ./test/tilemap-query-test.js 
  query3D({ x, y, z, width, height, depth, tileName } = {}) {
    let results = [];

    if (x !== undefined && y !== undefined && z !== undefined && width !== undefined && height !== undefined && depth !== undefined) {
      for (let offsetZ = 0; offsetZ < depth; offsetZ++) {
        for (let offsetY = 0; offsetY < height; offsetY++) {
          for (let offsetX = 0; offsetX < width; offsetX++) {
            const queryX = x + offsetX;
            const queryY = y + offsetY;
            const queryZ = z + offsetZ;

            if (queryX >= this.width || queryY >= this.height || queryZ >= this.depth) {
              results.push(undefined); // Add undefined for out-of-bounds indices
            } else {
              // Calculate the correct index in the 3D array
              const index = queryZ * this.width * this.height + queryY * this.width + queryX;
              if (this.data[index] !== undefined) {
                results.push(this.data[index]);
              } else {
                results.push(undefined);
              }
            }
          }
        }
      }
    }

    // Additional logic to filter results by tileName, if provided
    if (tileName !== undefined) {
      const tileId = this.getTileIdByName(tileName); // Assuming a getTileIdByName function exists to map tile names to IDs
      results = results.filter(tile => tile === tileId);
    }

    return results;
  }



  // Helper function to find tiles by ID
  findTilesById(tileId) {
    let positions = [];
    const depth = this.is3D ? this.data.length : 1;

    for (let z = 0; z < depth; z++) {
      const layer = this.is3D ? this.data[z] : this.data;
      for (let i = 0; i < layer.length; i++) {
        if (layer[i] === tileId) {
          const x = i % this.width;
          const y = Math.floor(i / this.width);
          positions.push(this.is3D ? { x, y, z } : { x, y });
        }
      }
    }

    return positions;
  };

  // Example method to get tile ID by name (you'll need to implement this based on your tileset)
  getTileIdByName(tileName) {
    // This is a placeholder function. You should implement it based on how your tileset is structured.
    // For example, if you have a mapping of tile names to tile IDs, you would use that here.
    // Return an example tile ID for demonstration
    return 1; // Assume tile ID 1 corresponds to the given tile name
  };

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