import labyrinthos from '../lib/labyrinthos.js';

let map = new labyrinthos.TileMap({
  width: 10,
  height: 10
});

map.fill(1); // fill entire map with 1

// Example transformation: Increment each tile's value by 2
map.transform(function(tile){
  tile.value += 2;
  return tile;
});

console.log(map.data);
