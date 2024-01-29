import tap from 'tape';
import TileMap from '../lib/TileMap.js';

// Test querying by coordinates for 2D map
tap.test('query method returns correct subset for 2D map', (t) => {
  const tileMap = new TileMap({ width: 4, height: 4 });
  tileMap.fill2D(1); // Fill the entire map with '1's for simplicity

  /*
      1111
      1111
      1111
      1111

  */

  // Change some values to test the query
  tileMap.data[5] = 2; // (1, 1) in 2D coordinates
  tileMap.data[9] = 3; // (2, 2) in 2D coordinates

  /*

      1111
      1211
      1311
      1111

  */

  console.log(tileMap.data)

  const subsection = tileMap.query({ x: 1, y: 1, width: 2, height: 2 });

  const expected = [2, 1, 3, 1];
  t.same(subsection.data, expected, 'Returns correct subset of tiles');
  t.end();
});

// Test querying by coordinates for 3D map
tap.test('query method returns correct subset for 3D map', (t) => {
  const tileMap = new TileMap({ width: 2, height: 2, depth: 2, is3D: true });
  // Fill the entire map with '1's for simplicity
  tileMap.data.forEach(layer => layer.fill(1));

  /*

  z 0
      1111
      1111

  z 1
      1111
      1111
  */

  // Change some values to test the query
  tileMap.data[0][2] = 2; // (0, 1, 0) in 3D coordinates
  tileMap.data[1][0] = 3; // (0, 0, 1) in 3D coordinates

  /*

  z 0
      1111
      1211
  z 1 
      3111
      1111


  */

  const subsection = tileMap.query({ x: 0, y: 0, width: 1, height: 1, z: 1 });

  const expected = [3];
  t.same(subsection.data, expected, 'Returns correct subset of tiles for 3D map');
  t.end();
});


tap.test('query method returns correct subset from top-left corner', (t) => {
  const tileMap = new TileMap({ width: 4, height: 4 });
  tileMap.fill2D(1); // Fill the entire map with '1's

  // Change a value in the top-left corner to test the query
  tileMap.data[0] = 2; // (0, 0) in 2D coordinates

  const subsection = tileMap.query({ x: 0, y: 0, width: 2, height: 2 });

  const expected = [2, 1, 1, 1]; // Only the first value is changed
  t.same(subsection.data, expected, 'Returns correct subset from top-left corner');
  t.end();
});

tap.test('query method returns correct subset from bottom-right corner', (t) => {
  const tileMap = new TileMap({ width: 4, height: 4 });
  tileMap.fill2D(1); // Fill the entire map with '1's

  // Change a value in the bottom-right corner to test the query
  tileMap.data[15] = 3; // (3, 3) in 2D coordinates

  const subsection = tileMap.query({ x: 2, y: 2, width: 2, height: 2 });

  const expected = [1, 1, 1, 3]; // Only the last value is changed
  t.same(subsection.data, expected, 'Returns correct subset from bottom-right corner');
  t.end();
});

tap.test('query method handles overlapping map boundaries', (t) => {
  const tileMap = new TileMap({ width: 4, height: 4 });
  tileMap.fill2D(1); // Fill the entire map with '1's

  // Query that exceeds the map boundaries
  const subsection = tileMap.query({ x: 3, y: 3, width: 2, height: 2 });

  // Assuming out-of-bounds indices are ignored or filled with `undefined`
  const expected = [1, undefined, undefined, undefined];
  t.same(subsection.data, expected, 'Correctly handles overlapping map boundaries');
  t.end();
});

tap.test('query method can return a single tile', (t) => {
  const tileMap = new TileMap({ width: 4, height: 4 });
  tileMap.fill2D(1); // Fill the entire map with '1's

  // Change a value to test the query
  tileMap.data[10] = 4; // (2, 2) in 2D coordinates

  const subsection = tileMap.query({ x: 2, y: 2, width: 1, height: 1 });

  const expected = [4]; // Querying a single tile
  t.same(subsection.data, expected, 'Returns the correct single tile');
  t.end();
});

tap.test('query method can return the entire map', (t) => {
  const tileMap = new TileMap({ width: 4, height: 4 });
  tileMap.fill2D(1); // Fill the entire map with '1's

  const subsection = tileMap.query({ x: 0, y: 0, width: 4, height: 4 });

  const expected = new Array(16).fill(1); // The entire map is filled with '1's
  t.same(subsection.data, expected, 'Returns the correct entire map');
  t.end();
});

/*
// Test querying by tile name
tap.test('query method returns correct positions for tiles by name', (t) => {
  const tileMap = new TileMap({ width: 3, height: 3 });
  // Fill the entire map with '0's for simplicity
  tileMap.fill2D(0);

  // Change some values to represent different tiles
  tileMap.data[1] = 1; // Tile with name corresponding to ID 1 at (1, 0)
  tileMap.data[4] = 1; // Tile with name corresponding to ID 1 at (1, 1)
  tileMap.data[7] = 1; // Tile with name corresponding to ID 1 at (1, 2)

  // Mock the getTileIdByName function to return 1 for a specific tile name
  tileMap.getTileIdByName = (tileName) => tileName === 'TestTile' ? 1 : undefined;

  const subsection = tileMap.query({ tileName: 'TestTile' });

  const expected = [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }];
  t.same(subsection.data, expected, 'Returns correct positions for tiles by name');
  t.end();
});
*/
