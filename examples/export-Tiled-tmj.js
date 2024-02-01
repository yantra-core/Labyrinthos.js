import labyrinthos from '../lib/labyrinthos.js';
import fs from 'fs';
let map = new labyrinthos.TileMap({
  width: 16,
  height: 16
});

map.fill(1); // reset map to 1

labyrinthos.terrains.FaultLine(map, {});

// terrains return a 0-1 float range, so we need to scale it to the tile range
map.scaleToTileRange(4); // this will take the 0-1 float range and scale it to 0-4 integer range

console.log('map', map);
console.log('map', map.mask());

console.log('Tiled', map.toTiledJSON());

// write the map to a file
fs.writeFileSync('examples/my-map.tmj', JSON.stringify(map.toTiledJSON(), null, 2));