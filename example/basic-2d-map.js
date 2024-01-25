import labyrinthos from '../lib/labyrinthos.js';

let map = new labyrinthos.TileMap({
  width: 32,
  height: 32,
  tileWidth: 16,
  tileHeight: 16
});

map.fill(1); // fill entire map with 1

labyrinthos.mazes.RecursiveBacktrack(map, {});
console.log('RecursiveBacktrack', map);
console.log(map.mask());

map.fill(1); // reset map to 1

labyrinthos.terrains.FaultLine(map, {});

// terrains return a 0-1 float range, so we need to scale it to the tile range
map.scaleToTileRange(4); // this will take the 0-1 float range and scale it to 0-4 integer range

console.log('map', map);
console.log('map', map.mask());