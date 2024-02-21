export default function getTileAt(x, y, z) {
  let tileId; // This will hold the actual value from the data array

  // Retrieve the tile value based on whether the map is 3D or 2D
  if (this.is3D) {
    if (z !== undefined && this.data[z] !== undefined) {
      tileId = this.data[z][y * this.width + x];
    } else {
      return undefined; // Return undefined if the z layer does not exist
    }
  } else {
    tileId = this.data[y * this.width + x];
  }

  // Construct the tile object with the id, value, and coordinates
  let tileObject = {
    // id: tileId, // Tile ID from the tileSet array
    id: tileId, // Actual tile ID from the data array
    value: tileId, // Actual value from the data array
    x: x,
    y: y,
    ...(this.is3D ? { z: z } : {}), // Include z coordinate if the map is 3D
  };

  // If the tileSet is defined and contains an entry for this tile ID, merge its properties into the tile object
  if (Array.isArray(this.tileSet) && this.tileSet[tileId]) {
    tileObject = { ...tileObject, ...this.tileSet[tileId] };
  }
  return tileObject;
}