// CellularAutomata.js - Marak Squires 2024
export default function generateCellularAutomataMap(tileMap, options) {
  const floorTileId = 1;
  const wallTileId = 0;
  const wallChance = options.wallChance || 0.45;
  const iterations = options.iterations || 4;
  const neighborThreshold = options.neighborThreshold || 4;

  // Randomly initialize map
  for (let y = 0; y < tileMap.height; y++) {
    for (let x = 0; x < tileMap.width; x++) {
      tileMap.data[y * tileMap.width + x] = tileMap.random() < wallChance ? wallTileId : floorTileId;
    }
  }

  // Cellular automata iteration
  for (let i = 0; i < iterations; i++) {
    let newData = new Array(tileMap.width * tileMap.height).fill(floorTileId);
    for (let y = 0; y < tileMap.height; y++) {
      for (let x = 0; x < tileMap.width; x++) {
        let wallNeighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            let nx = x + dx;
            let ny = y + dy;
            if (nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height) {
              wallNeighbors += tileMap.data[ny * tileMap.width + nx] === wallTileId ? 1 : 0;
            } else {
              wallNeighbors++;
            }
          }
        }
        newData[y * tileMap.width + x] = wallNeighbors >= neighborThreshold ? wallTileId : floorTileId;
      }
    }
    tileMap.data = newData;
  }
}
