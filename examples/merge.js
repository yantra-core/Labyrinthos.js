import labyrinthos from '../lib/labyrinthos.js';

// Create the main TileMap and fill it with a default value of 1
let mainMap = new labyrinthos.TileMap({
  width: 10,
  height: 10
});
mainMap.fill(1);

// Create a smaller TileMap to merge into the main map and fill it with a value of 3
let smallMap = new labyrinthos.TileMap({
  width: 3,
  height: 3
});
smallMap.fill(3);

// Merge the smallMap into the mainMap at position (4, 4)
mainMap.merge(smallMap, 4, 4);

// Print the resulting data of the main map to the console
console.log('Main map data after merge:');
for (let y = 0; y < mainMap.height; y++) {
  let row = '';
  for (let x = 0; x < mainMap.width; x++) {
    row += mainMap.getTileAt(x, y).value + ' ';
  }
  console.log(row.trim());
}