export default function generateMap(tileMap, options) {
  const stack = [];
  const visited = Array.from({ length: tileMap.height }, () => Array(tileMap.width).fill(false));

  const visitCell = (x, y) => {
    visited[y][x] = true;
    stack.push([x, y]);

    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const neighbors = getNeighbors(cx, cy);
      if (neighbors.length > 0) {
        const [nx, ny] = neighbors[Math.floor(tileMap.random(neighbors.length))];
        removeWall(cx, cy, nx, ny);
        visited[ny][nx] = true;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }
  };

  const getNeighbors = (x, y) => {
    const neighbors = [];
    if (x > 0 && !visited[y][x - 1]) neighbors.push([x - 1, y]);
    if (y > 0 && !visited[y - 1][x]) neighbors.push([x, y - 1]);
    if (x < tileMap.width - 1 && !visited[y][x + 1]) neighbors.push([x + 1, y]);
    if (y < tileMap.height - 1 && !visited[y + 1][x]) neighbors.push([x, y + 1]);
    return neighbors;
  };

  const removeWall = (x, y, nx, ny) => {
    const index1 = y * tileMap.width + x;
    const index2 = ny * tileMap.width + nx;

    tileMap.data[Math.min(index1, index2)] = 0; // Assuming 1 is a wall and 0 is an open path
  };

  // Start from a random cell
  const startX = Math.floor(tileMap.random(tileMap.width));
  const startY = Math.floor(tileMap.random(tileMap.height));
  visitCell(startX, startY);
}
