import tap from 'tape';
import TileMap from '../lib/TileMap.js';

tap.test('TileMap.merge merges another TileMap into the current map', (t) => {
  // Create the main TileMap and fill it with a default value
  const mainMap = new TileMap({ width: 5, height: 5 });
  mainMap.fill(0);

  // Create a smaller TileMap to merge into the main map
  const smallMap = new TileMap({ width: 2, height: 2 });
  smallMap.fill(1); // Fill with a different value for easy distinction

  // Merge the smallMap into the mainMap at position (1, 1)
  mainMap.merge(smallMap, 1, 1);

  // Check a few key positions to ensure the merge was successful
  t.equal(mainMap.getTileAt(0, 0).value, 0, 'Tile outside merge area should remain unchanged');
  t.equal(mainMap.getTileAt(1, 1).value, 1, 'Tile inside merge area should be updated');
  t.equal(mainMap.getTileAt(2, 2).value, 1, 'Tile at the edge of the merge area should be updated');
  t.equal(mainMap.getTileAt(3, 3).value, 0, 'Tile outside merge area should remain unchanged');

  t.end();
});
