export default class LSystem {
  constructor({ tileset, axiom, rules, generations }) {
    this.tileset = tileset; // TileSet instance
    this.axiom = axiom; // Initial state (as a tile name)
    this.rules = rules; // Transformation rules (using tile names)
    this.generations = generations; // Number of iterations
  }

  // Helper function to resolve a tile name to its ID using the TileSet
  getTileId(tileName) {
    const tile = this.tileset.getTileByName(tileName);
    return tile ? tile.id : null; // Return null if tile name not found in TileSet
  }

  applyRule(tileId, tileMap) {
    // Resolve the tile ID to its name
    const tileName = this.tileset.getTile(tileId)?.name;

    // If there's a rule for this tile, apply it
    if (tileName && this.rules[tileName]) {
      let resultTiles;
  
      // Create a context object to pass to the rule function
      let context = {
        // Current tile's properties
        tileId: tileId,
        tileName: tileName,
  
        // Function to get the ID of a tile by name
        getTileId: this.getTileId.bind(this),
  
        // Random function utility
        random: function(max, min = 0) {
          return tileMap.random(max, min);
        },
  
        // Information about the tile map
        tileMap: {
          width: tileMap.width,
          height: tileMap.height,
          depth: tileMap.depth || 0, // Assuming depth property exists for 3D maps
        },
  
        // Function to get neighboring tiles (example for 2D, extend for 3D if needed)
        getNeighbors: (x, y) => {
          return [
            tileMap.getTileAt(x + 1, y), // Right
            tileMap.getTileAt(x - 1, y), // Left
            tileMap.getTileAt(x, y + 1), // Bottom
            tileMap.getTileAt(x, y - 1), // Top
            // Add more directions as needed, e.g., diagonal neighbors
          ];
        },
  
        // Current position (assuming you can derive x, y, z from tileId)
        position: {
          x: tileId % tileMap.width,
          y: Math.floor(tileId / tileMap.width),
          z: tileMap.depth ? Math.floor(tileId / (tileMap.width * tileMap.height)) : 0, // For 3D maps
        }
      };

      if (typeof this.rules[tileName] === 'function') {
        resultTiles = [this.rules[tileName](context)]; // returns string
      }
      
      if (typeof this.rules[tileName] === 'string') {
        resultTiles = this.rules[tileName].split(' ');
      }
  
      // For simplicity, let's just use the first tile specified in the rule
      // More complex logic could be added here to handle multiple tiles
      return this.getTileId(resultTiles[0]);
    }
  
    // Default to no change if no rule exists for this tile
    return tileId;
  }
  
  applyTo(tileMap) {
    for (let gen = 0; gen < this.generations; gen++) {
      // Apply rules to each tile in the map for each generation
      tileMap.data = tileMap.data.map(tileId => this.applyRule(tileId, tileMap));
    }
  }
}
