import labyrinthos from '../lib/labyrinthos.js';
import generateMap from '../lib/mazes/RecursiveBacktrack.js';

let map = new labyrinthos.TileMap({
  width: 100,
  height: 100
});

map.seed(123);

map.fill(1);
console.log('map', map)
console.log('random', map.random())
generateMap(map, {});

labyrinthos.terrains.FaultLine(map, {});

// normalize to tile set index
map.scaleToTileRange(4);

console.log('map', map);
console.log('map', map.mask());