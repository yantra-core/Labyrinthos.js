import TileMap from '../TileMap.js'; // self reference required for new TileMap instance

export default function query({ x, y, width, height, z, tile } = {}) {
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