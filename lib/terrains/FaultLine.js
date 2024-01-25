export default function generateFaultLineMap(tileMap, options) {
  const iterations = options.iterations || 100;
  const heightIncrease = options.heightIncrease || 0.01;

  // Initialize the height map
  let heightMap = new Array(tileMap.width * tileMap.height).fill(0);

  for (let i = 0; i < iterations; i++) {
    // Randomly create a fault line using tileMap.random()
    const a = tileMap.random() - 0.5;
    const b = tileMap.random() - 0.5;
    const d = tileMap.random();

    // Adjust the height on one side of the fault line
    for (let y = 0; y < tileMap.height; y++) {
      for (let x = 0; x < tileMap.width; x++) {
        if (a * x + b * y - d > 0) {
          heightMap[y * tileMap.width + x] += heightIncrease;
        }
      }
    }
  }

  // Normalize and apply to tileMap
  applyHeightToTileMap(tileMap, heightMap);
}

function applyHeightToTileMap(tileMap, heightMap) {
  const max = Math.max(...heightMap);
  const min = Math.min(...heightMap);

  for (let i = 0; i < heightMap.length; i++) {
    // Normalize the height values
    const normalizedHeight = (heightMap[i] - min) / (max - min);
    tileMap.data[i] = normalizedHeight;
  }
}
