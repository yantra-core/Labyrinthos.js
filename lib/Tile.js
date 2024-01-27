// Not actually used anywhere
// Tiles are currently just a data structure, so they don't need to be instantiated
export default class Tile {
  constructor({ id, name } = {}) {
    this.id = id;
    this.name = name;
  }
}