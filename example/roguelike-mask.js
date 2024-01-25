import labyrinthos from '../lib/labyrinthos.js';
import generateMap from '../lib/mazes/RecursiveBacktrack.js';

let map = new labyrinthos.TileMap({
  width: 64,
  height: 32,
  tileWidth: 16,
  tileHeight: 16
});

console.log('map', map)
console.log('random', map.random())

labyrinthos.terrains.FaultLine(map, {});

// normalize to tile set index
map.normalizeToTileSetIndex(4);

console.log('map', map)

// default mask
console.log(map.mask())

// custom mask
console.log(map.mask([
  '-', '#', '+', '0'
]))
