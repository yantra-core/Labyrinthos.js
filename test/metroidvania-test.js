import tap from 'tape';
import TileMap from '../lib/TileMap.js';
import metroidvania from '../lib/mazes/Metroidvania.js';


const twoDTileData = (tileMap)=>{
  const data = tileMap.data;
  const twoD = [];
  while(data.length) twoD.push(data.splice(0, tileMap.width));
  return twoD;
};

// Test querying by coordinates for 2D map
tap.test('meta matches output', (t) => {
  
  const tileMap = new TileMap({ width: 128, height: 128 });
  tileMap.fill2D(1); // Fill the entire map with '1's for simplicity
  metroidvania(tileMap, {retries: 5});
  

  const twoD = twoDTileData(tileMap);
  
  //overwrite all exits
  twoD[tileMap.world.scaledExits.north[0].y][tileMap.world.scaledExits.north[0].x] = 'X';
  twoD[tileMap.world.scaledExits.north[1].y][tileMap.world.scaledExits.north[1].x] = 'X';
  
  twoD[tileMap.world.scaledExits.south[0].y][tileMap.world.scaledExits.south[0].x] = 'X';
  twoD[tileMap.world.scaledExits.south[1].y][tileMap.world.scaledExits.south[1].x] = 'X';
  
  twoD[tileMap.world.scaledExits.east[0].y][tileMap.world.scaledExits.east[0].x] = 'X';
  twoD[tileMap.world.scaledExits.east[1].y][tileMap.world.scaledExits.east[1].x] = 'X';
  
  twoD[tileMap.world.scaledExits.west[0].y][tileMap.world.scaledExits.west[0].x] = 'X';
  twoD[tileMap.world.scaledExits.west[1].y][tileMap.world.scaledExits.west[1].x] = 'X';
  
  
  const oneD = twoD.reduce(((agg, line)=> agg.concat(line)), []);
  const index = {};
  
  console.log(twoD.map(line => line.join('')).join('\n'));
  oneD.forEach((type)=>{
    if(!index[type]){
      index[type] = 1;
    }else{
      index[type]++;
    }
  });
  t.same(index['X'], 8, 'Wrote in 8 options');
  t.same(index[6], undefined, 'Has no exits after being overwritten');
  t.end();
});
