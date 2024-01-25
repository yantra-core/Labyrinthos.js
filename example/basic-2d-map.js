import labyrinthos from '../lib/labyrinthos.js';
import generateMap from '../lib/mazes/RecursiveBacktrack.js';

let map = new labyrinthos.TileMap({
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

labyrinthos.mazes.RecursiveBacktrack(map, {});
labyrinthos.mazes.SpiralBacktrack(map, {});
labyrinthos.mazes.RecursiveDivision(map, {});
labyrinthos.terrains.DiamondSquare(map, {});
labyrinthos.terrains.FaultLine(map, {});

// normalize to tile set index
map.normalizeToTileSetIndex(4);

console.log('map', map);