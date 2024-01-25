export default function SHAPE_TRIANGLE(tileMap, options) {
  tileMap.fill(0);
  const height = tileMap.height;
  const width = tileMap.width;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x <= y; x++) {
      tileMap.data[y * width + x] = 1;
    }
  }
}
