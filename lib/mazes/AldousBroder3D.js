// AldousBroder3D.js - Marak Squires 2024
// "Aldous-Broder algorithm" - https://en.wikipedia.org/wiki/Maze_generation_algorithm#Aldous-Broder_algorithm
export default function ALGORITHM_ALDOUS_BRODER_3D(tileMap, options) {
  tileMap.fill(1); // Fill with walls
  let visitedCells = 0;
  let totalCells = (tileMap.width * tileMap.height * tileMap.depth) / 8; // Assumes a grid where every other cell is open in 3D
  let currentX = 2 * Math.floor(Math.random() * Math.floor(tileMap.width / 2));
  let currentY = 2 * Math.floor(Math.random() * Math.floor(tileMap.height / 2));
  let currentZ = 2 * Math.floor(Math.random() * Math.floor(tileMap.depth / 2));

  tileMap.data[currentZ][currentY * tileMap.width + currentX] = 0; // Open starting cell
  visitedCells++;

  while (visitedCells < totalCells) {
      let directions = [[2, 0, 0], [-2, 0, 0], [0, 2, 0], [0, -2, 0], [0, 0, 2], [0, 0, -2]];
      let randomDirection = directions[Math.floor(Math.random() * directions.length)];
      let newX = currentX + randomDirection[0];
      let newY = currentY + randomDirection[1];
      let newZ = currentZ + randomDirection[2];

      if (newX >= 0 && newX < tileMap.width && newY >= 0 && newY < tileMap.height && newZ >= 0 && newZ < tileMap.depth) {
          if (tileMap.data[newZ][newY * tileMap.width + newX] === 1) {
              // Open path between current cell and new cell
              tileMap.data[currentZ + randomDirection[2] / 2][(currentY + randomDirection[1] / 2) * tileMap.width + (currentX + randomDirection[0] / 2)] = 0;
              tileMap.data[newZ][newY * tileMap.width + newX] = 0; // Open new cell
              visitedCells++;
          }
          currentX = newX;
          currentY = newY;
          currentZ = newZ;
      }
  }
}
