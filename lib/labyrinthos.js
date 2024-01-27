import Tile from './Tile.js';
import TileMap from './TileMap.js';

// Mazes
import AldousBroder from './mazes/AldousBroder.js';
import BinaryTree from './mazes/BinaryTree.js';
import CellularAutomata from './mazes/CellularAutomata.js';
import EllersAlgorithm from './mazes/EllersAlgorithm.js';
import GrowingTree from './mazes/GrowingTree.js';
// import HuntAndKill from './mazes/HuntAndKill.js';
import RecursiveBacktrack from './mazes/RecursiveBacktrack.js';
import RecursiveDivision from './mazes/RecursiveDivision.js';
// import SpiralBacktrack from './mazes/SpiralBacktrack.js';
import ThomasHunter from './mazes/ThomasHunter.js';
// import TremauxsAlgorithm from './mazes/TremauxsAlgorithm.js';
// import VoronoiDiagram from './mazes/VoronoiDiagram.js';

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
// import DiamondSquare from './terrains/DiamondSquare.js';
import FaultLine from './terrains/FaultLine.js';

// Utilities / Various
// import mapImageToTileMap from './util/mapImageToTileMap.js';

let labyrinthos = {};

labyrinthos.mazes = {};
labyrinthos.mazes.AldousBroder = AldousBroder;
labyrinthos.mazes.BinaryTree = BinaryTree;
labyrinthos.mazes.CellularAutomata = CellularAutomata;
labyrinthos.mazes.EllersAlgorithm = EllersAlgorithm;
labyrinthos.mazes.GrowingTree = GrowingTree;
// labyrinthos.mazes.HuntAndKill = HuntAndKill;
labyrinthos.mazes.RecursiveBacktrack = RecursiveBacktrack;
labyrinthos.mazes.RecursiveDivision = RecursiveDivision;
// labyrinthos.mazes.SpiralBacktrack = SpiralBacktrack;
labyrinthos.mazes.ThomasHunter = ThomasHunter;
// labyrinthos.mazes.TremauxsAlgorithm = TremauxsAlgorithm;
// labyrinthos.mazes.VoronoiDiagram = VoronoiDiagram;

labyrinthos.shapes = {};
labyrinthos.shapes.Circle = Circle;
labyrinthos.shapes.Square = Square;
// labyrinthos.shapes.Hexagon = Hexagon;
labyrinthos.shapes.Triangle = Triangle;

labyrinthos.terrains = {};
// labyrinthos.terrains.DiamondSquare = DiamondSquare;
labyrinthos.terrains.FaultLine = FaultLine;

labyrinthos.utils = {};
// labyrinthos.utils.mapImageToTileMap = mapImageToTileMap;

labyrinthos.Tile = Tile;
labyrinthos.TileMap = TileMap;

export default labyrinthos;