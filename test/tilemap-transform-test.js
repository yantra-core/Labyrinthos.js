import tap from 'tape';
import TileMap from '../lib/TileMap.js';

tap.test('applies a transformation function to all tiles', (t) => {
  const map = new TileMap({ width: 2, height: 2, tileSet: [{}, { value: 'tile1' }, { value: 'tile2' }] });
  map.fill(1); // Assuming '1' corresponds to a tile in the tileSet

  // Transformation function that increments the id of the tile object
  const increment = tile => ({ ...tile, id: tile.id + 1 });

  map.transform(increment);

  let passed = true;
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.getTileAt(x, y);
      // Check if the transformation has been applied correctly
      if (typeof tile !== 'object' || tile.id !== 2) {
        passed = false;
      }
    }
  }

  t.ok(passed, 'All tiles should have their id incremented by 1');
  t.end();
});