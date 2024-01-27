// HuntAndKillAlgorithm.js - Marak Squires 2024
export default function generateHuntAndKillAlgorithmMap(tileMap, options) {
  const floorTileId = 1;
  const wallTileId = 0;

  tileMap.data.fill(wallTileId);

  // Random starting point
  let currentX = Math.floor(tileMap.random() * tileMap.width);
  let currentY = Math.floor(tileMap.random() * tileMap.height);

  const isVisited = (x, y) => tileMap.data[y * tileMap.width + x] === floorTileId;

  while (true) {
    tileMap.data[currentY * tileMap.width + currentX] = floorTileId;

    let unvisitedNeighbors = [];
    // Check for unvisited neighbors
    [[-2, 0], [2, 0], [0, -2], [0, 2]].forEach(([dx, dy]) => {
      let nx = currentX + dx;
      let ny = currentY + dy;
      if (nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height && !isVisited(nx, ny)) {
        unvisitedNeighbors.push([nx, ny]);
      }
    });

    if (unvisitedNeighbors.length > 0) {
      // Choose a random unvisited neighbor
      let [nextX, nextY] = tileMap.random(unvisitedNeighbors);
      // Remove wall between current cell and chosen cell
      tileMap.data[((currentY + nextY) / 2) * tileMap.width + ((currentX + nextX) / 2)] = floorTileId;
      currentX = nextX;
      currentY = nextY;
    } else {
      // Hunt for the next unvisited cell
      let found = false;
      for (let y = 0; y < tileMap.height; y++) {
        for (let x = 0; x < tileMap.width; x++) {
          if (!isVisited(x, y) && 
              [[-2, 0], [2, 0], [0, -2], [0, 2]].some(([dx, dy]) => isVisited(x + dx, y + dy))) {
            currentX = x;
            currentY = y;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (!found) break; // Exit if no unvisited cells are found
    }
  }
}
