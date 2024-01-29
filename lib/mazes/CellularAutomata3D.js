// WIP - Still returning undefined values
// CellularAutomata3D.js - Marak Squires 2024
export default function generateCellularAutomataMap3D(tileMap, options) {
  const floorTileId = 1;
  const wallTileId = 0;
  const wallChance = options.wallChance || 0.45;
  const iterations = options.iterations || 4;
  const neighborThreshold = options.neighborThreshold || 4;
  console.log()
  // Initialize the 3D map with random walls and floors
  tileMap.data = Array.from({ length: tileMap.depth }, () =>
    Array.from({ length: tileMap.height }, () =>
      Array.from({ length: tileMap.width }, () =>
        Math.random() < wallChance ? wallTileId : floorTileId
      )
    )
  );

  console.log('tileMap.data', tileMap.data)

  // Cellular automata iteration for 3D
  for (let i = 0; i < iterations; i++) {
    let newData = Array.from({ length: tileMap.depth }, () =>
      Array.from({ length: tileMap.height }, () =>
        new Array(tileMap.width).fill(floorTileId)
      )
    );

    for (let z = 0; z < tileMap.depth; z++) {
      for (let y = 0; y < tileMap.height; y++) {
        for (let x = 0; x < tileMap.width; x++) {
          let wallNeighbors = 0;

          for (let dz = -1; dz <= 1; dz++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0 && dz === 0) continue;
                let nx = x + dx;
                let ny = y + dy;
                let nz = z + dz;

                if (
                  nx >= 0 && nx < tileMap.width &&
                  ny >= 0 && ny < tileMap.height &&
                  nz >= 0 && nz < tileMap.depth
                ) {
                  wallNeighbors += tileMap.data[nz][ny][nx] === wallTileId ? 1 : 0;
                } else {
                  wallNeighbors++;
                }
              }
            }
          }

          newData[z][y][x] = wallNeighbors >= neighborThreshold ? wallTileId : floorTileId;
        }
      }
    }
    console.log(tileMap.data)
    tileMap.data = newData;
  }
}
