export default function generateTremauxAlgorithmMap(tileMap, options) {
  // Initialization
  tileMap.fill(1); // Fill with walls
  let stack = [];
  let currentCell = [Math.floor(Math.random() * tileMap.width), Math.floor(Math.random() * tileMap.height)];
  
  // Function to get unvisited neighbors
  function getUnvisitedNeighbors(x, y) {
      let neighbors = [];
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          let nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height && tileMap.data[ny * tileMap.width + nx] === 1) {
              neighbors.push([nx, ny]);
          }
      });
      return neighbors;
  }

  // Main loop
  while (true) {
      tileMap.data[currentCell[1] * tileMap.width + currentCell[0]] = 0; // Carve out the current cell
      let unvisitedNeighbors = getUnvisitedNeighbors(currentCell[0], currentCell[1]);

      if (unvisitedNeighbors.length > 0) {
          let nextCell = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
          stack.push(currentCell);
          currentCell = nextCell;
      } else if (stack.length > 0) {
          currentCell = stack.pop();
      } else {
          break;
      }
  }
}
