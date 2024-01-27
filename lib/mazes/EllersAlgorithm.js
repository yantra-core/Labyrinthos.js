// EllersAlgorithm.js - Marak Squires 2024
export default function generateEllersAlgorithmMap(tileMap, options) {
  const floorTileId = 1;
  const wallTileId = 0;

  tileMap.data.fill(wallTileId);

  let sets = {};

  function makeSet(x, y) {
    const id = `${x},${y}`;
    sets[id] = { id, cells: [id] };
    return sets[id];
  }

  function findSet(x, y) {
    const id = `${x},${y}`;
    return sets[id] || makeSet(x, y);
  }

  function unionSets(x1, y1, x2, y2) {
    const set1 = findSet(x1, y1);
    const set2 = findSet(x2, y2);

    if (set1.id === set2.id) return;

    // Merge two sets
    set2.cells.forEach(cellId => {
      set1.cells.push(cellId);
      sets[cellId] = set1;
    });
  }

  for (let y = 0; y < tileMap.height; y += 2) {
    // Join cells horizontally
    for (let x = 0; x < tileMap.width - 2; x += 2) {
      if (tileMap.random() > 0.5) {
        unionSets(x, y, x + 2, y);
        tileMap.data[y * tileMap.width + x + 1] = floorTileId;
      }
    }

    // Join cells vertically
    if (y < tileMap.height - 2) {
      let setVisited = {};
      for (let x = 0; x < tileMap.width; x += 2) {
        const currentSet = findSet(x, y).id;
        if (!setVisited[currentSet] && tileMap.random() > 0.5) {
          unionSets(x, y, x, y + 2);
          tileMap.data[(y + 1) * tileMap.width + x] = floorTileId;
          setVisited[currentSet] = true;
        }
      }
    }
  }

  // Ensure all paths are connected in the last row
  for (let x = 0; x < tileMap.width - 2; x += 2) {
    if (findSet(x, tileMap.height - 1).id !== findSet(x + 2, tileMap.height - 1).id) {
      unionSets(x, tileMap.height - 1, x + 2, tileMap.height - 1);
      tileMap.data[(tileMap.height - 1) * tileMap.width + x + 1] = floorTileId;
    }
  }
}