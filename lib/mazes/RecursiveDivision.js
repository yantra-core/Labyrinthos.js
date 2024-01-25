// RecursiveDivision.js - Marak Squires 2024
export default function generateRecursiveDivisionMap(tileMap, options) {

  let floorTileId = 1; // TODO: change to 0
  let wallTileId = 0; // TODO: change to 1

  tileMap.data.fill(floorTileId);

  const addWalls = (x1, y1, x2, y2) => {
    if (x2 - x1 < 2 || y2 - y1 < 2) return;

    const horizontal = x2 - x1 < y2 - y1;
    const wx = horizontal ? x1 : Math.floor(tileMap.random(x2 - x1 - 2)) + x1 + 1;
    const wy = horizontal ? Math.floor(tileMap.random(y2 - y1 - 2)) + y1 + 1 : y1;
    const px = horizontal ? Math.floor(tileMap.random(x2 - x1)) + x1 : wx;
    const py = horizontal ? wy : Math.floor(tileMap.random(y2 - y1)) + y1;

    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        if ((horizontal && x === wx && y !== py) || (!horizontal && y === wy && x !== px)) {
          tileMap.data[y * tileMap.width + x] = wallTileId;
        }
      }
    }

    if (horizontal) {
      addWalls(x1, y1, x2, wy);
      addWalls(x1, wy, x2, y2);
    } else {
      addWalls(x1, y1, wx, y2);
      addWalls(wx, y1, x2, y2);
    }
  };

  addWalls(0, 0, tileMap.width, tileMap.height);
}
