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

let labyrinthos = {};

labyrinthos.mazes = {};
labyrinthos.mazes.RecursiveBacktrack = RecursiveBacktrack;
labyrinthos.mazes.RecursiveDivision = RecursiveDivision;
labyrinthos.mazes.SpiralBacktrack = SpiralBacktrack;

labyrinthos.terrains = {};
labyrinthos.terrains.DiamondSquare = DiamondSquare;
labyrinthos.terrains.FaultLine = FaultLine;

labyrinthos.Tile = Tile;
labyrinthos.TileMap = TileMap;

export default labyrinthos;