import daedalus from '../lib/daedalus.js';
import generateMap from '../lib/mazes/RecursiveBacktrack.js';


let map = new daedalus.TileMap({
  width: 10,
  height: 10,
  tileWidth: 16,
  tileHeight: 16
});

map.seed(123);

map.fill(1);
console.log('map', map)
console.log('random', map.random())
generateMap(map, {});

daedalus.mazes.RecursiveBacktrack(map, {});
daedalus.mazes.SpiralBacktrack(map, {});
daedalus.mazes.RecursiveDivision(map, {});
daedalus.terrains.DiamondSquare(map, {});
daedalus.terrains.FaultLine(map, {});

// normalize to tile set index
map.normalizeToTileSetIndex(4);

console.log('map', map)
