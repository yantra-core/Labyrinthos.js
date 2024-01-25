// TODO: WIP - wasn't quite working right

export default function generateDiamondSquareMap(tileMap, options) {
  // Adjust size for the algorithm
  const size = Math.max(tileMap.width, tileMap.height) - 1;
  const roughness = options.roughness || 0.5;
  const data = diamondSquare(size, roughness);

  // Flatten the 2D array into the tileMap.data single-dimensional array
  for (let x = 0; x < tileMap.width; x++) {
    for (let y = 0; y < tileMap.height; y++) {
      tileMap.data[y * tileMap.width + x] = data[y][x];
    }
  }
}

function diamondSquare(size, roughness) {
  const data = create2DArray(size + 1, size + 1);
  const max = size - 1;
  let h = roughness;

  // Initial corner values
  data[0][0] = data[0][max] = data[max][0] = data[max][max] = 0.5;

  for (let sideLength = max; sideLength >= 2; sideLength /= 2, h /= 2.0) {
      const halfSide = Math.round(sideLength / 2);

      // Square steps
      for (let x = 0; x < max; x += sideLength) {
          for (let y = 0; y < max; y += sideLength) {
              const avg = average([
                  data[x][y], 
                  data[(x + sideLength) % (max + 1)][y], 
                  data[x][(y + sideLength) % (max + 1)], 
                  data[(x + sideLength) % (max + 1)][(y + sideLength) % (max + 1)]
              ]);
              data[(x + halfSide) % (max + 1)][(y + halfSide) % (max + 1)] = avg + (Math.random() * 2 * h) - h;
          }
      }

      // Diamond steps
      // ... same as before ...
  }

  return data;
}

function average(values) {
  let valid = values.filter(val => val !== undefined);
  let sum = valid.reduce((a, b) => a + b, 0);
  return sum / valid.length;
}

// ... rest of your existing code ...


function create2DArray(width, height) {
  const arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width).fill(0);
  }
  return arr;
}
