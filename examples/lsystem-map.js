import labyrinthos from '../lib/labyrinthos.js';

// Create a new tile map
let map = new labyrinthos.TileMap({
  width: 32,
  height: 32
});

map.seed(1234);

// Create a new custom tile set with additional tiles for water and other features
let tileset = new labyrinthos.TileSet({
  tiles: [
    { id: 0, name: 'grass' },
    { id: 1, name: 'bush', body: true, isStatic: true },
    { id: 2, name: 'tree', body: true, isStatic: true },
    { id: 3, name: 'block', body: true, isStatic: true },
    { id: 4, name: 'path-green' },
    { id: 5, name: 'path-brown' },
    { id: 6, name: 'water' }, // Additional tile for water
    { id: 7, name: 'flower' }, // Additional tile for flowers
    { id: 8, name: 'rock', body: true, isStatic: true }, // Additional tile for rocks
  ]
});
console.log('tileset', tileset);

// Create a new biome with the tileset and distribution for a jungle forest
let forest = new labyrinthos.Biome({
  name: 'forest',
  tileset: tileset,
  distribution: {
    'grass': 0.3,
    'bush': 0.15,
    'tree': 0.2,
    'block': 0.05,
    'path-green': 0.1,
    'path-brown': 0.05,
    'water': 0.1, // Increase water presence for jungle feel
    'flower': 0.05, // Add flowers for colorful details
    'rock': 0.1, // Add rocks to create natural obstacles
  }
});

console.log('forest', forest);

// Generate a map with Perlin Noise
labyrinthos.terrains.PerlinNoise(map, {});

// Apply the jungle forest biome to the map
map.applyBiome(forest);
console.log('Initial map with Perlin Noise and biome applied:\n', map.mask());

// Define more complex L-System rules to simulate forest growth
const lsystem = new labyrinthos.LSystem({
  tileset: tileset,
  axiom: 'grass', // Starting point
  rules: {
    'grass': 'bush flower water',
    'bush': 'tree flower',
    'tree': 'tree rock', // Trees might grow larger or have rocks nearby
    'water': 'water grass', // Water might expand or be surrounded by grass
    'flower': 'bush', // Flowers might lead to more bushes growing
    // other rules as needed for jungle complexity
  },
  generations: 2 // Number of transformations for more complex forest growth
});

// Apply the L-System rules to simulate jungle growth
lsystem.applyTo(map);
console.log('Final map after applying L-System rules for jungle growth:\n', map.mask());

/*
//
// Sutra.js Behavior Tree as Parametric L-System Rules
//
let rules = {
  'grass': Sutra.createSutra()
    .if('randomChance', { chance: 0.3 }) // Assuming you've defined a 'randomChance' condition
    .then('evolve', { to: 'path' })
    .elseIf('randomChance', { chance: 0.2 })
    .then('evolve', { to: 'tree' }),

  'path': Sutra.createSutra()
    .if('near', { element: 'water' }) // Assuming you've defined a 'near' condition
    .then('evolve', { to: 'bench' })
    .elseIf('randomChance', { chance: 0.1 })
    .then('evolve', { to: 'fountain' }),

  // Define more rules for other tiles as needed
};

// Helper function to convert Sutra actions into L-System rules
function convertToLSystemRule(sutra) {
  return (context) => {
    let result = sutra.tick(context);
    return result.to; // Assuming the 'evolve' action modifies a 'to' property in the context
  };
}

// Convert Sutra trees to L-System compatible rules
let lSystemRules = {};
for (let [key, sutra] of Object.entries(rules)) {
  lSystemRules[key] = convertToLSystemRule(sutra);
}
*/