export default function generateSpiralMap(tileMap, options) {
  const stack = [];
  const visited = Array.from({ length: tileMap.height }, () => Array(tileMap.width).fill(false));
  let directionOrder = ['right', 'down', 'left', 'up']; // Initial direction order for spiral movement

  const visitCell = (x, y) => {
    visited[y][x] = true;
    stack.push([x, y]);

    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const neighbors = getSpiralNeighbors(cx, cy, directionOrder);

      if (neighbors.length > 0) {
        const [nx, ny] = neighbors[0]; // Always select the first neighbor in the spiral direction
        removeWall(cx, cy, nx, ny);
        visited[ny][nx] = true;
        stack.push([nx, ny]);
      } else {
        stack.pop();
        directionOrder = rotateDirectionOrder(directionOrder); // Rotate direction order for the next cell
      }
    }
  };

  const getSpiralNeighbors = (x, y, directionOrder) => {
    const neighborDirections = {
      'right': [x + 1, y],
      'down': [x, y + 1],
      'left': [x - 1, y],
      'up': [x, y - 1]
    };

    return directionOrder
      .map(dir => neighborDirections[dir])
      .filter(([nx, ny]) => nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height && !visited[ny][nx]);
  };

  const rotateDirectionOrder = (order) => {
    // Rotate the direction order to change the spiral direction
    return order.concat(order.shift());
  };

  const removeWall = (x, y, nx, ny) => {
    const index1 = y * tileMap.width + x;
    const index2 = ny * tileMap.width + nx;
    tileMap.data[Math.min(index1, index2)] = 0;
  };

  // Start from a random cell
  // Start from a random cell using tileMap.random()
  const startX = Math.floor(tileMap.random(tileMap.width));
  const startY = Math.floor(tileMap.random(tileMap.height));
  visitCell(startX, startY);
  //  visitCell(Math.floor(Math.random() * tileMap.width), Math.floor(Math.random() * tileMap.height));
}
