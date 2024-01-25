// roguelike ascii map 
let tileMap = {
  wall: '#',
  floor: '.',
  door: '+',
  upStairs: '<',
  downStairs: '>',
  empty: ' '
};

let tileSet = {
  0: tileMap.wall,
  1: tileMap.floor,
  2: tileMap.door,
  3: tileMap.upStairs,
  4: tileMap.downStairs
};