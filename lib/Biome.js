export default class Biome {
  constructor({name, tileset, distribution = {}} = {}) {
    this.name = name;
    this.tileset = tileset; // An instance of TileSet
    this.distribution = distribution; // Key: tile ID, Value: weight
  }

  // Method to set weighted distribution for tiles
  setDistribution(distribution) {
    this.distribution = distribution;
  }

}