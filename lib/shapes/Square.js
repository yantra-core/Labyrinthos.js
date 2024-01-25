export default function SHAPE_SQUARE(tileMap, options) {
  tileMap.fill(0); // Filling the map with empty tiles
  const size = Math.min(tileMap.width, tileMap.height);
  const startX = Math.floor((tileMap.width - size) / 2);
  const startY = Math.floor((tileMap.height - size) / 2);

  for (let y = startY; y < startY + size; y++) {
    for (let x = startX; x < startX + size; x++) {
      tileMap.data[y * tileMap.width + x] = 1; // Fill with a different tile
    }
  }
}
