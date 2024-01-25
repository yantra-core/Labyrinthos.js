export default function ALGORITHM_BINARY_TREE(tileMap, options) {
  tileMap.fill(1); // Fill with walls

  for (let y = 0; y < tileMap.height; y += 2) {
      for (let x = 0; x < tileMap.width; x += 2) {
          tileMap.data[y * tileMap.width + x] = 0; // Open cell

          let neighbors = [];
          if (x > 0) neighbors.push([-2, 0]);
          if (y > 0) neighbors.push([0, -2]);

          if (neighbors.length > 0) {
              let [dx, dy] = neighbors[Math.floor(Math.random() * neighbors.length)];
              tileMap.data[(y + dy) * tileMap.width + (x + dx)] = 0;
          }
      }
  }
}
