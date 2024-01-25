import Tile from './Tile.js';
import TileMap from './TileMap.js';

// Mazes
import RecursiveBacktrack from './mazes/RecursiveBacktrack.js';
import RecursiveDivision from './mazes/RecursiveDivision.js';
import SpiralBacktrack from './mazes/SpiralBacktrack.js';

// Biomes

// Terrains

// https://en.wikipedia.org/wiki/Diamond-square_algorithm
import DiamondSquare from './terrains/DiamondSquare.js';
import FaultLine from './terrains/FaultLine.js';

let daedalus = {};

daedalus.mazes = {};
daedalus.mazes.RecursiveBacktrack = RecursiveBacktrack;
daedalus.mazes.RecursiveDivision = RecursiveDivision;
daedalus.mazes.SpiralBacktrack = SpiralBacktrack;

daedalus.terrains = {};
daedalus.terrains.DiamondSquare = DiamondSquare;
daedalus.terrains.FaultLine = FaultLine;

daedalus.Tile = Tile;
daedalus.TileMap = TileMap;

export default daedalus;