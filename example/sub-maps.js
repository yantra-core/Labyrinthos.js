import labyrinthos from '../lib/labyrinthos.js';
import generateMap from '../lib/mazes/RecursiveBacktrack.js';

// Main map
const mainMap = new labyrinthos.TileMap({ width: 8, height: 8, tileWidth: 16, tileHeight: 16 });

// Submaps
const subMap1 = new labyrinthos.TileMap({ width: 4, height: 4, tileWidth: 16, tileHeight: 16 });
const subMap2 = new labyrinthos.TileMap({ width: 4, height: 4, tileWidth: 16, tileHeight: 16 });
const subMap3 = new labyrinthos.TileMap({ width: 4, height: 4, tileWidth: 16, tileHeight: 16 });
const subMap4 = new labyrinthos.TileMap({ width: 4, height: 4, tileWidth: 16, tileHeight: 16 });

// Fill each submap with distinct values
subMap1.fill(1);
subMap2.fill(2);
subMap3.fill(3);
subMap4.fill(4);

// Position submaps in each quadrant of the main map
mainMap.use(subMap1, 0, 0); // Top-left quadrant
mainMap.use(subMap2, 4, 0); // Top-right quadrant
mainMap.use(subMap3, 0, 4); // Bottom-left quadrant
mainMap.use(subMap4, 4, 4); // Bottom-right quadrant

console.log('mainMap', mainMap);
