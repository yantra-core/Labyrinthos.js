<h3 align="center">
  
<img src="https://github.com/yantra-core/Labyrinthos.js/blob/master/examples/browser/labyrinthos-logo.png" width="300">

</h3>

<h4 align="center">
  <a href="https://yantra.gg/labyrinthos">Live Demo</a> •
  <a href="#install">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API Methods</a> •
  <a href="#algos">Algorithms</a> •
  <a href="#contributing">Contributing</a>
</h4>

<h1 align="center"> Labyrinthos.js</h1>

**ALPHA STATUS**

Labyrinthos.js is a JavaScript Maze and Terrain Generator for the procedural generation of intricate mazes, maps, and biomes. Tailored for game developers and hobbyists alike, Labyrinthos.js offers a very simple-to-use API for crafting complex, customizable landscapes.

## Live Demo

You can explore all Maze and Terrain generators in the browser with our live demo:

[https://yantra.gg/labyrinthos](https://yantra.gg/labyrinthos)

This demo can export generated maps to [Tiled](https://mapeditor.org) JSON format ( with default bundled `TileSet` assets ).

## Main Features

- **Procedural Generation** - Create vast, diverse maps and mazes [algorithmically](#algos).
- **Customizable Dimensions** - Supports both 2D and 3D Voxel map generation.
- **Submap Embedding** - Seamlessly integrate smaller maps into larger maps.
- **Randomness** - Leverages Mersenne Twister for advanced predictable randomness.
- **ASCII Masking** - Built-in support for generating custom roguelike game maps.
- **Export Functionality** - Easily export maps in various formats, including Tiled `.tmj` JSON.
- **TileSet System** - Flexible tile set mapping for diverse terrain types.

## `TileMap` Data Formats

### 2D Data

The `TileMap.data` array will contain an array that looks like this:

```
[0, 1, 0, 1, 2, 1, 0, 1, 0]
```

Each integer value in `TileMap.data` array corresponds to a `Tile.id`.

### 3D Voxel Data
 
Using: `new TileMap({ is3D: true })`

For 3D Voxel Maps, `TileMap.data` is a nested array with first index representing `depth` value.

```js
[
  [0, 1, 0, 1, 2, 1, 0, 1, 0],
  [0, 1, 0, 1, 2, 1, 0, 1, 0],
  [0, 1, 0, 1, 2, 1, 0, 1, 0],
]
```

## Installation

**Release 1.0.0**
| Files          | CDN                                         | Size |
|---------------|--------------------------------------------------|-----------|
| labyrinthos.js    | [Link](https://yantra.gg/labyrinthos.js)        | 42kb      |
| labyrinthos.min.js| [Link](https://yantra.gg/labyrinthos.min.js)    | 17kb      |


```bash
npm install labyrinthos
```

<a name="usage"></a>

## Usage

### Basic

*From Yantra CDN Build*

```html
<script src="https://yantra.gg/labyrinthos.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', (event) => {

    let map = new LABY.TileMap({
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

    // terrain algos return a 0-1 float range, so we need to scale it to the tile range
    map.scaleToTileRange(4); // this will take the 0-1 float and scale it to 0-4 integer

    console.log('map', map);

    // output map with ASCII mask
    console.log('map', map.mask());

  });
</script>
```

### Use Submaps

*Using labyrinthos `npm`` package*

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

**You can find more examples at:** `./examples`

<a name="api"></a>

## API Methods

```js
let myMap = new TileMap({
  x: 0,
  y: 0,
  width: 32,
  height: 32
})

```

This will generate a new `TileMap` instance with default data. From here we can run either a `Maze` or `Terrain` algorithm on the `myMap` object like:

```js
  labyrinthos.mazes.RecursiveBacktrack(myMap);
  // shows myMap data array
  console.log(myMap.data);
  // renders myMap with default ASCII chart
  console.log(myMap.mask());
```

### `TileMap.use(tileMap)`

Embed Maps / Nest Map / Use submaps. This is useful for creating larger composite maps and re-using maps.

see: `./examples/sub-maps.js`;

### `TileMap.mask(maskArray)`

Apply custom mask to map data and view as ASCII text.

see: `./examples/roguelike-mask.js`;

### `TileMap.scaleToTileRange(tileRange)`

The terrain generators will return a value from 0-1, this needs to be scaled to match a `TileSet` whole integer index value.

For example, calling `tileMap.scaleToTileRange(10)`, will scale all the values to a range of 0-9 using whole integers.

### `TileMap.toTiledJSON()`

Exports the `TileMap` to the [Tiled](https://mapeditor.org) data format.

<a name="algos></a>

# Algorithms

## Maze Generators

[✅] - Recursive Backtracking
[✅] - Recursive Division
[✅] - Spiral Backtracking
[ ] - Eller's Algorithm
[ ] - Houston's Algorithm
[ ] - Trémaux's Algorithm
[ ] - Cellular Automata
[ ] - Random Walk
[ ] - Maze Growing Algorithm (Seeded Growth)
[ ] - Voronoi Diagrams
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
[✅] - Diamond-Square Algorithm
[✅] - Fault Line Algorithm
[ ] - Perlin Noise
[ ] - Simplex Noise
[ ] - Voronoi Diagrams
[ ] - Midpoint Displacement
[ ] - Cellular Automata (for terrain erosion)
[ ] - Hybrid Multi-fractal Terrain Generation
[ ] - Particle Deposition
[ ] - Value Noise

<a name="contributing"></a>

## Contributing

If you have any issues using Labyrinthos.js or wish to improve the Labyrinthos.js please feel free to [Open An Issue](https://github.com/yantra-core/Labyrinthos.js/issues) or [Open A Pull Request](https://github.com/yantra-core/Labyrinthos.js/pulls). Labyrinthos.js intends to support a wide variety or generators. Let's do this!

[Discord](https://discord.gg/QgNAZhG9nF) Link

# License

Yantra Works 2023 AGPL
