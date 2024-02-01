import labyrinthos from '../lib/labyrinthos.js';

// Create a new tile map
let map = new labyrinthos.TileMap({
  width: 32,
  height: 32
});

//
// TileSet API examples
//

// Create a new custom tile set
let tileset = new labyrinthos.TileSet({
  tiles: [
    { id: 0, name: 'grass' },
    { id: 1, name: 'bush', body: true, isStatic: true }, // optional metadata properties
    { id: 2, name: 'tree' },
    { id: 3, name: 'block', body: true },
    { id: 4, name: 'path-green' },
  ]
});

// Add new tiles after tileset construction
tileset.addTile({ id: 5, name: 'path-brown'})
console.log('tileset', tileset);

// Get tiles by ID
let tile = tileset.getTile(2);
console.log('tile', tile);

// Get tiles by name
tile = tileset.getTileByName('block');
console.log('tile', tile);

//
// Biome API examples
//

// Create a new biome with the tileset and distribution
let forest = new labyrinthos.Biome({
  name: 'forest',
  tileset: tileset,
  distribution: {
    // create a spread by tile name
    'grass': 0.4,
    'bush': 0.2,
    'tree': 0.1,
    'block': 0.1,
    'path-green': 0.1,
    'path-brown': 0.1
  }
});
console.log('forest', forest);

// Generate a map with Perlin Noise
labyrinthos.terrains.PerlinNoise(map, {});

// Apply the biome to the map
map.applyBiome(forest);

console.log('map', map.mask());