export default class TileSet {
  constructor({ tiles = [] } = {}) {
    // tiles is array of tile objects with id, name, and properties, etc.
    this.tiles = tiles;
    
  }

  addTile(tile) {
    this.tiles.push(tile);
  }

  getTile(id) {
    // search through array of tile objects for tile with matching id
    let tile = this.tiles.find(tile => tile.id === id);
    return tile;
  }

  getTileByName(name) {
    // search through array of tile objects for tile with matching name
    let tile = this.tiles.find(tile => tile.name === name);
    return tile;
  }

}
