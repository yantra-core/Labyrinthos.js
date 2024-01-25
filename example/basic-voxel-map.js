import daedalus from '../lib/daedalus.js';

let map = new daedalus.TileMap({
  width: 3,
  height: 3,
  depth: 3,
  tileWidth: 16,
  tileHeight: 16,
  is3D: true
});

console.log('map', map)