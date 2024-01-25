import Tile from './Tile.js';
import TileMap from './TileMap.js';

// Mazes
import AldousBroder from './mazes/AldousBroder.js';
import BinaryTree from './mazes/BinaryTree.js';
import RecursiveBacktrack from './mazes/RecursiveBacktrack.js';
import RecursiveDivision from './mazes/RecursiveDivision.js';
import SpiralBacktrack from './mazes/SpiralBacktrack.js';

// Shapes
import Circle from './shapes/Circle.js';
import Square from './shapes/Square.js';
// import Hexagon from './shapes/Hexagon.js';
import Triangle from './shapes/Triangle.js';

// Biomes
// TODO: Add biomes
// Forest, Swamp, Plains, Mountain, Island

// Terrains
// https://en.wikipedia.org/wiki/Diamond-square_algorithm
import DiamondSquare from './terrains/DiamondSquare.js';
import FaultLine from './terrains/FaultLine.js';

let labyrinthos = {};

labyrinthos.mazes = {};
labyrinthos.mazes.AldousBroder = AldousBroder;
labyrinthos.mazes.BinaryTree = BinaryTree;
labyrinthos.mazes.RecursiveBacktrack = RecursiveBacktrack;
labyrinthos.mazes.RecursiveDivision = RecursiveDivision;
labyrinthos.mazes.SpiralBacktrack = SpiralBacktrack;


labyrinthos.shapes = {};
labyrinthos.shapes.Circle = Circle;
labyrinthos.shapes.Square = Square;
// labyrinthos.shapes.Hexagon = Hexagon;
labyrinthos.shapes.Triangle = Triangle;

labyrinthos.terrains = {};
// labyrinthos.terrains.DiamondSquare = DiamondSquare;
labyrinthos.terrains.FaultLine = FaultLine;

labyrinthos.Tile = Tile;
labyrinthos.TileMap = TileMap;

export default labyrinthos;