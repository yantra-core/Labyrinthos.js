export default function generateGrowingTreeAlgorithmMap(tileMap, options) {
  const floorTileId = 1; // Open cell
  const wallTileId = 0; // Wall

  tileMap.data.fill(wallTileId); // Initialize all tiles as walls

  // Function to carve a passage between two points
  function carvePassage(x1, y1, x2, y2) {
    tileMap.data[y1 * tileMap.width + x1] = floorTileId;
    // Carve passage to the next cell (midpoint for the wall and the cell itself)
    tileMap.data[Math.floor((y1 + y2) / 2) * tileMap.width + Math.floor((x1 + x2) / 2)] = floorTileId;
    tileMap.data[y2 * tileMap.width + x2] = floorTileId;
  }

  let currentX = Math.floor(tileMap.random() * tileMap.width);
  let currentY = Math.floor(tileMap.random() * tileMap.height);
  let cellsStack = [[currentX, currentY]]; // Start with a single cell in stack

  while (cellsStack.length > 0) {
    const [cx, cy] = cellsStack[cellsStack.length - 1]; // Use the latest cell
    let neighbors = [];

    // Directions: N, S, E, W
    const directions = [[0, -2], [0, 2], [2, 0], [-2, 0]];
    directions.forEach(([dx, dy]) => {
      const nx = cx + dx, ny = cy + dy;
      if (nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height && tileMap.data[ny * tileMap.width + nx] === wallTileId) {
        neighbors.push([nx, ny]);
      }
    });

    if (neighbors.length > 0) {
      let randomIndex = Math.floor(tileMap.random() * neighbors.length);
      let [nextX, nextY] = neighbors[randomIndex];
      carvePassage(cx, cy, nextX, nextY);
      cellsStack.push([nextX, nextY]);
    } else {
      cellsStack.pop(); // No neighbors found, backtrack
    }
  }
}
