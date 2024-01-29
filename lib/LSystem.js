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

  applyRule(tileId) {
    // Resolve the tile ID to its name
    const tileName = this.tileset.getTile(tileId)?.name;

    // If there's a rule for this tile, apply it
    if (tileName && this.rules[tileName]) {
      // The rule might specify a single tile or multiple tiles (e.g., 'bush tree')
      const resultTiles = this.rules[tileName].split(' ');

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
      tileMap.data = tileMap.data.map(tileId => this.applyRule(tileId));
    }
  }
}
