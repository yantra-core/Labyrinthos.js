import tap from 'tape';
import TileMap from '../lib/TileMap.js';

// Test the TileMap constructor
tap.test('TileMap constructor initializes with default values', (t) => {
  const tileMap = new TileMap({ width: 10, height: 5, depth: 1, tileWidth: 32, tileHeight: 32 });

  t.equal(tileMap.width, 10);
  t.equal(tileMap.height, 5);
  t.equal(tileMap.depth, 1);
  t.equal(tileMap.tileWidth, 32);
  t.equal(tileMap.tileHeight, 32);
  t.end();
});

// Test the fill method for 2D maps
tap.test('fill method fills a 2D map with the given value', (t) => {
  const tileMap = new TileMap({ width: 2, height: 3 });
  tileMap.fill(2); // Fill with 2s

  const expectedData = [2, 2, 2, 2, 2, 2]; // 2x3 map, 6 tiles
  t.same(tileMap.data, expectedData);
  t.end();
});

// Test the random method
tap.test('random method returns a value within the given range', (t) => {
  const tileMap = new TileMap();
  const max = 10;
  const randomValue = tileMap.random(max);

  t.ok(randomValue >= 0 && randomValue < max, 'Random value is within range');
  t.end();
});

// Test the scaleToTileRange method
tap.test('scaleToTileRange method scales the data array values to the given tile range', (t) => {
  const tileMap = new TileMap();
  tileMap.data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
  tileMap.scaleToTileRange(5); // Scale heights to tile range

  // Values should be scaled and rounded to fit the tile range
  const expectedData = [1, 2, 3, 3, 4, 5];
  t.same(tileMap.data, expectedData);
  t.end();
});