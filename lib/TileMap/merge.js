export default function merge(otherMap, startX = 0, startY = 0, startZ = 0) {
  for (let z = 0; z < otherMap.depth; z++) {
    for (let y = 0; y < otherMap.height; y++) {
      for (let x = 0; x < otherMap.width; x++) {
        const targetX = startX + x;
        const targetY = startY + y;
        const targetZ = startZ + z;

        // Extend the current map if necessary
        // this.ensureBounds(targetX, targetY, targetZ);

        // Replace the tile in the current map with the tile from the other map
        if (this.is3D) {
          this.data[targetZ][targetY * this.width + targetX] = otherMap.getTileAt(x, y, z).value;
        } else {
          this.data[targetY * this.width + targetX] = otherMap.getTileAt(x, y).value;
        }
      }
    }
  }
}

// TODO: we can implement options to extend / cut the map based on the other map's dimensions
// Ensure the current map can accommodate a tile at the given position
function ensureBounds(x, y, z = 0) {
  if (this.is3D) {
    // Logic to extend the map in 3D if necessary
  } else {
    // Logic to extend the map in 2D if necessary
  }
  // Note: Implement the logic to extend the map's bounds as needed
}