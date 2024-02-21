export default function transform(transformFunction) {
  // Check if the map is 3D
  if (this.depth > 1) {
    for (let z = 0; z < this.depth; z++) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          // Use getTileAt to get the tile object
          const tileObject = this.getTileAt(x, y, z);
          // Apply the transformation function to the tile object
          const transformedTile = transformFunction(tileObject, x, y, z);
          // Assuming the transformation function returns a tile object with an updated 'value'
          // Update the data array with the new value
          this.data[z][y * this.width + x] = transformedTile;
        }
      }
    }
  } else {
    // Handle 2D map transformation
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // Use getTileAt to get the tile object for 2D maps (z is undefined)
        const tileObject = this.getTileAt(x, y);
        // Apply the transformation function to the tile object
        const transformedTile = transformFunction(tileObject, x, y);
        // Update the data array with the new value
        this.data[y * this.width + x] = transformedTile.id;
      }
    }
  }
}
