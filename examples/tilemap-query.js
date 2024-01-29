import labyrinthos from '../lib/labyrinthos.js';

let map = new labyrinthos.TileMap({
  width: 8,
  height: 8,
  tileWidth: 16,
  tileHeight: 16
});

map.fill(1); // fill entire map with 1

let subsection = map.query({ x: 2, y: 2, width: 4, height: 4 });
// console.log(subsection.data)

subsection.fill(2);

// could also perform any other functions, since subsection is a TileMap instance
// labyrinthos.mazes.RecursiveBacktrack(subsection, {});

console.log(subsection.mask())

// take the query result and place it back into the map
map.use(subsection, 2, 2);
//console.log(map.data)

// console.log('map', map);
console.log(map.mask());