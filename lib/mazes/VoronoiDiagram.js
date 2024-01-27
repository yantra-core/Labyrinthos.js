// VoronoiDiagram.js - Marak Squires 2024
export default function generateVoronoiDiagramMap(tileMap, options) {
  const numberOfSeeds = options.numberOfSeeds || 10;
  const floorTileId = 1;
  const wallTileId = 0;

  // Initialize all tiles as floor
  tileMap.data.fill(floorTileId);

  // Generate random seed points
  const seeds = Array.from({ length: numberOfSeeds }, () => ({
    x: Math.floor(tileMap.random(tileMap.width)),
    y: Math.floor(tileMap.random(tileMap.height)),
    tileId: wallTileId // Assigning wallTileId for simplicity
  }));

  // Function to get distance between two points
  const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  // Assign each tile to the nearest seed
  for (let y = 0; y < tileMap.height; y++) {
    for (let x = 0; x < tileMap.width; x++) {
      let nearestSeed = seeds[0];
      let minDistance = distance(x, y, seeds[0].x, seeds[0].y);

      seeds.forEach(seed => {
        const seedDistance = distance(x, y, seed.x, seed.y);
        if (seedDistance < minDistance) {
          nearestSeed = seed;
          minDistance = seedDistance;
        }
      });

      tileMap.data[y * tileMap.width + x] = nearestSeed.tileId;
    }
  }
}
