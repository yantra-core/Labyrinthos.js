export default function generateRecursiveDivisionMap(tileMap, options) {
  // Initialize the map with open spaces
  tileMap.data.fill(0);

  // Function to add walls
  const addWalls = (x1, y1, x2, y2) => {
    if (x2 - x1 < 2 || y2 - y1 < 2) return;

    // Determine direction of wall
    const horizontal = x2 - x1 > y2 - y1;

    // Generate a random position for wall and passage
    const wx = horizontal ? x1 : Math.floor(tileMap.random(x2 - x1 - 1)) + x1;
    const wy = horizontal ? Math.floor(tileMap.random(y2 - y1 - 1)) + y1 : y1;
    const px = horizontal ? Math.floor(tileMap.random(x2 - x1)) + x1 : wx;
    const py = horizontal ? wy : Math.floor(tileMap.random(y2 - y1)) + y1;

    // Add the wall
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        if ((horizontal && y == wy) || (!horizontal && x == wx)) {
          const index = y * tileMap.width + x;
          if (x != px || y != py) { // Leave a passage
            tileMap.data[index] = 1;
          }
        }
      }
    }

    // Recursively add walls to the divided sections
    if (horizontal) {
      addWalls(x1, y1, x2, wy);
      addWalls(x1, wy + 1, x2, y2);
    } else {
      addWalls(x1, y1, wx, y2);
      addWalls(wx + 1, y1, x2, y2);
    }
  };

  // Start the recursive division
  addWalls(0, 0, tileMap.width, tileMap.height);
}
