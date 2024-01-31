<h3 align="center">

 <a href="https://yantra.gg/labyrinthos">
<img src="https://github.com/yantra-core/Labyrinthos.js/blob/master/examples/browser/labyrinthos-logo.png" width="512">
</a>

</h3>

<h4 align="center">
  <a href="https://yantra.gg/labyrinthos">Live Demo</a> •
  <a href="#install">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API Methods</a> •
  <a href="#algos">Algorithms</a> •
  <a href="#contributing">Contributing</a>
</h4>

# Labyrinthos.js ( ALPHA )

A JavaScript procedural generator for Mazes, Terrains, and Biomes. Designed for game developers and professional hobbyists, Labyrinthos.js offers a very simple-to-use API for crafting complex, customizable landscapes.


## Main Features

- **Procedural Generation** - Create vast, diverse maps and mazes algorithmically
- **2D and 3D Map Generation** - Supports both 2D Tile Maps and 3D Voxel Map generation
- **Submap Embedding** - Seamlessly integrate smaller maps into larger maps
- **TileMap Queries** - Easily query subsections of a `TileMap` for applying custom transforms
- **TileSet Support** - Flexible `TileSet` mapping for assigning metadata to `TileMap` ids
- **Biomes** - Create realastic Biomes with weighted distribution and Perlin Noise
- **Parametric L-Systems** - Create generational enviroments using L-Systems with parameters
- **Realiable Randomness** - Leverages Mersenne Twister for advanced predictable randomness
- **ASCII Masking** - Built-in support for generating custom Roguelike game maps
- **Export Functionality** - Easily export maps in various formats, including Tiled `.tmj` JSON

<a name="install"></a>

## Installation

**CDN Release 1.1.0**
| Files          | CDN                                         | Size |
|---------------|--------------------------------------------------|-----------|
| labyrinthos.js    | [Link](https://yantra.gg/labyrinthos.js)        | 160kb      |
| labyrinthos.min.js| [Link](https://yantra.gg/labyrinthos.min.js)    | 60kb      |

**NPM**
```bash
npm install labyrinthos
```


## Live Demo and Map Explorer

You can explore all Maze and Terrain generators in the browser with our live demo.

If you click "Explore 2D" or "Explore 3D" in the demo, the TileMap will open in an instance of [Mantra.js](https://github.com/yantra-core/Mantra.js).


# LIVE DEMO LINK

# [https://yantra.gg/labyrinthos](https://yantra.gg/labyrinthos)




https://github.com/yantra-core/Labyrinthos.js/assets/70011/1f01bcdd-53ca-4d11-9d1c-ed2ed2a65b9a



https://github.com/yantra-core/Labyrinthos.js/assets/70011/c8a5cf73-33d0-41ba-8227-22626265c01e



https://github.com/yantra-core/Labyrinthos.js/assets/70011/3f8ca415-42c4-4fea-8ac4-0a3faa2ad761



https://github.com/yantra-core/Labyrinthos.js/assets/70011/74660595-a93b-4e98-b5ce-b5ba63200a14


This demo can export generated maps to [Tiled](https://mapeditor.org) JSON format ( with default bundled `TileSet` assets ).

## `TileMap` Data Formats

Labyrinthos map data is internally represented by arrays of integers.

### 2D Data

```js
let map = new LABY.TileMap({
  width: 3,
  height: 3
});
map.fill(2)
```

The `TileMap.data` array will contain an array that looks like this:

```js
[2, 2, 2, 2, 2, 2, 2, 2, 2]
```

Each integer value in `TileMap.data` array corresponds to a `Tile.id`.

### 3D Voxel Data

```js
let map = new LABY.TileMap({
  width: 3,
  height: 3,
  depth: 3
});

map.fill(3);
```
 
For 3D Voxel Maps, `TileMap.data` is a nested array with first index representing `depth` values.

```js
[
  [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3]
]
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
      height: 32
    });

    map.fill(1); // fill entire map with 1

    labyrinthos.mazes.RecursiveBacktrack(map, {});
    console.log('RecursiveBacktrack', map);

    // output maze with ASCII mask
    console.log(map.mask());

  });
</script>
```

### Use Submaps

*Using labyrinthos `npm` package*

Each `TileMap` has a `TileMap.use()` method which can be used to embed maps inside each other. The following example creates (4) quadrants:

```js
import labyrinthos from 'labyrinthos';

// Main map
const mainMap = new labyrinthos.TileMap({ width: 8, height: 8 });

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

## `TileMap` Class

```js
let myMap = new LABY.TileMap({
  x: 0,
  y: 0,
  width: 32,
  height: 32
})

```

This will generate a new `TileMap` instance with default data. From here we can run either a `Maze` or `Terrain` algorithm on the `myMap` object like:

```js
LABY.mazes.RecursiveBacktrack(myMap);
// shows myMap data array
console.log(myMap.data);
// renders myMap with default ASCII chart
console.log(myMap.mask());
```

### `TileMap.query(query)`

Queries subsections of the map and returns a new `TileMap` instance.

see: `./examples/tilemap-query.js`;

### `TileMap.use(tileMap)`

Embed Maps / Nest Map / Use submaps. This is useful for creating larger composite maps and re-using maps.

see: `./examples/sub-maps.js`;

### `TileMap.mask(maskArray)`

Apply custom mask to map data and view as ASCII text.

see: `./examples/roguelike-mask.js`

### `TileMap.scaleToTileRange(tileRange)`

The terrain generators will return a value from 0-1, this needs to be scaled to match a `TileSet` whole integer index value.

For example, calling `tileMap.scaleToTileRange(10)`, will scale all the values to a range of 0-9 using whole integers.

### `TileMap.toTiledJSON()`

Exports the `TileMap` to the [Tiled](https://mapeditor.org) data format.

<a name="algos"></a>

# Algorithms

## Maze Generators

- [✅] - Aldous-Broder Algorithm
- [✅] - Binary Tree Algorithm
- [✅] - Cellular Automata
- [✅] - Eller's Algorithm
- [✅] - Growing Tree Algorithm
- [✅] - Recursive Backtracking
- [✅] - Recursive Division
- [✅] - Spiral Backtracking
- [✅] - Thomas Hunter
- [ ] - Trémaux's Algorithm
- [ ] - Random Walk
- [ ] - Maze Growing Algorithm (Seeded Growth)
- [ ] - Voronoi Diagrams
- [ ] - Randomized Prim's Algorithm
- [ ] - Randomized Kruskal's Algorithm
- [ ] - Wilson's Algorithm
- [ ] - Hunt-and-Kill Algorithm
- [ ] - Sidewinder Algorithm
- [ ] - Fractal Recursive Maze

## Terrain Generators

- [✅] - Perlin Noise
- [✅] - Fault Line Algorithm
- [ ] - Diamond-Square Algorithm
- [ ] - Simplex Noise
- [ ] - Voronoi Diagrams
- [ ] - Midpoint Displacement
- [ ] - Cellular Automata (for terrain erosion)
- [ ] - Hybrid Multi-fractal Terrain Generation
- [ ] - Particle Deposition
- [ ] - Value Noise

## Shapes

- [✅] - Circle
- [✅] - Square
- [✅] - Triangle
- [ ] - Hexagon

# LSystem

- [✅] - Basic 
- [✅] - Parameteric Rules using custom `function(context)``
- [ ]  - Parameteric Rules with [Sutra.js](https://github.com/yantra-core/sutra)

<a name="contributing"></a>

## Tests

```bash
npm test
```

## Contributing

If you have any issues using Labyrinthos.js or wish to improve the Labyrinthos.js please feel free to [Open An Issue](https://github.com/yantra-core/Labyrinthos.js/issues) or [Open A Pull Request](https://github.com/yantra-core/Labyrinthos.js/pulls).

Labyrinthos.js intends to support a wide variety or generators. Let's do this!

Discord Invite:: https://discord.gg/QgNAZhG9nF

 <a href="https://yantra.gg/labyrinthos">
<img src="https://github.com/yantra-core/Labyrinthos.js/blob/master/examples/browser/labyrinthos-logo.png">
</a>

# License

Yantra Works 2023 AGPL
