import labyrinthos from '../lib/labyrinthos.js';

let map = new labyrinthos.TileMap({
  width: 3,
  height: 3,
  depth: 3
});

map.fill(1);
console.log('map', map.data)
//labyrinthos.mazes.AldousBroder(map, {});
console.log('AldousBroder', map);
console.log(map.mask()); // depth layer

