// TODO - WIP
export default function SHAPE_HEXAGON(tileMap, options) {
  tileMap.fill(0);
  const radius = Math.min(tileMap.width, tileMap.height) / 2;
  const centerX = tileMap.width / 2;
  const centerY = tileMap.height / 2;

  for (let y = 0; y < tileMap.height; y++) {
    for (let x = 0; x < tileMap.width; x++) {
      if (Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2)) {
        tileMap.data[y * tileMap.width + x] = 1;
      }
    }
  }
}
