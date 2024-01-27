export default function ALGORITHM_BINARY_TREE(tileMap, options) {
  tileMap.fill(1); // Fill with walls

  for (let y = 0; y < tileMap.height; y += 2) {
    for (let x = 0; x < tileMap.width; x += 2) {
      tileMap.data[y * tileMap.width + x] = 0; // Open cell

      let neighbors = [];
      if (x + 2 < tileMap.width) neighbors.push([2, 0]); // East
      if (y + 2 < tileMap.height) neighbors.push([0, 2]); // South

      if (neighbors.length > 0) {
        let randomIndex = Math.floor(tileMap.random() * neighbors.length);
        let [dx, dy] = neighbors[randomIndex];
        tileMap.data[(y + dy) * tileMap.width + (x + dx)] = 0; // Open path to the selected neighbor
        tileMap.data[(y + dy / 2) * tileMap.width + (x + dx / 2)] = 0; // Open wall between current cell and selected neighbor
      }
    }
  }
}
