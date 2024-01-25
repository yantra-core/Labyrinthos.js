# Labyrinthos.js

Labyrinthos.js is a Maze and Terrain Generator for the procedural generation of intricate mazes, maps, and biomes. Tailored for game developers and hobbyists alike, Labyrinthos.js offers a versatile toolkit for crafting complex, customizable landscapes with a very simple-to-use API.

## Main Features

*Procedural Generation:* Create vast, diverse maps and mazes algorithmically.
*Customizable Dimensions:* Supports both 2D and 3D map generation.
*Submap Embedding:* Seamlessly integrate smaller maps into larger maps.
*ASCII Masking:* Built-in support generating custom roguelike game maps.
*Randomization:* Leverages Mersenne Twister for advanced predictable randomness.
*Export Functionality:* Easily export maps in various formats, including [Tiled](https:/mapeditor.org) JSON.
*TileSet System:* Flexible tile set mapping for diverse terrain types.

# Map Data Formats

## 2D Map Data Array 

The `TileMap.data` array will contain a binary typed array that looks like this:

```
[0, 1, 0, 1, 2, 1, 0, 1, 0]
```

Each int value in the `TileMap.data` array will represent a `Tile.id` that we can use later for looking up `TileSet` values.

## 3D Voxel Map Data Array 

The `TileMap.data` array when `new TileMap({ is3D: true })` is set will create a nested array with the first element representing the `z` coordinate value.

```js
[
  [0, 1, 0, 1, 2, 1, 0, 1, 0],
  [0, 1, 0, 1, 2, 1, 0, 1, 0],
  [0, 1, 0, 1, 2, 1, 0, 1, 0],
]
```

use
mask
scaleToTileRange


# Usage

see: `./examples`

**Basic**

```js
import labyrinthos from 'labyrinthos';

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

```

**Use Submaps**

Each `TileMap` has a `TileMap.use()` method which can be used to embed maps inside each other. The following example creates a quadrant:

```js
import labyrinthos from 'labyrinthos';

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
console.log(mainMap.mask());

```

## Maze Generators

[X] - Recursive Backtracking
[X] - Recursive Division
[X] - Spiral Backtracking
[ ] - Eller's Algorithm
[ ] - Houston's Algorithm
[ ] - Trémaux's Algorithm
[ ] - Cellular Automata
[ ] - Random Walk
[ ] - Maze Growing Algorithm (Seeded Growth)
[ ] - Voronoi Diagrams
[ ] - Conway's Game of Life (Adapted)
[ ] - Randomized Prim's Algorithm
[ ] - Binary Tree Algorithm
[ ] - Randomized Kruskal's Algorithm
[ ] - Aldous-Broder Algorithm
[ ] - Wilson's Algorithm
[ ] - Hunt-and-Kill Algorithm
[ ] - Growing Tree Algorithm
[ ] - Sidewinder Algorithm
[ ] - Fractal Recursive Maze

## Terrain Generators
[X] - Diamond-Square Algorithm
[X] - Fault Line Algorithm
- Perlin Noise
- Simplex Noise
- Voronoi Diagrams
- Midpoint Displacement
- Cellular Automata (for terrain erosion)
- Hybrid Multi-fractal Terrain Generation
- Particle Deposition
- Value Noise

# License

Yantra Works 2023 AGPL