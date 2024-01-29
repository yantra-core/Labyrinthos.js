import tap from 'tape';
import TileMap from '../lib/TileMap.js';
import TileSet from '../lib/TileSet.js';
import LSystem from '../lib/LSystem.js';

// Test simple rule
tap.test('LSystem applies simple rule correctly', (t) => {

  // Setup for tests
  const tileset = new TileSet({
    tiles: [
      { id: 0, name: 'grass' },
      { id: 1, name: 'bush' },
      { id: 2, name: 'tree' },
      // Add more tiles as needed
    ],
  });

  const tileMap = new TileMap({
    width: 10,
    height: 10
  });

  tileMap.fill(0); // Fill with 'grass' for simplicity

  const lsystem = new LSystem({
    tileset: tileset,
    axiom: 'grass',
    rules: {
      'grass': 'bush',
    },
    generations: 1,
  });

  lsystem.applyTo(tileMap);

  // Check if all tiles have been converted to 'bush' (id 1)
  const allBush = tileMap.data.every(tileId => tileId === 1);
  t.ok(allBush, 'All tiles should be bushes after applying the LSystem');
  t.end();
});

// Test parametric rule with custom function and context
tap.test('LSystem applies parametric rule with custom function and context based on tile ID', (t) => {
  // Setup for tests
  const tileset = new TileSet({
    tiles: [
      { id: 0, name: 'grass' },
      { id: 1, name: 'bush' },
      { id: 2, name: 'tree' },
      // Add more tiles as needed
    ],
  });

  const tileMap = new TileMap({
    width: 10,
    height: 10
  });

  tileMap.fill(0); // Fill with 'grass' for simplicity

  const lsystem = new LSystem({
    tileset: tileset,
    axiom: 'grass',
    rules: {
      'grass': (context) => {
        // TODO: add another set of tests that test all properties of the context object, including getNeighbors()
        // context.tileId, context.tileName, context.random(), context.tileMap, context.getNeighbors(), context.position
        //console.log('context', context)
        // turns grass into bush
        if (context.tileName === 'grass') {
          return 'bush';
        }
        
      },
    },
    generations: 1,
  });
  lsystem.applyTo(tileMap);
  // Check if the map contains at least one 'bush' and one 'grass'
  const containsBush = tileMap.data.includes(tileset.getTileByName('bush').id); // Assuming getTileByName('bush').id returns the ID for 'bush'
  t.ok(containsBush, 'Map should contain at least one bush');
  t.end();
});